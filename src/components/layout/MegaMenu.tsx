"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, ArrowUpRight, ChevronRight, ArrowRight, Circle, Cpu, Microchip, Layers, Server, Briefcase, Wrench, Headphones, Truck } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
  icon?: string;
}

interface MegaColumn {
  title: string;
  links: MegaLink[];
}

interface MegaMenuProps {
  label: string;
  columns: MegaColumn[];
  variant?: "default" | "minimal";
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
};

const menuVariants = {
  hidden: { opacity: 0, y: 12, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: [0.22, 1, 0.36, 1] as const,
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    scale: 0.96,
    transition: { duration: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

export function MegaMenu({ label, columns, variant = "default", featured }: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
          open
            ? "text-primary"
            : "text-text-muted hover:text-text"
        )}
      >
        <span className="relative">
          {label}
          <span className={cn(
            "absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-transform duration-300 origin-left",
            open
              ? "bg-primary scale-x-100"
              : "bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100"
          )} />
        </span>
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-all duration-200",
            open && "rotate-180"
          )}
        />
        {open && (
          <span className="absolute inset-0 rounded-lg ring-1 ring-primary/20 bg-primary/[0.03]" />
        )}
      </button>

      <AnimatePresence>
        {open && (
          variant === "minimal" ? (
            <motion.div
              key={`${label}-mega`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 top-full w-[min(880px,calc(100vw-2rem))] mt-px"
              onMouseEnter={() => setOpen(true)}
            >
              <div className="rounded-b-2xl border border-primary/15 border-t-0 bg-surface shadow-2xl shadow-black/50 p-6">
                <div className="grid grid-cols-3 gap-6">
                  {columns.map((col) => (
                    <div key={col.title} className="space-y-1">
                      <h4 className="text-xs font-mono font-bold tracking-widest text-primary uppercase mb-3">
                        {col.title}
                      </h4>
                      {col.links.map((item) => {
                        const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[item.icon] || Circle;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-text-muted hover:text-text hover:bg-primary/[0.05] transition-all group"
                          >
                            <Icon className="w-4 h-4 text-text-dim group-hover:text-primary transition-colors shrink-0" />
                            <span className="flex-1">{item.label}</span>
                            <ChevronRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                          </Link>
                        );
                      })}
                    </div>
                  ))}
                </div>
                {featured && (
                  <div className="mt-4 p-4 rounded-xl border border-primary/15 bg-gradient-to-br from-primary/[0.05] to-secondary/[0.05] flex items-center justify-between">
                    <div>
                      <p className="text-xs text-text-muted mb-0.5">{featured.tag}</p>
                      <p className="text-sm font-semibold text-text">{featured.title}</p>
                    </div>
                    <Link
                      href={featured.href}
                      onClick={() => setOpen(false)}
                      className="text-xs font-medium text-primary hover:underline flex items-center gap-1 shrink-0"
                    >
                      {featured.cta} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`${label}-mega`}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] overflow-hidden z-[100]"
            >
              <>
                <div className="absolute inset-0 bg-bg-dark rounded-2xl border border-border shadow-2xl shadow-primary/8" />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.02] to-transparent rounded-2xl" />
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-secondary/[0.03] rounded-full blur-3xl pointer-events-none" />

                <div className="relative grid gap-0 p-1"
                  style={{ gridTemplateColumns: `repeat(${Math.min(columns.length, 4)}, 1fr)` }}
                >
                  {columns.map((col, colIndex) => {
                    const Icon = ICON_MAP[col.title] || Cpu;
                    const isFirst = colIndex === 0;
                    return (
                      <div
                        key={col.title}
                        className={cn(
                          "p-5 rounded-xl",
                          isFirst && "bg-primary/[0.03]"
                        )}
                      >
                        <h4 className="flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary/60 mb-4">
                          <span className="w-5 h-px bg-primary/30" />
                          <Icon className="w-3 h-3 shrink-0" />
                          <span>{col.title}</span>
                        </h4>
                        <ul className="space-y-0.5">
                          {col.links.map((link) => (
                            <motion.li key={link.label} variants={itemVariants}>
                              <Link
                                href={link.href}
                                onClick={() => setOpen(false)}
                                className="group/link flex items-center justify-between py-2 px-3 rounded-lg text-sm text-text-muted hover:text-text hover:bg-primary/[0.06] hover:ring-1 hover:ring-primary/15 transition-all duration-200"
                              >
                                <div className="flex items-center gap-3 min-w-0">
                                  <span className="w-[3px] h-[3px] rounded-full bg-primary/40 group-hover/link:bg-primary shrink-0 transition-colors duration-200" />
                                  <span className="truncate font-medium">{link.label}</span>
                                  {link.badge && (
                                    <span className="shrink-0 text-[8px] font-bold uppercase tracking-wider text-primary bg-primary/15 px-1.5 py-0.5 rounded group-hover/link:bg-primary/20 transition-colors">
                                      {link.badge}
                                    </span>
                                  )}
                                </div>
                                <ArrowUpRight className="w-3 h-3 shrink-0 opacity-0 -translate-y-0.5 group-hover/link:opacity-50 group-hover/link:translate-y-0 transition-all duration-200" />
                              </Link>
                              {link.description && (
                                <p className="text-[11px] text-text-dim/40 px-[18px] pb-1 -mt-0.5 leading-relaxed line-clamp-1">
                                  {link.description}
                                </p>
                              )}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <div className="relative h-px mx-8 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
                <div className="relative px-6 py-2.5 flex items-center justify-between text-[10px] text-text-dim/40">
                  <span>Press <kbd className="px-1 py-0.5 rounded bg-primary/[0.06] text-primary/60 font-mono text-[9px]">ESC</kbd> to close</span>
                  <Link href="/products" className="flex items-center gap-1 text-primary/50 hover:text-primary/80 transition-colors" onClick={() => setOpen(false)}>
                    View all <ArrowUpRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}
