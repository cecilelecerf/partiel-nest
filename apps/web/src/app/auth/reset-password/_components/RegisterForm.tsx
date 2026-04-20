"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiPost } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MailIcon, SaveIcon } from "lucide-react";
import { userSchema } from "@/types/users.schema";
import z from "zod";
import { useState } from "react";

const userFormSchema = userSchema
  .pick({
    password: true,
  })
  .extend({ confirmPassword: userSchema.shape.password })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type UserFormType = z.infer<typeof userFormSchema>;

export const UserForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(userFormSchema),
  });

  const onSubmit = async (data: UserFormType) => {
    await apiPost(`/auth/reset-password?token=${token}`, data);
    router.push("/auth/login");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Mot de passe</Label>
        <Input
          {...register("password")}
          type="password"
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Confirmation du mot de passe</Label>
        <Input
          {...register("confirmPassword")}
          type="password"
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <Button type="submit" className="w-full">
        <SaveIcon /> Réinitialisé le mot de passe
      </Button>
    </form>
  );
};
