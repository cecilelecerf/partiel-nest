import { IsArray, IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import {
  Equipment,
  Exercise,
  ExerciseType,
} from '../../generated/prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseDto {
  @ApiProperty({ example: 'Développé couché' })
  @IsString()
  name: Exercise['name'];

  @ApiPropertyOptional({
    example: 'Exercice de poussée horizontal ciblant les pectoraux',
  })
  @IsString()
  @IsOptional()
  description?: Exercise['description'];

  @ApiProperty({ example: 'Pectoraux' })
  @IsString()
  muscleGroup: Exercise['muscleGroup'];

  @ApiProperty({ example: ['Triceps', 'Deltoïdes antérieurs'] })
  @IsArray()
  @IsString({ each: true })
  secondaryMuscles: Exercise['secondaryMuscles'];

  @ApiProperty({ enum: ExerciseType, example: ExerciseType.STRENGTH })
  @IsEnum(ExerciseType)
  type: Exercise['type'];

  @ApiProperty({ enum: Equipment, example: Equipment.BARBELL })
  @IsEnum(Equipment)
  equipment: Exercise['equipment'];

  @ApiPropertyOptional({ example: 'https://youtube.com/watch?v=...' })
  @IsUrl()
  @IsOptional()
  tutorialUrl?: Exercise['tutorialUrl'];
}
