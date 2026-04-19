import { apiGet } from "@/lib/api.server";
import {
  WorkoutWithExercice,
  workoutWithExerciceSchema,
} from "@/types/workouts.schema";
import { WorkoutDetails } from "./_components/WorkoutDetails";

export default async function MyExercicePage() {
  const workout = await apiGet<WorkoutWithExercice>(`/workouts/${1}`).then(
    (data) => workoutWithExerciceSchema.parse(data),
  );

  return <WorkoutDetails {...workout} />;
}
