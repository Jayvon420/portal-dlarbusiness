// "use client";

// import Link from "next/link";
// import {
//   SidebarGroup,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// export function NavMain({
//   items,
// }: {
//   items: {
//     title: string;
//     url: string;
//     icon?: React.ReactNode;
//   }[];
// }) {
//   return (
//     <SidebarGroup>
//       <SidebarGroupLabel>Platform</SidebarGroupLabel>

//       <SidebarMenu>
//         {items.map((item) => (
//           <SidebarMenuItem key={item.title}>
//             <SidebarMenuButton asChild tooltip={item.title}>
//               <Link href={item.url}>
//                 {item.icon}
//                 <span>{item.title}</span>
//               </Link>
//             </SidebarMenuButton>
//           </SidebarMenuItem>
//         ))}
//       </SidebarMenu>
//     </SidebarGroup>
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
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { BanknoteArrowDown } from "lucide-react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    group?: string;
  }[];
}) {
  const accounting = items.filter((i) => i.group === "accounting");
  const others = items.filter((i) => i.group !== "accounting");

  return (
    <>
      {/* ================= ACCOUNTING ================= */}
      <SidebarGroup>
        <SidebarGroupLabel>Platform</SidebarGroupLabel>

        <SidebarMenu>
          <SidebarMenuItem>
            {/* MAIN PARENT ITEM (THIS IS WHAT SHOWS ICON ON COLLAPSE) */}
            <SidebarMenuButton tooltip="Accounting">
              <BanknoteArrowDown />
              <span>Accounting</span>
            </SidebarMenuButton>

            {/* SUB ITEMS */}
            <SidebarMenuSub>
              {accounting.map((item) => (
                <SidebarMenuSubItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <Link href={item.url}>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      {/* ================= OTHER ITEMS ================= */}
      <SidebarGroup>
        <SidebarGroupLabel>System</SidebarGroupLabel>

        <SidebarMenu>
          {others.map((item) => (
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
    </>
  );
}
