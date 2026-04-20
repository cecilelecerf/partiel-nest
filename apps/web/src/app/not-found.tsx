import { CardWrapper } from "@/components/Card";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <CardWrapper className="w-fit mx-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center">
          <SearchX />
        </div>
        <h2 className="font-bold">Page introuvable</h2>
        <p className="text-sm text-muted-foreground">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/">
          <Button>Return à l&apos;accueil</Button>
        </Link>
      </div>
    </CardWrapper>
  );
}
