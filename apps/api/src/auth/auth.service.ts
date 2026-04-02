import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { randomInt } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
import { VerifyEmailDto } from './dto/verifyEmail.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { JwtPayload } from './types/jwt';

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
  async signIn({ email, password }: LoginUserDto): Promise<any> {
    const user = await this.usersService.findOne(email);
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

  async verifyOtp({ otp, email }: VerifyOtpDto): Promise<any> {
    const user = await this.usersService.findOtp(otp);
    if (!user || !user.otpExpiredAt) throw new UnauthorizedException();
    const now = new Date();
    if (now > user.otpExpiredAt || user.email !== email)
      throw new UnauthorizedException();
    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
    await this.usersService.deleteOtp(user.id);
    return {
      access_token: await this.jwtService.signAsync(payload, {}),
      refresh_token: await this.jwtService.signAsync(payload, {}),
      user: {
        id: payload.id,
        email: payload.email,
        role: payload.role,
      },
    };
  }

  async registry({ email, name, password }: CreateUserDto) {
    const user = await this.usersService.findOne(email);
    if (user) throw new UnauthorizedException();
    const hashPass = await hash(password, 10);
    await this.usersService.registry({ email, name, password: hashPass });
    const payload = { email };
    const token = await this.jwtService.signAsync(payload);
    await this.mailerService.sendVerificationEmail(email, token);
    return { message: 'Email de vérification envoyé' };
  }

  async verifyEmail({ token }: VerifyEmailDto) {
    const { email } = await this.jwtService.verifyAsync<JwtPayload>(token);
    if (!email) throw new UnauthorizedException();
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();
    await this.usersService.verifyEmail({ email });
    return { message: 'Inscription validée' };
  }
}
