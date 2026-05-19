import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = cookies();

  (await cookieStore).set("session_userId", "", {
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
