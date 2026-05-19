import { z } from "zod";

export const expenseValidator = z.object({
  date: z.string().min(1),
  expenseType: z.string().min(1),
  receipt: z.string().optional(),
  amount: z.number().positive(),
});

export type ExpenseInput = z.infer<typeof expenseValidator>;
