"use client";
import { Input } from "@/components/ui/input";
import {
  WorkoutExercice as TWorkoutExercice,
  WorkoutExerciceForm as TWorkoutExerciceForm,
  workoutExerciceFormSchema,
} from "@/types/workoutExercices.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type Field = {
  key: keyof TWorkoutExerciceForm;
  label: string;
};

const FIELDS: Field[] = [
  { key: "reps", label: "répétitions" },
  { key: "duration", label: "min" },
  { key: "sets", label: "séries" },
];

export const WorkoutExerciceForm = ({
  workoutExercice,
  onChange,
}: {
  workoutExercice: Partial<TWorkoutExercice>;
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
