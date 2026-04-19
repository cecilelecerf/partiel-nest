import { Exercice } from "@/types/exercices.schema";
import { apiGet } from "../../../../lib/api.server";
import { ExercicesClient } from "./ExercicesClient";

export const ExercicesServer = async () => {
  const exercices = await apiGet<Exercice[]>("/exercices");
  return <ExercicesClient exercices={exercices} />;
};
