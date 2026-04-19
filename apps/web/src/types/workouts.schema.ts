import z from "zod";
import { exerciseIdSchema, exerciseSchema } from "./exercises.schema";
import { workoutExerciseSchema } from "./workoutExercises.schema";

export const workoutIdSchema = z.number().nonnegative().brand("workout");
export const workoutSchema = z.object({
  id: workoutIdSchema,
  date: z.coerce.date(),
});
export type Workout = z.infer<typeof workoutSchema>;

export const workoutWithMetaSchema = workoutSchema.extend({
  _count: z.object({ workoutExercise: z.number().nonnegative() }),
  workoutExercise: workoutExerciseSchema
    .pick({ duration: true })
    .extend({
      exercise: exerciseSchema.pick({
        muscleGroup: true,
        type: true,
      }),
    })
    .array(),
});

export type WorkoutWithMeta = z.infer<typeof workoutWithMetaSchema>;
export const workoutWithExerciseIdSchema = workoutSchema.extend({
  workoutExercise: workoutExerciseSchema
    .extend({ exerciseId: exerciseIdSchema })
    .array(),
});
export type WorkoutWithExerciseId = z.infer<typeof workoutWithExerciseIdSchema>;

export const workoutWithExerciseSchema = workoutSchema.extend({
  workoutExercise: workoutExerciseSchema
    .extend({ exercise: exerciseSchema })
    .array(),
});
export const workoutWithExerciseWithMetaSchema =
  workoutWithExerciseSchema.extend({
    _count: z.object({ workoutExercise: z.number().nonnegative() }),
  });
export type WorkoutWithExerciseWithMeta = z.infer<
  typeof workoutWithExerciseWithMetaSchema
>;
