import {
  Difficulty,
  Equipment,
  ExerciseType,
} from 'src/generated/prisma/enums';

export class Training {
  id: number;
  name: string;
  description?: string;
  muscleGroup: string;
  secondaryMuscles: string[];
  type: ExerciseType;
  difficulty: Difficulty;
  equipment: Equipment;
  tutorialUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
