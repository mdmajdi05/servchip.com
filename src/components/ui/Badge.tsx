import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?: "green" | "cyan" | "purple" | "amber" | "default";
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-semibold rounded-full",
        {
          "bg-primary/10 text-primary": variant === "green",
          "bg-secondary/10 text-secondary": variant === "cyan",
          "bg-accent/10 text-accent": variant === "purple",
          "bg-warning/10 text-warning": variant === "amber",
          "bg-border text-text-muted": variant === "default",
        },
        {
          "px-2 py-0.5 text-[10px] uppercase tracking-wider": size === "sm",
          "px-3 py-1 text-xs": size === "md",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
