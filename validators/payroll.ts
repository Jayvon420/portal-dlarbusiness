import { z } from "zod";

export const payrollValidator = z.object({
  date: z.string().min(1),
  employeeName: z.string().min(1),

  salary: z.coerce.number(),
  late: z.coerce.number().default(0),
  sss: z.coerce.number().default(0),
  hdmf: z.coerce.number().default(0),
  phic: z.coerce.number().default(0),

  netPay: z.coerce.number(),
});

export type PayrollInput = z.infer<typeof payrollValidator>;
