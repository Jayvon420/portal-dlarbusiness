import { getExpenses } from "./expenses-actions";
import ExpensesTable from "./components/expenses-table";

export default async function ExpensesPage() {
  const expenses = await getExpenses();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Expenses</h1>

      <ExpensesTable expenses={expenses} />
    </div>
  );
}
