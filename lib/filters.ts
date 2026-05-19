import { endOfDay, startOfDay } from "date-fns";

export function createDateFilter(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) {
    return {};
  }

  return {
    createdAt: {
      ...(startDate && {
        gte: startOfDay(new Date(startDate)),
      }),
      ...(endDate && {
        lte: endOfDay(new Date(endDate)),
      }),
    },
  };
}

export function createBusinessDateFilter(startDate?: string, endDate?: string) {
  if (!startDate && !endDate) {
    return {};
  }

  return {
    date: {
      ...(startDate && {
        gte: startOfDay(new Date(startDate)),
      }),
      ...(endDate && {
        lte: endOfDay(new Date(endDate)),
      }),
    },
  };
}
