import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class CreateWorkoutExerciceDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  exerciceId: number;

  @ApiProperty({ example: 30 })
  @IsInt()
  @IsPositive()
  duration: number;

  @ApiProperty({ example: 4 })
  @IsInt()
  @IsPositive()
  sets: number;

  @ApiProperty({ example: 8 })
  @IsInt()
  @IsPositive()
  reps: number;
}

export class CreateWorkoutDto {
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ type: [CreateWorkoutExerciceDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciceDto)
  exercices: CreateWorkoutExerciceDto[];
}
