import { Exercise } from '../../generated/prisma/client';

export class CreateExerciseDto {
  name: Exercise['name'];
  description?: Exercise['description'];
  muscleGroup: Exercise['muscleGroup'];
  secondaryMuscles: Exercise['secondaryMuscles'];
  type: Exercise['type'];
  equipment: Exercise['equipment'];
  tutorialUrl?: Exercise['tutorialUrl'];
}
