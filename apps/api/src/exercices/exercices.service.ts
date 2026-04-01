import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';

@Injectable()
export class ExercicesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrainingDto: CreateExerciceDto) {
    return this.prisma.exercice.create({ data: { ...createTrainingDto } });
  }

  findAll() {
    return this.prisma.exercice.findMany();
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
