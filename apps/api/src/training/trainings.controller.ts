import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TrainingsService } from './trainings.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(JwtGuard, RolesGuard)
@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  @Roles(Role.ADMIN)
  create(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingsService.create(createTrainingDto);
  }

  @Get()
  findAll() {
    return this.trainingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingsService.findOne(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateTrainingDto: UpdateTrainingDto,
  ) {
    return this.trainingsService.update(+id, updateTrainingDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  remove(@Param('id') id: string) {
    return this.trainingsService.remove(+id);
  }
}
