export function calculateTotal<T>(items: T[], key: keyof T) {
  return items.reduce((acc, item) => {
    const value = item[key];

    if (!value) return acc;

    return acc + Number(value);
  }, 0);
}

export function calculateNetIncome({
  sales,
  purchases,
  expenses,
  payroll,
}: {
  sales: number;
  purchases: number;
  expenses: number;
  payroll: number;
}) {
  return sales - purchases - expenses - payroll;
}

export function calculateSalesWithReceipt<T>(
  items: T[],
  amountKey: keyof T,
  receiptKey: keyof T,
) {
  return items
    .filter((item) => Boolean(item[receiptKey]))
    .reduce((acc, item) => {
      const value = item[amountKey];
      if (!value) return acc;
      return acc + Number(value);
    }, 0);
}

export function calculateSalesWithoutReceipt<T>(
  items: T[],
  amountKey: keyof T,
  receiptKey: keyof T,
) {
  return items
    .filter((item) => !item[receiptKey])
    .reduce((acc, item) => {
      const value = item[amountKey];
      if (!value) return acc;
      return acc + Number(value);
    }, 0);
}
