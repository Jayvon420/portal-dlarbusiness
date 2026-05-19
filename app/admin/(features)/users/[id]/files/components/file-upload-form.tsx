"use client";

import { useState, useTransition } from "react";
import { UploadCloud, X } from "lucide-react";
import { toast } from "sonner";

import { uploadFile } from "../actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function FileUploadForm({
  userId,
  folderId,
}: {
  userId: string;
  folderId: string;
}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [pending, startTransition] = useTransition();

  function addFiles(selected: FileList | null) {
    if (!selected) return;

    const pdfs = Array.from(selected).filter(
      (f) => f.type === "application/pdf",
    );

    if (pdfs.length !== selected.length) {
      toast.error("Only PDF files are allowed");
    }

    setFiles((prev) => [...prev, ...pdfs]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleUploadAll() {
    if (files.length === 0) {
      toast.error("No files selected");
      return;
    }

    startTransition(async () => {
      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);

          await uploadFile({
            formData,
            userId,
            folderId,
          });
        }

        toast.success("All PDFs uploaded");

        setFiles([]);
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  return (
    <Card
      className={`rounded-2xl p-6 border-dashed transition cursor-pointer
      ${isDragging ? "border-primary bg-muted/40" : "hover:bg-muted/30"}
      `}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById("fileInput")?.click()}
    >
      <div className="flex flex-col gap-4">
        {/* HEADER */}
        <div className="text-center">
          <UploadCloud className="h-10 w-10 mx-auto text-muted-foreground" />

          <h3 className="text-lg font-semibold mt-2">Drag & drop PDFs here</h3>

          <p className="text-sm text-muted-foreground">
            or click to browse multiple files
          </p>
        </div>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-md px-3 py-2 bg-muted/20"
              >
                <span className="text-sm truncate">{file.name}</span>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* ACTIONS */}
        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setFiles([]);
            }}
          >
            Clear
          </Button>

          <Button
            disabled={pending || files.length === 0}
            onClick={(e) => {
              e.stopPropagation();
              handleUploadAll();
            }}
          >
            {pending ? "Uploading..." : `Upload ${files.length} file(s)`}
          </Button>
        </div>

        {/* INPUT */}
        <Input
          id="fileInput"
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
      </div>
    </Card>
  );
}
