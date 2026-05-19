"use client";

import { FileText, Eye, Download } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function FileCard({
  file,
}: {
  file: {
    id: string;
    name: string;
    url: string;
  };
}) {
  const shortName =
    file.name.length > 28 ? file.name.slice(0, 28) + "..." : file.name;

  return (
    <Card
      className="
        group relative
        rounded-2xl
        border
        bg-background
        p-4
        transition-all
        hover:shadow-md
        hover:bg-muted/30
        flex flex-col justify-between
        h-full
      "
    >
      {/* TOP SECTION */}
      <div className="flex items-start gap-3">
        {/* ICON */}
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
          <FileText className="h-5 w-5 text-red-500" />
        </div>

        {/* TEXT */}
        <div className="min-w-0">
          <p className="font-medium text-sm truncate" title={file.name}>
            {shortName}
          </p>

          <p className="text-xs text-muted-foreground mt-1">PDF Document</p>
        </div>
      </div>

      {/* BOTTOM ACTIONS */}
      <div className="flex items-center justify-end gap-2 mt-4 opacity-90 group-hover:opacity-100 transition">
        {/* VIEW */}
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-xl hover:bg-blue-500/10"
        >
          <a href={file.url} target="_blank" rel="noopener noreferrer">
            <Eye className="h-4 w-4" />
          </a>
        </Button>

        {/* DOWNLOAD */}
        <Button
          asChild
          size="icon"
          variant="ghost"
          className="h-9 w-9 rounded-xl hover:bg-green-500/10"
        >
          <a href={file.url} download>
            <Download className="h-4 w-4" />
          </a>
        </Button>
      </div>
    </Card>
  );
}
