"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { AppLogo } from "@/components/app-logo";
import { AdminNavMain } from "@/components/admin/admin-nav-main";

import {
  LayoutDashboard,
  Users,
  Upload,
  Settings,
  LogOut,
  KeyRound,
  UserCog,
  ChevronsUpDown,
  ChevronsUpDownIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { EditProfileDialog } from "@/app/admin/(features)/settings/edit-profile-dialog";
import { ChangePasswordDialog } from "@/app/admin/(features)/settings/change-password-dialog";

const data = {
  app: {
    name: "Admin Panel",
    logo: (
      <img
        src="/dlar.jpg"
        alt="Logo"
        className="size-full rounded-sm object-cover"
      />
    ),
    subtitle: "System Control",
    href: "/admin",
  },

  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboard />,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: <Users />,
    },
    {
      title: "Uploads",
      url: "/admin/uploads",
      icon: <Upload />,
    },
  ],
};

export function AdminSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: any;
}) {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const { setOpenMobile } = useSidebar();

  const [openProfile, setOpenProfile] = React.useState(false);
  const [openPassword, setOpenPassword] = React.useState(false);

  React.useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile, setOpenMobile]);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  }

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        {/* HEADER */}
        <SidebarHeader>
          <AppLogo {...data.app} />
        </SidebarHeader>

        {/* MAIN NAVIGATION */}
        <SidebarContent>
          <AdminNavMain items={data.navMain} />
        </SidebarContent>

        {/* FOOTER */}
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                {/* 🔥 SETTINGS TRIGGER (LIKE NAVUSER BUTTON) */}
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="
                      data-[state=open]:bg-sidebar-accent
                      data-[state=open]:text-sidebar-accent-foreground
                    "
                  >
                    <Settings className="size-4" />
                    <span>Settings</span>
                    <ChevronsUpDownIcon className="ml-auto size-4" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                {/* 🔥 DROPDOWN CONTENT (NAVUSER STYLE) */}
                <DropdownMenuContent
                  className="min-w-56 w-(--radix-dropdown-menu-trigger-width) rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-2 font-normal">
                    <div className="text-sm font-medium">System Settings</div>
                    <div className="text-xs text-muted-foreground">
                      Manage account
                    </div>
                  </DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={() => setOpenProfile(true)}>
                      <UserCog className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => setOpenPassword(true)}>
                      <KeyRound className="mr-2 h-4 w-4" />
                      Change Password
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="
                    cursor-pointer
                    text-destructive
                    focus:bg-destructive/10
                    focus:text-destructive
                    data-highlighted:bg-destructive/10
                    data-highlighted:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4 text-current" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* DIALOGS */}
      <EditProfileDialog
        open={openProfile}
        onOpenChange={setOpenProfile}
        user={user}
      />

      <ChangePasswordDialog
        open={openPassword}
        onOpenChange={setOpenPassword}
      />
    </>
  );
}
