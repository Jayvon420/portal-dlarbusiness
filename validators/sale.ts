import { z } from "zod";

export const saleValidator = z.object({
  date: z.string().min(1),
  particular: z.string().min(1),
  receipt: z.string().optional(),
  amount: z.number().positive(),
});

export type SaleInput = z.infer<typeof saleValidator>;
