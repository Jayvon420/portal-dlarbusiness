// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import type { Payroll } from "../types";
// import { createPayroll, updatePayroll } from "../payroll-actions";
// import { toast } from "sonner";

// export default function PayrollForm({
//   payroll,
//   onClose,
// }: {
//   payroll?: Payroll;
//   onClose?: () => void;
// }) {
//   const [loading, setLoading] = useState(false);

//   function computeNetPay(data: {
//     salary: number;
//     late: number;
//     sss: number;
//     hdmf: number;
//     phic: number;
//   }) {
//     return data.salary - (data.late + data.sss + data.hdmf + data.phic);
//   }

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     const form = new FormData(e.currentTarget);

//     const payload = {
//       date: String(form.get("date") || ""),
//       employeeName: String(form.get("employeeName") || ""),
//       salary: Number(form.get("salary") || 0),
//       late: Number(form.get("late") || 0),
//       sss: Number(form.get("sss") || 0),
//       hdmf: Number(form.get("hdmf") || 0),
//       phic: Number(form.get("phic") || 0),
//     };

//     setLoading(true);

//     // ✅ CLOSE IMMEDIATELY (same as Sale pattern)
//     onClose?.();

//     const netPay = computeNetPay(payload);

//     const res = payroll
//       ? await updatePayroll(payroll.id, { ...payload, netPay })
//       : await createPayroll({ ...payload, netPay });

//     if (res.success) {
//       toast.success(res.message || "Saved");
//     } else {
//       toast.error(res.message || "Failed");
//     }

//     setLoading(false);
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-3">
//       <Input
//         name="date"
//         type="date"
//         defaultValue={
//           payroll ? new Date(payroll.date).toISOString().split("T")[0] : ""
//         }
//         required
//       />

//       <Input
//         name="employeeName"
//         placeholder="Employee Name"
//         defaultValue={payroll?.employeeName ?? ""}
//         required
//       />

//       <Input
//         name="salary"
//         type="number"
//         step="0.01"
//         placeholder="Salary"
//         defaultValue={payroll?.salary ?? ""}
//         required
//       />

//       <Input
//         name="late"
//         type="number"
//         step="0.01"
//         placeholder="Late"
//         defaultValue={payroll?.late ?? ""}
//         required
//       />

//       <Input
//         name="sss"
//         type="number"
//         step="0.01"
//         placeholder="SSS"
//         defaultValue={payroll?.sss ?? ""}
//         required
//       />

//       <Input
//         name="hdmf"
//         type="number"
//         step="0.01"
//         placeholder="HDMF"
//         defaultValue={payroll?.hdmf ?? ""}
//         required
//       />

//       <Input
//         name="phic"
//         type="number"
//         step="0.01"
//         placeholder="PHIC"
//         defaultValue={payroll?.phic ?? ""}
//         required
//       />

//       <Button className="w-full" disabled={loading}>
//         {loading ? "Saving..." : payroll ? "Update Payroll" : "Save Payroll"}
//       </Button>
//     </form>
//   );
// }

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import type { Payroll } from "../types";
import { createPayroll, updatePayroll } from "../payroll-actions";
import { toast } from "sonner";

export default function PayrollForm({
  payroll,
  onClose,
}: {
  payroll?: Payroll;
  onClose?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      date: String(form.get("date") || ""),
      employeeName: String(form.get("employeeName") || ""),
      salary: Number(form.get("salary") || 0),
    };

    setLoading(true);

    // CLOSE IMMEDIATELY
    onClose?.();

    const res = payroll
      ? await updatePayroll(payroll.id, payload)
      : await createPayroll(payload);

    if (res.success) {
      toast.success(res.message || "Saved");
    } else {
      toast.error(res.message || "Failed");
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        name="date"
        type="date"
        defaultValue={
          payroll ? new Date(payroll.date).toISOString().split("T")[0] : ""
        }
        required
      />

      <Input
        name="employeeName"
        placeholder="Employee Name"
        defaultValue={payroll?.employeeName ?? ""}
        required
      />

      <Input
        name="salary"
        type="number"
        step="0.01"
        placeholder="Salary"
        defaultValue={payroll?.salary ?? ""}
        required
      />

      <Button className="w-full" disabled={loading}>
        {loading ? "Saving..." : payroll ? "Update Payroll" : "Save Payroll"}
      </Button>
    </form>
  );
}
