import { apiGet } from "@/lib/api.server";
import { User, userSchema } from "@/types/users.schema";
import { UserForm } from "../_components/UserForm";

export default async function AdminUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await apiGet<User>(`/users/${id}`).then((data) =>
    userSchema.parse(data),
  );

  return <UserForm user={user} />;
}
