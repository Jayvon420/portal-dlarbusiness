// logout update
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Logout failed");
      }

      // 🔥 IMPORTANT
      router.replace("/login");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="destructive"
      className="w-full"
    >
      {loading ? "Logging out..." : "Log out"}
    </Button>
  );
}
