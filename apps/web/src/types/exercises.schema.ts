import z from "zod";
export const exerciseIdSchema = z.number().nonnegative().brand("exercise");
export type ExerciseId = z.infer<typeof exerciseIdSchema>;
const exerciseTypeEnumSchema = z.enum([
  "STRENGTH",
  "CARDIO",
  "MOBILITY",
  "HYPERTROPHY",
]);
const equipmentEnumSchema = z.enum([
  "DUMBBELL",
  "BARBELL",
  "MACHINE",
  "BODYWEIGHT",
  "KETTLEBELL",
]);
export const exerciseSchema = z.object({
  id: exerciseIdSchema,
  name: z.string(),
  description: z.string().optional(),
  muscleGroup: z.string(),
  secondaryMuscles: z.array(z.string()),
  type: exerciseTypeEnumSchema,
  equipment: equipmentEnumSchema,
  tutorialUrl: z.url().nullable().optional(),
});
export type Exercise = z.infer<typeof exerciseSchema>;

export const exerciseFormSchema = exerciseSchema.omit({ id: true });
export type ExerciseForm = z.infer<typeof exerciseFormSchema>;
