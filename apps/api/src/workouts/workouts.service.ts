import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Exercise, User, Workout } from '../generated/prisma/client';

@Injectable()
export class WorkoutsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createWorkoutDto: CreateWorkoutDto, userId: User['id']) {
    const exerciceIds: Exercise['id'][] = createWorkoutDto.exercises.map(
      (exercice) => exercice.exerciseId,
    );

    const exercises = await this.prisma.exercise.findMany({
      where: { id: { in: exerciceIds } },
    });
    if (exercises.length !== exerciceIds.length) {
      const foundIds = exercises.map(({ id }) => id);
      const missingIds = exerciceIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Exercises not found: ${missingIds.join(', ')}`,
      );
    }
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

  async update(id: Workout['id'], updateWorkoutDto: UpdateWorkoutDto) {
    if (updateWorkoutDto.exercises?.length > 0) {
      await Promise.all(
        updateWorkoutDto.exercises.map((workoutExercice) =>
          this.prisma.workoutExercise.upsert({
            where: { id: workoutExercice.id ?? -1 },
            update: {
              sets: workoutExercice.sets,
              reps: workoutExercice.reps,
              duration: workoutExercice.duration,
              exerciseId: workoutExercice.exerciseId,
            },
            create: {
              workoutId: id,
              sets: workoutExercice.sets,
              reps: workoutExercice.reps,
              duration: workoutExercice.duration,
              exerciseId: workoutExercice.exerciseId,
            },
          }),
        ),
      );
    } else {
      await this.prisma.workoutExercise.deleteMany({
        where: { workoutId: id },
      });
    }

    return this.prisma.workout.update({
      where: { id },
      data: { date: updateWorkoutDto.date },
      include: {
        workoutExercise: true,
      },
    });
  }

  remove(id: Workout['id']) {
    return this.prisma.workout.delete({ where: { id } });
  }
}
