// import { getCurrentUser } from "@/lib/auth";
// import { redirect } from "next/navigation";
// import LoginClient from "./login-client";

// export default async function LoginPage() {
//   const user = await getCurrentUser();

//   if (user) {
//     redirect("/dashboard");
//   }

//   return <LoginClient />;
// }

import { GalleryVerticalEnd } from "lucide-react";
import LoginClient from "./login-client";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* BRAND */}
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          DLAR System
        </a>

        {/* LOGIN FORM */}
        <LoginClient />
      </div>
    </div>
  );
}
