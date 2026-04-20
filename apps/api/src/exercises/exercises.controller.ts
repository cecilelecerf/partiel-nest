import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/enums';
import { FindByIdsDto } from './dto/find-by-ids.dto';
import { Exercise } from '../generated/prisma/client';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  findAll(
    @Query('name') name?: Exercise['name'],
    @Query('muscleGroup') muscleGroup?: Exercise['muscleGroup'],
    @Query('equipment') equipment?: Exercise['equipment'],
    @Query('type') type?: Exercise['type'],
  ) {
    return this.exercisesService.findAll({
      name,
      muscleGroup,
      equipment,
      type,
    });
  }

  @Post('by-ids')
  findByIds(@Body() findByIds: FindByIdsDto) {
    return this.exercisesService.findByIds(findByIds.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exercisesService.findOne(+id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(+id, updateExerciseDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exercisesService.remove(+id);
  }
}
