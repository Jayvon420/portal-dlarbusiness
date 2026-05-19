import { prisma } from "@/lib/prisma";

export async function getFolderPath(folderId: string) {
  const path: { id: string; name: string }[] = [];

  let current = await prisma.folder.findUnique({
    where: { id: folderId },
  });

  while (current) {
    path.unshift({
      id: current.id,
      name: current.name,
    });

    if (!current.parentId) break;

    current = await prisma.folder.findUnique({
      where: { id: current.parentId },
    });
  }

  return path;
}
