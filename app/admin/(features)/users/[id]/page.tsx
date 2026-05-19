import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

import UserHeader from "./components/user-header";
import SummaryCards from "./components/summary-cards";
import DateFilter from "./components/date-filter";
import IncomeStatement from "./components/income-statement";

type Props = {
  params: Promise<{
    id: string;
  }>;

  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
  }>;
};

export default async function Page({ params, searchParams }: Props) {
  const { id } = await params;

  const { startDate, endDate } = await searchParams;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },

    include: {
      sales: true,
      purchases: true,
      expenses: true,
      payrolls: true,
    },
  });

  if (!user) {
    return notFound();
  }

  /* DATE FILTER */
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;

  const filterByDate = (date: Date) => {
    if (start && date < start) return false;
    if (end && date > end) return false;
    return true;
  };

  /* SALES */
  const filteredSales = user.sales.filter((sale) => filterByDate(sale.date));

  const totalSales = filteredSales.reduce(
    (sum, sale) => sum + Number(sale.amount),
    0,
  );

  const salesWithReceipt = filteredSales
    .filter((sale) => sale.receipt)
    .reduce((sum, sale) => sum + Number(sale.amount), 0);

  const salesWithoutReceipt = filteredSales
    .filter((sale) => !sale.receipt)
    .reduce((sum, sale) => sum + Number(sale.amount), 0);

  /* PURCHASES */
  const totalPurchases = user.purchases
    .filter((item) => filterByDate(item.date))
    .reduce((sum, item) => sum + Number(item.amount), 0);

  /* EXPENSES */
  const totalExpenses = user.expenses
    .filter((item) => filterByDate(item.date))
    .reduce((sum, item) => sum + Number(item.amount), 0);

  /* PAYROLL */
  const totalPayroll = user.payrolls
    .filter((item) => filterByDate(item.date))
    .reduce((sum, item) => sum + Number(item.netPay), 0);

  /* NET */
  const netIncome = totalSales - totalPurchases - totalExpenses - totalPayroll;

  return (
    <div className="space-y-6 p-6">
      {/* USER HEADER */}
      <UserHeader
        name={`${user.firstName} ${user.lastName}`}
        email={user.email}
        role={user.role}
      />

      {/* DATE FILTER */}
      <DateFilter />

      {/* SUMMARY */}
      <SummaryCards
        totalSales={totalSales}
        salesWithReceipt={salesWithReceipt}
        salesWithoutReceipt={salesWithoutReceipt}
        totalPurchases={totalPurchases}
        totalExpenses={totalExpenses}
        totalPayroll={totalPayroll}
        netIncome={netIncome}
      />

      {/* INCOME STATEMENT */}
      <IncomeStatement
        totalSales={totalSales}
        salesWithReceipt={salesWithReceipt}
        salesWithoutReceipt={salesWithoutReceipt}
        totalPurchases={totalPurchases}
        totalExpenses={totalExpenses}
        totalPayroll={totalPayroll}
      />
    </div>
  );
}
