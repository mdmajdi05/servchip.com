import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PageHeroBreadcrumb {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  subtitle?: string;
  label?: string;
  breadcrumbs?: PageHeroBreadcrumb[];
  align?: "center" | "left";
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  label,
  breadcrumbs,
  align = "center",
  className,
}: PageHeroProps) {
  const isCenter = align === "center";
  return (
    <section
      className={cn(
        "relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-hero-gradient scroll-mt-20",
        className
      )}
    >
      <div className="absolute inset-0 bg-grid opacity-25 pointer-events-none" />
      <div className="absolute inset-0 bg-circuit opacity-40 pointer-events-none" />
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div
          className={cn(
            "flex flex-col gap-4 md:gap-5 max-w-4xl mx-auto",
            isCenter ? "items-center text-center" : "items-start text-left"
          )}
        >
          {label && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {label}
            </div>
          )}

          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-text leading-[1.05]"
            style={{ fontFamily: "var(--font-inter)" }}
          >
            {title}
          </h1>

          {subtitle && (
            <p className="text-base md:text-lg text-text-muted max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav
              aria-label="Breadcrumb"
              className={cn(
                "flex flex-wrap items-center gap-1.5 text-xs text-text-dim font-mono",
                isCenter && "justify-center"
              )}
            >
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <span key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href} className="hover:text-primary transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className={isLast ? "text-text" : ""}>{crumb.label}</span>
                    )}
                    {!isLast && <ChevronRight className="w-3 h-3 text-text-dim/60" />}
                  </span>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
}
