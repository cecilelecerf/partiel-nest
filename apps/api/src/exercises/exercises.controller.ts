import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../generated/prisma/enums';
import { FindByIdsDto } from './dto/find-by-ids.dto';
import { Exercise } from '../generated/prisma/client';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Roles(UserRole.ADMIN)
  @Post()
  @ApiOperation({
    summary: 'Créer un exercice',
    description: 'Réservé aux admins',
  })
  @ApiResponse({ status: 201, description: 'Exercice créé' })
  @ApiResponse({ status: 403, description: 'Accès refusé — rôle ADMIN requis' })
  create(@Body() createExerciseDto: CreateExerciseDto) {
    return this.exercisesService.create(createExerciseDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Lister les exercices',
    description: 'Filtres optionnels : name, muscleGroup, equipment, type',
  })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'muscleGroup', required: false, type: String })
  @ApiQuery({
    name: 'equipment',
    required: false,
    enum: ['DUMBBELL', 'BARBELL', 'MACHINE', 'BODYWEIGHT', 'KETTLEBELL'],
  })
  @ApiQuery({
    name: 'type',
    required: false,
    enum: ['STRENGTH', 'CARDIO', 'MOBILITY', 'HYPERTROPHY'],
  })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          name: 'Développé couché',
          description: 'Exercice de poussée horizontal',
          muscleGroup: 'Pectoraux',
          secondaryMuscles: ['Triceps', 'Deltoïdes antérieurs'],
          type: 'STRENGTH',
          equipment: 'BARBELL',
          tutorialUrl: 'https://youtube.com/...',
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
      ],
    },
  })
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
  @ApiOperation({ summary: 'Récupérer plusieurs exercices par IDs' })
  @ApiResponse({
    status: 200,
    schema: {
      example: [
        {
          id: 1,
          name: 'Développé couché',
          description: 'Exercice de poussée horizontal',
          muscleGroup: 'Pectoraux',
          secondaryMuscles: ['Triceps', 'Deltoïdes antérieurs'],
          type: 'STRENGTH',
          equipment: 'BARBELL',
          tutorialUrl: null,
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z',
        },
      ],
    },
  })
  findByIds(@Body() findByIds: FindByIdsDto) {
    return this.exercisesService.findByIds(findByIds.ids);
  }

  @Get(':id')
  @ApiOperation({ summary: "Détail d'un exercice" })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    schema: {
      example: {
        id: 1,
        name: 'Développé couché',
        description: 'Exercice de poussée horizontal',
        muscleGroup: 'Pectoraux',
        secondaryMuscles: ['Triceps', 'Deltoïdes antérieurs'],
        type: 'STRENGTH',
        equipment: 'BARBELL',
        tutorialUrl: 'https://youtube.com/...',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Exercice introuvable' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.findOne(id);
  }

  @Roles(UserRole.ADMIN)
  @Patch(':id')
  @ApiOperation({
    summary: 'Modifier un exercice',
    description: 'Réservé aux admins',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Exercice mis à jour' })
  @ApiResponse({ status: 403, description: 'Accès refusé — rôle ADMIN requis' })
  @ApiResponse({ status: 404, description: 'Exercice introuvable' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return this.exercisesService.update(id, updateExerciseDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Supprimer un exercice',
    description: 'Réservé aux admins',
  })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 204, description: 'Exercice supprimé' })
  @ApiResponse({ status: 403, description: 'Accès refusé — rôle ADMIN requis' })
  @ApiResponse({ status: 404, description: 'Exercice introuvable' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exercisesService.remove(id);
  }
}
