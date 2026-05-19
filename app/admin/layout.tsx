import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
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
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // 🔐 AUTH GUARD
  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        {/* ✅ PASS USER HERE */}
        <AdminSidebar user={user} />

        <SidebarInset>
          {/* HEADER */}
          <header className="flex h-16 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />

              <Separator orientation="vertical" className="mr-2 h-4" />

              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">
                      Welcome Admin {user.firstName ?? "System"}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="flex items-center gap-2 px-4">
              <ThemeToggle />
            </div>
          </header>

          {/* CONTENT */}
          <div className="flex flex-1 flex-col p-4">
            {children}

            <Toaster richColors position="top-right" />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
