"use client";

import { CardExercise } from "@/app/(connected)/exercises/_components/CardExercise";
import { Button } from "@/components/ui/button";
import { apiPatch } from "@/lib/api.client";
import { WorkoutExercise } from "@/types/workoutExercises.schema";
import { WorkoutWithExerciseWithMeta } from "@/types/workouts.schema";
import { Edit, SaveIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export const WorkoutDetails = ({
  date: defaultDate,
  workoutExercise: defaultWorkoutExercise,
  id,
}: WorkoutWithExerciseWithMeta) => {
  const { data: session } = useSession();

  const [exercises, setExercises] = useState(defaultWorkoutExercise);
  const [date, setDate] = useState<Date>(defaultDate);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const handleChange = (id: number, data: Partial<WorkoutExercise>) => {
    setExercises((prev) =>
      prev.map((we) => (we.id === id ? { ...we, ...data } : we)),
    );
  };

  const handleSave = async () => {
    if (!session?.accessToken) return;
    await apiPatch(`/workouts/${id}`, { date, exercises }, session.accessToken);
  };
  return (
    <>
      <div className="flex justify-between items-center">
        {isEditingDate ? (
          <input
            type="date"
            className="font-bold mb-4 text-3xl border-b focus:outline-none"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
            onBlur={() => setIsEditingDate(false)}
            autoFocus
          />
        ) : (
          <h1
            className="font-bold mb-4 text-3xl cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => setIsEditingDate(true)}
          >
            {date.toLocaleDateString("fr-FR", { dateStyle: "full" })}
          </h1>
        )}
        <Button
          size="icon"
          onClick={() => setIsEditingDate((prev) => !prev)}
          onMouseDown={(e) => e.preventDefault()}
        >
          {isEditingDate ? <XIcon /> : <Edit />}
        </Button>
      </div>
      <div className="space-y-12">
        {exercises.map((we) => (
          <CardExercise
            key={we.exercise.id}
            {...we.exercise}
            workoutExercise={we}
            onChangeWorkoutExercise={(data) => handleChange(we.id, data)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={handleSave} size="lg" className="text-lg">
          <SaveIcon /> Enregistré
        </Button>
      </div>
    </>
  );
};
