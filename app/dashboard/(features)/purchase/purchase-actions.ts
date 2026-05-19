"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/auth";
import { purchaseValidator } from "@/validators/purchase";

export async function getPurchases() {
  const userId = await getUserId();
  if (!userId) return [];

  const purchases = await prisma.purchase.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return purchases.map((p) => ({
    id: p.id,
    date: p.date,
    particular: p.particular,
    receipt: p.receipt,
    amount: Number(p.amount),
    createdAt: p.createdAt,
  }));
}

export async function createPurchase(data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = purchaseValidator.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  await prisma.purchase.create({
    data: {
      userId,
      date: new Date(parsed.data.date),
      particular: parsed.data.particular,
      receipt: parsed.data.receipt || null,
      amount: parsed.data.amount,
    },
  });

  revalidatePath("/dashboard/purchase");
  return { success: true, message: "Purchase created" };
}

export async function updatePurchase(id: string, data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = purchaseValidator.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const existing = await prisma.purchase.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.purchase.update({
    where: { id },
    data: {
      date: new Date(parsed.data.date),
      particular: parsed.data.particular,
      receipt: parsed.data.receipt || null,
      amount: parsed.data.amount,
    },
  });

  revalidatePath("/dashboard/purchase");
  return { success: true, message: "Purchase updated" };
}

export async function deletePurchase(id: string) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const existing = await prisma.purchase.findUnique({ where: { id } });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.purchase.delete({ where: { id } });

  revalidatePath("/dashboard/purchase");
  return { success: true, message: "Purchase deleted" };
}
