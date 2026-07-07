"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  variant?: "default" | "elevated" | "glow";
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

export function Card({
  variant = "default",
  padding = "md",
  hover = false,
  onClick,
  className,
  children,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border transition-all duration-200",
        {
          "bg-surface border-border": variant === "default",
          "bg-surface-2 border-border shadow-lg": variant === "elevated",
          "bg-surface border-primary/20 neon-glow": variant === "glow",
        },
        {
          "p-0": padding === "none",
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },
        hover &&
          "cursor-pointer hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5",
        className
      )}
    >
      {children}
    </div>
  );
}
