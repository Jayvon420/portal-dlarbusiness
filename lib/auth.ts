import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function getUserId() {
  const cookieStore = await cookies();
  return cookieStore.get("session_userId")?.value ?? null;
}

// export async function getCurrentUser() {
//   try {
//     const userId = await getUserId();

//     if (!userId) return null;

//     const user = await prisma.user.findUnique({
//       where: { id: userId },
//     });

//     return user ?? null;
//   } catch (err) {
//     console.error("getCurrentUser error:", err);
//     return null;
//   }
// }
export async function getCurrentUser() {
  console.time("getCurrentUser");

  try {
    const userId = await getUserId();

    if (!userId) {
      console.timeEnd("getCurrentUser");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    console.timeEnd("getCurrentUser");

    return user;
  } catch (err) {
    console.timeEnd("getCurrentUser");
    console.error(err);
    return null;
  }
}
