"use client";
import { Exercise } from "@/types/exercises.schema";
import { CardExercise } from "./CardExercise";

export const ExercisesClient = ({ exercises }: { exercises: Exercise[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
      {exercises.map((t) => (
        <CardExercise key={t.id} {...t} draft={{ button: true, card: true }} />
      ))}
    </div>
  );
};
