import { CardWrapper } from "@/components/Card";
import { WorkoutWithMeta } from "@/types/workouts.schema";
import Link from "next/link";
import { formatDuration, getTotalDuration } from "../utils";

export const WorkoutCard = ({
  id,
  date,
  _count: { workoutExercice: exerciceCount },
  workoutExercice,
}: WorkoutWithMeta) => {
  const totalDuration = getTotalDuration(
    workoutExercice
      .filter((ex) => ex.duration !== undefined)
      .map((ex) => ex.duration as number),
  );
  const { hour, min } = formatDuration(totalDuration);
  return (
    <Link href={`/workouts/${id}`}>
      <CardWrapper>
        <>
          <p className="font-bold text-lg">
            {date.toLocaleDateString("fr-FR", {
              dateStyle: "full",
            })}
          </p>
          <p>
            {exerciceCount} exercices - {hour}h{min}
          </p>
          <div className="flex gap-2">
            {workoutExercice.map(({ exercice }, i) => (
              <p key={i} className="text-sm">
                {exercice.muscleGroup}
                {i !== workoutExercice.length - 1 && "-"}
              </p>
            ))}
          </div>
        </>
      </CardWrapper>
    </Link>
  );
};
