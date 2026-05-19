import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

import FolderGrid from "./components/folder-grid";
import BreadcrumbNav from "./components/breadcrumb-nav";
import EmptyState from "./components/empty-state";

export default async function FilesPage() {
  const sessionUserId = await getUserId();

  if (!sessionUserId) {
    throw new Error("Unauthorized");
  }

  // ROOT FOLDERS ONLY
  const folders = await prisma.folder.findMany({
    where: {
      userId: sessionUserId,
      parentId: null,
      deletedAt: null,
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">My Drive</h1>

        <p className="text-muted-foreground mt-1">Browse your folders</p>
      </div>

      {/* ROOT BREADCRUMB */}
      <BreadcrumbNav path={[]} />

      {/* CONTENT */}
      {folders.length === 0 ? <EmptyState /> : <FolderGrid folders={folders} />}
    </div>
  );
}
