// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import type { Payroll } from "../types";
// import { deletePayroll } from "../payroll-actions";
// import { toast } from "sonner";

// import { useTable } from "@/hooks/use-table";
// import { FormDialog } from "@/components/shared/form-dialog";
// import { ConfirmDialog } from "@/components/shared/confirm-dialog";
// import PayrollForm from "./payroll-form";
// import { BadgePlus, SquarePen, Trash } from "lucide-react";

// export default function PayrollTable({ payrolls }: { payrolls: Payroll[] }) {
//   const {
//     search,
//     setSearch,
//     page,
//     setPage,
//     perPage,
//     setPerPage,
//     totalPages,
//     paginated,
//   } = useTable<Payroll>({
//     data: payrolls,
//     searchFn: (p, s) => {
//       const dateStr = new Date(p.date).toLocaleDateString();

//       return (
//         p.employeeName.toLowerCase().includes(s) ||
//         dateStr.includes(s) ||
//         p.salary.toString().includes(s) ||
//         p.netPay.toString().includes(s)
//       );
//     },
//   });

//   return (
//     <div className="space-y-4">
//       {/* SEARCH + ADD */}
//       <div className="space-y-3">
//         {/* ROW 1: SEARCH + CLEAR */}
//         <div className="flex items-center gap-2">
//           <input
//             className="h-10 flex-1 border rounded-md px-3 text-sm"
//             placeholder="Search payroll..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />

//           <Button
//             variant="outline"
//             className="h-10"
//             onClick={() => setSearch("")}
//           >
//             Clear
//           </Button>
//         </div>

//         {/* ROW 2: ADD */}
//         <div className="flex justify-end">
//           <FormDialog
//             title="Add Payroll"
//             trigger={
//               <Button className="h-10">
//                 <BadgePlus />
//                 Add Payroll
//               </Button>
//             }
//           >
//             {({ close }) => <PayrollForm onClose={close} />}
//           </FormDialog>
//         </div>
//       </div>

//       {/* TABLE */}
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>Date</TableHead>
//             <TableHead>Employee</TableHead>
//             <TableHead className="text-right">Salary</TableHead>
//             <TableHead className="text-right">Deductions</TableHead>
//             <TableHead className="text-right">Net Pay</TableHead>
//             <TableHead className="text-right">Actions</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {paginated.map((p) => {
//             const deductions =
//               Number(p.late) + Number(p.sss) + Number(p.hdmf) + Number(p.phic);

//             return (
//               <TableRow key={p.id}>
//                 <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>

//                 <TableCell>{p.employeeName}</TableCell>

//                 <TableCell className="text-right">
//                   ₱ {Number(p.salary).toLocaleString()}
//                 </TableCell>

//                 <TableCell className="text-right">
//                   ₱ {deductions.toLocaleString()}
//                 </TableCell>

//                 <TableCell className="text-right font-medium">
//                   ₱ {Number(p.netPay).toLocaleString()}
//                 </TableCell>

//                 <TableCell className="text-right space-x-2">
//                   {/* EDIT */}
//                   <FormDialog
//                     title="Edit Payroll"
//                     trigger={
//                       <Button size="default" variant="outline">
//                         <SquarePen />
//                       </Button>
//                     }
//                   >
//                     {({ close }) => <PayrollForm payroll={p} onClose={close} />}
//                   </FormDialog>

//                   {/* DELETE */}
//                   <ConfirmDialog
//                     title="Delete Payroll?"
//                     description="This cannot be undone."
//                     trigger={
//                       <Button size="default" variant="destructive">
//                         <Trash />
//                       </Button>
//                     }
//                     onConfirm={async () => {
//                       const res = await deletePayroll(p.id);

//                       if (res.success) toast.success(res.message);
//                       else toast.error(res.message);
//                     }}
//                   />
//                 </TableCell>
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>

//       {/* PAGINATION */}
//       <div className="flex justify-between mt-2">
//         <div>
//           {[10, 20, 50, 100, -1].map((n) => (
//             <Button
//               key={n}
//               size="sm"
//               variant={perPage === n ? "default" : "outline"}
//               onClick={() => {
//                 setPerPage(n);
//                 setPage(1);
//               }}
//               className="ml-1"
//             >
//               {n === -1 ? "All" : n}
//             </Button>
//           ))}
//         </div>

//         <div className="space-x-2">
//           <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
//             Prev
//           </Button>

//           <span>
//             {page} / {totalPages}
//           </span>

//           <Button
//             disabled={page === totalPages}
//             onClick={() => setPage((p) => p + 1)}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { Payroll } from "../types";
import { deletePayroll } from "../payroll-actions";
import { toast } from "sonner";

import { useTable } from "@/hooks/use-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import PayrollForm from "./payroll-form";
import { BadgePlus, SquarePen, Trash } from "lucide-react";

export default function PayrollTable({ payrolls }: { payrolls: Payroll[] }) {
  const {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    paginated,
  } = useTable<Payroll>({
    data: payrolls,
    searchFn: (p, s) => {
      const dateStr = new Date(p.date).toLocaleDateString();

      return (
        p.employeeName.toLowerCase().includes(s) ||
        dateStr.includes(s) ||
        p.salary.toString().includes(s)
      );
    },
  });

  return (
    <div className="space-y-4">
      {/* SEARCH + ADD */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <input
            className="h-10 flex-1 border rounded-md px-3 text-sm"
            placeholder="Search payroll..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button
            variant="outline"
            className="h-10"
            onClick={() => setSearch("")}
          >
            Clear
          </Button>
        </div>

        <div className="flex justify-end">
          <FormDialog
            title="Add Payroll"
            trigger={
              <Button className="h-10">
                <BadgePlus />
                Add Payroll
              </Button>
            }
          >
            {({ close }) => <PayrollForm onClose={close} />}
          </FormDialog>
        </div>
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Employee</TableHead>
            <TableHead className="text-right">Salary</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>

              <TableCell>{p.employeeName}</TableCell>

              <TableCell className="text-right">
                ₱ {Number(p.salary).toLocaleString()}
              </TableCell>

              <TableCell className="text-right space-x-2">
                {/* EDIT */}
                <FormDialog
                  title="Edit Payroll"
                  trigger={
                    <Button size="default" variant="outline">
                      <SquarePen />
                    </Button>
                  }
                >
                  {({ close }) => <PayrollForm payroll={p} onClose={close} />}
                </FormDialog>

                {/* DELETE */}
                <ConfirmDialog
                  title="Delete Payroll?"
                  description="This cannot be undone."
                  trigger={
                    <Button size="default" variant="destructive">
                      <Trash />
                    </Button>
                  }
                  onConfirm={async () => {
                    const res = await deletePayroll(p.id);

                    if (res.success) {
                      toast.success(res.message);
                    } else {
                      toast.error(res.message);
                    }
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* PAGINATION */}
      <div className="flex justify-between mt-2">
        <div>
          {[10, 20, 50, 100, -1].map((n) => (
            <Button
              key={n}
              size="sm"
              variant={perPage === n ? "default" : "outline"}
              onClick={() => {
                setPerPage(n);
                setPage(1);
              }}
              className="ml-1"
            >
              {n === -1 ? "All" : n}
            </Button>
          ))}
        </div>

        <div className="space-x-2">
          <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Prev
          </Button>

          <span>
            {page} / {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
