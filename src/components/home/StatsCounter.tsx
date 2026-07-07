"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import * as Icons from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { STATS } from "@/data/home";
import { useCountUp } from "@/hooks/useCountUp";

function StatCard({
  stat,
  index,
  start,
}: {
  stat: (typeof STATS)[number];
  index: number;
  start: boolean;
}) {
  const decimals = "decimals" in stat ? stat.decimals : 0;
  const value = useCountUp(stat.value, 2000, start, decimals);
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[stat.icon] || Icons.Circle;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="relative rounded-2xl border border-border bg-surface p-6 md:p-8 card-hover overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all" />

        <div className="relative">
          <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="text-4xl md:text-5xl font-black text-text mb-1 font-mono tabular-nums">
            {value}
            <span className="text-primary">{stat.suffix}</span>
          </div>
          <div className="text-sm text-text-muted">{stat.label}</div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export function StatsCounter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => setStart(true), 200);
      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 relative z-10" ref={ref}>
        <div className="mb-12 md:mb-16">
          <SectionHeading
            label="Our Impact"
            title="Trusted by Enterprises Worldwide"
            align="center"
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} start={start} />
          ))}
        </div>
      </div>
    </section>
  );
}
