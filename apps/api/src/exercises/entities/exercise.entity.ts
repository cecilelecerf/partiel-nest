import { Equipment, ExerciseType } from 'src/generated/prisma/enums';

export class Exercise {
  id: number;
  name: string;
  description?: string;
  muscleGroup: string;
  secondaryMuscles: string[];
  type: ExerciseType;
  equipment: Equipment;
  tutorialUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
