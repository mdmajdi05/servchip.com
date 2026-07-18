"use client";

import Link from "next/link";
import {
  ArrowRight,
  Server,
  Brain,
  Cpu,
  Network,
  HardDrive,
  MemoryStick,
  Cloud,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/data/categories";
import { getProductsByParentCategory } from "@/data/products";

const ICON_MAP: Record<string, typeof Server> = {
  Server,
  Brain,
  Cpu,
  Network,
  HardDrive,
  MemoryStick,
  Cloud,
};

export function CategoriesGrid() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Categories"
          title="Enterprise AI Chips, GPUs & Server Hardware Categories"
          subtitle="Browse authentic NVIDIA, AMD & Intel products across AI accelerators, server CPUs, networking, memory & storage"
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.slice(0, 10).map((cat, index) => {
            const Icon = ICON_MAP[cat.icon] || Server;
            const count = getProductsByParentCategory(cat.id).length;
            return (
              <div key={cat.slug}>
                <Link
                  href={`/categories/${cat.slug}`}
                  className="block bg-surface border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-text mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-dim mb-3 line-clamp-2">
                    {cat.description}
                  </p>
                  <Badge variant="green" size="sm">
                    {count > 0 ? `${count} products` : "In Stock"}
                  </Badge>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            View All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
