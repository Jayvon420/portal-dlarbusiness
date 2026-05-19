// "use client";

// import { useState, useTransition } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import { updateProfile } from "./actions";

// export function EditProfileDialog({
//   open,
//   onOpenChange,
//   user,
// }: {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
//   user: any;
// }) {
//   const [isPending, startTransition] = useTransition();

//   const handleSubmit = (formData: FormData) => {
//     startTransition(async () => {
//       const res = await updateProfile(formData);

//       if (res.success) {
//         toast.success(res.message);

//         // 🔥 delay close → prevents flicker
//         setTimeout(() => {
//           onOpenChange(false);
//         }, 100);
//       } else {
//         toast.error(res.message);
//       }
//     });
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent
//         // 🔥 prevents re-mount flicker animation bug
//         onOpenAutoFocus={(e) => e.preventDefault()}
//       >
//         <DialogHeader>
//           <DialogTitle>Edit Profile</DialogTitle>
//           <DialogDescription></DialogDescription>
//         </DialogHeader>

//         <form action={handleSubmit} className="space-y-4">
//           <Input
//             name="firstName"
//             defaultValue={user.firstName}
//             placeholder="First Name"
//           />

//           {/* <Input
//             name="lastName"
//             defaultValue={user.lastName}
//             placeholder="Last Name"
//           /> */}

//           <Input name="email" defaultValue={user.email} placeholder="Email" />

//           <DialogFooter>
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Saving..." : "Save Changes"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
    startTransition(async () => {
      const res = await updateProfile(formData);

      if (res.success) {
        toast.success(res.message);

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
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          {/* REAL NAME */}
          <Input
            name="firstName"
            defaultValue={user.firstName}
            placeholder="First Name"
          />

          {/* USERNAME (NEW FIX) */}
          <Input
            name="username"
            defaultValue={user.username}
            placeholder="Username"
          />

          {/* EMAIL */}
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
