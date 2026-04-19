"use client";
import { Input } from "@/components/ui/input";
import {
  WorkoutExercise as TWorkoutExercise,
  WorkoutExerciseForm as TWorkoutExerciseForm,
  workoutExerciseFormSchema,
} from "@/types/workoutExercises.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Field = {
  key: keyof TWorkoutExerciseForm;
  label: string;
};

const FIELDS: Field[] = [
  { key: "reps", label: "répétitions" },
  { key: "duration", label: "min" },
  { key: "sets", label: "séries" },
];

export const WorkoutExerciseForm = ({
  workoutExercise,
  onChange,
}: {
  workoutExercise: Partial<TWorkoutExercise>;
  onChange: (data: Partial<TWorkoutExercise>) => void;
}) => {
  const { register } = useForm<TWorkoutExerciseForm>({
    resolver: zodResolver(workoutExerciseFormSchema),
    defaultValues: {
      reps: workoutExercise.reps,
      sets: workoutExercise.sets,
      duration: workoutExercise.duration,
    },
  });

  return (
    <div className="border-t pt-4 py-2 bg-gray-100/90 px-6 flex sm:items-center gap-10 flex-col sm:flex-row items-start">
      {FIELDS.map(({ key, label }) => (
        <div key={key} className="flex gap-2 items-end">
          <Input
            type="number"
            {...register(key, {
              valueAsNumber: true,
              onChange: (e) => onChange({ [key]: Number(e.target.value) }),
            })}
            placeholder="0"
          />
          <p className="text-sm h-fit">{label}</p>
        </div>
      ))}
    </div>
  );
};
