import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import SalesChart from "./sales-chart";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) return null;

  const [salesAgg, expensesAgg, payrollAgg, purchasesAgg, rawSales] =
    await Promise.all([
      prisma.sale.aggregate({
        where: {
          userId: user.id,
        },

        _sum: {
          amount: true,
        },
      }),

      prisma.expense.aggregate({
        where: {
          userId: user.id,
        },

        _sum: {
          amount: true,
        },
      }),

      prisma.payroll.aggregate({
        where: {
          userId: user.id,
        },

        _sum: {
          netPay: true,
        },
      }),

      prisma.purchase.aggregate({
        where: {
          userId: user.id,
        },

        _sum: {
          amount: true,
        },
      }),

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
    ]);
  const totalSales = Number(salesAgg._sum.amount || 0);

  const totalExpenses = Number(expensesAgg._sum.amount || 0);

  const totalPayroll = Number(payrollAgg._sum.netPay || 0);

  const totalPurchases = Number(purchasesAgg._sum.amount || 0);

  const netProfit = totalSales - totalExpenses - totalPayroll - totalPurchases;

  const sales = rawSales.map((sale) => ({
    id: sale.id,
    amount: Number(sale.amount),
    date: sale.date,
  }));

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {user.firstName}
        </h1>

        <p className="text-sm text-muted-foreground">
          Here’s your business overview
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Sales</CardDescription>

            <CardTitle>₱{totalSales.toLocaleString()}</CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Expenses</CardDescription>

            <CardTitle className="text-red-500">
              ₱{totalExpenses.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Net Profit</CardDescription>

            <CardTitle
              className={netProfit >= 0 ? "text-green-600" : "text-red-500"}
            >
              ₱{netProfit.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Payroll</CardDescription>

            <CardTitle className="text-blue-500">
              ₱{totalPayroll.toLocaleString()}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* CHART */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>

          <CardDescription>Revenue performance trend</CardDescription>
        </CardHeader>

        <CardContent>
          <SalesChart sales={sales} />
        </CardContent>
      </Card>
    </div>
  );
}
