"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className="relative p-2 rounded-lg text-text-muted hover:text-text hover:bg-surface transition-transform duration-200"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <div key="moon">
          <Moon className="w-4 h-4" />
        </div>
      ) : (
        <div key="sun">
          <Sun className="w-4 h-4" />
        </div>
      )}
    </button>
  );
}
