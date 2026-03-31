"use client"
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function UserTest() {
    return <>oefjzefji
        <Button onClick={() => signOut()}>Déconexion</Button>
    </>
}