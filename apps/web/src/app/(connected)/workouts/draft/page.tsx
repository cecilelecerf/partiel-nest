"use client";

import { useWorkoutDraft } from "@/stores/useWorkoutDraft";
import { useSession } from "next-auth/react";
import { Exercice, ExerciceId, exerciceSchema } from "@/types/exercices.schema";
import { useEffect, useState } from "react";
import { apiPost } from "@/lib/api.client";
import { CardExercice } from "../../search/_components/CardExercice";
import {
  WorkoutExercice,
  WorkoutExerciceTest,
} from "@/types/workoutExercices.schema";
import { Button } from "@/components/ui/button";
import { SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { workoutWithExerciceIdSchema } from "@/types/workouts.schema";

export default function DraftWorkout() {
  const router = useRouter();
  const { ids, clear } = useWorkoutDraft();
  const { data: session } = useSession();

  const [exercices, setExercices] = useState<Exercice[]>([]);
  const [workoutExercices, setWorkoutExercices] = useState<
    WorkoutExerciceTest[]
  >([]);
  const [date, setDate] = useState(new Date());
  const [isEditingDate, setIsEditingDate] = useState(false);

  useEffect(() => {
    if (!session?.accessToken || ids.length === 0) return;
    apiPost<Exercice[]>("/exercices/by-ids", { ids }, session.accessToken)
      .then((data) => exerciceSchema.array().parse(data))
      .then((data) => {
        setExercices(data);
        setWorkoutExercices(data.map((d) => ({ exerciceId: d.id })));
      });
  }, [ids, session?.accessToken]);

  const handleChange = (
    exerciceId: ExerciceId,
    data: Partial<WorkoutExercice>,
  ) => {
    setWorkoutExercices((prev) =>
      prev.map((we) =>
        we.exerciceId === exerciceId ? { ...we, ...data, exerciceId } : we,
      ),
    );
  };

  const handleSave = async () => {
    if (!session?.accessToken) return;
    const response = await apiPost(
      "/workouts",
      { date, exercices: workoutExercices },
      session.accessToken,
    ).then((data) => workoutWithExerciceIdSchema.parse(data));
    clear();
    router.push(`/workouts/${response.id}`);
  };

  if (ids.length === 0)
    return (
      <p className="text-muted-foreground">
        Pas d&apos;exercice enregistré pour la séance.
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
        {exercices.map((exercice) => (
          <CardExercice
            key={exercice.id}
            {...exercice}
            workoutExercice={{}}
            onChangeWorkoutExercice={(data) => handleChange(exercice.id, data)}
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
