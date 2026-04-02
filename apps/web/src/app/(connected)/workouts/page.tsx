import { apiGet } from "@/lib/api.server"
import { WorkoutWithMeta, workoutWithMetaSchema } from "@/types/workouts.schema"
import { WorkoutCard } from "./_components/WorkoutCard"

export default async function MyExercicesPage() {
    const workouts = await apiGet<WorkoutWithMeta[]>("/workouts").then((data) => workoutWithMetaSchema.array().parse(data))

    return (
        <>
            <h1 className="font-bold mb-4 text-3xl">Mes entraînements</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {workouts.map((workout) => <WorkoutCard key={workout.id} {...workout} />)}
            </div>
        </>
    )
}