"use client";

import { useState, useTransition } from "react";

import { FolderPlus } from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createFolder } from "../actions";

export default function CreateFolderDialog({
  userId,
  parentId,
}: {
  userId: string;
  parentId?: string;
}) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [pending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      try {
        await createFolder({
          name,
          userId,
          parentId,
        });

        toast.success("Folder created");

        setName("");
        setOpen(false);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <FolderPlus className="h-4 w-4 mr-2" />
          New Folder
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className="space-y-4">
          <Input
            placeholder="Folder name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button onClick={handleSubmit} disabled={pending} className="w-full">
            {pending ? "Creating..." : "Create Folder"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
