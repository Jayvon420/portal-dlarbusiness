import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function proxy(req: NextRequest) {
  const session = req.cookies.get("session_userId")?.value;
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isRoot = pathname === "/";

  // ❌ Not logged in
  if (!session && (isDashboard || isAdmin)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let user = null;

  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session },
      select: {
        id: true,
        role: true,
        isActive: true,
      },
    });
  }

  // ❌ Invalid session
  if (session && !user) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    // Clear invalid cookie
    response.cookies.delete("session_userId");
    response.cookies.delete("session_role");
    response.cookies.delete("session_active");

    return response;
  }

  // ❌ Inactive account
  if (user && !user.isActive) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    response.cookies.delete("session_userId");
    response.cookies.delete("session_role");
    response.cookies.delete("session_active");

    return response;
  }

  // 🏠 Root route
  if (isRoot) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.redirect(
      new URL(user.role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  // 🔐 Admin protection
  if (isAdmin && user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ❌ Admin cannot access user dashboard
  if (isDashboard && user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔐 USER-only dashboard
  if (isDashboard && user?.role !== "USER") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // ✅ Logged-in users cannot access login/register
  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL(user.role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
}
