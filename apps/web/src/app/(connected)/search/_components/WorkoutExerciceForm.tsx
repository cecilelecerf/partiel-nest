"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { apiPatch } from "@/lib/api.client"
import { WorkoutExercice as TWorkoutExercice, WorkoutExerciceForm as TWorkoutExerciceForm, workoutExerciceFormSchema } from "@/types/workoutExercices.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { SaveIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

export const WorkoutExerciceForm = ({ workoutExercice }: { workoutExercice: TWorkoutExercice }) => {
    const { data: session } = useSession()
    const { register, handleSubmit } = useForm<TWorkoutExerciceForm>({
        resolver: zodResolver(workoutExerciceFormSchema),
        defaultValues: {
            reps: workoutExercice.reps,
            sets: workoutExercice.sets,
            duration: workoutExercice.duration,
        },
    })
    const onSubmit = (data: TWorkoutExerciceForm) => {
        if (session?.accessToken)
            apiPatch("/workouts/1", data, session?.accessToken)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-t pt-4 py-2 bg-gray-100/90 flex justify-between gap-10 px-6 flex-col sm:flex-row">
            <div className="flex justify-between sm:items-center gap-3 flex-col sm:flex-row  items-start">
                <div className="flex gap-2 items-end">
                    <Input
                        type="number"
                        {...register("reps", { valueAsNumber: true })}

                        placeholder="0"
                    />
                    <p className="text-sm h-fit">répétitions</p>
                </div>
                <div className="flex gap-2 items-end">
                    <Input
                        type="number"
                        {...register("duration", { valueAsNumber: true })}
                        placeholder="0"
                    />
                    <p className="text-sm h-fit">min</p>
                </div>
                <div className="flex gap-2 items-end">
                    <Input
                        type="number"
                        {...register("sets", { valueAsNumber: true })}
                        placeholder="0"
                    />
                    <p className="text-sm h-fit">séries</p>
                </div>
            </div>
            <Button type="submit"><SaveIcon /> Save</Button>
        </form>
    )
}