"use client";

import { useState, useTransition } from "react";
import { MoreVertical, FileText, Trash } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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

import { deleteFile } from "../actions";

export default function FileCard({
  file,
}: {
  file: { id: string; name: string; url: string };
}) {
  const [pending, startTransition] = useTransition();
  const [openConfirm, setOpenConfirm] = useState(false);

  function handleDelete() {
    startTransition(async () => {
      await deleteFile(file.id);
      setOpenConfirm(false);
    });
  }

  return (
    <>
      <Card className="group relative w-full rounded-2xl p-4 hover:bg-muted/40 transition cursor-pointer">
        {/* FILE CONTENT */}
        <div className="flex items-center justify-between gap-4">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <FileText className="text-blue-500 shrink-0" />

            <div className="min-w-0">
              {/* 🔥 SINGLE LINE TITLE (NO WRAP) */}
              <p
                className="font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                title={file.name}
              >
                {file.name}
              </p>

              <p className="text-xs text-muted-foreground">PDF File</p>
            </div>
          </div>

          {/* RIGHT ACTION */}
          <div className="shrink-0 opacity-0 group-hover:opacity-100 transition">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setOpenConfirm(true)}
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

      {/* DELETE DIALOG */}
      <AlertDialog open={openConfirm} onOpenChange={setOpenConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete File?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The PDF will be permanently removed
              from storage and database.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={pending}
              className="bg-red-600 hover:bg-red-700"
            >
              {pending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
