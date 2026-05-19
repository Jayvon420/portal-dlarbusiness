import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { mysqlDB } from "./db-mysql";
import { Prisma } from "../generated/prisma/client";

async function migratePayroll() {
  const [rows] = await mysqlDB.query("SELECT * FROM payroll_entries");

  const users = await prisma.user.findMany();
  const userMap = new Map(users.map((u) => [u.legacyId, u.id]));

  for (const p of rows as any[]) {
    try {
      const userId = userMap.get(p.user_id);

      if (!userId) {
        console.log(`❌ Missing user legacyId=${p.user_id} (payroll ${p.id})`);
        continue;
      }

      const existing = await prisma.payroll.findUnique({
        where: { legacyId: p.id },
      });

      if (existing) {
        console.log(`⏭ Skipped payroll legacyId=${p.id}`);
        continue;
      }

      await prisma.payroll.create({
        data: {
          legacyId: p.id,
          date: new Date(p.date),
          employeeName: p.employee_name,
          salary: new Prisma.Decimal(p.salary || 0),
          late: new Prisma.Decimal(p.late || 0),
          sss: new Prisma.Decimal(p.sss || 0),
          hdmf: new Prisma.Decimal(p.hdmf || 0),
          phic: new Prisma.Decimal(p.phic || 0),
          netPay: new Prisma.Decimal(
            (p.salary || 0) -
              (p.late || 0) -
              (p.sss || 0) -
              (p.hdmf || 0) -
              (p.phic || 0),
          ),
          createdAt: new Date(p.created_at),
          userId,
        },
      });

      console.log(`✔ Payroll migrated legacyId=${p.id}`);
    } catch (err) {
      console.log(`❌ Payroll failed legacyId=${p.id}`, err);
    }
  }

  console.log("✅ PAYROLL MIGRATION DONE");
}

migratePayroll()
  .catch(console.error)
  .finally(async () => {
    await mysqlDB.end();
  });
