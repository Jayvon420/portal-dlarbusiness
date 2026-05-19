"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function LegalModal({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      {/* TRIGGER */}
      <DialogTrigger className="underline text-xs text-muted-foreground hover:text-foreground">
        {title}
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent
        className="
          !max-w-6xl
          !w-[95vw]
          h-[85vh]
          p-0
          overflow-hidden
        "
      >
        {/* HEADER */}
        <div className="border-b px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-base font-semibold">
              {title}
            </DialogTitle>
            <DialogDescription />
          </DialogHeader>
        </div>

        {/* BODY */}
        <div className="h-[calc(85vh-65px)] overflow-y-auto px-6 py-5">
          <div className="space-y-4 text-sm text-muted-foreground leading-7 max-w-4xl">
            {children}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
