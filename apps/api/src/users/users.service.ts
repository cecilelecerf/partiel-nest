import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return this.prisma.user.findMany();
  }
  findOne(email: User['email']) {
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
  async getStats(userId: number) {
    const workouts = await this.prisma.workout.findMany({
      where: { userId },
      include: { workoutExercise: true },
    });

    const totalWorkouts = workouts.length;
    const totalDuration = workouts
      .flatMap((w) => w.workoutExercise)
      .reduce((acc, we) => acc + (we.duration ?? 0), 0);
    const uniqueExercises = new Set(
      workouts.flatMap((w) => w.workoutExercise.map((we) => we.exerciseId)),
    ).size;

    return { totalWorkouts, totalDuration, uniqueExercises };
  }
}
