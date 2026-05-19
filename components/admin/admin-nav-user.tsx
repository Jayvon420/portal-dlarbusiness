// "use client";

// import {
//   SidebarMenu,
//   SidebarMenuItem,
//   SidebarMenuButton,
// } from "@/components/ui/sidebar";

// import { LogOutIcon } from "lucide-react";

// export function AdminNavUser() {
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <SidebarMenuButton
//           onClick={async () => {
//             await fetch("/api/auth/logout", { method: "POST" });
//             window.location.href = "/login";
//           }}
//           className="text-red-500"
//         >
//           <LogOutIcon />
//           <span>Logout</span>
//         </SidebarMenuButton>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

"use client";

import Link from "next/link";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin</SidebarGroupLabel>

      <SidebarMenu>
        {items.map((item) => (
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
  );
}
