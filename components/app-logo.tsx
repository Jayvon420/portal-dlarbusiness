// "use client";

// import Link from "next/link";
// import {
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";

// export function AppLogo({
//   name,
//   logo,
//   subtitle,
//   href = "/dashboard",
// }: {
//   name: string;
//   logo: React.ReactNode;
//   subtitle?: string;
//   href?: string;
// }) {
//   return (
//     <SidebarMenu>
//       <SidebarMenuItem>
//         <SidebarMenuButton asChild size="lg">
//           <Link href={href}>
//             <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
//               {logo}
//             </div>

//             <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
//               <span className="truncate font-medium">{name}</span>

//               {subtitle && (
//                 <span className="truncate text-xs text-muted-foreground">
//                   {subtitle}
//                 </span>
//               )}
//             </div>
//           </Link>
//         </SidebarMenuButton>
//       </SidebarMenuItem>
//     </SidebarMenu>
//   );
// }

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
        <SidebarMenuButton
          asChild
          size="lg"
          className="
            group-data-[collapsible=icon]:justify-center
          "
        >
          <Link href={href}>
            {/* LOGO */}
            <div
              className="
                flex shrink-0 items-center justify-center
                size-9
                overflow-hidden
                rounded-lg
                bg-transparent
                dark:bg-white
                p-1
              "
            >
              {logo}
            </div>

            {/* TEXT */}
            <div
              className="
                grid flex-1 text-left text-sm leading-tight
                group-data-[collapsible=icon]:hidden
              "
            >
              <span className="truncate font-semibold">{name}</span>

              {subtitle && (
                <span className="truncate text-xs text-muted-foreground">
                  {subtitle}
                </span>
              )}

              <span
                className="
                  truncate
                  text-[10px]
                  italic
                  font-medium
                "
              >
                <span className="text-blue-500">Powered by DLAR PH</span>
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
