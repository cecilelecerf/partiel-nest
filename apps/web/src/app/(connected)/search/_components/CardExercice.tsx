import { CardWrapper } from "@/components/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Exercice } from "@/types/exercices.schema";
import { Dot, Plus } from "lucide-react";
import { WorkoutExerciceForm } from "./WorkoutExerciceForm";
import { WorkoutExercice as TWorkoutExercice } from "@/types/workoutExercices.schema";

export const CardExercice = (
    { name, description, type, equipment, muscleGroup, secondaryMuscles, workoutExercice }:
        Exercice & { workoutExercice?: TWorkoutExercice }
) => {
    return (
        <CardWrapper enabeldHover={!!workoutExercice}>
            <div className="flex flex-col justify-between gap-2 h-full">
                <div>
                    <div className="flex justify-between">
                        <p className="font-bold text-lg">{name}</p>
                        <Badge variant="secondary">{type}</Badge>
                    </div>
                    <p >{description}</p>
                </div>
                <div className="mb-2">
                    <div className="flex items-center gap-2">
                        <p className="text-xs">Muscle principale travaillé:</p>
                        <p className="font-bold text-xs">{muscleGroup}</p>
                    </div>
                    {secondaryMuscles && (
                        <div className="flex items-center gap-2">
                            <p className="text-xs">Muscle secondaire travaillé:</p>
                            <div className="flex gap-1 flex-wrap">
                                {secondaryMuscles.map((muscleName, i) =>
                                    <div key={i} className="flex items-center gap-1">
                                        <p className="text-xs">{muscleName}</p>
                                        {i !== secondaryMuscles.length - 1 && <Dot size={10} strokeWidth={4} />}
                                    </div>
                                )}
                            </div>
                        </div>)}
                </div>
                <div>
                    {workoutExercice && (
                        <WorkoutExerciceForm workoutExercice={workoutExercice} />
                    )}
                    <div className="flex justify-between border-t pt-2 items-center">
                        <p className="text-xs ">Équipement requit: {equipment}</p>
                        <Button className="font-bold" variant="ghost" size="xs"> Ajouter à la séance <Plus strokeWidth="2.5" /></Button>
                    </div>
                </div>
            </div>
        </CardWrapper>
    )
}