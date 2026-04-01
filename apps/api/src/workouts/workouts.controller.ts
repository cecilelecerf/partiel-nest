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
import { GetMe } from 'src/auth/decorators/get-me.decorator';
import { User } from 'src/generated/prisma/client';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  create(
    @Body() createWorkoutDto: CreateWorkoutDto,
    @GetMe('id') userId: User['id'],
  ) {
    return this.workoutsService.create(createWorkoutDto, userId);
  }

  @Get()
  findAll() {
    return this.workoutsService.findAllWithMeta();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workoutsService.findOne(+id);
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
