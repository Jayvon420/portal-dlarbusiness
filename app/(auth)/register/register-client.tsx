// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { toast } from "sonner";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export default function RegisterClient() {
//   const router = useRouter();

//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     businessName: "",
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     password: "",
//   });

//   const handleRegister = async () => {
//     const values = Object.values(form);

//     if (values.some((v) => !v)) {
//       toast.error("Please fill all fields");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         toast.error(data.error || "Registration failed");
//         return;
//       }

//       toast.success("Account created!");
//       router.push("/login");
//     } catch {
//       toast.error("Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <Card className="w-[420px]">
//         <CardHeader>
//           <CardTitle>Create Account</CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-2">
//           <Input
//             placeholder="Business Name"
//             value={form.businessName}
//             onChange={(e) => setForm({ ...form, businessName: e.target.value })}
//           />

//           <Input
//             placeholder="First Name"
//             value={form.firstName}
//             onChange={(e) => setForm({ ...form, firstName: e.target.value })}
//           />

//           <Input
//             placeholder="Last Name"
//             value={form.lastName}
//             onChange={(e) => setForm({ ...form, lastName: e.target.value })}
//           />

//           <Input
//             placeholder="Username"
//             value={form.username}
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />

//           <Input
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) => setForm({ ...form, email: e.target.value })}
//           />

//           <Input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />

//           <Button
//             className="w-full mt-2"
//             onClick={handleRegister}
//             disabled={loading}
//           >
//             {loading ? "Creating..." : "Register"}
//           </Button>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
export default function RegisterClient() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[420px] text-center">
        <h1 className="text-2xl font-bold">Registration Disabled</h1>
        <p className="mt-2 text-muted-foreground">
          Registration is currently disabled. Please contact the administrator
          for assistance.
        </p>
      </div>
    </div>
  );
}
