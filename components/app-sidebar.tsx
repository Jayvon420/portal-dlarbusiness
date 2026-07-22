"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuAction,
  SidebarGroup,
  SidebarGroupLabel,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  ChevronDown,
  BanknoteArrowDown,
  HandCoins,
  FolderIcon,
  Calculator,
} from "lucide-react";

import Link from "next/link";
import { AppLogo } from "@/components/app-logo";
import { NavUser } from "@/components/nav-user";

/* ================= DATA ================= */
const data = {
  app: {
    name: "DLAR Business HUB",
    logo: (
      <img
        src="/dlar-logo.png"
        alt="Logo"
        className="size-full rounded-sm object-cover"
      />
    ),
    subtitle: "Business Management System",
    href: "/dashboard",
  },

  accounting: [
    { title: "Sales", url: "/dashboard/sales" },
    { title: "Purchased", url: "/dashboard/purchase" },
    { title: "Expenses", url: "/dashboard/expenses" },
  ],

  navMain: [
    { title: "Payroll", url: "/dashboard/payroll", icon: <HandCoins /> },
    { title: "Business Vault", url: "/dashboard/files", icon: <FolderIcon /> },
    {
      title: "Income Statement",
      url: "/dashboard/income",
      icon: <Calculator />,
    },
  ],
};

/* ================= SIDEBAR ================= */
export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & { user: any }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  const [openAccounting, setOpenAccounting] = React.useState(true);

  React.useEffect(() => {
    if (isMobile) setOpenMobile(false);
  }, [pathname, isMobile, setOpenMobile]);

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* HEADER */}
      <SidebarHeader>
        <AppLogo {...data.app} />
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>

          <SidebarMenu>
            {/* ================= ACCOUNTING ================= */}
            <SidebarMenuItem>
              {/* WHOLE ROW CLICKABLE */}
              <SidebarMenuButton
                tooltip="Accounting"
                onClick={() => setOpenAccounting((v) => !v)}
              >
                <BanknoteArrowDown />
                <span>Accounting</span>
              </SidebarMenuButton>

              {/* ICON ONLY VISUAL INDICATOR (NOT CLICKABLE) */}
              <SidebarMenuAction className="pointer-events-none">
                <ChevronDown
                  className={`transition-transform ${
                    openAccounting ? "rotate-180" : ""
                  }`}
                />
              </SidebarMenuAction>

              {/* SUB MENU */}
              {openAccounting && (
                <SidebarMenuSub>
                  {data.accounting.map((item) => (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link href={item.url}>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* ================= NORMAL NAV ================= */}
        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>

          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title}>
                  <Link href={item.url}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter>
        <NavUser
          user={{
            id: user?.id,
            businessName: user?.businessName,
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            avatar: "/124599.jpg",
          }}
        />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
