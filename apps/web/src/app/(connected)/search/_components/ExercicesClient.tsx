"use client";
import { Exercice } from "@/types/exercices.schema";
import { CardExercice } from "./CardExercice";

export const ExercicesClient = ({ exercices }: { exercices: Exercice[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-10">
      {exercices.map((t) => (
        <CardExercice key={t.id} {...t} draft={{ button: true, card: true }} />
      ))}
    </div>
  );
};
