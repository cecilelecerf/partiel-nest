import z from "zod";
import { workoutExerciceSchema } from "./workoutExercices.schema";
import { exerciceSchema } from "./exercices.schema";

export const workoutIdSchema = z.number().nonnegative().brand("workout");
export const workoutSchema = z.object({
  id: workoutIdSchema,
  date: z.coerce.date(),
});
export type Workout = z.infer<typeof workoutSchema>;

export const workoutWithMetaSchema = workoutSchema.extend({
  _count: z.object({ workoutExercice: z.number().nonnegative() }),
  workoutExercice: workoutExerciceSchema
    .pick({ duration: true })
    .extend({
      exercice: exerciceSchema.pick({
        muscleGroup: true,
        type: true,
      }),
    })
    .array(),
});

export type WorkoutWithMeta = z.infer<typeof workoutWithMetaSchema>;

export const workoutWithExerciceSchema = workoutSchema.extend({
  _count: z.object({ workoutExercice: z.number().nonnegative() }),
  workoutExercice: workoutExerciceSchema
    .extend({ exercice: exerciceSchema })
    .array(),
});
export type WorkoutWithExercice = z.infer<typeof workoutWithExerciceSchema>;
