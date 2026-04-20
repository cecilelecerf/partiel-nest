import { Exercise } from "@/types/exercises.schema";
import { ExercisesServer } from "./_components/ExercisesServer";
import { Search } from "./_components/Search";
export type SearchParams = Partial<
  Pick<Exercise, "equipment" | "name" | "type" | "muscleGroup">
>;

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  return (
    <>
      <Search />
      <ExercisesServer searchParams={searchParams} />
    </>
  );
}
