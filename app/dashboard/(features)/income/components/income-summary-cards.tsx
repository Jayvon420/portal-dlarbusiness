import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

export default function IncomeSummaryCards(props: any) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total Sales</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(props.totalSales)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>With Receipt</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(props.salesWithReceipt)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Without Receipt</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(props.salesWithoutReceipt)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchases</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(props.totalPurchases)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Expenses</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(props.totalExpenses)}</CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payroll</CardTitle>
        </CardHeader>
        <CardContent>{formatCurrency(props.totalPayroll)}</CardContent>
      </Card>
    </div>
  );
}
