import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  totalSales: number;
  totalExpenses: number;
  totalPayroll: number;
  totalPurchases: number;
  netProfit: number;
};

export default function DashboardCards({
  totalSales,
  totalExpenses,
  totalPayroll,
  totalPurchases,
  netProfit,
}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
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
          <CardDescription>Purchases</CardDescription>

          <CardTitle className="text-orange-500">
            ₱{totalPurchases.toLocaleString()}
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
    </div>
  );
}
