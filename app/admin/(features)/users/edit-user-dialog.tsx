"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { updateUser } from "./actions";

export function EditUserDialog({ user }: { user: any }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form
          action={(formData) => {
            startTransition(async () => {
              const result = await updateUser(formData);

              if (result.success) {
                toast.success(result.message);
                setOpen(false);
              } else {
                toast.error(result.message);
              }
            });
          }}
          className="space-y-4"
        >
          <input type="hidden" name="id" value={user.id} />

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

          <Input
            name="username"
            defaultValue={user.username}
            placeholder="Username"
          />

          <Input
            name="password"
            type="password"
            placeholder="Temporary Password"
          />

          <Button type="submit" disabled={isPending} className="w-full">
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
