"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/auth";
import { expenseValidator } from "@/validators/expense";

export async function getExpenses() {
  const userId = await getUserId();
  if (!userId) return [];

  const expenses = await prisma.expense.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return expenses.map((e) => ({
    id: e.id,
    date: e.date,
    expenseType: e.expenseType,
    receipt: e.receipt,
    createdAt: e.createdAt,
    amount: Number(e.amount),
  }));
}

export async function createExpense(data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = expenseValidator.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  await prisma.expense.create({
    data: {
      userId,
      date: new Date(parsed.data.date),
      expenseType: parsed.data.expenseType,
      receipt: parsed.data.receipt || null,
      amount: parsed.data.amount,
    },
  });

  revalidatePath("/dashboard/expenses");
  return { success: true, message: "Expense created" };
}

export async function updateExpense(id: string, data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = expenseValidator.safeParse(data);
  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const existing = await prisma.expense.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.expense.update({
    where: { id },
    data: {
      date: new Date(parsed.data.date),
      expenseType: parsed.data.expenseType,
      receipt: parsed.data.receipt || null,
      amount: parsed.data.amount,
    },
  });

  revalidatePath("/dashboard/expenses");
  return { success: true, message: "Expense updated" };
}

export async function deleteExpense(id: string) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const existing = await prisma.expense.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.expense.delete({ where: { id } });

  revalidatePath("/dashboard/expenses");
  return { success: true, message: "Expense deleted" };
}
