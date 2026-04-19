"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiDelete, apiPatch, apiPost } from "@/lib/api.client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, SaveIcon, TrashIcon, XIcon } from "lucide-react";
import {
  Exercise,
  ExerciseForm as TExerciseForm,
  exerciseFormSchema,
} from "@/types/exercises.schema";

export default function ExerciseForm({
  defaultValues,
}: {
  defaultValues?: Exercise;
}) {
  const { data: session } = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TExerciseForm>({
    resolver: zodResolver(exerciseFormSchema),
    defaultValues: {
      secondaryMuscles: [],
      ...defaultValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "secondaryMuscles" as never,
  });

  const onSubmit = async (data: TExerciseForm) => {
    if (!session?.accessToken) return;
    if (defaultValues) {
      await apiPatch(
        `/exercises/${defaultValues.id}`,
        data,
        session.accessToken,
      );
    } else {
      await apiPost("/exercises", data, session.accessToken);
      router.push("/admin/exercises");
    }
  };

  const onDelete = async () => {
    if (!session?.accessToken) return;

    if (!defaultValues) return;
    await apiDelete(`/exercises/${defaultValues.id}`, session.accessToken);
    router.push("/admin/exercises");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-lg">
      <div className="space-y-2">
        <Label>Nom</Label>
        <Input {...register("name")} placeholder="Squat" />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Input
          {...register("description")}
          placeholder="Description de l'exercise..."
        />
        {errors.description && (
          <p className="text-xs text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Groupe musculaire principal</Label>
        <Input {...register("muscleGroup")} placeholder="Jambes" />
        {errors.muscleGroup && (
          <p className="text-xs text-destructive">
            {errors.muscleGroup.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Muscles secondaires</Label>
        <div className="space-y-2">
          {fields.map((field, i) => (
            <div key={field.id} className="flex gap-2">
              <Input
                {...register(`secondaryMuscles.${i}`)}
                placeholder="Ex: Fessiers"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => remove(i)}
              >
                <XIcon size={16} />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => append("")}
          >
            <Plus size={16} /> Ajouter un muscle
          </Button>
          {errors.secondaryMuscles && (
            <p className="text-xs text-destructive">
              {errors.secondaryMuscles.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Type</Label>
        <select
          {...register("type")}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="STRENGTH">Force</option>
          <option value="CARDIO">Cardio</option>
          <option value="MOBILITY">Mobilité</option>
          <option value="HYPERTROPHY">Hypertrophie</option>
        </select>
        {errors.type && (
          <p className="text-xs text-destructive">{errors.type.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Équipement</Label>
        <select
          {...register("equipment")}
          className="w-full border rounded-md px-3 py-2 text-sm"
        >
          <option value="DUMBBELL">Haltères</option>
          <option value="BARBELL">Barre</option>
          <option value="MACHINE">Machine</option>
          <option value="BODYWEIGHT">Poids du corps</option>
          <option value="KETTLEBELL">Kettlebell</option>
        </select>
        {errors.equipment && (
          <p className="text-xs text-destructive">{errors.equipment.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Lien tutoriel</Label>
        <Input
          {...register("tutorialUrl")}
          placeholder="https://youtube.com/..."
        />

        {errors.tutorialUrl && (
          <p className="text-xs text-destructive">
            {errors.tutorialUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Button type="submit" className="w-full">
          <SaveIcon /> Sauvegarder
        </Button>
        {defaultValues && (
          <Button
            type="button"
            variant="destructive"
            className="w-full"
            onClick={onDelete}
          >
            <TrashIcon /> Supprimer
          </Button>
        )}
      </div>
    </form>
  );
}
