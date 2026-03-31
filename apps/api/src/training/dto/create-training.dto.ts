import { Training } from '../entities/training.entity';

export class CreateTrainingDto {
  name: Training['name'];
  description?: Training['description'];
  muscleGroup: Training['muscleGroup'];
  secondaryMuscles: Training['secondaryMuscles'];
  type: Training['type'];
  difficulty: Training['difficulty'];
  equipment: Training['equipment'];
  tutorialUrl?: Training['tutorialUrl'];
}
