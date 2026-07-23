"use client";

import { useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DashboardCards from "./dashboard-cards";
import SalesChart from "./sales-chart";

import {
  DashboardRange,
  DashboardRecord,
  filterRecords,
  calculateTotal,
  buildChartData,
} from "../dashboard-utils";

type User = {
  firstName: string;
};

type Props = {
  user: User;
  sales: DashboardRecord[];
  expenses: DashboardRecord[];
  payroll: DashboardRecord[];
  purchases: DashboardRecord[];
};

export default function DashboardClient({
  user,
  sales,
  expenses,
  payroll,
  purchases,
}: Props) {
  const [range, setRange] = useState<DashboardRange>("7d");

  // Filter records based on selected range
  const filteredSales = useMemo(
    () => filterRecords(sales, range),
    [sales, range],
  );

  const filteredExpenses = useMemo(
    () => filterRecords(expenses, range),
    [expenses, range],
  );

  const filteredPayroll = useMemo(
    () => filterRecords(payroll, range),
    [payroll, range],
  );

  const filteredPurchases = useMemo(
    () => filterRecords(purchases, range),
    [purchases, range],
  );

  // Calculate totals
  const totalSales = calculateTotal(filteredSales);
  const totalExpenses = calculateTotal(filteredExpenses);
  const totalPayroll = calculateTotal(filteredPayroll);
  const totalPurchases = calculateTotal(filteredPurchases);

  const netProfit = totalSales - totalExpenses - totalPayroll - totalPurchases;

  // Build chart data
  const chartData = useMemo(
    () => buildChartData(filteredSales, range),
    [filteredSales, range],
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">
          Welcome back, {user.firstName}
        </h1>

        <p className="text-sm text-muted-foreground">
          Here's your business overview
        </p>
      </div>

      {/* KPI Cards */}
      <DashboardCards
        totalSales={totalSales}
        totalExpenses={totalExpenses}
        totalPayroll={totalPayroll}
        totalPurchases={totalPurchases}
        netProfit={netProfit}
      />

      {/* Sales Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>

          <CardDescription>Revenue performance trend</CardDescription>
        </CardHeader>

        <CardContent>
          <SalesChart chartData={chartData} range={range} setRange={setRange} />
        </CardContent>
      </Card>
    </div>
  );
}
