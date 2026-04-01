export class CreateWorkoutExerciceDto {
  id?: number;
  exerciceId: number;
  duration: number;
  sets: number;
  reps: number;
}

export class CreateWorkoutDto {
  date: string;
  exercices: CreateWorkoutExerciceDto[];
}
