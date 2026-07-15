import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const userId = req.cookies.get("session_userId")?.value;
  const role = req.cookies.get("session_role")?.value;
  const isActive = req.cookies.get("session_active")?.value === "true";

  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  const isDashboard = pathname.startsWith("/dashboard");
  const isAdmin = pathname.startsWith("/admin");
  const isRoot = pathname === "/";

  // ❌ Not logged in
  if (!userId && (isDashboard || isAdmin)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ❌ Inactive user
  if (userId && !isActive) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 🏠 Root route
  if (isRoot) {
    if (!userId) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.redirect(
      new URL(role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  // 🔐 Admin route protection
  if (isAdmin && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // ❌ Admin cannot access user dashboard
  if (isDashboard && role === "ADMIN") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // 🔐 Optional: only USER role can access dashboard
  if (isDashboard && role !== "USER") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // ✅ Logged in users cannot access auth pages
  if (userId && isAuthPage) {
    return NextResponse.redirect(
      new URL(role === "ADMIN" ? "/admin" : "/dashboard", req.url),
    );
  }

  return NextResponse.next();
}
