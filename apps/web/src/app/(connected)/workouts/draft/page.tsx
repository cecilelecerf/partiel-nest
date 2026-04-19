"use client";

import { useWorkoutDraft } from "@/stores/useWorkoutDraft";
import { useSession } from "next-auth/react";
import { Exercise, ExerciseId, exerciseSchema } from "@/types/exercises.schema";
import { useEffect, useState } from "react";
import { apiPost } from "@/lib/api.client";
import { CardExercise } from "../../exercises/_components/CardExercise";
import {
  WorkoutExercise,
  WorkoutExerciseTest,
} from "@/types/workoutExercises.schema";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { workoutWithExerciseIdSchema } from "@/types/workouts.schema";

export default function DraftWorkout() {
  const router = useRouter();
  const { ids, clear } = useWorkoutDraft();
  const { data: session } = useSession();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [workoutExercises, setWorkoutExercises] = useState<
    WorkoutExerciseTest[]
  >([]);
  const [date, setDate] = useState(new Date());
  const [isEditingDate, setIsEditingDate] = useState(false);

  useEffect(() => {
    if (!session?.accessToken || ids.length === 0) return;
    apiPost<Exercise[]>("/exercises/by-ids", { ids }, session.accessToken)
      .then((data) => exerciseSchema.array().parse(data))
      .then((data) => {
        setExercises(data);
        setWorkoutExercises(data.map((d) => ({ exerciseId: d.id })));
      });
  }, [ids, session?.accessToken]);

  const handleChange = (
    exerciseId: ExerciseId,
    data: Partial<WorkoutExercise>,
  ) => {
    setWorkoutExercises((prev) =>
      prev.map((we) =>
        we.exerciseId === exerciseId ? { ...we, ...data, exerciseId } : we,
      ),
    );
  };

  const handleSave = async () => {
    if (!session?.accessToken) return;
    const response = await apiPost(
      "/workouts",
      { date, exercises: workoutExercises },
      session.accessToken,
    ).then((data) => workoutWithExerciseIdSchema.parse(data));
    clear();
    router.push(`/workouts/${response.id}`);
  };

  if (ids.length === 0)
    return (
      <p className="text-muted-foreground">
        Pas d&apos;exercise enregistré pour la séance.
      </p>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        {isEditingDate ? (
          <input
            type="date"
            className="font-bold text-3xl border-b focus:outline-none"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            onBlur={() => setIsEditingDate(false)}
            autoFocus
          />
        ) : (
          <h1
            className="font-bold text-3xl cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setIsEditingDate(true)}
          >
            {date.toLocaleDateString("fr-FR", { dateStyle: "full" })}
          </h1>
        )}
      </div>

      <div className="space-y-6">
        {exercises.map((exercise) => (
          <CardExercise
            key={exercise.id}
            {...exercise}
            workoutExercise={{}}
            onChangeWorkoutExercise={(data) => handleChange(exercise.id, data)}
            draft={{ button: true }}
          />
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleSave}>
          <SaveIcon /> Sauvegarder l&apos;entraînement
        </Button>
      </div>
    </div>
  );
}
