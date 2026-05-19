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

import { useTable } from "@/hooks/use-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

import type { Purchase } from "../types";
import { deletePurchase } from "../purchase-actions";
import PurchaseForm from "./purchase-form";
import { toast } from "sonner";
import { BadgePlus, SquarePen, Trash } from "lucide-react";

export default function PurchaseTable({
  purchases,
}: {
  purchases: Purchase[];
}) {
  const {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    paginated,
  } = useTable<Purchase>({
    data: purchases,
    searchFn: (p, s) => {
      const dateStr = new Date(p.date).toLocaleDateString();

      return (
        p.particular.toLowerCase().includes(s) ||
        (p.receipt ?? "").toLowerCase().includes(s) ||
        dateStr.includes(s) ||
        p.amount.toString().includes(s)
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
            placeholder="Search purchases..."
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
            title="Add Purchase"
            trigger={
              <Button className="h-10">
                <BadgePlus />
                Add Purchase
              </Button>
            }
          >
            {({ close }) => <PurchaseForm onClose={close} />}
          </FormDialog>
        </div>
      </div>

      {/* TABLE */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Particular</TableHead>
            <TableHead>Receipt</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginated.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>

              <TableCell>{p.particular}</TableCell>
              <TableCell>{p.receipt ?? "-"}</TableCell>

              <TableCell className="text-right">
                ₱ {p.amount.toLocaleString()}
              </TableCell>

              <TableCell className="text-right space-x-2">
                {/* EDIT */}
                <FormDialog
                  title="Edit Purchase"
                  trigger={
                    <Button size="default" variant="outline">
                      <SquarePen />
                    </Button>
                  }
                >
                  {({ close }) => <PurchaseForm purchase={p} onClose={close} />}
                </FormDialog>

                {/* DELETE */}
                <ConfirmDialog
                  title="Delete Purchase?"
                  description="This cannot be undone."
                  trigger={
                    <Button size="default" variant="destructive">
                      <Trash />
                    </Button>
                  }
                  onConfirm={async () => {
                    const res = await deletePurchase(p.id);

                    if (res.success) toast.success(res.message);
                    else toast.error(res.message);
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
