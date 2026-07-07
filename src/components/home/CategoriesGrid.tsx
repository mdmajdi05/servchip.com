"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Server, Brain, Monitor, Microchip, Network, Car, Zap, Gamepad2, Cloud, HeartPulse } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { CATEGORIES } from "@/data/categories";

const ICON_MAP: Record<string, typeof Server> = {
  Server, Brain, Monitor, Microchip, Network, Car, Zap, Gamepad2, Cloud, HeartPulse,
};

export function CategoriesGrid() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Categories"
          title="Browse by Chip Category"
          subtitle="Find the perfect chip for your workload from our extensive catalog"
          align="center"
        />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {CATEGORIES.map((cat, index) => {
            const Icon = ICON_MAP[cat.icon] || Server;
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/categories/${cat.slug}`}
                  className="block bg-surface border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-text mb-1">{cat.name}</h3>
                  <p className="text-xs text-text-dim mb-3">{cat.description}</p>
                  <Badge variant="green" size="sm">{cat.count} chips</Badge>
                </Link>
              </motion.div>
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
