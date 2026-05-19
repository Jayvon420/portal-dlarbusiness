"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";

type IncomeStatementProps = {
  totalSales: number;
  salesWithReceipt: number;
  salesWithoutReceipt: number;
  totalPurchases: number;
  totalExpenses: number;
  totalPayroll: number;
};

type SalesMode = "overall" | "with" | "without";

export default function IncomeStatement({
  totalSales,
  salesWithReceipt,
  salesWithoutReceipt,
  totalPurchases,
  totalExpenses,
  totalPayroll,
}: IncomeStatementProps) {
  const [mode, setMode] = useState<SalesMode>("overall");

  const selectedSales =
    mode === "with"
      ? salesWithReceipt
      : mode === "without"
        ? salesWithoutReceipt
        : totalSales;

  const netIncome =
    selectedSales - totalPurchases - totalExpenses - totalPayroll;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Statement</CardTitle>

        {/* CLEAN TABS */}
        <Tabs
          value={mode}
          onValueChange={(v) => setMode(v as SalesMode)}
          className="mt-3"
        >
          <TabsList>
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="with">With Receipt</TabsTrigger>
            <TabsTrigger value="without">Without Receipt</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* SALES */}
        <div className="flex justify-between font-medium">
          <span>Sales</span>
          <span>{formatCurrency(selectedSales)}</span>
        </div>

        <Separator />

        {/* EXPENSES */}
        <div className="flex justify-between">
          <span>Purchases</span>
          <span>-{formatCurrency(totalPurchases)}</span>
        </div>

        <div className="flex justify-between">
          <span>Expenses</span>
          <span>-{formatCurrency(totalExpenses)}</span>
        </div>

        <div className="flex justify-between">
          <span>Payroll</span>
          <span>-{formatCurrency(totalPayroll)}</span>
        </div>

        <Separator />

        {/* NET INCOME */}
        <div className="flex justify-between font-bold text-lg">
          <span>Net Income</span>
          <span>{formatCurrency(netIncome)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
