import z from "zod";
import { exerciceIdSchema } from "./exercices.schema";

export const workoutExerciceIdSchema = z
  .number()
  .nonnegative()
  .brand("workout-exercice");
export const workoutExerciceSchema = z.object({
  id: workoutExerciceIdSchema,
  duration: z.number().positive().optional().nullable(),
  sets: z.number().positive().optional().nullable(),
  reps: z.number().positive().optional().nullable(),
});

export type WorkoutExercice = z.infer<typeof workoutExerciceSchema>;

export const workoutExerciceFormSchema = workoutExerciceSchema.omit({
  id: true,
});
export type WorkoutExerciceForm = z.infer<typeof workoutExerciceFormSchema>;

export const workoutExerciceTestSchema = workoutExerciceFormSchema.extend({
  exerciceId: exerciceIdSchema,
});
export type WorkoutExerciceTest = z.infer<typeof workoutExerciceTestSchema>;
