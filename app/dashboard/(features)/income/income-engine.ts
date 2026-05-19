import { IncomeData, IncomeResult } from "./income-types";
import { isWithinDate, toNumber } from "./income-utils";

type Params = {
  data: IncomeData;
  startDate?: string;
  endDate?: string;
};

export function buildIncome({
  data,
  startDate,
  endDate,
}: Params): IncomeResult {
  const sales = data.sales.filter((s) =>
    isWithinDate(s.date, startDate, endDate),
  );

  const purchases = data.purchases.filter((p) =>
    isWithinDate(p.date, startDate, endDate),
  );

  const expenses = data.expenses.filter((e) =>
    isWithinDate(e.date, startDate, endDate),
  );

  const payrolls = data.payrolls.filter((p) =>
    isWithinDate(p.date, startDate, endDate),
  );

  const totalSales = sales.reduce((a, b) => a + toNumber(b.amount), 0);

  const salesWithReceipt = sales
    .filter((s) => s.receipt)
    .reduce((a, b) => a + toNumber(b.amount), 0);

  const salesWithoutReceipt = sales
    .filter((s) => !s.receipt)
    .reduce((a, b) => a + toNumber(b.amount), 0);

  const totalPurchases = purchases.reduce((a, b) => a + toNumber(b.amount), 0);

  const totalExpenses = expenses.reduce((a, b) => a + toNumber(b.amount), 0);

  const totalPayroll = payrolls.reduce((a, b) => a + toNumber(b.netPay), 0);

  const netIncome = totalSales - totalPurchases - totalExpenses - totalPayroll;

  return {
    totalSales,
    salesWithReceipt,
    salesWithoutReceipt,
    totalPurchases,
    totalExpenses,
    totalPayroll,
    netIncome,
  };
}
