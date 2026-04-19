import { OmitType } from '@nestjs/swagger';
import { CreateWorkoutExerciseDto } from './create-workout.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
export class UpdateWorkoutExerciseDto extends OmitType(
  CreateWorkoutExerciseDto,
  ['exerciseId'],
) {
  @ApiProperty({ example: 1 })
  @IsInt()
  id: number;
}

export class UpdateWorkoutDto {
  @ApiProperty({ example: '2026-01-01T00:00:00.000Z', required: false })
  @IsOptional()
  @IsDateString()
  date?: string;

  @ApiProperty({ type: [UpdateWorkoutExerciseDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkoutExerciseDto)
  exercises: UpdateWorkoutExerciseDto[];
}
