import { apiGet } from "@/lib/api.server";
import Link from "next/link";
import { User, userSchema } from "@/types/users.schema";
import { CardWrapper } from "@/components/Card";

export default async function AdminUsersPage() {
  const users = await apiGet<User[]>("/users").then((data) =>
    userSchema.array().parse(data),
  );

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Users</h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 xl:grid-cols-3 gap-6">
        {users.map((user) => (
          <Link key={user.id} href={`/admin/users/${user.id}`}>
            <CardWrapper
              interactive
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{user.name ?? "Sans nom"}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </div>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </CardWrapper>{" "}
          </Link>
        ))}
      </div>
    </div>
  );
}
