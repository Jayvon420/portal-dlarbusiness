"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { createExpense, updateExpense } from "../expenses-actions";
import type { Expense } from "../types";
import { toast } from "sonner";

export default function ExpensesForm({
  expense,
  onClose,
}: {
  expense?: Expense;
  onClose?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = new FormData(e.currentTarget);

    const payload = {
      date: String(form.get("date") || ""),
      expenseType: String(form.get("expenseType") || ""),
      receipt: String(form.get("receipt") || ""),
      amount: Number(form.get("amount") || 0),
    };

    setLoading(true);

    onClose?.();

    const res = expense
      ? await updateExpense(expense.id, payload)
      : await createExpense(payload);

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
          expense ? new Date(expense.date).toISOString().split("T")[0] : ""
        }
        required
      />

      <Input
        name="expenseType"
        placeholder="Expense Type"
        defaultValue={expense?.expenseType ?? ""}
        required
      />

      <Input
        name="receipt"
        placeholder="Receipt (optional)"
        defaultValue={expense?.receipt ?? ""}
      />
      <Input
        name="amount"
        type="number"
        step="0.01"
        placeholder="Amount"
        defaultValue={expense ? expense.amount : ""}
        required
      />

      <Button className="w-full" disabled={loading}>
        {loading ? "Saving..." : expense ? "Update" : "Save"}
      </Button>
    </form>
  );
}
