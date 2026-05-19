import { FolderOpen } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed p-16 text-center">
      <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />

      <h2 className="text-lg font-semibold">Empty Folder</h2>

      <p className="text-sm text-muted-foreground mt-1">
        Create folders or upload PDFs.
      </p>
    </div>
  );
}
