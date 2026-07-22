// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

// import { Checkbox } from "@/components/ui/checkbox";
// import { LegalModal } from "@/components/legal-modal";
// import { TermsContent, PrivacyContent } from "@/components/legal-content";

// export default function LoginClient() {
//   const router = useRouter();

//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [agreed, setAgreed] = useState(false);

//   const handleLogin = async () => {
//     if (!identifier || !password) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     if (!agreed) {
//       toast.error("You must agree to Terms & Privacy Policy");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ identifier, password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.error || "Login failed");
//         return;
//       }

//       toast.success("Welcome back!");
//       router.replace(data.role === "ADMIN" ? "/admin" : "/dashboard");
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full min-h-full px-4">
//       <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl shadow-lg border-muted">
//         <CardHeader className="text-center space-y-1">
//           <CardTitle className="text-2xl">Welcome back</CardTitle>
//           <CardDescription>
//             Sign in to your DLAR business system
//           </CardDescription>
//         </CardHeader>

//         <CardContent>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleLogin();
//             }}
//           >
//             <FieldGroup className="space-y-5">
//               <Field>
//                 <FieldLabel>Email or Username</FieldLabel>
//                 <Input
//                   placeholder="m@example.com"
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   required
//                 />
//               </Field>

//               <Field>
//                 <FieldLabel>Password</FieldLabel>
//                 <Input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Field>

//               <Field>
//                 <Button
//                   type="submit"
//                   className="w-full"
//                   disabled={loading || !agreed}
//                 >
//                   {loading ? "Logging in..." : "Login"}
//                 </Button>
//               </Field>
//             </FieldGroup>
//           </form>

//           {/* ✅ UX IMPROVED LEGAL SECTION */}
//           <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
//             <Checkbox
//               id="agree"
//               checked={agreed}
//               onCheckedChange={(v) => setAgreed(!!v)}
//               className="mt-0.5"
//             />

//             <label htmlFor="agree" className="cursor-pointer select-none">
//               You must <strong>check the box </strong>to confirm that you have
//               read and agree to our{" "}
//               <LegalModal title="Terms of Service">
//                 <TermsContent />
//               </LegalModal>{" "}
//               and{" "}
//               <LegalModal title="Privacy Policy">
//                 <PrivacyContent />
//               </LegalModal>{" "}
//               before you can continue.
//             </label>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

"use client";

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
                <FieldLabel>Password</FieldLabel>

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
        {/* <button
          type="button"
          className="font-medium text-[#004AAD] transition-colors hover:text-[#003E91]"
        >
          Contact Administrator
        </button> */}
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
