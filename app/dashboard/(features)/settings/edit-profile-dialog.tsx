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

import { updateProfile } from "./actions";

export function EditProfileDialog({
  open,
  onOpenChange,
  user,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  user: any;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    if (isPending) return;

    startTransition(async () => {
      const res = await updateProfile(formData);

      if (res.success) {
        toast.success(res.message);

        // 🔥 prevents flicker close animation bug
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
      <DialogContent
        // 🔥 prevents auto-focus flicker
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {/* hidden id (important) */}
          <input type="hidden" name="id" value={user.id} />

          <Input
            name="businessName"
            defaultValue={user.businessName}
            placeholder="Company Name"
          />

          <Input
            name="firstName"
            defaultValue={user.firstName}
            placeholder="First Name"
          />

          <Input
            name="lastName"
            defaultValue={user.lastName}
            placeholder="Last Name"
          />

          <Input name="email" defaultValue={user.email} placeholder="Email" />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
