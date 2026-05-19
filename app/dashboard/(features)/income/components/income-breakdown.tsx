import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/format";

export default function IncomeBreakdown(props: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Breakdown</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span>Sales (With Receipt)</span>
          <span>{formatCurrency(props.salesWithReceipt)}</span>
        </div>

        <div className="flex justify-between">
          <span>Sales (Without Receipt)</span>
          <span>{formatCurrency(props.salesWithoutReceipt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
