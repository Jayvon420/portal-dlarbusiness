"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong.");
        return;
      }

      toast.success(data.message);

      setEmail("");
    } catch {
      toast.error("Unable to send reset email.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Forgot your password?
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Enter your account email and we'll send you a password reset link.
        </p>
      </div>

      <Card className="rounded-3xl border border-slate-200 shadow-lg">
        <CardContent className="p-8 md:p-10">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel>Email Address</FieldLabel>

                <Input
                  className="h-11"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Button
                type="submit"
                disabled={loading}
                className="h-11 w-full bg-[#004AAD] font-semibold text-white hover:bg-[#003E91]"
              >
                {loading ? "Sending..." : "Send Reset Link"}
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
