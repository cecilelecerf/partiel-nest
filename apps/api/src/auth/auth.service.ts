import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { randomInt } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';

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
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (!user) throw new UnauthorizedException();
    const correctPassword = await compare(pass, user.password);
    if (!correctPassword) {
      throw new UnauthorizedException();
    }
    const otpCode = this.generateOtp();
    const min = 5;
    const expiry = new Date(Date.now() + min * 60 * 1000);
    await this.usersService.saveOtp(user.email, otpCode, expiry);
    console.log('test');
    await this.mailerService.sendOtp(user.email, otpCode, min);
    return { message: 'Code envoyé par mail' };
  }

  async verifyOtp(otp: string): Promise<any> {
    const user = await this.usersService.findOtp(otp);
    if (!user || !user.otpExpiredAt) throw new UnauthorizedException();
    const now = new Date();
    if (now > user.otpExpiredAt) throw new UnauthorizedException();
    const payload = { id: user.id, email: user.email, name: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
