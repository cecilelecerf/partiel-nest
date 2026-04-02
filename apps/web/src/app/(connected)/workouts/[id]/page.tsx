import { apiGet } from "@/lib/api.server";
import { WorkoutWithExercice, workoutWithExerciceSchema } from "@/types/workouts.schema";
import { CardExercice } from "../../search/_components/CardExercice";

export default async function MyExercicePage() {
    const { date, workoutExercice } = await apiGet<WorkoutWithExercice>(`/workouts/${1}`)
        .then((data) => workoutWithExerciceSchema.parse(data))

    return (
        <>
            <h1 className="font-bold mb-4 text-3xl">
                {date.toLocaleDateString('fr-FR', {
                    dateStyle: 'full',
                })}
            </h1>
            <div className="space-y-12">
                {workoutExercice.map((we) =>
                    <CardExercice key={we.exercice.id} {...we.exercice} workoutExercice={we} />
                )}
            </div>

        </>
    )
}