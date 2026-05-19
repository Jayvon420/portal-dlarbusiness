import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginClient from "./login-client";

export default async function LoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <LoginClient />;
}
