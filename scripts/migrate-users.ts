import "dotenv/config";
import { prisma } from "@/lib/prisma";
import { mysqlDB } from "./db-mysql";

async function migrateUsers() {
  const [rows] = await mysqlDB.query("SELECT * FROM users");

  for (const u of rows as any[]) {
    try {
      await prisma.user.create({
        data: {
          legacyId: u.id,

          // FIX: required fields
          businessName: u.username,
          firstName: "Legacy",
          lastName: "User",

          username: u.username,
          email: u.email,
          password: u.password,

          role: u.is_admin ? "ADMIN" : "USER",
          isActive: u.status === 1,

          createdAt: new Date(u.created_at),
        },
      });

      console.log(`✔ User migrated legacyId=${u.id}`);
    } catch (err) {
      console.log(`❌ User failed legacyId=${u.id}`, err);
    }
  }

  console.log("✅ USER MIGRATION DONE");
}

migrateUsers()
  .catch(console.error)
  .finally(async () => {
    await mysqlDB.end();
  });
