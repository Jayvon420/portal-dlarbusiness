"use client";

import { useTransition } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { updatePassword } from "./actions";

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    if (isPending) return;

    const password = formData.get("password") as string;

    startTransition(async () => {
      const res = await updatePassword(password);

      if (res.success) {
        toast.success(res.message);

        // 🔥 same anti-flicker pattern
        setTimeout(() => {
          onOpenChange(false);
        }, 100);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <Input
            name="password"
            type="password"
            placeholder="New Password"
            required
          />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
