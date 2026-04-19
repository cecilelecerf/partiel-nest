"use client";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api.client";

type Stats = {
  totalWorkouts: number;
  totalDuration: number;
  uniqueExercices: number;
};

export default function ProfilPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    if (!session?.accessToken) return;
    apiGet<Stats>("/users/me/stats", session.accessToken).then(setStats);
  }, [session?.accessToken]);

  if (!session?.user) return <></>;
  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{session?.user.name}</h1>
        <p className="text-sm text-muted-foreground">{session?.user.email}</p>
      </div>

      {stats && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-secondary rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Entraînements</p>
            <p className="text-2xl font-medium">{stats.totalWorkouts}</p>
          </div>
          <div className="bg-secondary rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground">Durée totale</p>
            <p className="text-2xl font-medium">{stats.totalDuration} min</p>
          </div>
          <div className="bg-secondary rounded-lg p-4 space-y-1">
            <p className="text-xs text-muted-foreground">
              Exercices différents
            </p>
            <p className="text-2xl font-medium">{stats.uniqueExercices}</p>
          </div>
        </div>
      )}

      <Button variant="destructive" onClick={() => signOut()}>
        Déconnexion
      </Button>
    </div>
  );
}
