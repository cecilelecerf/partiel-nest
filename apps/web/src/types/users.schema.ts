import z from "zod";

export const userIdSchema = z.number().nonnegative().brand("user");
const userRoleSchema = z.enum(["USER", "ADMIN"]);
export const userSchema = z.object({
  id: userIdSchema,
  name: z.string().min(1, "Le nom est requis"),
  email: z.email("Email invalide"),
  role: userRoleSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type User = z.infer<typeof userSchema>;
