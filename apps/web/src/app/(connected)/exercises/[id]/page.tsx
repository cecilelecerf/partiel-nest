import { apiGet } from "@/lib/api.server";
import { Exercise, exerciseSchema } from "@/types/exercises.schema";
import Link from "next/link";

export const TYPE_LABELS: Record<Exercise["type"], string> = {
  STRENGTH: "Force",
  CARDIO: "Cardio",
  MOBILITY: "Mobilité",
  HYPERTROPHY: "Hypertrophie",
};

export const EQUIPMENT_LABELS: Record<Exercise["equipment"], string> = {
  DUMBBELL: "Haltères",
  BARBELL: "Barre",
  MACHINE: "Machine",
  BODYWEIGHT: "Poids de corps",
  KETTLEBELL: "Kettlebell",
};

export const TYPE_STYLES: Record<Exercise["type"], string> = {
  STRENGTH: "bg-blue-50 text-blue-800",
  CARDIO: "bg-green-50 text-green-800",
  MOBILITY: "bg-teal-50 text-teal-800",
  HYPERTROPHY: "bg-purple-50 text-purple-800",
};

export const EQUIPMENT_STYLES: Record<Exercise["equipment"], string> = {
  DUMBBELL: "bg-amber-50 text-amber-800",
  BARBELL: "bg-violet-50 text-violet-800",
  MACHINE: "bg-slate-100 text-slate-700",
  BODYWEIGHT: "bg-emerald-50 text-emerald-800",
  KETTLEBELL: "bg-orange-50 text-orange-800",
};

export default async function ExerciseDetail() {
  const exercise = await apiGet(`/exercises/1`).then((data) =>
    exerciseSchema.parse(data),
  );
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h1 className="text-xl font-medium text-foreground">
            {exercise.name}
          </h1>
          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md ${TYPE_STYLES[exercise.type]}`}
            >
              {TYPE_LABELS[exercise.type]}
            </span>
            <span
              className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md ${EQUIPMENT_STYLES[exercise.equipment]}`}
            >
              {EQUIPMENT_LABELS[exercise.equipment]}
            </span>
          </div>
        </div>

        {exercise.tutorialUrl && (
          <Link
            href={exercise.tutorialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            Tutoriel
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </Link>
        )}
      </div>

      <hr className="border-border" />

      {exercise.description && (
        <div className="space-y-1.5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Description
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {exercise.description}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-muted rounded-lg px-4 py-3 space-y-0.5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Muscle principal
          </p>
          <p className="text-sm font-medium text-foreground">
            {exercise.muscleGroup}
          </p>
        </div>
        <div className="bg-muted rounded-lg px-4 py-3 space-y-0.5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Type
          </p>
          <p className="text-sm font-medium text-foreground">
            {TYPE_LABELS[exercise.type]}
          </p>
        </div>
        <div className="bg-muted rounded-lg px-4 py-3 space-y-0.5">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Équipement
          </p>
          <p className="text-sm font-medium text-foreground">
            {EQUIPMENT_LABELS[exercise.equipment]}
          </p>
        </div>
      </div>

      {exercise.secondaryMuscles.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Muscles secondaires
          </p>
          <div className="flex flex-wrap gap-2">
            {exercise.secondaryMuscles.map((muscle) => (
              <span
                key={muscle}
                className="text-xs px-2.5 py-1 rounded-md border border-border bg-background text-muted-foreground"
              >
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
