"use client";

import IncomeFilters from "./income-filters";
import IncomeSummaryCards from "./income-summary-cards";
import IncomeStatement from "./income-statement";
import IncomeBreakdown from "./income-breakdown";

export default function IncomeClient({
  data,
  income,
  startDate,
  endDate,
}: any) {
  return (
    <div className="space-y-6">
      <IncomeFilters />

      <IncomeSummaryCards {...income} />

      <IncomeStatement {...income} />

      <IncomeBreakdown
        salesWithReceipt={income.salesWithReceipt}
        salesWithoutReceipt={income.salesWithoutReceipt}
        totalPurchases={income.totalPurchases}
        totalExpenses={income.totalExpenses}
        totalPayroll={income.totalPayroll}
      />
    </div>
  );
}
