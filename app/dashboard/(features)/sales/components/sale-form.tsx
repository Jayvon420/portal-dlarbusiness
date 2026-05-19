"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createSale, updateSale } from "../sale-actions";
import type { Sale } from "../types";
import { toast } from "sonner";

export default function SaleForm({
  sale,
  onClose,
}: {
  sale?: Sale;
  onClose?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      date: String(form.get("date") || ""),
      particular: String(form.get("particular") || ""),
      receipt: String(form.get("receipt") || ""),
      amount: Number(form.get("amount") || 0),
    };

    setLoading(true);

    onClose?.();

    const res = sale
      ? await updateSale(sale.id, payload)
      : await createSale(payload);

    if (res.success) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="date"
        type="date"
        defaultValue={
          sale ? new Date(sale.date).toISOString().split("T")[0] : ""
        }
        required
      />

      <Input
        name="particular"
        placeholder="Particular"
        defaultValue={sale?.particular ?? ""}
        required
      />

      <Input
        name="receipt"
        placeholder="Receipt (optional)"
        defaultValue={sale?.receipt ?? ""}
      />

      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Amount"
        defaultValue={sale ? sale.amount : ""}
        required
      />

      <Button className="w-full" disabled={loading}>
        {loading ? "Saving..." : sale ? "Update" : "Save"}
      </Button>
    </form>
  );
}
