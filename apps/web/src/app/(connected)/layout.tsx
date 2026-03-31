import { HeaderComponent } from "@/components/HeaderComponent";
import { Button } from "@/components/ui/button";

export default function ConnectedLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <main>{children}</main>
        </>
    );
}
