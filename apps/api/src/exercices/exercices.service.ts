import { Injectable } from '@nestjs/common';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExercicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrainingDto: CreateExerciceDto) {
    return this.prisma.exercice.create({ data: { ...createTrainingDto } });
  }

  findAll() {
    return this.prisma.exercice.findMany();
  }

  findByIds(ids: number[]) {
    return this.prisma.exercice.findMany({
      where: { id: { in: ids } },
    });
  }

  findOne(id: number) {
    return this.prisma.exercice.findUnique({ where: { id } });
  }

  update(id: number, updateTrainingDto: UpdateExerciceDto) {
    return this.prisma.exercice.update({
      where: { id },
      data: { ...updateTrainingDto },
    });
  }
  remove(id: number) {
    return this.prisma.exercice.delete({ where: { id } });
  }
}
