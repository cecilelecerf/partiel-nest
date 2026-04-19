import { apiGet } from "@/lib/api.server";
import { Exercice, exerciceSchema } from "@/types/exercices.schema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CardExercice } from "../../search/_components/CardExercice";

export default async function AdminExercicesPage() {
  const exercices = await apiGet<Exercice[]>("/exercices").then((data) =>
    exerciceSchema.array().parse(data),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Exercices</h1>
        <Button asChild size="sm">
          <Link href="/admin/exercices/create">
            <Plus /> Ajouter
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-6">
        {exercices.map((exercice) => (
          <Link key={exercice.id} href={`/admin/exercices/${exercice.id}`}>
            <CardExercice key={exercice.id} {...exercice} resume interactive />
          </Link>
        ))}
      </div>
    </div>
  );
}
