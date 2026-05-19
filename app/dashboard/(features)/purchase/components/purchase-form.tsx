"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { createPurchase, updatePurchase } from "../purchase-actions";
import type { Purchase } from "../types";
import { toast } from "sonner";

export default function PurchaseForm({
  purchase,
  onClose,
}: {
  purchase?: Purchase;
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

    // ✅ EXACT SAME BEHAVIOR AS SALE (IMPORTANT)
    onClose?.();

    const res = purchase
      ? await updatePurchase(purchase.id, payload)
      : await createPurchase(payload);

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
          purchase?.date
            ? new Date(purchase.date).toISOString().split("T")[0]
            : ""
        }
        required
      />

      <Input
        name="particular"
        placeholder="Particular"
        defaultValue={purchase?.particular ?? ""}
        required
      />

      <Input
        name="receipt"
        placeholder="Receipt (optional)"
        defaultValue={purchase?.receipt ?? ""}
      />

      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Amount"
        defaultValue={purchase?.amount ?? ""}
        required
      />

      <Button className="w-full" disabled={loading}>
        {loading ? "Saving..." : purchase ? "Update" : "Save"}
      </Button>
    </form>
  );
}
