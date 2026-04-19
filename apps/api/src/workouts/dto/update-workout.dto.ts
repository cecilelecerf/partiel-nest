import { OmitType } from '@nestjs/swagger';
import { CreateWorkoutExerciceDto } from './create-workout.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  ValidateNested,
} from 'class-validator';
export class UpdateWorkoutExerciceDto extends OmitType(
  CreateWorkoutExerciceDto,
  ['exerciceId'],
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

  @ApiProperty({ type: [UpdateWorkoutExerciceDto], required: false })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => UpdateWorkoutExerciceDto)
  exercices: UpdateWorkoutExerciceDto[];
}
