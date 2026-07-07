import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl mb-12",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-3">
          <span className="w-6 h-px bg-primary" />
          {label}
          <span className="w-6 h-px bg-primary" />
        </div>
      )}
      <h2 className="text-3xl lg:text-4xl font-black text-text leading-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-base lg:text-lg leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
