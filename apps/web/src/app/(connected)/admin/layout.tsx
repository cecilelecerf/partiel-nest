import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "ADMIN") redirect("/");

  return (
    <div className="flex gap-8">
      <aside className="w-48 shrink-0 space-y-1">
        <p className="text-xs text-muted-foreground font-medium mb-3">
          Administration
        </p>
        <nav className="flex flex-col gap-1">
          <Link
            href="/admin/exercises"
            className="text-sm px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Exercises
          </Link>
          <Link
            href="/admin/users"
            className="text-sm px-3 py-2 rounded-md hover:bg-secondary transition-colors"
          >
            Utilisateurs
          </Link>
        </nav>
      </aside>
      <main className="flex-1">{children}</main>
    </div>
  );
}
