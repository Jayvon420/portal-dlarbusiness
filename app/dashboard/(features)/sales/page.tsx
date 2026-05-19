import { getSales } from "./sale-actions";
import SaleTable from "./components/sale-table";

export default async function SalesPage() {
  const sales = await getSales();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sales</h1>

      <SaleTable sales={sales} />
    </div>
  );
}
