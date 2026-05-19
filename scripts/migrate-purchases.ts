import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { mysqlDB } from "./db-mysql";
import { Prisma } from "../generated/prisma/client";

async function migratePurchases() {
  const [rows] = await mysqlDB.query("SELECT * FROM purchases");

  const users = await prisma.user.findMany();
  const userMap = new Map(users.map((u) => [u.legacyId, u.id]));

  for (const p of rows as any[]) {
    try {
      const userId = userMap.get(p.user_id);

      if (!userId) {
        console.log(`❌ Missing user legacyId=${p.user_id} (purchase ${p.id})`);
        continue;
      }

      const existing = await prisma.purchase.findUnique({
        where: { legacyId: p.id },
      });

      if (existing) {
        console.log(`⏭ Skipped purchase legacyId=${p.id}`);
        continue;
      }

      await prisma.purchase.create({
        data: {
          legacyId: p.id,
          date: new Date(p.date),
          particular: p.particular,
          receipt: p.receipt_number,
          amount: new Prisma.Decimal(p.amount),
          createdAt: new Date(p.created_at),
          userId,
        },
      });

      console.log(`✔ Purchase migrated legacyId=${p.id}`);
    } catch (err) {
      console.log(`❌ Purchase failed legacyId=${p.id}`, err);
    }
  }

  console.log("✅ PURCHASES MIGRATION DONE");
}

migratePurchases()
  .catch(console.error)
  .finally(async () => {
    await mysqlDB.end();
  });
