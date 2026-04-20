import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { randomInt } from 'crypto';
import { VerifyTokenDto } from './dto/verifyEmail.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { JwtPayload } from './types/jwt';
import { LoginUserDto } from '../users/dto/loginUser.dto';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { VerifyLoginOtpDto } from './dto/verifyLoginOtp.dto';
import { ResetPasswordDto } from './dto/resetPassword.dto';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { User } from '../generated/prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailerService: MailService,
  ) {}

  private generateOtp(): string {
    return randomInt(100000, 999999).toString();
  }
  async signIn({
    email,
    password,
  }: LoginUserDto): Promise<{ message: string }> {
    const user = await this.usersService.findOneWithEmail(email);
    if (!user) throw new UnauthorizedException();
    if (!user.isVerifiedEmail) throw new UnauthorizedException();
    const correctPassword = await compare(password, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    const otpCode = this.generateOtp();
    const min = 5;
    const expiry = new Date(Date.now() + min * 60 * 1000);
    await this.usersService.saveOtp(user.email, otpCode, expiry);
    await this.mailerService.sendOtp(user.email, otpCode, min);
    return { message: 'Code envoyé par mail' };
  }
  async verifyOtpCode({ otp }: VerifyOtpDto) {
    const user = await this.usersService.findOtp(otp);
    if (!user || !user.otpExpiredAt) throw new UnauthorizedException();

    const now = new Date();
    if (now > user.otpExpiredAt) throw new UnauthorizedException();
    return user;
  }
  async verifyLogin({ otp, email }: VerifyLoginOtpDto): Promise<{
    access_token: string;
    refresh_token: string;
    user: Pick<User, 'id' | 'email' | 'role'>;
  }> {
    const user = await this.verifyOtpCode({ otp });
    if (user.email !== email) throw new UnauthorizedException();
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    await this.usersService.deleteOtp(user.id);
    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
      }),
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  async hashPassword({ password }: { password: string }) {
    return await hash(password, 10);
  }

  async registry({ email, name, password, confirmPassword }: RegisterUserDto) {
    if (password !== confirmPassword) throw new BadRequestException();
    const user = await this.usersService.findOneWithEmail(email);
    if (user) throw new ConflictException('Email déjà utilisé');
    const hashPass = await this.hashPassword({ password });
    await this.usersService.registry({ email, name, password: hashPass });
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    await this.mailerService.sendVerificationEmail(email, token);
    return { message: 'Email de vérification envoyé' };
  }

  async verifyToken({ token }: VerifyTokenDto) {
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      if (!payload?.email || typeof payload.email !== 'string')
        throw new UnauthorizedException();
      const user = await this.usersService.findOneWithEmail(payload.email);
      if (!user) throw new UnauthorizedException();
      return await this.usersService.verifyEmail({ email: payload.email });
    } catch (e) {
      if (e instanceof UnauthorizedException) throw e;
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }
  async verifyEmailRegister({ token }: VerifyTokenDto) {
    await this.verifyToken({ token });
    return { message: 'Inscription validée' };
  }

  async forgotPassword({ email }: ForgotPasswordDto) {
    const user = await this.usersService.findOneWithEmail(email);
    if (user) {
      const payload = { email: user.email };
      const token = await this.jwtService.signAsync(payload);
      await this.mailerService.sendPasswordReset(email, token);
    }
    return { message: 'Email de réinitialisation envoyé' };
  }

  async resetPassword({
    token,
    password,
    confirmPassword,
  }: VerifyTokenDto & ResetPasswordDto) {
    const user = await this.verifyToken({ token });
    if (password !== confirmPassword)
      throw new BadRequestException('Les mots de passe ne correspondent pas');
    const hashPassword = await this.hashPassword({ password });
    await this.usersService.update(user.id, { password: hashPassword });
    return { message: 'Mot de passe modifié' };
  }
}
