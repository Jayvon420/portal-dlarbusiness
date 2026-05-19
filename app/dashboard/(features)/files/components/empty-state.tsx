import { FolderX } from "lucide-react";

export default function EmptyState({
  title = "No files found",
  description = "This folder is empty.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted mb-3">
        <FolderX className="h-6 w-6 text-muted-foreground" />
      </div>

      <h2 className="text-lg font-semibold">{title}</h2>

      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}
