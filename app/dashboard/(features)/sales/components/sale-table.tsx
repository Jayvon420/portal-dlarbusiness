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

import { deleteSale } from "../sale-actions";
import type { Sale } from "../types";
import { toast } from "sonner";

import { useTable } from "@/hooks/use-table";
import { FormDialog } from "@/components/shared/form-dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import SaleForm from "./sale-form";
import { BadgePlus, SquarePen, Trash } from "lucide-react";

export default function SaleTable({ sales }: { sales: Sale[] }) {
  const {
    search,
    setSearch,
    page,
    setPage,
    perPage,
    setPerPage,
    totalPages,
    paginated,
  } = useTable<Sale>({
    data: sales,
    searchFn: (sale, s) => {
      const dateStr = new Date(sale.date).toLocaleDateString();

      return (
        sale.particular.toLowerCase().includes(s) ||
        (sale.receipt ?? "").toLowerCase().includes(s) ||
        dateStr.includes(s) ||
        sale.amount.toString().includes(s)
      );
    },
  });

  return (
    <div className="space-y-4">
      {/* search and add button and clearbtn */}
      <div className="space-y-3">
        {/* ROW 1: SEARCH + CLEAR */}
        <div className="flex items-center gap-2">
          <input
            className="h-10 flex-1 border rounded-md px-3 text-sm"
            placeholder="Search sales..."
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

        {/* ROW 2: ADD (right SIDE) */}
        <div className="flex justify-end">
          <FormDialog
            title="Add Sale"
            trigger={
              <Button className="h-10">
                <BadgePlus />
                Add Sale
              </Button>
            }
          >
            {({ close }) => <SaleForm onClose={close} />}
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
          {paginated.map((sale) => (
            <TableRow key={sale.id}>
              <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>

              <TableCell>{sale.particular}</TableCell>
              <TableCell>{sale.receipt ?? "-"}</TableCell>

              <TableCell className="text-right">
                ₱ {sale.amount.toLocaleString()}
              </TableCell>

              <TableCell className="text-right space-x-2">
                {/* EDIT */}
                <FormDialog
                  title="Edit Sale"
                  trigger={
                    <Button size="default" variant="outline">
                      <SquarePen />
                    </Button>
                  }
                >
                  {({ close }) => <SaleForm sale={sale} onClose={close} />}
                </FormDialog>

                {/* DELETE */}
                <ConfirmDialog
                  title="Delete Sale?"
                  description="This cannot be undone."
                  trigger={
                    <Button size="default" variant="destructive">
                      <Trash />
                    </Button>
                  }
                  onConfirm={async () => {
                    const res = await deleteSale(sale.id);

                    if (res.success) {
                      toast.success("Deleted");
                    } else {
                      toast.error(res.message || "Failed");
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
