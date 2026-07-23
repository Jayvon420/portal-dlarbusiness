// "use server";

// import { prisma } from "@/lib/prisma";
// import { revalidatePath } from "next/cache";
// import { getUserId } from "@/lib/auth";
// import { payrollValidator } from "@/validators/payroll";

// export async function getPayrolls() {
//   const userId = await getUserId();
//   if (!userId) return [];

//   const data = await prisma.payroll.findMany({
//     where: { userId },
//     orderBy: { createdAt: "desc" },
//   });

//   return data.map((p) => ({
//     ...p,
//     salary: Number(p.salary),
//     late: Number(p.late),
//     sss: Number(p.sss),
//     hdmf: Number(p.hdmf),
//     phic: Number(p.phic),
//     netPay: Number(p.netPay),
//   }));
// }

// export async function createPayroll(data: unknown) {
//   const userId = await getUserId();
//   if (!userId) return { success: false, message: "Unauthorized" };

//   const parsed = payrollValidator.safeParse(data);
//   if (!parsed.success) {
//     return { success: false, message: "Invalid data" };
//   }

//   await prisma.payroll.create({
//     data: {
//       userId,
//       date: new Date(parsed.data.date),
//       employeeName: parsed.data.employeeName,
//       salary: parsed.data.salary,
//       late: parsed.data.late,
//       sss: parsed.data.sss,
//       hdmf: parsed.data.hdmf,
//       phic: parsed.data.phic,
//       netPay: parsed.data.netPay,
//     },
//   });

//   revalidatePath("/dashboard/payroll");
//   return { success: true, message: "Payroll created" };
// }

// export async function updatePayroll(id: string, data: unknown) {
//   const userId = await getUserId();
//   if (!userId) return { success: false, message: "Unauthorized" };

//   const parsed = payrollValidator.safeParse(data);
//   if (!parsed.success) {
//     return { success: false, message: "Invalid data" };
//   }

//   const existing = await prisma.payroll.findUnique({ where: { id } });

//   if (!existing || existing.userId !== userId) {
//     return { success: false, message: "Not found" };
//   }

//   await prisma.payroll.update({
//     where: { id },
//     data: {
//       date: new Date(parsed.data.date),
//       employeeName: parsed.data.employeeName,
//       salary: parsed.data.salary,
//       late: parsed.data.late,
//       sss: parsed.data.sss,
//       hdmf: parsed.data.hdmf,
//       phic: parsed.data.phic,
//       netPay: parsed.data.netPay,
//     },
//   });

//   revalidatePath("/dashboard/payroll");
//   return { success: true, message: "Payroll updated" };
// }

// export async function deletePayroll(id: string) {
//   const userId = await getUserId();
//   if (!userId) return { success: false, message: "Unauthorized" };

//   const existing = await prisma.payroll.findUnique({ where: { id } });

//   if (!existing || existing.userId !== userId) {
//     return { success: false, message: "Not found" };
//   }

//   await prisma.payroll.delete({ where: { id } });

//   revalidatePath("/dashboard/payroll");
//   return { success: true, message: "Payroll deleted" };
// }

"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/lib/auth";
import { payrollValidator } from "@/validators/payroll";

export async function getPayrolls() {
  const userId = await getUserId();
  if (!userId) return [];

  const data = await prisma.payroll.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return data.map((p) => ({
    ...p,
    salary: Number(p.salary),
    late: Number(p.late),
    sss: Number(p.sss),
    hdmf: Number(p.hdmf),
    phic: Number(p.phic),
    netPay: Number(p.netPay),
  }));
}

export async function createPayroll(data: unknown) {
  const userId = await getUserId();
  if (!userId) return { success: false, message: "Unauthorized" };

  const parsed = payrollValidator.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  await prisma.payroll.create({
    data: {
      userId,
      date: new Date(parsed.data.date),
      employeeName: parsed.data.employeeName,
      salary: parsed.data.salary,

      // temporary default values
      late: 0,
      sss: 0,
      hdmf: 0,
      phic: 0,

      // temporary calculation
      netPay: parsed.data.salary,
    },
  });

  revalidatePath("/dashboard/payroll");

  return { success: true, message: "Payroll created" };
}

export async function updatePayroll(id: string, data: unknown) {
  const userId = await getUserId();

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  const parsed = payrollValidator.safeParse(data);

  if (!parsed.success) {
    return { success: false, message: "Invalid data" };
  }

  const existing = await prisma.payroll.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.payroll.update({
    where: { id },
    data: {
      date: new Date(parsed.data.date),
      employeeName: parsed.data.employeeName,
      salary: parsed.data.salary,

      // keep current values unchanged
      // no need to update deductions yet
    },
  });

  revalidatePath("/dashboard/payroll");

  return { success: true, message: "Payroll updated" };
}

export async function deletePayroll(id: string) {
  const userId = await getUserId();

  if (!userId) {
    return { success: false, message: "Unauthorized" };
  }

  const existing = await prisma.payroll.findUnique({
    where: { id },
  });

  if (!existing || existing.userId !== userId) {
    return { success: false, message: "Not found" };
  }

  await prisma.payroll.delete({
    where: { id },
  });

  revalidatePath("/dashboard/payroll");

  return { success: true, message: "Payroll deleted" };
}
