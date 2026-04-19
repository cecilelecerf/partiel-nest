import z from "zod";
export const exerciceIdSchema = z.number().nonnegative().brand("exercice");
export type ExerciceId = z.infer<typeof exerciceIdSchema>;
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
export const exerciceSchema = z.object({
  id: exerciceIdSchema,
  name: z.string(),
  description: z.string().optional(),
  muscleGroup: z.string(),
  secondaryMuscles: z.array(z.string()),
  type: exerciseTypeEnumSchema,
  equipment: equipmentEnumSchema,
  tutorialUrl: z.url().nullable(),
});
export type Exercice = z.infer<typeof exerciceSchema>;
