import { apiGet } from "@/lib/api.server"

export default function MyExercicesPage() {
    const exercices = apiGet("/exercices")
    console.log(exercices)
    return <>

    </>
}