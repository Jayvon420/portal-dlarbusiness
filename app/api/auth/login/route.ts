// app/api/auth/login/route.ts with admin pushing to dashboards
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: identifier }, { username: identifier }],
      },
    });

    if (!user) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    if (user.isActive === false) {
      return Response.json(
        { error: "Account is disabled. Please contact the administrator." },
        { status: 403 },
      );
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const cookieStore = await cookies();

    cookieStore.set("session_userId", user.id, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return Response.json({
      success: true,
      role: user.role, // optional now
    });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
