// //new with admin

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function LoginClient() {
//   const router = useRouter();

//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!identifier || !password) {
//       toast.error("Please fill all fields");
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

//       // 🔥 IMPORTANT FIX:
//       // DO NOT go directly to dashboard
//       // Let proxy decide where to go
//       router.replace("/login");
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-[380px]">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-3">
//           <Input
//             placeholder="Email or Username"
//             value={identifier}
//             onChange={(e) => setIdentifier(e.target.value)}
//           />

//           <Input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <Button className="w-full" onClick={handleLogin} disabled={loading}>
//             {loading ? "Logging in..." : "Login"}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// "use client";

// import { LegalModal } from "@/components/legal-modal";
// import { TermsContent, PrivacyContent } from "@/components/legal-content";

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
// import {
//   Field,
//   FieldGroup,
//   FieldLabel,
//   FieldDescription,
// } from "@/components/ui/field";

// export default function LoginClient() {
//   const router = useRouter();

//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!identifier || !password) {
//       toast.error("Please fill all fields");
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
//       router.replace("/login");
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col gap-6">
//       <Card>
//         {/* HEADER */}
//         <CardHeader className="text-center space-y-1">
//           <CardTitle className="text-xl">Welcome back</CardTitle>

//           <CardDescription>Sign in to your DLAR account</CardDescription>
//         </CardHeader>

//         {/* FORM */}
//         <CardContent>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               handleLogin();
//             }}
//           >
//             <FieldGroup className="space-y-4">
//               {/* Email / Username */}
//               <Field>
//                 <FieldLabel htmlFor="identifier">Email or Username</FieldLabel>
//                 <Input
//                   id="identifier"
//                   placeholder="m@example.com"
//                   value={identifier}
//                   onChange={(e) => setIdentifier(e.target.value)}
//                   required
//                 />
//               </Field>

//               {/* Password */}
//               <Field>
//                 {/* <div className="flex items-center"> */}
//                 <div>
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   {/*
//                   <a
//                     href="#"
//                     className="ml-auto text-sm text-muted-foreground hover:underline"
//                   >
//                     Forgot password?
//                   </a> */}
//                 </div>

//                 <Input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </Field>

//               {/* LOGIN BUTTON */}
//               <Field>
//                 <Button type="submit" className="w-full" disabled={loading}>
//                   {loading ? "Logging in..." : "Login"}
//                 </Button>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>

//       {/* TERMS */}
//       {/* <FieldDescription className="text-center text-xs text-muted-foreground">
//         By continuing, you agree to our{" "}
//         <a href="/terms" className="underline hover:text-foreground">
//           Terms of Service
//         </a>{" "}
//         and{" "}
//         <a href="/privacy" className="underline hover:text-foreground">
//           Privacy Policy
//         </a>
//         .
//       </FieldDescription> */}
//       <FieldDescription className="text-center text-xs text-muted-foreground">
//         By continuing, you agree to our{" "}
//         <LegalModal title="Terms of Service">
//           <TermsContent />
//         </LegalModal>{" "}
//         and{" "}
//         <LegalModal title="Privacy Policy">
//           <PrivacyContent />
//         </LegalModal>
//         .
//       </FieldDescription>
//     </div>
//   );
// }

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

// import {
//   Field,
//   FieldGroup,
//   FieldLabel,
//   FieldDescription,
// } from "@/components/ui/field";

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
//       router.replace("/login");
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center w-full min-h-full px-4">
//       {/* 🔥 WIDER RESPONSIVE CARD */}
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

//           {/* LEGAL SECTION (WITH CHECKBOX, CLEAN UI) */}
//           <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
//             <Checkbox
//               checked={agreed}
//               onCheckedChange={(v) => setAgreed(!!v)}
//               className="mt-0.5"
//             />

//             <p>
//               You must confirm that you have read and agree to our{" "}
//               <LegalModal title="Terms of Service">
//                 <TermsContent />
//               </LegalModal>{" "}
//               and{" "}
//               <LegalModal title="Privacy Policy">
//                 <PrivacyContent />
//               </LegalModal>{" "}
//               before you can continue.
//             </p>
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Login failed");
        return;
      }

      toast.success("Welcome back!");
      router.replace("/login");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-full min-h-full px-4">
      <Card className="w-full max-w-md md:max-w-lg lg:max-w-xl shadow-lg border-muted">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to your DLAR business system
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <FieldGroup className="space-y-5">
              <Field>
                <FieldLabel>Email or Username</FieldLabel>
                <Input
                  placeholder="m@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading || !agreed}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>

          {/* ✅ UX IMPROVED LEGAL SECTION */}
          <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
            <Checkbox
              id="agree"
              checked={agreed}
              onCheckedChange={(v) => setAgreed(!!v)}
              className="mt-0.5"
            />

            <label htmlFor="agree" className="cursor-pointer select-none">
              You must <strong>check the box </strong>to confirm that you have
              read and agree to our{" "}
              <LegalModal title="Terms of Service">
                <TermsContent />
              </LegalModal>{" "}
              and{" "}
              <LegalModal title="Privacy Policy">
                <PrivacyContent />
              </LegalModal>{" "}
              before you can continue.
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
