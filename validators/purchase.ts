import { z } from "zod";

export const purchaseValidator = z.object({
  date: z.string().min(1),
  particular: z.string().min(1),
  receipt: z.string().optional().or(z.literal("")),
  amount: z.number().min(0),
});
