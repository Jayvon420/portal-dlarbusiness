import { prisma } from "@/lib/prisma";

import FolderGrid from "./components/folder-grid";

import EmptyState from "./components/empty-state";

import CreateFolderDialog from "./components/create-folder-dialog";

import BreadcrumbNav from "./components/breadcrumb-nav";

export default async function FilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const folders = await prisma.folder.findMany({
    where: {
      userId: id,
      parentId: null,
      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">File Workspace</h1>

          <p className="text-muted-foreground mt-1">
            Organize folders and PDFs
          </p>
        </div>

        <CreateFolderDialog userId={id} />
      </div>

      <BreadcrumbNav userId={id} />

      {folders.length === 0 ? (
        <EmptyState />
      ) : (
        <FolderGrid folders={folders} userId={id} />
      )}
    </div>
  );
}
