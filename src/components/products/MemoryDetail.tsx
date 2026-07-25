"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Check,
  ArrowLeft,
  ArrowRight,
  MemoryStick,
  Zap,
  Layers,
  Gauge,
  Server,
  Cpu,
} from "lucide-react";
import { ALL_MEMORY } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MemoryProduct } from "@/types";

const statusStyles: Record<
  MemoryProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function MemoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const mem = ALL_MEMORY.find((m) => m.slug === slug);

  if (!mem) {
    return (
      <div className="min-h-screen bg-bg-dark pb-20 flex items-center justify-center">
        <div
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-surface-2 border border-border flex items-center justify-center">
            <MemoryStick className="w-10 h-10 text-text-dim" />
          </div>
          <h1 className="text-2xl font-black text-text mb-3">
            Product Not Found
          </h1>
          <p className="text-text-muted text-sm mb-8">
            The memory product you are looking for does not exist or may have
            been removed.
          </p>
          <Link href="/products">
            <Button variant="solid" icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const status = statusStyles[mem.status];

  return (
    <div className="min-h-screen bg-bg-dark pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div
          className="space-y-12"
        >
          <nav
            className="flex items-center gap-2 text-sm"
          >
            <Link
              href="/"
              className="text-text-dim hover:text-primary transition-transform"
            >
              Home
            </Link>
            <span className="text-text-dim">/</span>
            <Link
              href="/products"
              className="text-text-dim hover:text-primary transition-transform"
            >
              Products
            </Link>
            <span className="text-text-dim">/</span>
            <span className="text-text-muted truncate max-w-[200px]">
              {mem.name}
            </span>
          </nav>

          <div
            className="grid lg:grid-cols-2 gap-8 items-start"
          >
            <div>
              <div className="relative h-[380px] md:h-[480px] rounded-2xl border border-border bg-surface overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid opacity-25" />
                <div className="absolute inset-0 bg-circuit opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <MemoryStick className="w-32 h-32 text-primary/20" />
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg border border-primary/30 bg-surface/90 backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-text-dim">
                    TYPE
                  </div>
                  <div className="text-sm font-bold text-primary font-mono">
                    {mem.specs.type}
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg border border-secondary/30 bg-surface/90 backdrop-blur-sm">
                  <div className="text-[10px] font-mono text-text-dim">
                    SERIES
                  </div>
                  <div className="text-sm font-bold text-secondary font-mono">
                    {mem.series}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mt-4">
                <div className="rounded-xl border border-border bg-surface p-3 md:p-4">
                  <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1">
                    Capacity
                  </div>
                  <div className="text-xs md:text-sm font-mono font-bold text-text truncate">
                    {mem.specs.capacity}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3 md:p-4">
                  <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1">
                    Speed
                  </div>
                  <div className="text-xs md:text-sm font-mono font-bold text-text truncate">
                    {mem.specs.speed}
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3 md:p-4">
                  <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1">
                    Bandwidth
                  </div>
                  <div className="text-xs md:text-sm font-mono font-bold text-text truncate">
                    {mem.specs.bandwidth}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant={status.variant} size="md">
                    {status.label}
                  </Badge>
                  <span className="text-xs font-mono text-text-dim">
                    Best for: {mem.bestFor}
                  </span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-text leading-tight">
                  {mem.name}
                </h1>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1.5 text-text-muted">
                    <MemoryStick className="w-4 h-4 text-primary/70" />
                    <span>{mem.manufacturer}</span>
                  </div>
                  <span className="text-text-dim">|</span>
                  <span className="text-text-muted">{mem.specs.type}</span>
                </div>
              </div>

              <h2 className="text-xl font-bold text-text">Overview</h2>
              <p className="text-text-muted leading-relaxed">
                {mem.longDescription}
              </p>

              <div className="rounded-2xl border border-border bg-surface p-5 md:p-6">
                <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> Key Features
                </h3>
                <ul className="space-y-2.5">
                  {mem.keyFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </span>
                      <span className="text-sm text-text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {mem.useCases.length > 0 && (
                <div>
                  <h3 className="text-sm font-mono text-text-dim uppercase tracking-wider mb-3">
                    Ideal Use Cases
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mem.useCases.map((uc) => (
                      <span
                        key={uc}
                        className="px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-mono text-text-muted"
                      >
                        {uc.replace(/-/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2">
                <Link href={`/rfq?chip=${mem.slug}`}>
                  <Button
                    variant="solid"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Get Quote
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="ghost" size="lg">
                    ? Back to Catalog
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                <MemoryStick className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-text">
                  Memory Specifications
                </h2>
                <p className="text-sm text-text-muted">
                  Complete technical specifications for the {mem.series}.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                {
                  title: "Type",
                  icon: MemoryStick,
                  rows: [{ label: "Type", key: "type" as const }],
                },
                {
                  title: "Capacity",
                  icon: Server,
                  rows: [{ label: "Capacity", key: "capacity" as const }],
                },
                {
                  title: "Performance",
                  icon: Gauge,
                  rows: [
                    { label: "Speed", key: "speed" as const },
                    { label: "Bandwidth", key: "bandwidth" as const },
                  ],
                },
                {
                  title: "Physical",
                  icon: Cpu,
                  rows: [
                    { label: "Form Factor", key: "formFactor" as const },
                    { label: "Voltage", key: "voltage" as const },
                  ],
                },
              ].map((group) => (
                <div
                  key={group.title}
                  className="rounded-2xl border border-border bg-surface p-5 md:p-6"
                >
                  <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider mb-4 flex items-center gap-2">
                    <group.icon className="w-4 h-4" /> {group.title}
                  </h3>
                  <dl className="space-y-2.5">
                    {group.rows.map((row) => {
                      const value = mem.specs[row.key];
                      if (!value || value === "-") return null;
                      return (
                        <div
                          key={row.key}
                          className="flex items-start justify-between gap-4 pb-2.5 border-b border-border last:border-0 last:pb-0"
                        >
                          <dt className="text-xs text-text-dim uppercase tracking-wider pt-0.5">
                            {row.label}
                          </dt>
                          <dd className="text-sm font-mono text-text text-right">
                            {value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              ))}
            </div>
          </div>

          <div >
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-text mb-2">
                  Need the {mem.specs.type}?
                </h3>
                <p className="text-sm md:text-base text-text-muted max-w-2xl">
                  Get a personalized quote within 24 hours. Our certified
                  engineers will help you architect the optimal configuration
                  for your workload.
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Link href={`/rfq?chip=${mem.slug}`}>
                  <Button
                    variant="solid"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Request Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg">
                    Talk to Expert
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
