import { ExerciceId } from "@/types/exercices.schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type WorkoutDraftStore = {
  ids: ExerciceId[];
  add: (id: ExerciceId) => void;
  remove: (id: ExerciceId) => void;
  toggle: (id: ExerciceId) => void;
  clear: () => void;
};

export const useWorkoutDraft = create<WorkoutDraftStore>()(
  persist(
    (set, get) => ({
      ids: [],
      add: (id) => set((state) => ({ ids: [...state.ids, id] })),
      toggle: (id) =>
        get().ids.includes(id) ? get().remove(id) : get().add(id),
      remove: (removeId) =>
        set((state) => ({ ids: state.ids.filter((id) => id !== removeId) })),
      clear: () => set(() => ({ ids: [] })),
    }),
    { name: "workout_draft" },
  ),
);
