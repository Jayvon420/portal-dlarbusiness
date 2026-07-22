// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
// import "./globals.css";
// import { cn } from "@/lib/utils";
// import { Toaster } from "@/components/ui/sonner";
// import { ThemeProvider } from "next-themes";
// export const dynamic = "force-dynamic";
// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "Dlar System",
//   description:
//     "A secure client portal for managing tax, accounting, bookkeeping, and compliance services. Track your finances, access important documents, monitor filing deadlines, and communicate directly with your accountant—all in one place.",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html
//       lang="en"
//       className={cn("h-full antialiased", inter.variable)}
//       suppressHydrationWarning
//     >
//       <body className="min-h-full flex flex-col font-sans">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           {children}
//         </ThemeProvider>

//         <Toaster richColors position="top-right" />
//       </body>
//     </html>
//   );
// }

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "next-themes";
export const dynamic = "force-dynamic";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dlar System",
  description:
    "A secure client portal for managing tax, accounting, bookkeeping, and compliance services. Track your finances, access important documents, monitor filing deadlines, and communicate directly with your accountant—all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("h-full antialiased", inter.variable)}>
      <body className="min-h-full flex flex-col font-sans">
        {children}

        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
