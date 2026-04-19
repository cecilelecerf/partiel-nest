import { CardWrapper } from "@/components/Card";
import { WorkoutWithMeta } from "@/types/workouts.schema";
import Link from "next/link";
import { formatDuration, getTotalDuration } from "../utils";

export const WorkoutCard = ({
  id,
  date,
  _count: { workoutExercise: exerciseCount },
  workoutExercise,
}: WorkoutWithMeta) => {
  const totalDuration = getTotalDuration(
    workoutExercise
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
            {exerciseCount} exercises - {hour}h{min}
          </p>
          <div className="flex gap-2">
            {workoutExercise.map(({ exercise }, i) => (
              <p key={i} className="text-sm">
                {exercise.muscleGroup}
                {i !== workoutExercise.length - 1 && "-"}
              </p>
            ))}
          </div>
        </>
      </CardWrapper>
    </Link>
  );
};
