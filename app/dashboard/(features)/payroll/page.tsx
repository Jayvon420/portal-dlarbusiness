import { getPayrolls } from "./payroll-actions";
import PurchaseTable from "./components/payroll-table";

export default async function PayrollPage() {
  const payrolls = await getPayrolls();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Payrolls</h1>

      <PurchaseTable payrolls={payrolls} />
    </div>
  );
}
