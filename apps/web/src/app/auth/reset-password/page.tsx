import { redirect } from "next/navigation";
import { UserForm } from "./_components/RegisterForm";

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  if (!token) redirect("/auth/login");
  return <UserForm token={token} />;
}
