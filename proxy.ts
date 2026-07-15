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

  // Not logged in
  if (!session) {
    if (isDashboard || isAdmin) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  }

  let user = null;

  try {
    user = await prisma.user.findUnique({
      where: {
        id: session,
      },
      select: {
        id: true,
        role: true,
        isActive: true,
      },
    });
  } catch (error) {
    console.error("Proxy auth error:", error);
    return NextResponse.next();
  }

  // Invalid session
  if (!user) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    response.cookies.delete("session_userId");
    response.cookies.delete("session_role");
    response.cookies.delete("session_active");

    return response;
  }

  // Disabled account
  if (!user.isActive) {
    const response = NextResponse.redirect(new URL("/login", req.url));

    response.cookies.delete("session_userId");
    response.cookies.delete("session_role");
    response.cookies.delete("session_active");

    return response;
  }

  // Root route
  if (isRoot) {
    return NextResponse.redirect(
      new URL(user.role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  // Admin protection
  if (isAdmin && user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Admin cannot access dashboard
  if (isDashboard && user.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // User cannot access admin
  if (isDashboard && user.role !== "USER") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Logged in users cannot visit login/register
  if (isAuthPage) {
    return NextResponse.redirect(
      new URL(user.role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
}
