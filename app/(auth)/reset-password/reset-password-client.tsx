"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ResetPasswordClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!token) {
      toast.error("Invalid reset link.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Unable to reset password.");
        return;
      }

      toast.success(data.message);

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="mx-auto w-full max-w-lg">
        <Card className="rounded-3xl border border-slate-200 shadow-lg">
          <CardContent className="p-8 md:p-10">
            <div className="space-y-6 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  Invalid Reset Link
                </h1>

                <p className="text-sm text-muted-foreground">
                  This password reset link is missing or invalid.
                </p>
              </div>

              <Link href="/forgot-password">
                <Button className="h-11 w-full bg-[#004AAD] font-semibold text-white hover:bg-[#003E91]">
                  Request New Link
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Create a new password
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Choose a strong password to keep your account secure.
        </p>
      </div>

      <Card className="rounded-3xl border border-slate-200 shadow-lg">
        <CardContent className="p-8 md:p-10">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel>New Password</FieldLabel>

                <Input
                  className="h-11"
                  type="password"
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Confirm Password</FieldLabel>

                <Input
                  className="h-11"
                  type="password"
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full bg-[#004AAD] font-semibold text-white hover:bg-[#003E91]"
              >
                {loading ? "Updating Password..." : "Reset Password"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm">
        <Link
          href="/login"
          className="font-medium text-[#004AAD] transition-colors hover:text-[#003E91] hover:underline"
        >
          ← Back to Sign In
        </Link>
      </div>
    </div>
  );
}
