import { apiGet } from "@/lib/api.server";
import { Exercise, exerciseSchema } from "@/types/exercises.schema";
import TrainingForm from "../_components/TrainingForm";

export default async function AdminExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exercise = await apiGet<Exercise>(`/exercises/${id}`).then((data) =>
    exerciseSchema.parse(data),
  );

  return <TrainingForm defaultValues={exercise} />;
}
