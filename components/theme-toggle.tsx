"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;

  const isDark = currentTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {/* SUN (shown in dark mode) */}
      <Sun
        className={`
          h-5 w-5 transition-all
          ${isDark ? "scale-100 rotate-0" : "scale-0 rotate-90"}
        `}
      />

      {/* MOON (shown in light mode) */}
      <Moon
        className={`
          absolute h-5 w-5 transition-all
          ${isDark ? "scale-0 -rotate-90" : "scale-100 rotate-0"}
        `}
      />
    </Button>
  );
}
