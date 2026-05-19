import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

type SummaryCardsProps = {
  totalSales: number;
  salesWithReceipt: number;
  salesWithoutReceipt: number;
  totalPurchases: number;
  totalExpenses: number;
  totalPayroll: number;
  netIncome: number;
};

export default function SummaryCards({
  totalSales,
  salesWithReceipt,
  salesWithoutReceipt,
  totalPurchases,
  totalExpenses,
  totalPayroll,
  netIncome,
}: SummaryCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {/* 1. TOTAL SALES */}
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(totalSales)}</CardContent>
      </Card>

      {/* 2. SALES BREAKDOWN */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Breakdown</CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">With Receipt</span>
            <span className="font-medium">
              {formatCurrency(salesWithReceipt)}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Without Receipt</span>
            <span className="font-medium">
              {formatCurrency(salesWithoutReceipt)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* 3. PURCHASES */}
      <Card>
        <CardHeader>
          <CardTitle>Purchases</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(totalPurchases)}</CardContent>
      </Card>

      {/* 4. EXPENSES */}
      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(totalExpenses)}</CardContent>
      </Card>

      {/* 5. PAYROLL */}
      <Card>
        <CardHeader>
          <CardTitle>Payroll</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(totalPayroll)}</CardContent>
      </Card>

      {/* 6. NET INCOME */}
      <Card>
        <CardHeader>
          <CardTitle>Net Income</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(netIncome)}</CardContent>
      </Card>
    </div>
  );
}
