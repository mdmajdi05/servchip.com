import { cn } from "@/lib/utils";

interface NeonGlowProps {
  color?: "green" | "cyan" | "purple";
  intensity?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

export function NeonGlow({
  color = "green",
  intensity = "md",
  className,
  children,
}: NeonGlowProps) {
  return (
    <div
      className={cn(
        "relative",
        {
          "[box-shadow:0_0_10px_color-mix(in_srgb,var(--primary)_20%,transparent)]":
            color === "green" && intensity === "sm",
          "[box-shadow:0_0_20px_color-mix(in_srgb,var(--primary)_30%,transparent),0_0_40px_color-mix(in_srgb,var(--primary)_10%,transparent)]":
            color === "green" && intensity === "md",
          "[box-shadow:0_0_30px_color-mix(in_srgb,var(--primary)_40%,transparent),0_0_60px_color-mix(in_srgb,var(--primary)_15%,transparent)]":
            color === "green" && intensity === "lg",
          "[box-shadow:0_0_20px_color-mix(in_srgb,var(--secondary)_30%,transparent)]":
            color === "cyan" && intensity === "md",
          "[box-shadow:0_0_20px_color-mix(in_srgb,var(--accent)_30%,transparent)]":
            color === "purple" && intensity === "md",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
