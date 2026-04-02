import { Injectable } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Workout } from 'src/generated/prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, userId: User['id']) {
    return this.prisma.workout.create({
      data: {
        userId,
        date: createWorkoutDto.date,
        workoutExercice: {
          create: createWorkoutDto.exercices,
        },
      },
      include: {
        workoutExercice: true,
      },
    });
  }
  findAll() {
    return this.prisma.workout.findMany();
  }
  findAllWithMeta() {
    return this.prisma.workout.findMany({
      include: {
        _count: { select: { workoutExercice: true } },
        workoutExercice: {
          select: {
            duration: true,
            exercice: { select: { muscleGroup: true, type: true } },
          },
        },
      },
    });
  }

  async findOne(id: Workout['id']) {
    return this.prisma.workout.findUnique({
      where: { id },
      include: {
        workoutExercice: { include: { exercice: true } },
        _count: { select: { workoutExercice: true } },
      },
    });
  }

  update(id: Workout['id'], updateWorkoutDto: UpdateWorkoutDto) {
    return this.prisma.workout.update({
      where: { id },
      data: {
        date: updateWorkoutDto.date,
        workoutExercice: {
          upsert: updateWorkoutDto.exercices?.map((exercice) => ({
            where: { id: exercice.exerciceId },
            update: exercice,
            create: exercice,
          })),
        },
      },
      include: {
        workoutExercice: true,
      },
    });
  }

  remove(id: Workout['id']) {
    return this.prisma.workout.delete({ where: { id } });
  }
}
