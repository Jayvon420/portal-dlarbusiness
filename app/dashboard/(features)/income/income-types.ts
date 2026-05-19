export type IncomeSale = {
  id: string;
  amount: number;
  date: string;
  receipt: boolean;
};

export type IncomePurchase = {
  id: string;
  amount: number;
  date: string;
};

export type IncomeExpense = {
  id: string;
  amount: number;
  date: string;
};

export type IncomePayroll = {
  id: string;
  netPay: number;
  date: string;
};

export type IncomeData = {
  sales: IncomeSale[];
  purchases: IncomePurchase[];
  expenses: IncomeExpense[];
  payrolls: IncomePayroll[];
};

export type IncomeResult = {
  totalSales: number;
  salesWithReceipt: number;
  salesWithoutReceipt: number;
  totalPurchases: number;
  totalExpenses: number;
  totalPayroll: number;
  netIncome: number;
};
