import { exerciseSchema } from "@/types/exercises.schema";
import { apiGet } from "../../../../lib/api.server";
import { ExercisesClient } from "./ExercisesClient";
import { SearchParams } from "../page";

export const ExercisesServer = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const params = await searchParams;
  const query = new URLSearchParams();
  if (params.name) query.set("name", params.name);
  if (params.muscleGroup) query.set("muscleGroup", params.muscleGroup);
  if (params.equipment) query.set("equipment", params.equipment);
  if (params.type) query.set("type", params.type);

  const exercises = await apiGet(
    `/exercises${query.size > 0 ? `?${query.toString()}` : ""}`,
  ).then((data) => exerciseSchema.array().parse(data));
  return <ExercisesClient exercises={exercises} />;
};
