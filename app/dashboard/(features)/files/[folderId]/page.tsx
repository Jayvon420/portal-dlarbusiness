import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { getFolderPath } from "@/lib/get-folder-path";

import FolderGrid from "../components/folder-grid";
import FileGrid from "../components/file-grid";
import BreadcrumbNav from "../components/breadcrumb-nav";

export default async function FolderPage({
  params,
}: {
  params: Promise<{
    folderId: string;
  }>;
}) {
  const { folderId } = await params;

  const sessionUserId = await getUserId();

  if (!sessionUserId) {
    notFound();
  }

  // CURRENT FOLDER
  const folder = await prisma.folder.findFirst({
    where: {
      id: folderId,
      userId: sessionUserId,
      deletedAt: null,
    },
  });

  if (!folder) {
    notFound();
  }

  // GET REAL CHILD FOLDERS ONLY
  const folders = await prisma.folder.findMany({
    where: {
      parentId: folder.id,
      userId: sessionUserId,
      deletedAt: null,

      // IMPORTANT FIX
      NOT: {
        id: folder.id,
      },
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
    },
  });

  // FILES OF CURRENT FOLDER
  const files = await prisma.fileUpload.findMany({
    where: {
      folderId: folder.id,
      userId: sessionUserId,
      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
      url: true,
    },
  });

  const path = await getFolderPath(folder.id);

  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">{folder.name}</h1>

        <p className="text-muted-foreground mt-1">Folder contents</p>
      </div>

      {/* BREADCRUMB */}
      <BreadcrumbNav path={path} />

      {/* CONTENT */}
      {isEmpty ? (
        <div className="rounded-2xl border border-dashed p-16 text-center">
          <h2 className="text-lg font-semibold">Empty Folder</h2>

          <p className="text-sm text-muted-foreground mt-1">
            No files or folders inside.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* CHILD FOLDERS */}
          <FolderGrid folders={folders} />

          {/* FILES */}
          <FileGrid files={files} />
        </div>
      )}
    </div>
  );
}
