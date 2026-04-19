import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import {  Roles } from 'src/auth/decorators/roles.decorator';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { UserRole } from 'src/generated/prisma/enums';

@Controller('exercices')
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createExerciceDto: CreateExerciceDto) {
    return this.exercicesService.create(createExerciceDto);
  }

  @Get()
  findAll() {
    return this.exercicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercicesService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciceDto: UpdateExerciceDto,
  ) {
    return this.exercicesService.update(+id, updateExerciceDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercicesService.remove(+id);
  }
}
