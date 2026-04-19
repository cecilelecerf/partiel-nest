import { apiGet } from "@/lib/api.server";
import { Exercise, exerciseSchema } from "@/types/exercises.schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardExercise } from "../../exercises/_components/CardExercise";

export default async function AdminExercisesPage() {
  const exercises = await apiGet<Exercise[]>("/exercises").then((data) =>
    exerciseSchema.array().parse(data),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Exercises</h1>
        <Button asChild size="sm">
          <Link href="/admin/exercises/create">
            <Plus /> Ajouter
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-6">
        {exercises.map((exercise) => (
          <Link key={exercise.id} href={`/admin/exercises/${exercise.id}`}>
            <CardExercise key={exercise.id} {...exercise} resume interactive />
          </Link>
        ))}
      </div>
    </div>
  );
}
