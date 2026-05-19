import { getPurchases } from "./purchase-actions";
import PurchaseTable from "./components/purchase-table";

export default async function PurchasePage() {
  const purchases = await getPurchases();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Purchase</h1>

      <PurchaseTable purchases={purchases} />
    </div>
  );
}
