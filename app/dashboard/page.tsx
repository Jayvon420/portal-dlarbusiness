import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import DashboardClient from "./components/dashboard-client";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [rawSales, rawExpenses, rawPayroll, rawPurchases] = await Promise.all([
    prisma.sale.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        amount: true,
        date: true,
      },
    }),

    prisma.expense.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        amount: true,
        date: true,
      },
    }),

    prisma.payroll.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        netPay: true,
        date: true,
      },
    }),

    prisma.purchase.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        date: "asc",
      },
      select: {
        id: true,
        amount: true,
        date: true,
      },
    }),
  ]);

  const sales = rawSales.map((sale) => ({
    id: sale.id,
    amount: Number(sale.amount),
    date: sale.date,
  }));

  const expenses = rawExpenses.map((expense) => ({
    id: expense.id,
    amount: Number(expense.amount),
    date: expense.date,
  }));

  const payroll = rawPayroll.map((item) => ({
    id: item.id,
    amount: Number(item.netPay),
    date: item.date,
  }));

  const purchases = rawPurchases.map((purchase) => ({
    id: purchase.id,
    amount: Number(purchase.amount),
    date: purchase.date,
  }));

  return (
    <DashboardClient
      user={user}
      sales={sales}
      expenses={expenses}
      payroll={payroll}
      purchases={purchases}
    />
  );
}
