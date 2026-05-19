// "use client";

// import { useTransition } from "react";
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
// import { updatePassword } from "./actions";

// export function ChangePasswordDialog({
//   open,
//   onOpenChange,
// }: {
//   open: boolean;
//   onOpenChange: (v: boolean) => void;
// }) {
//   const [isPending, startTransition] = useTransition();

//   const handleSubmit = (formData: FormData) => {
//     startTransition(async () => {
//       const password = formData.get("password") as string;

//       const res = await updatePassword(password);

//       if (res.success) {
//         toast.success(res.message);

//         // 🔥 prevents flicker
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
//       <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
//         <DialogHeader>
//           <DialogTitle>Change Password</DialogTitle>
//           <DialogDescription></DialogDescription>
//         </DialogHeader>

//         <form action={handleSubmit} className="space-y-4">
//           <Input
//             name="password"
//             type="password"
//             placeholder="New password"
//             required
//           />

//           <DialogFooter>
//             <Button type="submit" disabled={isPending}>
//               {isPending ? "Updating..." : "Update"}
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
import { updatePassword } from "./actions";

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const password = formData.get("password") as string;

      const res = await updatePassword(password);

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
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <Input
            name="password"
            type="password"
            placeholder="New password"
            required
          />

          <DialogFooter>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
