import z from "zod";

export const workoutExerciceIdSchema = z
  .number()
  .nonnegative()
  .brand("workout-exercice");
export const workoutExerciceSchema = z.object({
  id: workoutExerciceIdSchema,
  duration: z.number().positive().optional(),
  sets: z.number().positive().optional(),
  reps: z.number().positive().optional(),
});

export type WorkoutExercice = z.infer<typeof workoutExerciceSchema>;

export const workoutExerciceFormSchema = workoutExerciceSchema.omit({
  id: true,
});
export type WorkoutExerciceForm = z.infer<typeof workoutExerciceFormSchema>;
