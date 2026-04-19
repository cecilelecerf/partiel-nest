import { Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExercisesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrainingDto: CreateExerciseDto) {
    return this.prisma.exercise.create({ data: { ...createTrainingDto } });
  }

  findAll() {
    return this.prisma.exercise.findMany();
  }

  findByIds(ids: number[]) {
    return this.prisma.exercise.findMany({
      where: { id: { in: ids } },
    });
  }

  findOne(id: number) {
    return this.prisma.exercise.findUnique({ where: { id } });
  }

  update(id: number, updateTrainingDto: UpdateExerciseDto) {
    return this.prisma.exercise.update({
      where: { id },
      data: { ...updateTrainingDto },
    });
  }
  remove(id: number) {
    return this.prisma.exercise.delete({ where: { id } });
  }
}
