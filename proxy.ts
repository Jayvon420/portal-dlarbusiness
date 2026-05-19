//proxy deny admin in user dashboard

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

  // ❌ Not logged in
  if (!session && (isDashboard || isAdmin)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Fetch user
  let user = null;

  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session },
    });
  }

  // ❌ invalid session
  if (session && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ❌ inactive user
  if (user && !user.isActive) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🔐 ADMIN ROUTE PROTECTION
  if (isAdmin && user?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 🚨 IMPORTANT FIX (THIS WAS MISSING)
  // ❌ ADMIN CANNOT ACCESS USER DASHBOARD
  if (isDashboard && user?.role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔐 optional: enforce USER-only dashboard
  if (isDashboard && user?.role !== "USER") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // ✅ logged in → block auth pages
  if (user && isAuthPage) {
    return NextResponse.redirect(
      new URL(user.role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
}
