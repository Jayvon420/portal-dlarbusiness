// "use client";

// import { ThemeToggle } from "@/components/theme-toggle";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="h-screen flex flex-col bg-muted overflow-hidden">
//       {/* NAVBAR */}
//       <header className="w-full border-b bg-background shrink-0">
//         <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
//           {/* Brand */}
//           <div className="text-sm font-semibold tracking-tight">
//             DLAR System
//           </div>

//           {/* Theme Toggle */}
//           <ThemeToggle />
//         </div>
//       </header>

//       {/* MAIN CONTENT (fills remaining space) */}
//       <main className="flex flex-1 items-center justify-center px-4 overflow-auto">
//         <div className="w-full max-w-md">{children}</div>
//       </main>

//       {/* FOOTER */}
//       <footer className="border-t bg-background shrink-0">
//         <div className="mx-auto flex h-12 max-w-6xl items-center justify-center text-xs text-muted-foreground">
//           © {new Date().getFullYear()} DLAR • All rights reserved
//         </div>
//       </footer>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex flex-col bg-muted overflow-hidden">
      {/* NAVBAR */}
      <header className="w-full border-b bg-background shrink-0">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          {/* BRAND */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition"
          >
            <Image
              src="/dlar.jpg"
              alt="DLAR Logo"
              width={26}
              height={26}
              className="rounded-md object-cover"
            />

            <div className="text-sm font-semibold tracking-tight">
              DLAR System
            </div>
          </Link>

          <ThemeToggle />
        </div>
      </header>

      {/* MAIN CONTENT (NO SCROLL) */}
      <main className="flex flex-1 items-center justify-center px-4 overflow-hidden">
        <div className="w-full flex items-center justify-center">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t bg-background shrink-0">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} DLAR • All rights reserved
        </div>
      </footer>
    </div>
  );
}
