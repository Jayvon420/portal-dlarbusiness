"use client";

import { useRouter } from "next/navigation";
import { Folder, FolderOpen } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function FolderCard({
  folder,
}: {
  folder: {
    id: string;
    name: string;
  };
}) {
  const router = useRouter();

  function openFolder() {
    router.push(`/dashboard/files/${folder.id}`);
  }

  return (
    <Card
      onClick={openFolder}
      className="cursor-pointer rounded-2xl border p-4 hover:bg-muted/40 transition"
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-500/10">
          <Folder className="h-5 w-5 text-blue-500" />
        </div>

        <div className="min-w-0">
          <p className="font-medium truncate">{folder.name}</p>
          <p className="text-xs text-muted-foreground">Folder</p>
        </div>
      </div>
    </Card>
  );
}
