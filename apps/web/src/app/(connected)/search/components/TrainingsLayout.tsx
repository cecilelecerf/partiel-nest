import { Training } from "@/types/exercices.schema";
import { apiGet } from "../../../../lib/api.server"
import { CardTraining } from "./CardTraining";

export const ExercicesLayout = async () => {
    const exercices = await apiGet<Training[]>("/exercices");
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">{exercices.map((t) => <CardTraining key={t.id} {...t} />)}</div>
    )
}