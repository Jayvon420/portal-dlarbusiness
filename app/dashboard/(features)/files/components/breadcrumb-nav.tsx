import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type FolderPath = {
  id: string;
  name: string;
};

export default function BreadcrumbNav({ path = [] }: { path?: FolderPath[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* ROOT */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/dashboard/files">My Drive</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* PATH */}
        {path.map((folder, index) => (
          <span key={folder.id} className="flex items-center">
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/dashboard/files/${folder.id}`}>
                  {folder.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </span>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
