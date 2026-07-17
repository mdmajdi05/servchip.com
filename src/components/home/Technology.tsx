"use client";

import dynamic from "next/dynamic";

import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Zap,
  HardDrive,
  Network,
  Layers,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TECHNOLOGY_FEATURES } from "@/data/home";
import type { TechnologyFeature } from "@/data/home";

const LIGHTNING_SCENE = dynamic(
  () =>
    import("@/components/scenes/LightningScene").then(
      (mod) => mod.LightningScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] bg-bg-dark rounded-xl animate-pulse" />
    ),
  },
);

const ICON_MAP: Record<string, typeof Cpu> = {
  Cpu,
  Zap,
  HardDrive,
  Network,
  Layers,
  ShieldCheck,
  TrendingUp,
};

function FeatureCard({
  feature,
  index,
}: {
  feature: TechnologyFeature;
  index: number;
}) {
  const Icon = ICON_MAP[feature.icon] || Cpu;
  return (
    <div className="group bg-bg-dark rounded-xl border border-border p-5 hover:border-primary/30 transition-all">
      <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <h4 className="text-sm font-bold text-text mb-1">{feature.title}</h4>
      <p className="text-xs text-text-dim leading-relaxed">{feature.desc}</p>
    </div>
  );
}

export function Technology() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="The Technology"
          title="Built for the Next Generation of AI Computing"
          subtitle="Enterprise-grade architecture designed for the most demanding workloads"
          align="center"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="relative h-[400px] bg-bg-dark rounded-2xl border border-border overflow-hidden">
            <LIGHTNING_SCENE />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 backdrop-blur-sm border border-primary/20">
              <span className="text-primary text-xs">⚡</span>
              <span className="text-text-dim text-[10px] font-mono">
                Animated Circuit Visualization
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TECHNOLOGY_FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Learn More About Our Technology{" "}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
