"use client";
import { Input } from "@/components/ui/input";
import {
  WorkoutExercice as TWorkoutExercice,
  WorkoutExerciceForm as TWorkoutExerciceForm,
  workoutExerciceFormSchema,
} from "@/types/workoutExercices.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const WorkoutExerciceForm = ({
  workoutExercice,
  onChange,
}: {
  workoutExercice: TWorkoutExercice;
  onChange: (data: Partial<TWorkoutExercice>) => void;
}) => {
  const { register } = useForm<TWorkoutExerciceForm>({
    resolver: zodResolver(workoutExerciceFormSchema),
    defaultValues: {
      reps: workoutExercice.reps,
      sets: workoutExercice.sets,
      duration: workoutExercice.duration,
    },
  });

  return (
    <div className="border-t pt-4 py-2 bg-gray-100/90 px-6 flex sm:items-center gap-10 flex-col sm:flex-row  items-start">
      <div className="flex gap-2 items-end">
        <Input
          type="number"
          {...register("reps", {
            valueAsNumber: true,
            onChange: (e) => onChange({ reps: Number(e.target.value) }),
          })}
          placeholder="0"
        />
        <p className="text-sm h-fit">répétitions</p>
      </div>
      <div className="flex gap-2 items-end">
        <Input
          type="number"
          {...register("duration", {
            valueAsNumber: true,
            onChange: (e) => onChange({ duration: Number(e.target.value) }),
          })}
          placeholder="0"
        />
        <p className="text-sm h-fit">min</p>
      </div>
      <div className="flex gap-2 items-end">
        <Input
          type="number"
          {...register("sets", {
            valueAsNumber: true,
            onChange: (e) => onChange({ sets: Number(e.target.value) }),
          })}
          placeholder="0"
        />
        <p className="text-sm h-fit">séries</p>
      </div>
    </div>
  );
};
