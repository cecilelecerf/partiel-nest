import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { GetMe } from '../auth/decorators/get-me.decorator';
import type { User } from '../generated/prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  @ApiOperation({
    summary: 'Créer une séance',
    description:
      "Crée une nouvelle séance d'entraînement pour l'utilisateur connecté",
  })
  @ApiResponse({
    status: 201,
    description: 'Séance créée avec ses exercices',
    schema: {
      example: {
        id: 1,
        date: '2024-01-15T10:00:00Z',
        userId: 1,
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        workoutExercise: [],
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  create(@Body() createWorkoutDto: CreateWorkoutDto, @GetMe() user: User) {
    return this.workoutsService.create(createWorkoutDto, user.id);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les séances',
    description:
      "Retourne toutes les séances de l'utilisateur connecté avec métadonnées",
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          date: '2024-01-15T10:00:00Z',
          _count: { workoutExercise: 3 },
          workoutExercise: [
            {
              duration: 30,
              exercise: { muscleGroup: 'Chest', type: 'STRENGTH' },
            },
          ],
        },
      ],
    },
  })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  findAll(@GetMe() user: User) {
    return this.workoutsService.findAllWithMeta(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'une séance" })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la séance' })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        date: '2024-01-15T10:00:00Z',
        _count: { workoutExercise: 2 },
        workoutExercise: [
          {
            id: 1,
            sets: 3,
            reps: 10,
            duration: null,
            exercise: {
              id: 1,
              name: 'Développé couché',
              muscleGroup: 'Pectoraux',
              type: 'STRENGTH',
              equipment: 'BARBELL',
            },
          },
        ],
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Séance introuvable' })
  @ApiResponse({ status: 401, description: 'Non authentifié' })
  findOne(@Param('id', ParseIntPipe) id: number, @GetMe() user: User) {
    return this.workoutsService.findOne(id, user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier une séance' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la séance' })
  @ApiResponse({ status: 200, description: 'Séance mise à jour' })
  @ApiResponse({ status: 404, description: 'Séance introuvable' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWorkoutDto: UpdateWorkoutDto,
  ) {
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Supprimer une séance' })
  @ApiParam({ name: 'id', type: Number, description: 'ID de la séance' })
  @ApiResponse({ status: 204, description: 'Séance supprimée' })
  @ApiResponse({ status: 404, description: 'Séance introuvable' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.workoutsService.remove(id);
  }
}
