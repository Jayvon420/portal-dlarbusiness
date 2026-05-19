"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Folder, MoreVertical, Pencil, Trash } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { toast } from "sonner";

import { renameFolder, deleteFolder } from "../actions";

export default function FolderCard({
  folder,
  userId,
}: {
  folder: { id: string; name: string };
  userId: string;
}) {
  const router = useRouter();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(folder.name);

  const [openDelete, setOpenDelete] = useState(false);
  const [pending, startTransition] = useTransition();

  function openFolder() {
    if (editing) return;

    router.push(`/admin/users/${userId}/files/${folder.id}`);
  }

  function handleRename() {
    startTransition(async () => {
      try {
        await renameFolder({
          id: folder.id,
          name,
        });

        toast.success("Folder renamed");
        setEditing(false);
      } catch (err: any) {
        toast.error(err.message || "Rename failed");
      }
    });
  }

  function handleDelete() {
    startTransition(async () => {
      try {
        await deleteFolder(folder.id);

        toast.success("Folder deleted");
        setOpenDelete(false);
      } catch (err: any) {
        toast.error(err.message || "Delete failed");
      }
    });
  }

  return (
    <>
      <Card
        onClick={openFolder}
        className="relative w-full max-w-sm p-4 rounded-2xl hover:bg-muted/40 transition cursor-pointer group"
      >
        {/* CONTENT */}
        <div className="flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3 min-w-0">
            <Folder className="text-blue-500 shrink-0" />

            {editing ? (
              <div className="flex gap-2 items-center w-full">
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-8"
                />

                <Button size="sm" onClick={handleRename}>
                  Save
                </Button>
              </div>
            ) : (
              <div className="font-medium truncate">{folder.name}</div>
            )}
          </div>

          {/* RIGHT MENU */}
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition"
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setEditing(true)}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => setOpenDelete(true)}
                  className="text-red-500"
                >
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>

      {/* DELETE CONFIRM DIALOG */}
      <AlertDialog open={openDelete} onOpenChange={setOpenDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete folder?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this folder and all files inside it.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
