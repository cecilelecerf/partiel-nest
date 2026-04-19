import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { GetMe } from '../auth/decorators/get-me.decorator';
import type { User } from '../generated/prisma/client';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(@Body() createWorkoutDto: CreateWorkoutDto, @GetMe() user: User) {
    return this.workoutsService.create(createWorkoutDto, user.id);
  }

  @Get()
  findAll(@GetMe() user: User) {
    return this.workoutsService.findAllWithMeta(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetMe() user: User) {
    return this.workoutsService.findOne(+id, user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto) {
    return this.workoutsService.update(+id, updateWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workoutsService.remove(+id);
  }
}
