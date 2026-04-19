import { Exercise } from "@/types/exercises.schema";
import { apiGet } from "../../../../lib/api.server";
import { ExercisesClient } from "./ExercisesClient";

export const ExercisesServer = async () => {
  const exercises = await apiGet<Exercise[]>("/exercises");
  return <ExercisesClient exercises={exercises} />;
};
