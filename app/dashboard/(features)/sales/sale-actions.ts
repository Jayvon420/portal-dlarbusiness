"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/auth";
import { saleValidator } from "@/validators/sale";

export async function getSales() {
  const userId = await getUserId();
  if (!userId) return [];

  const sales = await prisma.sale.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return sales.map((s) => ({
    id: s.id,
    date: s.date,
    particular: s.particular,
    receipt: s.receipt,
    createdAt: s.createdAt,
    amount: Number(s.amount),
  }));
}

export async function createSale(data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = saleValidator.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  await prisma.sale.create({
    data: {
      userId,
      date: new Date(parsed.data.date),
      particular: parsed.data.particular,
      receipt: parsed.data.receipt || null,
      amount: parsed.data.amount,
    },
  });

  revalidatePath("/dashboard/sales");
  return { success: true, message: "Sale created" };
}

export async function updateSale(id: string, data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = saleValidator.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const existing = await prisma.sale.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.sale.update({
    where: { id },
    data: {
      date: new Date(parsed.data.date),
      particular: parsed.data.particular,
      receipt: parsed.data.receipt || null,
      amount: parsed.data.amount,
    },
  });

  revalidatePath("/dashboard/sales");
  return { success: true, message: "Sale updated" };
}

export async function deleteSale(id: string) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const existing = await prisma.sale.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.sale.delete({ where: { id } });

  revalidatePath("/dashboard/sales");
  return { success: true, message: "Sale deleted" };
}
