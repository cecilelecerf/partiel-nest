import { CardWrapper } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

export const Unauthorized = () => {
  return (
    <CardWrapper className="w-fit mx-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle />
        </div>
        <h2 className="font-bold">Accès refusé</h2>
        <p className="text-sm text-muted-foreground">
          Vous n&apos;avez pas les permissions nécessaires pour accéder à cette
          page.
        </p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </CardWrapper>
  );
};
