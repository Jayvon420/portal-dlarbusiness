import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { mysqlDB } from "./db-mysql";
import { Prisma } from "../generated/prisma/client";

async function migrateExpenses() {
  const [rows] = await mysqlDB.query("SELECT * FROM expenses");

  const users = await prisma.user.findMany();
  const userMap = new Map(users.map((u) => [u.legacyId, u.id]));

  for (const e of rows as any[]) {
    try {
      const userId = userMap.get(e.user_id);

      if (!userId) {
        console.log(`❌ Missing user legacyId=${e.user_id} (expense ${e.id})`);
        continue;
      }

      const existing = await prisma.expense.findUnique({
        where: { legacyId: e.id },
      });

      if (existing) {
        console.log(`⏭ Skipped expense legacyId=${e.id}`);
        continue;
      }

      await prisma.expense.create({
        data: {
          legacyId: e.id,
          date: new Date(e.date),
          expenseType: e.expenses_type,
          receipt: String(e.receiptNumber),
          amount: new Prisma.Decimal(e.amount),
          createdAt: new Date(e.created_at),
          userId,
        },
      });

      console.log(`✔ Expense migrated legacyId=${e.id}`);
    } catch (err) {
      console.log(`❌ Expense failed legacyId=${e.id}`, err);
    }
  }

  console.log("✅ EXPENSES MIGRATION DONE");
}

migrateExpenses()
  .catch(console.error)
  .finally(async () => {
    await mysqlDB.end();
  });
