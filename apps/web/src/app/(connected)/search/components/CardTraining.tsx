import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Training } from "@/types/exercices.schema";
import { Dot, Plus } from "lucide-react";

export const CardTraining = ({ name, description, type, equipment, muscleGroup, secondaryMuscles }: Training) => {
    return (
        <div className="shadow rounded-xl p-2 px-4 flex flex-col justify-between gap-4 hover:scale-105 transition hover:shadow-lg active:translate-y-1">
            <div>

                <div className="flex justify-between">

                    <p className="font-bold text-lg">{name}</p>
                    <Badge variant="secondary">{type}</Badge>
                </div>
                <p >{description}</p>
            </div>
            <div>

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
            <div className="flex justify-between border-t pt-2 items-center">
                <p className="text-xs ">Équipement requit: {equipment}</p>
                <Button className="font-bold" variant="ghost" size="xs"> Ajouter à la séance <Plus strokeWidth="2.5" /></Button>

            </div>
        </div>
    )
}