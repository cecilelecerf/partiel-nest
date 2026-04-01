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
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';

@Controller('exercices')
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  @Roles(Role.ADMIN)
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

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciceDto: UpdateExerciceDto,
  ) {
    return this.exercicesService.update(+id, updateExerciceDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercicesService.remove(+id);
  }
}
