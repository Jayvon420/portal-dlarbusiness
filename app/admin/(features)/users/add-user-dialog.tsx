"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

export type CreateUserInput = {
  businessName: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
};

export type CreateUserResponse = {
  success: boolean;
  message: string;
};

type Props = {
  onCreate: (data: CreateUserInput) => Promise<CreateUserResponse>;
};

export default function AddUserDialog({ onCreate }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<CreateUserInput>({
    businessName: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // important

    try {
      setLoading(true);

      const res = await onCreate(form);

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);

      setForm({
        businessName: "",
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
      });

      setOpen(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New User</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        {/* ✅ FORM WRAPPER (IMPORTANT) */}
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            placeholder="Business Name"
            value={form.businessName}
            required
            onChange={(e) => setForm({ ...form, businessName: e.target.value })}
          />

          <Input
            placeholder="First Name"
            value={form.firstName}
            required
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <Input
            placeholder="Last Name"
            value={form.lastName}
            required
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <Input
            placeholder="Username"
            value={form.username}
            required
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <Input
            placeholder="Email"
            value={form.email}
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            required
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <Button className="w-full mt-2" type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create User"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
