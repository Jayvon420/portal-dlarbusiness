import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { mysqlDB } from "./db-mysql";
import { Prisma } from "../generated/prisma/client";

async function migrateSales() {
  const [sales] = await mysqlDB.query("SELECT * FROM sales");

  // load users ONCE (IMPORTANT)
  const users = await prisma.user.findMany();
  const userMap = new Map(users.map((u) => [u.legacyId, u.id]));

  for (const s of sales as any[]) {
    try {
      const userId = userMap.get(s.user_id);

      if (!userId) {
        console.log(`❌ Missing user legacyId=${s.user_id} (sale ${s.id})`);
        continue;
      }

      const existing = await prisma.sale.findUnique({
        where: { legacyId: s.id },
      });

      if (existing) {
        console.log(`⏭ Skipped sale legacyId=${s.id}`);
        continue;
      }

      await prisma.sale.create({
        data: {
          legacyId: s.id,
          date: new Date(s.date),
          particular: s.particular,
          receipt: s.receipt_number,
          amount: new Prisma.Decimal(s.amount),
          createdAt: new Date(s.created_at),
          userId,
        },
      });

      console.log(`✔ Sale migrated legacyId=${s.id}`);
    } catch (err) {
      console.log(`❌ Sale failed legacyId=${s.id}`, err);
    }
  }

  console.log("✅ SALES MIGRATION DONE");
}

migrateSales()
  .catch(console.error)
  .finally(async () => {
    await mysqlDB.end();
  });
