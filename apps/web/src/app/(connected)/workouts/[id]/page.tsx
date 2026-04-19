import { apiGet } from "@/lib/api.server";
import {
  WorkoutWithExerciceWithMeta,
  workoutWithExerciceWithMetaSchema,
} from "@/types/workouts.schema";
import { WorkoutDetails } from "./_components/WorkoutDetails";

export default async function MyExercicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await apiGet<WorkoutWithExerciceWithMeta>(
    `/workouts/${id}`,
  ).then((data) => workoutWithExerciceWithMetaSchema.parse(data));

  return <WorkoutDetails {...workout} />;
}
