"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDay = theme === "day";

  return (
    <button
      type="button"
      className={cn("theme-toggle-icon", className)}
      aria-label={isDay ? "Switch to night" : "Switch to day"}
      title={isDay ? "Night" : "Day"}
      onClick={() => setTheme(isDay ? "night" : "day")}
    >
      {isDay ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
    </button>
  );
}
