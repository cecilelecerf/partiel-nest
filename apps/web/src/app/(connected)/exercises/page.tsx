import { Exercise } from "@/types/exercises.schema";
import { ExercisesServer } from "./_components/ExercisesServer";
import { Search } from "./_components/Search";
import { Suspense } from "react";
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
      <Suspense>
        <Search />
      </Suspense>{" "}
      <ExercisesServer searchParams={searchParams} />
    </>
  );
}
