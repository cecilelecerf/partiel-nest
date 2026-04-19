import z from "zod";
import { workoutExerciceSchema } from "./workoutExercices.schema";
import { exerciceIdSchema, exerciceSchema } from "./exercices.schema";

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
export const workoutWithExerciceIdSchema = workoutSchema.extend({
  workoutExercice: workoutExerciceSchema
    .extend({ exerciceId: exerciceIdSchema })
    .array(),
});
export type WorkoutWithExerciceId = z.infer<typeof workoutWithExerciceIdSchema>;

export const workoutWithExerciceSchema = workoutSchema.extend({
  workoutExercice: workoutExerciceSchema
    .extend({ exercice: exerciceSchema })
    .array(),
});
export const workoutWithExerciceWithMetaSchema =
  workoutWithExerciceSchema.extend({
    _count: z.object({ workoutExercice: z.number().nonnegative() }),
  });
export type WorkoutWithExerciceWithMeta = z.infer<
  typeof workoutWithExerciceWithMetaSchema
>;
