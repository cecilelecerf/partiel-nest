"use client"
import { signOut, useSession } from "next-auth/react"
import { Button, buttonVariants } from "./ui/button"
import Link from "next/link"
import { VariantProps } from "class-variance-authority"
import { ReactNode } from "react"
import { BicepsFlexed, User } from "lucide-react"

export const HeaderComponent = () => {
    const { data: session } = useSession()

    return <header className="flex justify-between bg-gray-50/20 p-5 backdrop-blur-2xl sticky top-0">
        <h1 className="font-bold"><Link href="/">Gestion exercices</Link></h1>
        <nav className="flex gap-2 justify-end">
            {session ?
                <>

                    <LinkComponent label="Recherche" href="/search" />
                    <LinkComponent label="Mes entrainements" href="/my-exercices" />
                    <LinkComponent label={<BicepsFlexed />} href="/my-exercices/current" size="icon" />
                    <LinkComponent label={<User />} href="/profil" size="icon" />

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

const LinkComponent = ({ label, href, ...props }: { label: ReactNode, href: string, } & VariantProps<typeof buttonVariants>) => (
    <Button variant="link" {...props} asChild><Link href={href} >{label}</Link></Button>
)