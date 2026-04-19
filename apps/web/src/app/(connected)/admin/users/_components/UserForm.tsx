"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiPatch, apiDelete } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SaveIcon, TrashIcon } from "lucide-react";
import { User, userSchema } from "@/types/users.schema";
import z from "zod";

const userFormSchema = userSchema.pick({ name: true, role: true });

type UserFormType = z.infer<typeof userFormSchema>;

export const UserForm = ({ user }: { user: User }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: user.name,
      role: user.role,
    },
  });

  const onSubmit = async (data: UserFormType) => {
    if (!session?.accessToken) return;
    await apiPatch(`/users/${user.id}`, data, session.accessToken);
  };

  const onDelete = async () => {
    if (!session?.accessToken) return;
    await apiDelete(`/users/${user.id}`, session.accessToken);
    router.push("/admin/users");
  };

  return (
    <div className="space-y-6 max-w-lg">
      <h1 className="text-2xl font-semibold">{user.name ?? "Sans nom"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label>Nom</Label>
          <Input {...register("name")} placeholder="John Doe" />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label>Rôle</Label>
          <select
            {...register("role")}
            className="w-full border rounded-md px-3 py-2 text-sm"
          >
            <option value="USER">Utilisateur</option>
            <option value="ADMIN">Administrateur</option>
          </select>
        </div>

        <div className="space-y-3 pt-2">
          <Button type="submit" className="w-full">
            <SaveIcon /> Sauvegarder
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={onDelete}
          >
            <TrashIcon /> Supprimer
          </Button>
        </div>
      </form>
    </div>
  );
};
