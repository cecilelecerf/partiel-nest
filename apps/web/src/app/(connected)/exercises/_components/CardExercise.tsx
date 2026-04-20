"use client";
import { CardWrapper } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exercise, ExerciseId } from "@/types/exercises.schema";
import { Plus, XIcon } from "lucide-react";
import { WorkoutExerciseForm } from "./WorkoutExercise";
import { WorkoutExercise as TWorkoutExercise } from "@/types/workoutExercises.schema";
import { useWorkoutDraft } from "@/stores/useWorkoutDraft";
import { EQUIPMENT_LABELS, TYPE_LABELS } from "../[id]/page";

type CardExerciseProps = Exercise & {
  resume?: boolean;
  draft?: boolean;
  interactive?: boolean;
  onCardClick?: () => void;
  workoutExercise?: Partial<TWorkoutExercise>;
  onChangeWorkoutExercise?: (data: Partial<TWorkoutExercise>) => void;
};

export const CardExercise = ({
  id,
  draft,
  type,
  description,
  resume,
  muscleGroup,
  secondaryMuscles,
  interactive,
  name,
  equipment,
  workoutExercise,
  onChangeWorkoutExercise,
  onCardClick,
}: CardExerciseProps) => {
  const { toggle, ids } = useWorkoutDraft();
  const isSelected = ids.includes(id as ExerciseId);

  return (
    <CardWrapper
      interactive={interactive || !!onCardClick}
      selected={isSelected && draft}
      onClick={onCardClick}
    >
      <div className="flex flex-col justify-between gap-2 h-full">
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-lg">{name}</p>
            <Badge variant="secondary">{TYPE_LABELS[type]}</Badge>
          </div>
          {!resume && <p className="text-sm">{description}</p>}
        </div>

        <MuscleGroups
          primary={muscleGroup}
          secondary={resume ? undefined : secondaryMuscles}
        />

        <div>
          {workoutExercise && onChangeWorkoutExercise && (
            <WorkoutExerciseForm
              workoutExercise={workoutExercise}
              onChange={onChangeWorkoutExercise}
            />
          )}
          {!resume && (
            <div className="flex justify-between border-t pt-2 items-center">
              <p className="text-xs">
                Équipement: {EQUIPMENT_LABELS[equipment]}
              </p>
              {draft && (
                <DraftButton
                  isSelected={isSelected}
                  onToggle={() => toggle(id as ExerciseId)}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
};

const MuscleTag = ({
  label,
  variant = "primary",
}: {
  label: string;
  variant?: "primary" | "secondary";
}) => (
  <span
    className={`text-xs  px-2 py-0.5 rounded-full ${variant === "primary" ? "font-medium bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}
  >
    {label}
  </span>
);

const MuscleGroups = ({
  primary,
  secondary,
}: {
  primary: string;
  secondary?: string[];
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <p className="text-xs text-muted-foreground">Principal</p>
      <MuscleTag label={primary} />
    </div>
    {secondary && secondary.length > 0 && (
      <div className="flex gap-2 flex-wrap items-center">
        <p className="text-xs text-muted-foreground">Secondaires</p>
        {secondary.map((muscle) => (
          <MuscleTag key={muscle} label={muscle} variant="secondary" />
        ))}
      </div>
    )}
  </div>
);
const DraftButton = ({
  isSelected,
  onToggle,
}: {
  isSelected: boolean;
  onToggle: () => void;
}) => (
  <Button
    variant="secondary"
    size="xs"
    className="font-bold"
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
  >
    {isSelected ? (
      <>
        Supprimer de la séance <XIcon />
      </>
    ) : (
      <>
        Ajouter à la séance <Plus strokeWidth="2.5" />
      </>
    )}
  </Button>
);
