// import Link from "next/link";

// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbSeparator,
// } from "@/components/ui/breadcrumb";

// export default function BreadcrumbNav({
//   userId,
//   currentFolder,
// }: {
//   userId: string;
//   currentFolder?: {
//     name: string;
//   };
// }) {
//   return (
//     <Breadcrumb>
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink asChild>
//             <Link href={`/admin/users/${userId}/files`}>Workspace</Link>
//           </BreadcrumbLink>
//         </BreadcrumbItem>

//         {currentFolder && (
//           <>
//             <BreadcrumbSeparator />

//             <BreadcrumbItem>
//               <BreadcrumbLink>{currentFolder.name}</BreadcrumbLink>
//             </BreadcrumbItem>
//           </>
//         )}
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// }

import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function BreadcrumbNav({
  userId,
  path = [],
}: {
  userId: string;
  path?: { id: string; name: string }[];
}) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* ROOT */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={`/admin/users/${userId}/files`}>Workspace</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* DYNAMIC PARENTS */}
        {path.map((folder) => (
          <div key={folder.id} className="flex items-center">
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/admin/users/${userId}/files/${folder.id}`}>
                  {folder.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
