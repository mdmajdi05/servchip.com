"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Cpu,
  Microchip,
  Layers,
  Server,
  Briefcase,
  Wrench,
  Headphones,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

interface MegaLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
}

interface MegaColumn {
  title: string;
  href?: string;
  links: MegaLink[];
}

interface MegaMenuProps {
  label: string;
  columns: MegaColumn[];
  variant?: "default" | "minimal";
  href?: string;
  featured?: {
    tag: string;
    title: string;
    cta: string;
    href: string;
  };
}

const ICON_MAP: Record<string, typeof Cpu> = {
  Architecture: Cpu,
  Computing: Server,
  Professional: Microchip,
  Vertical: Layers,
  Services: Briefcase,
  Support: Headphones,
  "Custom Sourcing": Truck,
  Consulting: Wrench,
  Learn: Cpu,
  Company: Server,
  "AI Accelerators": Microchip,
  "Server CPUs": Cpu,
  "AI Servers": Server,
  Networking: Layers,
  "Memory & Storage": Cpu,
};

export function MegaMenu({ columns, featured }: MegaMenuProps) {
  const prefix = useCountryPrefix();
  return (
    <div className="rounded-2xl border border-primary/15 bg-surface shadow-2xl shadow-black/50 p-5 max-h-[75vh] overflow-y-auto scrollbar-neon">
      <div
        className="grid gap-0"
        style={{
          gridTemplateColumns: `repeat(${Math.min(columns.length, 5)}, 1fr)`,
        }}
      >
        {columns.map((col, colIndex) => {
          const Icon = ICON_MAP[col.title] || Cpu;
          const isFirst = colIndex === 0;
          return (
            <div
              key={col.title}
              className={cn("p-3 rounded-xl", isFirst && "bg-primary/[0.03]")}
            >
              <h4 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-primary mb-3">
                <span className="w-4 h-px bg-primary/40" />
                <Icon className="w-3 h-3 shrink-0" />
                {col.href ? (
                  <Link
                    href={col.href}
                    className="hover:text-primary-dark transition-transform"
                  >
                    {col.title}
                  </Link>
                ) : (
                  <span>{col.title}</span>
                )}
              </h4>
              <ul className="space-y-px">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group/link flex items-center justify-between py-1.5 px-2.5 rounded-lg text-sm text-text-muted hover:text-text hover:bg-primary/[0.06] transition-transform duration-200"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/30 group-hover/link:bg-primary shrink-0 transition-transform duration-200" />
                        <span className="font-medium truncate">
                          {link.label}
                        </span>
                        {link.badge && (
                          <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded">
                            {link.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-3 h-3 shrink-0 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-transform duration-200 text-primary" />
                    </Link>
                    {link.description && (
                      <p className="text-[11px] text-text-dim px-[26px] pb-1 leading-relaxed line-clamp-1">
                        {link.description}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {featured && (
        <div className="mt-4 p-4 rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-between">
          <div>
            <p className="text-xs text-text-muted mb-0.5">{featured.tag}</p>
            <p className="text-sm font-semibold text-text">{featured.title}</p>
          </div>
          <Link
            href={featured.href}
            className="text-xs font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
          >
            {featured.cta} <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
      <div className="mt-2.5 flex items-center justify-between text-[10px] text-text-dim/40">
        <span>
          Press{" "}
          <kbd className="px-1 py-0.5 rounded bg-primary/[0.06] text-primary/60 font-mono text-[9px]">
            ESC
          </kbd>{" "}
          to close
        </span>
        <Link
          href={`${prefix}/products`}
          className="flex items-center gap-1 text-primary/50 hover:text-primary/80 transition-transform"
        >
          View all <ArrowUpRight className="w-2.5 h-2.5" />
        </Link>
      </div>
    </div>
  );
}
