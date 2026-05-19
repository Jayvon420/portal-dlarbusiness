"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ActionButton({
  action,
  children,
  variant,
}: {
  action: () => Promise<{
    success: boolean;
    message: string;
  }>;
  children: React.ReactNode;
  variant?: "default" | "destructive" | "outline" | "secondary";
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant={variant}
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const result = await action();

          if (result.success) {
            toast.success(result.message);
          } else {
            toast.error(result.message);
          }
        });
      }}
    >
      {children}
    </Button>
  );
}
