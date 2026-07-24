"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";

import { LegalModal } from "@/components/legal-modal";
import { TermsContent, PrivacyContent } from "@/components/legal-content";

export default function LoginClient() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleLogin = async () => {
    if (!identifier || !password) {
      toast.error("Please fill all fields");
      return;
    }

    if (!agreed) {
      toast.error("You must agree to Terms & Privacy Policy");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Welcome back!");

      router.replace(data.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Logo */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Access your business dashboard securely.
        </p>
      </div>

      <Card className="rounded-3xl border border-slate-200 shadow-lg">
        <CardContent className="p-8 md:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <FieldGroup className="space-y-6">
              <Field>
                <FieldLabel>Email or Username</FieldLabel>

                <Input
                  className="h-11"
                  placeholder="Enter your email or username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <div className="mb-2 flex items-center justify-between">
                  <FieldLabel>Password</FieldLabel>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-medium text-[#004AAD] transition-colors hover:text-[#003E91] hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Input
                  className="h-11"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Button
                type="submit"
                disabled={loading || !agreed}
                className="h-11 w-full bg-[#004AAD] font-semibold text-white hover:bg-[#003E91]"
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </FieldGroup>
          </form>

          <div className="my-8 border-t" />

          <div className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(value) => setAgreed(!!value)}
              className="mt-1"
            />

            <label htmlFor="agree" className="cursor-pointer select-none">
              I have read and agree to the{" "}
              <LegalModal title="Terms of Service">
                <TermsContent />
              </LegalModal>{" "}
              and{" "}
              <LegalModal title="Privacy Policy">
                <PrivacyContent />
              </LegalModal>
              .
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Need help signing in?{" "}
        <a
          href="https://m.me/jayvon420"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#004AAD] transition-colors hover:text-[#003E91] hover:underline"
        >
          Contact Administrator
        </a>
      </div>
    </div>
  );
}
