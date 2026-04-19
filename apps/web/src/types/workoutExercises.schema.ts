import z from "zod";
import { exerciseIdSchema } from "./exercises.schema";

export const workoutExerciseIdSchema = z
  .number()
  .nonnegative()
  .brand("workout-exercise");
export const workoutExerciseSchema = z.object({
  id: workoutExerciseIdSchema,
  duration: z.number().positive().optional().nullable(),
  sets: z.number().positive().optional().nullable(),
  reps: z.number().positive().optional().nullable(),
});

export type WorkoutExercise = z.infer<typeof workoutExerciseSchema>;

export const workoutExerciseFormSchema = workoutExerciseSchema.omit({
  id: true,
});
export type WorkoutExerciseForm = z.infer<typeof workoutExerciseFormSchema>;

export const workoutExerciseTestSchema = workoutExerciseFormSchema.extend({
  exerciseId: exerciseIdSchema,
});
export type WorkoutExerciseTest = z.infer<typeof workoutExerciseTestSchema>;
