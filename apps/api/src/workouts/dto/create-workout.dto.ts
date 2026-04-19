import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsPositive,
  ValidateNested,
} from 'class-validator';

export class CreateWorkoutExerciseDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  exerciseId: number;

  @ApiProperty({ example: 30 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  duration?: number;

  @ApiProperty({ example: 4 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  sets?: number;

  @ApiProperty({ example: 8 })
  @IsOptional()
  @IsInt()
  @IsPositive()
  reps?: number;
}

export class CreateWorkoutDto {
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @IsDateString()
  date: string;

  @ApiProperty({ type: [CreateWorkoutExerciseDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutExerciseDto)
  exercises: CreateWorkoutExerciseDto[];
}
