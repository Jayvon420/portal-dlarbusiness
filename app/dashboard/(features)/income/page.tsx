import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getUserId } from "@/lib/auth";
import { buildIncome } from "./income-engine";

import IncomeClient from "./components/income-client";

type Props = {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
  }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;

  const userId = await getUserId();
  if (!userId) return notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      sales: true,
      purchases: true,
      expenses: true,
      payrolls: true,
    },
  });

  if (!user) return notFound();

  // 🔥 Prisma → safe JSON conversion
  const data = {
    sales: user.sales.map((s) => ({
      id: s.id,
      amount: Number(s.amount),
      date: s.date.toISOString(),
      receipt: !!s.receipt,
    })),
    purchases: user.purchases.map((p) => ({
      id: p.id,
      amount: Number(p.amount),
      date: p.date.toISOString(),
    })),
    expenses: user.expenses.map((e) => ({
      id: e.id,
      amount: Number(e.amount),
      date: e.date.toISOString(),
    })),
    payrolls: user.payrolls.map((p) => ({
      id: p.id,
      netPay: Number(p.netPay),
      date: p.date.toISOString(),
    })),
  };

  const income = buildIncome({
    data,
    startDate: params.startDate,
    endDate: params.endDate,
  });

  return (
    <div className="p-6 space-y-6">
      <IncomeClient
        data={data}
        income={income}
        startDate={params.startDate}
        endDate={params.endDate}
      />
    </div>
  );
}
