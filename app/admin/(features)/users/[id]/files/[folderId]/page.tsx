import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import FolderGrid from "../components/folder-grid";

import FileGrid from "../components/file-grid";

import EmptyState from "../components/empty-state";

import CreateFolderDialog from "../components/create-folder-dialog";

import FileUploadForm from "../components/file-upload-form";

import BreadcrumbNav from "../components/breadcrumb-nav";
import { getFolderPath } from "@/lib/get-folder-path";

export default async function FolderPage({
  params,
}: {
  params: Promise<{
    id: string;
    folderId: string;
  }>;
}) {
  const { id, folderId } = await params;

  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
      userId: id,
      deletedAt: null,
    },
  });

  if (!folder) {
    notFound();
  }

  const [folders, files] = await Promise.all([
    prisma.folder.findMany({
      where: {
        userId: id,
        parentId: folderId,
        deletedAt: null,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),

    prisma.fileUpload.findMany({
      where: {
        userId: id,
        folderId,
        deletedAt: null,
      },

      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const isEmpty = folders.length === 0 && files.length === 0;
  const path = await getFolderPath(folderId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          {/* <h1 className="text-3xl font-bold">{folder.name}</h1> */}
          <h1 className="text-3xl font-bold">Uploads</h1>

          <p className="text-muted-foreground mt-1">Folder workspace</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="w-full">
          <FileUploadForm userId={id} folderId={folderId} />
        </div>
      </div>
      <div>
        <CreateFolderDialog userId={id} parentId={folderId} />
      </div>

      {/* <BreadcrumbNav userId={id} currentFolder={folder} /> */}
      <BreadcrumbNav userId={id} path={path} />

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="space-y-6">
          <FolderGrid folders={folders} userId={id} />

          <FileGrid files={files} />
        </div>
      )}
    </div>
  );
}
