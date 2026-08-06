"use client";

import { AppLink as Link } from "@/components/ui/AppLink";

import { Cpu, Sparkles, Layers, BookOpen, ArrowUpRight } from "lucide-react";

const QUICK_LINKS = [
  {
    href: "/products",
    label: "Browse All Chips",
    desc: "NVIDIA, AMD, Intel & more",
    icon: Cpu,
  },
  {
    href: "/configurator",
    label: "Chip Configurator",
    desc: "AI-powered matching",
    icon: Sparkles,
  },
  {
    href: "/comparison",
    label: "Compare Chips",
    desc: "Side-by-side specs",
    icon: Layers,
  },
  {
    href: "/blog",
    label: "Read Blog",
    desc: "Expert insights",
    icon: BookOpen,
  },
];

export function QuickLinks() {
  return (
    <section className="relative py-16 md:py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {QUICK_LINKS.map((ql, i) => (
            <div key={ql.href}>
              <Link
                href={ql.href}
                className="group relative flex flex-col gap-3 p-5 md:p-6 rounded-2xl border border-border-subtle bg-surface card-hover overflow-hidden h-full"
              >
                <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-transform" />

                <div className="relative flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-transform">
                    <ql.icon className="w-5 h-5 text-primary" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-text-dim group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>

                <div className="relative">
                  <p className="text-base font-bold text-text mb-1">
                    {ql.label}
                  </p>
                  <p className="text-xs text-text-muted">{ql.desc}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
