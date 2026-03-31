"use client"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link"

export const HeaderComponent = () => {
    const { data: session } = useSession()

    return <header className="flex justify-between bg-gray-50/20 p-5 backdrop-blur-2xl sticky top-0">
        <h1 className="font-bold"><Link href="/">Gestion trainings</Link></h1>
        <nav className="flex gap-2 justify-end">
            {session ?
                <>

                    <LinkComponent label="Recherche" href="/search" />
                    <LinkComponent label="Mes entrainements" href="/my-trainings" />
                    <LinkComponent label="Profile" href="/profil" />
                    <Button onClick={() => signOut()}>Déconnexion</Button>
                </>
                :
                <>
                    <LinkComponent label="Accueil" href="/" />
                    <Button variant="secondary" asChild><Link href="/auth/login">Connexion</Link></Button>
                </>
            }
        </nav>
    </header>
}

const LinkComponent = ({ label, href }: { label: string, href: string }) => (
    <Button variant="link" asChild><Link href={href} >{label}</Link></Button>
)