// "use server";

// import { prisma } from "@/lib/prisma";
// import { supabase } from "@/lib/supabase";
// import { revalidatePath } from "next/cache";

// /* ================= UPLOAD FILE ================= */
// export async function uploadFile({
//   formData,
//   userId,
//   folderId,
// }: {
//   formData: FormData;
//   userId: string;
//   folderId: string;
// }) {
//   const file = formData.get("file") as File;

//   if (!file || !userId || !folderId) {
//     throw new Error("Missing required fields");
//   }

//   if (file.type !== "application/pdf") {
//     throw new Error("Only PDF allowed");
//   }

//   const bytes = await file.arrayBuffer();
//   const buffer = Buffer.from(bytes);

//   const path = `${userId}/${folderId}/${Date.now()}-${file.name}`;

//   const { error } = await supabase.storage
//     .from("uploads")
//     .upload(path, buffer, {
//       contentType: "application/pdf",
//     });

//   if (error) throw new Error(error.message);

//   const { data } = supabase.storage.from("uploads").getPublicUrl(path);

//   const url = data.publicUrl;

//   await prisma.fileUpload.create({
//     data: {
//       name: file.name,
//       url,
//       path,
//       userId,
//       folderId,
//     },
//   });

//   revalidatePath(`/admin/users/${userId}/files/${folderId}`);
// }

// /* ================= DELETE FILE ================= */
// export async function deleteFile(id: string) {
//   const file = await prisma.fileUpload.findUnique({
//     where: { id },
//   });

//   if (!file) return;

//   console.log("Deleting from Supabase path:", file.path);

//   const { error } = await supabase.storage.from("uploads").remove([file.path]);

//   if (error) {
//     console.error("Supabase delete error:", error.message);
//   }

//   await prisma.fileUpload.delete({
//     where: { id },
//   });

//   revalidatePath(`/admin/users/${file.userId}/files/${file.folderId}`);
// }

// /* ================= CREATE FOLDER ================= */
// export async function createFolder({
//   name,
//   userId,
//   parentId,
// }: {
//   name: string;
//   userId: string;
//   parentId?: string | null;
// }) {
//   if (!name) throw new Error("Folder name required");

//   await prisma.folder.create({
//     data: {
//       name,
//       userId,
//       parentId: parentId || null,
//     },
//   });

//   revalidatePath(`/admin/users/${userId}/files`);
// }

// // rename folder
// export async function renameFolder({ id, name }: { id: string; name: string }) {
//   if (!name.trim()) {
//     throw new Error("Folder name required");
//   }

//   const folder = await prisma.folder.update({
//     where: { id },
//     data: { name },
//   });

//   revalidatePath(`/admin/users/${folder.userId}/files`);
// }

// /* ================= DELETE FOLDER ================= */

// export async function deleteFolder(id: string) {
//   const folder = await prisma.folder.findUnique({
//     where: { id },
//   });

//   if (!folder) return;

//   // 🔥 STEP 1: get ALL nested folders recursively
//   const getAllFolderIds = async (folderId: string): Promise<string[]> => {
//     const children = await prisma.folder.findMany({
//       where: { parentId: folderId },
//       select: { id: true },
//     });

//     const childIds = await Promise.all(
//       children.map((child) => getAllFolderIds(child.id)),
//     );

//     return [folderId, ...childIds.flat()];
//   };

//   const allFolderIds = await getAllFolderIds(id);

//   // 🔥 STEP 2: get ALL files in ALL folders
//   const files = await prisma.fileUpload.findMany({
//     where: {
//       folderId: { in: allFolderIds },
//     },
//     select: { path: true },
//   });

//   const paths = files.map((f) => f.path);

//   console.log("Deleting Supabase files:", paths);

//   // 🔥 STEP 3: delete from Supabase
//   if (paths.length > 0) {
//     const { error } = await supabase.storage.from("uploads").remove(paths);

//     if (error) {
//       console.error("Supabase delete error:", error.message);
//     }
//   }

//   // 🔥 STEP 4: delete DB files
//   await prisma.fileUpload.deleteMany({
//     where: {
//       folderId: { in: allFolderIds },
//     },
//   });

//   // 🔥 STEP 5: delete folders
//   await prisma.folder.deleteMany({
//     where: {
//       id: { in: allFolderIds },
//     },
//   });

//   revalidatePath(`/admin/users/${folder.userId}/files`);
// }

"use server";

import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

/* ================= UPLOAD FILE ================= */
export async function uploadFile({
  formData,
  userId,
  folderId,
}: {
  formData: FormData;
  userId: string;
  folderId: string;
}) {
  const file = formData.get("file") as File;

  if (!file || !userId || !folderId) {
    throw new Error("Missing required fields");
  }

  if (file.type !== "application/pdf") {
    throw new Error("Only PDF allowed");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const path = `${userId}/${folderId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("uploads")
    .upload(path, buffer, {
      contentType: "application/pdf",
    });

  if (error) {
    console.error("Upload error:", error.message);
    throw new Error("Failed to upload file");
  }

  const { data } = supabase.storage.from("uploads").getPublicUrl(path);

  await prisma.fileUpload.create({
    data: {
      name: file.name,
      url: data.publicUrl,
      path,
      userId,
      folderId,
    },
  });

  revalidatePath(`/admin/users/${userId}/files/${folderId}`);
}

/* ================= DELETE FILE ================= */
export async function deleteFile(id: string) {
  const file = await prisma.fileUpload.findUnique({
    where: { id },
  });

  if (!file) return;

  const { error } = await supabase.storage.from("uploads").remove([file.path]);

  if (error) {
    console.error("Supabase delete error:", error.message);
    throw new Error("Failed to delete file from storage");
  }

  await prisma.fileUpload.delete({
    where: { id },
  });

  revalidatePath(`/admin/users/${file.userId}/files/${file.folderId}`);
}

/* ================= CREATE FOLDER ================= */
export async function createFolder({
  name,
  userId,
  parentId,
}: {
  name: string;
  userId: string;
  parentId?: string | null;
}) {
  if (!name.trim()) {
    throw new Error("Folder name required");
  }

  await prisma.folder.create({
    data: {
      name,
      userId,
      parentId: parentId || null,
    },
  });

  revalidatePath(`/admin/users/${userId}/files`);
}

/* ================= RENAME FOLDER ================= */
export async function renameFolder({ id, name }: { id: string; name: string }) {
  if (!name.trim()) {
    throw new Error("Folder name required");
  }

  const folder = await prisma.folder.update({
    where: { id },
    data: { name },
  });

  revalidatePath(`/admin/users/${folder.userId}/files`);
}

/* ================= DELETE FOLDER (SAFE + RECURSIVE) ================= */
export async function deleteFolder(id: string) {
  const folder = await prisma.folder.findUnique({
    where: { id },
  });

  if (!folder) return;

  /* ================= GET ALL CHILD FOLDERS ================= */
  const getAllFolderIds = async (folderId: string): Promise<string[]> => {
    const children = await prisma.folder.findMany({
      where: { parentId: folderId },
      select: { id: true },
    });

    const childIds = await Promise.all(
      children.map((child) => getAllFolderIds(child.id)),
    );

    return [folderId, ...childIds.flat()];
  };

  const allFolderIds = await getAllFolderIds(id);

  /* ================= GET ALL FILES ================= */
  const files = await prisma.fileUpload.findMany({
    where: {
      userId: folder.userId,
      folderId: { in: allFolderIds },
    },
    select: { path: true },
  });

  const paths = files.map((f) => f.path);

  /* ================= DELETE FROM SUPABASE ================= */
  if (paths.length > 0) {
    const { error } = await supabase.storage.from("uploads").remove(paths);

    if (error) {
      console.error("Supabase delete error:", error.message);
      throw new Error("Failed to delete files from storage");
    }
  }

  /* ================= DELETE FROM DB ================= */
  await prisma.fileUpload.deleteMany({
    where: {
      userId: folder.userId,
      folderId: { in: allFolderIds },
    },
  });

  await prisma.folder.deleteMany({
    where: {
      id: { in: allFolderIds },
    },
  });

  /* ================= REVALIDATE ================= */
  revalidatePath(`/admin/users/${folder.userId}/files`);
}
