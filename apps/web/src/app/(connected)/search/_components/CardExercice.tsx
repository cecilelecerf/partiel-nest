"use client";
import { CardWrapper } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exercice, ExerciceId } from "@/types/exercices.schema";
import { Plus, XIcon } from "lucide-react";
import { WorkoutExerciceForm } from "./WorkoutExercice";
import { WorkoutExercice as TWorkoutExercice } from "@/types/workoutExercices.schema";
import { useWorkoutDraft } from "@/stores/useWorkoutDraft";
type DraftOptions = {
  button?: boolean;
  card?: boolean;
};

type CardExerciceProps = Exercice & {
  resume?: boolean;
  draft?: DraftOptions;
  interactive?: boolean;

  workoutExercice?: Partial<TWorkoutExercice>;
  onChangeWorkoutExercice?: (data: Partial<TWorkoutExercice>) => void;
};

export const CardExercice = ({
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
  workoutExercice,
  onChangeWorkoutExercice,
}: CardExerciceProps) => {
  const { toggle, ids } = useWorkoutDraft();
  const isSelected = ids.includes(id as ExerciceId);

  return (
    <CardWrapper
      interactive={draft?.card || interactive}
      selected={isSelected && draft?.card}
      onClick={() => draft?.card && toggle(id as ExerciceId)}
    >
      <div className="flex flex-col justify-between gap-2 h-full">
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-lg">{name}</p>
            <Badge variant="secondary">{type}</Badge>
          </div>
          {!resume && <p className="text-sm">{description}</p>}
        </div>

        <MuscleGroups
          primary={muscleGroup}
          secondary={resume ? undefined : secondaryMuscles}
        />

        <div>
          {workoutExercice && onChangeWorkoutExercice && (
            <WorkoutExerciceForm
              workoutExercice={workoutExercice}
              onChange={onChangeWorkoutExercice}
            />
          )}
          {!resume && (
            <div className="flex justify-between border-t pt-2 items-center">
              <p className="text-xs">Équipement requis : {equipment}</p>
              {draft?.button && (
                <DraftButton
                  isSelected={isSelected}
                  onToggle={() => toggle(id as ExerciceId)}
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
