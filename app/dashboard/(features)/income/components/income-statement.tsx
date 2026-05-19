"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/format";

export default function IncomeStatement({
  totalSales,
  salesWithReceipt,
  salesWithoutReceipt,
  totalPurchases,
  totalExpenses,
  totalPayroll,
}: any) {
  const [mode, setMode] = useState("overall");

  const sales =
    mode === "with"
      ? salesWithReceipt
      : mode === "without"
        ? salesWithoutReceipt
        : totalSales;

  const net = sales - totalPurchases - totalExpenses - totalPayroll;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Statement</CardTitle>

        <Tabs value={mode} onValueChange={setMode as any}>
          <TabsList>
            <TabsTrigger value="overall">Overall</TabsTrigger>
            <TabsTrigger value="with">With Receipt</TabsTrigger>
            <TabsTrigger value="without">Without Receipt</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span>Sales</span>
          <span>{formatCurrency(sales)}</span>
        </div>

        <Separator />

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

        <div className="flex justify-between font-bold text-lg">
          <span>Net Income</span>
          <span>{formatCurrency(net)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
