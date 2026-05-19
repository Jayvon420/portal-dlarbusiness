import { startOfDay, endOfDay, parseISO } from "date-fns";

export function isWithinDate(
  date: string,
  startDate?: string,
  endDate?: string,
) {
  const current = parseISO(date);

  if (startDate) {
    const start = startOfDay(parseISO(startDate));
    if (current < start) return false;
  }

  if (endDate) {
    const end = endOfDay(parseISO(endDate));
    if (current > end) return false;
  }

  return true;
}

export function toNumber(value: any): number {
  if (value === null || value === undefined) return 0;
  return Number(value);
}
