"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECHNOLOGY_FEATURES } from "@/data/home";

const LightningScene = dynamic(
  () => import("@/components/3d/LightningScene").then((mod) => mod.LightningScene),
  { ssr: false }
);

export function Technology() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="The Technology"
          title="Built for the Next Generation of AI Computing"
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px] bg-bg-dark rounded-2xl border border-border overflow-hidden">
            <LightningScene />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 backdrop-blur-sm border border-primary/20">
              <span className="text-primary text-xs">⚡</span>
              <span className="text-text-dim text-[10px] font-mono">Animated Circuit Visualization</span>
            </div>
          </div>

          <div className="space-y-4">
            {TECHNOLOGY_FEATURES.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex gap-3"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <span className="text-text text-sm font-medium">{feature}</span>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="pt-4"
            >
              <Link
                href="/about"
                className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
              >
                Learn More About Our Technology <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
