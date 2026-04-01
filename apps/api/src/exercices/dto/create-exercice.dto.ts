import { Exercice } from 'src/generated/prisma/client';

export class CreateExerciceDto {
  name: Exercice['name'];
  description?: Exercice['description'];
  muscleGroup: Exercice['muscleGroup'];
  secondaryMuscles: Exercice['secondaryMuscles'];
  type: Exercice['type'];
  equipment: Exercice['equipment'];
  tutorialUrl?: Exercice['tutorialUrl'];
}
