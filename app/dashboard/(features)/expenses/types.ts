export type Expense = {
  id: string;
  date: Date;
  expenseType: string;
  receipt: string | null;
  amount: number;
  createdAt: Date;
};
