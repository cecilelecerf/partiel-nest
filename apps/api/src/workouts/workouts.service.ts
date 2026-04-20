import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User, Workout } from '../generated/prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, userId: User['id']) {
    return this.prisma.workout.create({
      data: {
        userId,
        date: createWorkoutDto.date,
        workoutExercise: {
          create: createWorkoutDto.exercises,
        },
      },
      include: {
        workoutExercise: true,
      },
    });
  }
  findAll() {
    return this.prisma.workout.findMany();
  }
  findAllWithMeta(userId: User['id']) {
    return this.prisma.workout.findMany({
      where: { userId },
      include: {
        _count: { select: { workoutExercise: true } },
        workoutExercise: {
          select: {
            duration: true,
            exercise: { select: { muscleGroup: true, type: true } },
          },
        },
      },
      orderBy: { date: 'asc' },
    });
  }

  async findOne(id: Workout['id'], userId: User['id']) {
    const workout = await this.prisma.workout.findUnique({
      where: { id, userId },
      include: {
        workoutExercise: { include: { exercise: true } },
        _count: { select: { workoutExercise: true } },
      },
    });
    if (!workout) throw new NotFoundException();
    return workout;
  }

  update(id: Workout['id'], updateWorkoutDto: UpdateWorkoutDto) {
    return this.prisma.workout.update({
      where: { id },
      data: {
        date: updateWorkoutDto.date,
        workoutExercise: {
          update: updateWorkoutDto.exercises.map((workoutExercise) => ({
            where: { id: workoutExercise.id },
            data: {
              sets: workoutExercise.sets,
              reps: workoutExercise.reps,
              duration: workoutExercise.duration,
            },
          })),
        },
      },
      include: {
        workoutExercise: true,
      },
    });
  }

  remove(id: Workout['id']) {
    return this.prisma.workout.delete({ where: { id } });
  }
}
