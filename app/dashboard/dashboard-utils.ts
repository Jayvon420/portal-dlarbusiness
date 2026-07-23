export type DashboardRecord = {
  id: string;
  amount: number;
  date: Date;
};

export type DashboardRange = "7d" | "3m" | "1y";

export function filterRecords(
  records: DashboardRecord[],
  range: DashboardRange,
) {
  const now = new Date();

  return records.filter((record) => {
    const date = new Date(record.date);

    if (range === "7d") {
      const start = new Date();
      start.setDate(now.getDate() - 6);

      return date >= start;
    }

    if (range === "3m") {
      const start = new Date(now.getFullYear(), now.getMonth() - 2, 1);

      return date >= start;
    }

    return date.getFullYear() === now.getFullYear();
  });
}

export function calculateTotal(records: DashboardRecord[]) {
  return records.reduce((sum, item) => sum + item.amount, 0);
}

export function buildChartData(
  sales: DashboardRecord[],
  range: DashboardRange,
) {
  const now = new Date();

  if (range === "7d") {
    return Array.from({ length: 7 }, (_, index) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - index));

      return {
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        total: sales
          .filter(
            (sale) => new Date(sale.date).toDateString() === d.toDateString(),
          )
          .reduce((sum, sale) => sum + sale.amount, 0),
      };
    });
  }

  if (range === "3m") {
    return Array.from({ length: 3 }, (_, index) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (2 - index), 1);

      return {
        label: d.toLocaleDateString("en-US", {
          month: "short",
        }),
        total: sales
          .filter((sale) => {
            const sd = new Date(sale.date);

            return (
              sd.getMonth() === d.getMonth() &&
              sd.getFullYear() === d.getFullYear()
            );
          })
          .reduce((sum, sale) => sum + sale.amount, 0),
      };
    });
  }

  return Array.from({ length: 12 }, (_, index) => ({
    label: new Date(0, index).toLocaleDateString("en-US", {
      month: "short",
    }),
    total: sales
      .filter((sale) => {
        const sd = new Date(sale.date);

        return (
          sd.getMonth() === index && sd.getFullYear() === now.getFullYear()
        );
      })
      .reduce((sum, sale) => sum + sale.amount, 0),
  }));
}
