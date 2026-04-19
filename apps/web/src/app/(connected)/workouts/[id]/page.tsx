import { apiGet } from "@/lib/api.server";
import {
  WorkoutWithExerciseWithMeta,
  workoutWithExerciseWithMetaSchema,
} from "@/types/workouts.schema";
import { WorkoutDetails } from "./_components/WorkoutDetails";

export default async function MyExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await apiGet<WorkoutWithExerciseWithMeta>(
    `/workouts/${id}`,
  ).then((data) => workoutWithExerciseWithMetaSchema.parse(data));

  return <WorkoutDetails {...workout} />;
}
