"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState(searchParams.get("name") ?? "");
  const [muscleGroup, setMuscleGroup] = useState(
    searchParams.get("muscleGroup") ?? "",
  );
  const [equipment, setEquipment] = useState(
    searchParams.get("equipment") ?? "",
  );
  const [type, setType] = useState(searchParams.get("type") ?? "");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (name) params.set("name", name);
    if (muscleGroup) params.set("muscleGroup", muscleGroup);
    if (equipment) params.set("equipment", equipment);
    if (type) params.set("type", type);
    router.push(`?${params.toString()}`);
  };

  const handleClear = () => {
    setName("");
    setMuscleGroup("");
    setEquipment("");
    setType("");
    router.push("/exercises");
  };

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="flex gap-2">
        <Input
          type="search"
          placeholder="Rechercher un exercice..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch}>Rechercher</Button>
      </div>
      <div className="flex gap-2 flex-wrap items-center">
        <Input
          placeholder="Groupe musculaire"
          value={muscleGroup}
          onChange={(e) => setMuscleGroup(e.target.value)}
          className="max-w-48"
        />
        <select
          value={equipment}
          onChange={(e) => setEquipment(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Tout équipement</option>
          <option value="DUMBBELL">Haltères</option>
          <option value="BARBELL">Barre</option>
          <option value="MACHINE">Machine</option>
          <option value="BODYWEIGHT">Poids du corps</option>
          <option value="KETTLEBELL">Kettlebell</option>
        </select>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Tout type</option>
          <option value="STRENGTH">Force</option>
          <option value="CARDIO">Cardio</option>
          <option value="MOBILITY">Mobilité</option>
          <option value="HYPERTROPHY">Hypertrophie</option>
        </select>
        <Button onClick={handleClear} variant="secondary" size="lg">
          Clear
        </Button>
      </div>
    </div>
  );
};
