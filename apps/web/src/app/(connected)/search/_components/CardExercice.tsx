"use client";
import { CardWrapper } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exercice, ExerciceId } from "@/types/exercices.schema";
import { Dot, Plus, XIcon } from "lucide-react";
import { WorkoutExerciceForm } from "./WorkoutExercice";
import { WorkoutExercice as TWorkoutExercice } from "@/types/workoutExercices.schema";
import { useWorkoutDraft } from "@/stores/useWorkoutDraft";

type Props = Exercice & {
  workoutExercice?: Partial<TWorkoutExercice>;
  onChangeWorkoutExercice?: (data: Partial<TWorkoutExercice>) => void;
  withActive?: boolean;
};

const SecondaryMuscles = ({ muscles }: { muscles: string[] }) => (
  <div className="flex items-center gap-2">
    <p className="text-xs">Muscles secondaires travaillés :</p>
    <div className="flex gap-1 flex-wrap">
      {muscles.map((muscle, i) => (
        <div key={i} className="flex items-center gap-1">
          <p className="text-xs">{muscle}</p>
          {i !== muscles.length - 1 && <Dot size={10} strokeWidth={4} />}
        </div>
      ))}
    </div>
  </div>
);

export const CardExercice = ({
  name,
  description,
  type,
  equipment,
  muscleGroup,
  secondaryMuscles,
  workoutExercice,
  id,
  onChangeWorkoutExercice,
  withActive,
}: Props) => {
  const { toggle, ids } = useWorkoutDraft();
  const isSelected = ids.includes(id as ExerciceId);
  const isWorkoutMode = !!workoutExercice && !!onChangeWorkoutExercice;

  return (
    <CardWrapper enabeldHover={isWorkoutMode} active={isSelected && withActive}>
      <div className="flex flex-col justify-between gap-2 h-full">
        <div>
          <div className="flex justify-between">
            <p className="font-bold text-lg">{name}</p>
            <Badge variant="secondary">{type}</Badge>
          </div>
          <p>{description}</p>
        </div>

        <div className="mb-2">
          <div className="flex items-center gap-2">
            <p className="text-xs">Muscle principal travaillé :</p>
            <p className="font-bold text-xs">{muscleGroup}</p>
          </div>
          {secondaryMuscles?.length > 0 && (
            <SecondaryMuscles muscles={secondaryMuscles} />
          )}
        </div>

        <div>
          {isWorkoutMode && (
            <WorkoutExerciceForm
              workoutExercice={workoutExercice}
              onChange={onChangeWorkoutExercice}
            />
          )}
          <div className="flex justify-between border-t pt-2 items-center">
            <p className="text-xs">Équipement requis : {equipment}</p>
            {!isWorkoutMode && (
              <Button
                className="font-bold"
                variant="secondary"
                size="xs"
                onClick={(e) => {
                  e.stopPropagation();
                  toggle(id as ExerciceId);
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
            )}
          </div>
        </div>
      </div>
    </CardWrapper>
  );
};
