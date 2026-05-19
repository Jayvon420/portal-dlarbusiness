"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { ReactNode, useState } from "react";

export function FormDialog({
  title,
  trigger,
  children,
}: {
  title: string;
  trigger: ReactNode;
  children: (args: { close: () => void }) => ReactNode;
}) {
  const [open, setOpen] = useState(false);

  function close() {
    // 🔥 prevents flicker caused by React/Radix race
    requestAnimationFrame(() => {
      setOpen(false);
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {children({ close })}
      </DialogContent>
    </Dialog>
  );
}
