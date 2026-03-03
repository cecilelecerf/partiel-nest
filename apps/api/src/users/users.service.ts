import { Injectable } from '@nestjs/common';
import { User } from 'src/generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.user.findMany();
  }
  findOne(email: User['email']) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  saveOtp(email: User['email'], otpCode: string, expiredAt: Date) {
    return this.prisma.user.update({
      where: { email },
      data: { otpCode, otpExpiredAt: expiredAt },
    });
  }
  findOtp(otpCode: string) {
    return this.prisma.user.findFirst({
      where: { otpCode },
    });
  }
}
