import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dumbbell, ShieldCheck, Mail, ChartBar } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 space-y-16">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Suivez vos entraînements,
          <br />
          <span className="text-primary">atteignez vos objectifs</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto">
          Une application simple pour créer et gérer vos séances de sport,
          suivre vos exercices et mesurer vos progrès.
        </p>
        <div className="flex gap-3 justify-center pt-2">
          <Button asChild>
            <Link href="/auth/login">Commencer</Link>
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Fonctionnalités</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Feature
            icon={Dumbbell}
            title="Catalogue d'exercices"
            description="Accédez à une liste d'exercices classés par groupe musculaire, type et équipement."
          />
          <Feature
            icon={ChartBar}
            title="Suivi des séances"
            description="Créez vos séances, ajoutez des exercices et enregistrez vos séries, répétitions et durées."
          />
          <Feature
            icon={Mail}
            title="Authentification sécurisée"
            description="Inscription avec validation par email et connexion à double facteur via code OTP."
          />
          <Feature
            icon={ShieldCheck}
            title="Espace admin"
            description="Les administrateurs peuvent gérer les exercices et les utilisateurs de la plateforme."
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">Comptes de démonstration</h2>
          <p className="text-sm text-muted-foreground">
            Utilisez ces identifiants pour tester l&apos;application. Le mot de
            passe OTP est envoyé par email via Mailhog.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Credential
            label="Utilisateur"
            email="user@example.com"
            password="Password123!"
            role="USER"
          />
          <Credential
            label="Administrateur"
            email="admin@example.com"
            password="Password123!"
            role="ADMIN"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          <a href="http://localhost:8025" target="_blank" className="underline">
            localhost:8025
          </a>
          pour récupérer le code OTP.
        </p>
      </div>
    </div>
  );
}
const Feature = ({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  <div className="space-y-2 p-4 rounded-xl border bg-card">
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
      <Icon size={16} className="text-primary" />
    </div>
    <p className="font-medium">{title}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

const Credential = ({
  label,
  email,
  password,
  role,
}: {
  label: string;
  email: string;
  password: string;
  role: string;
}) => (
  <div className="p-4 rounded-xl border bg-card space-y-2">
    <div className="flex justify-between items-center">
      <p className="font-medium">{label}</p>
      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
        {role}
      </span>
    </div>
    <div className="space-y-1 font-mono text-sm">
      <p className="text-muted-foreground">
        <span className="text-foreground">Email :</span> {email}
      </p>
      <p className="text-muted-foreground">
        <span className="text-foreground">Mot de passe :</span> {password}
      </p>
    </div>
  </div>
);
