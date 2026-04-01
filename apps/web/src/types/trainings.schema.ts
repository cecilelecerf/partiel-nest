import z from "zod";
export const exerciceIdSchema = z.number().brand("exercice");

const exerciseTypeEnumSchema = z.enum([
  "STRENGTH",
  "CARIO",
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
  tutorialUrl: z.url(),
});
export type Training = z.infer<typeof exerciceSchema>;
