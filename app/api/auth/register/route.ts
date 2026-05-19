import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { businessName, firstName, lastName, username, email, password } =
      await req.json();

    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (exists) {
      return Response.json({ error: "User already exists" }, { status: 400 });
    }

    // 🔐 HASH PASSWORD (IMPORTANT FIX)
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        businessName,
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword, // ✅ STORE HASH ONLY
      },
    });

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
