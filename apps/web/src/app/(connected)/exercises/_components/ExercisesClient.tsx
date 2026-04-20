"use client";
import { Exercise } from "@/types/exercises.schema";
import { CardExercise } from "./CardExercise";
import { useRouter } from "next/navigation";

export const ExercisesClient = ({ exercises }: { exercises: Exercise[] }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
      {exercises.map((exercise) => (
        <CardExercise
          key={exercise.id}
          {...exercise}
          draft
          onCardClick={() => router.push(`/exercises/${exercise.id}`)}
        />
      ))}
    </div>
  );
};
