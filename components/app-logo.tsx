"use client";

import Link from "next/link";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppLogo({
  name,
  logo,
  subtitle,
  href = "/dashboard",
}: {
  name: string;
  logo: React.ReactNode;
  subtitle?: string;
  href?: string;
}) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild size="lg">
          <Link href={href}>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              {logo}
            </div>

            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
              <span className="truncate font-medium">{name}</span>

              {subtitle && (
                <span className="truncate text-xs text-muted-foreground">
                  {subtitle}
                </span>
              )}
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
