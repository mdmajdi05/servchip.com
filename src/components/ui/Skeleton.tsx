import { cn } from "@/lib/utils";

interface SkeletonProps {
  variant?: "card" | "text" | "image" | "specs" | "chip3d" | "stats";
  className?: string;
}

export function Skeleton({ variant = "text", className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-surface-2",
        {
          "h-[380px] w-full": variant === "card",
          "h-4 w-full": variant === "text",
          "aspect-video w-full": variant === "image",
          "h-8 w-full": variant === "specs",
          "h-[400px] w-[400px]": variant === "chip3d",
          "h-24 w-32": variant === "stats",
        },
        className
      )}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4 animate-pulse">
      <div className="w-full h-48 bg-surface-2 rounded-lg" />
      <div className="h-4 bg-surface-2 rounded w-3/4" />
      <div className="h-3 bg-surface-2 rounded w-full" />
      <div className="h-3 bg-surface-2 rounded w-1/2" />
      <div className="h-10 bg-surface-2 rounded-lg w-full" />
    </div>
  );
}
