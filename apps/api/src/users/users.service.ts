import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.user.findMany({
      orderBy: { email: 'asc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerifiedEmail: true,
        createdAt: true,
      },
    });
  }
  async findOne(id: User['id']) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }
  update(
    id: User['id'],
    updateUserDto: Partial<Omit<User, 'id' | 'createdAt'>>,
  ) {
    return this.prisma.user.update({ where: { id }, data: updateUserDto });
  }
  async findOneWithEmail(email: User['email']) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  saveOtp(
    email: User['email'],
    otpCode: User['otpCode'],
    expiredAt: User['otpExpiredAt'],
  ) {
    return this.prisma.user.update({
      where: { email },
      data: { otpCode, otpExpiredAt: expiredAt },
    });
  }
  deleteOtp(id: User['id']) {
    return this.prisma.user.update({
      where: { id },
      data: { otpCode: null, otpExpiredAt: null },
    });
  }
  findOtp(otpCode: User['otpCode']) {
    return this.prisma.user.findFirst({
      where: { otpCode },
    });
  }

  registry({
    email,
    name,
    password,
  }: Pick<User, 'email' | 'name' | 'password'>) {
    return this.prisma.user.create({ data: { email, name, password } });
  }

  verifyEmail({ email }: Pick<User, 'email'>) {
    return this.prisma.user.update({
      where: { email },
      data: { isVerifiedEmail: true },
    });
  }
  async getStats(userId: number): Promise<{
    totalWorkouts: number;
    totalDuration: number;
    uniqueExercises: number;
  }> {
    const totalWorkouts = await this.prisma.workout.count({
      where: { userId },
    });
    const totalDuration = await this.prisma.workoutExercise.aggregate({
      where: { workout: { userId } },
      _sum: { duration: true },
    });
    const uniqueExercises = await this.prisma.workoutExercise.findMany({
      where: { workout: { userId } },
      select: { exerciseId: true },
      distinct: ['exerciseId'],
    });

    return {
      totalWorkouts,
      totalDuration: totalDuration._sum.duration ?? 0,
      uniqueExercises: uniqueExercises.length,
    };
  }
}
