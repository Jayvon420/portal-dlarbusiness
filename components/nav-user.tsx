"use client";

import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  ChevronsUpDownIcon,
  LogOutIcon,
  UserCog,
  KeyRound,
} from "lucide-react";

import { EditProfileDialog } from "@/app/dashboard/(features)/settings/edit-profile-dialog";
import { ChangePasswordDialog } from "@/app/dashboard/(features)/settings/change-password-dialog";

type User = {
  id: string;
  businessName: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();

  const [openProfile, setOpenProfile] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>
                    {user.firstName?.charAt(0) ?? "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="font-medium">{user.businessName}</span>
                  <span className="text-xs text-muted-foreground">
                    {fullName}
                  </span>
                </div>

                <ChevronsUpDownIcon className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
            >
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
                className="text-red-500"
                onClick={async () => {
                  await fetch("/api/auth/logout", { method: "POST" });
                  window.location.href = "/login";
                }}
              >
                <LogOutIcon className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

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
