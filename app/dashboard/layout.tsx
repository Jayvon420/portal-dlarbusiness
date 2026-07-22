// import { AppSidebar } from "@/components/app-sidebar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
// } from "@/components/ui/breadcrumb";
// import { Separator } from "@/components/ui/separator";
// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { Toaster } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { getCurrentUser } from "@/lib/auth";

// import { ThemeToggle } from "@/components/theme-toggle"; // ✅ ADD THIS
// export const dynamic = "force-dynamic";

// export default async function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const user = await getCurrentUser();

//   return (
//     <TooltipProvider>
//       <SidebarProvider>
//         <AppSidebar user={user} />

//         <SidebarInset>
//           <header className="flex h-16 items-center gap-2">
//             <div className="flex items-center gap-2 px-4">
//               <SidebarTrigger className="-ml-1" />

//               <Separator orientation="vertical" className="mr-2 h-4" />

//               <Breadcrumb>
//                 <BreadcrumbList>
//                   <BreadcrumbItem>
//                     <BreadcrumbLink href="#">
//                       Welcome {user?.businessName ?? "Your Company"}
//                     </BreadcrumbLink>
//                   </BreadcrumbItem>
//                 </BreadcrumbList>
//               </Breadcrumb>
//             </div>
//             <div className="flex items-center gap-2 px-4">
//               <ThemeToggle />
//             </div>
//           </header>

//           <div className="flex flex-1 flex-col p-4">
//             {children}
//             <Toaster richColors position="top-right" />
//           </div>
//         </SidebarInset>
//       </SidebarProvider>
//     </TooltipProvider>
//   );
// }

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { getCurrentUser } from "@/lib/auth";

import { ThemeToggle } from "@/components/theme-toggle"; // ✅ ADD THIS
import { ThemeProvider } from "@/components/theme-providers";
export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar user={user} />

          <SidebarInset>
            <header className="flex h-16 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />

                <Separator orientation="vertical" className="mr-2 h-4" />

                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        Welcome {user?.businessName ?? "Your Company"}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="flex items-center gap-2 px-4">
                <ThemeToggle />
              </div>
            </header>

            <div className="flex flex-1 flex-col p-4">
              {children}
              <Toaster richColors position="top-right" />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
