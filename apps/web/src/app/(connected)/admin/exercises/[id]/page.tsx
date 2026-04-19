import { apiGet } from "@/lib/api.server";
import { Exercise, exerciseSchema } from "@/types/exercises.schema";
import ExerciseForm from "../_components/ExerciseForm";

export default async function AdminExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = await apiGet<Exercise>(`/exercises/${id}`).then((data) =>
    exerciseSchema.parse(data),
  );

  return <ExerciseForm defaultValues={exercise} />;
}
