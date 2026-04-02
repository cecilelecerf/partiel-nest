import { Exercice } from "@/types/exercices.schema";
import { apiGet } from "../../../../lib/api.server"
import { CardExercice } from "./CardExercice";

export const ExercicesLayout = async () => {
    const exercices = await apiGet<Exercice[]>("/exercices");
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">{exercices.map((t) => <CardExercice key={t.id} {...t} />)}</div>
    )
}