"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Cpu,
  Zap,
  Network,
  Boxes,
  Gauge,
  Layers,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChipScene } from "@/components/shared/ChipScene";
import { Button } from "@/components/ui/Button";
import { TECHNOLOGY_FEATURES } from "@/data/home";

const ARCHITECTURE_TIMELINE = [
  {
    name: "Blackwell",
    year: "2024",
    node: "4NP TSMC",
    highlight: "20 PFLOPS FP4",
    description:
      "The most powerful GPU ever built. Dual-die design with 10 TB/s interconnect, 384GB HBM3e, and native FP4 precision for trillion-parameter AI.",
    chips: ["B200", "GB200"],
    color: "#00BCD4",
    icon: Cpu,
    features: [
      "FP4 Tensor Cores",
      "Transformer Engine v2",
      "NVLink 5.0 (1.8 TB/s)",
      "Dual-die design",
    ],
  },
  {
    name: "Hopper",
    year: "2022",
    node: "4nm TSMC",
    highlight: "Transformer Engine",
    description:
      "The industry standard for AI training. Introduces the Transformer Engine, 4th-gen Tensor Cores with FP8, and 900 GB/s NVLink 4.0.",
    chips: ["H100", "H200", "GH200"],
    color: "#00E5FF",
    icon: Zap,
    features: [
      "Transformer Engine",
      "FP8 Precision",
      "NVLink 4.0 (900 GB/s)",
      "Confidential Computing",
    ],
  },
  {
    name: "Ada Lovelace",
    year: "2022",
    node: "5nm TSMC 4N",
    highlight: "3rd-gen RT Cores",
    description:
      "Workstation and consumer GPU architecture. Delivers 2x ray tracing performance and 4th-gen Tensor Cores with FP8 for professional AI workloads.",
    chips: ["RTX 6000 Ada", "L40S", "L4", "RTX 4090"],
    color: "#AA00FF",
    icon: Boxes,
    features: [
      "3rd-gen RT Cores",
      "4th-gen Tensor Cores",
      "AV1 Encode/Decode",
      "DLSS 3.5",
    ],
  },
  {
    name: "Ampere",
    year: "2020",
    node: "7nm TSMC",
    highlight: "Multi-Instance GPU",
    description:
      "The proven workhorse of enterprise AI. Third-gen Tensor Cores with TF32, MIG partitioning, and structural sparsity for 2x AI performance.",
    chips: ["A100", "Jetson AGX Orin", "ConnectX-7"],
    color: "#FFD600",
    icon: Gauge,
    features: [
      "3rd-gen Tensor Cores",
      "MIG (7 instances)",
      "TF32 Precision",
      "Structural Sparsity",
    ],
  },
];

const FEATURE_DEEP_DIVES = [
  {
    icon: Zap,
    title: "Transformer Engine",
    description:
      "Hardware acceleration purpose-built for transformer models. Automatically chooses between FP8 and FP16 per layer to maximize throughput while maintaining accuracy — delivering up to 9x faster AI training on Hopper and beyond.",
    stat: "9x",
    statLabel: "Faster Training",
  },
  {
    icon: Network,
    title: "NVLink & NVSwitch",
    description:
      "NVIDIA's high-speed GPU interconnect scales from 600 GB/s on Ampere to 1.8 TB/s on Blackwell. NVSwitch enables all-to-all communication, letting clusters of GPUs act as one giant accelerator for exascale workloads.",
    stat: "1.8 TB/s",
    statLabel: "Per-GPU Bandwidth",
  },
  {
    icon: Layers,
    title: "Multi-Instance GPU (MIG)",
    description:
      "Partition a single GPU into up to 7 isolated instances with independent memory, cache, and compute. Ideal for cloud providers running multiple tenants on a single A100 or H100.",
    stat: "7x",
    statLabel: "Instances per GPU",
  },
  {
    icon: Cpu,
    title: "Grace CPU Superchip",
    description:
      "72 Arm Neoverse V2 cores connected to Hopper GPU via NVLink-C2C at 900 GB/s. The GH200 superchip offers up to 624GB unified memory for giant AI models that don't fit on traditional GPUs.",
    stat: "624GB",
    statLabel: "Unified Memory",
  },
  {
    icon: ShieldCheck,
    title: "Confidential Computing",
    description:
      "Hardware-level isolation protects data and code in use. H100's confidential computing mode secures AI workloads in multi-tenant clouds and regulated industries.",
    stat: "100%",
    statLabel: "In-Use Encryption",
  },
  {
    icon: Boxes,
    title: "Omniverse & Digital Twins",
    description:
      "Build physically accurate digital twins of factories, cities, and robots. Powered by RTX GPUs and Universal Scene Description, enabling industrial metaverse applications.",
    stat: "RTX",
    statLabel: "Physically Accurate",
  },
];

const ARCHITECTURE_COMPARISON = [
  {
    label: "Architecture",
    blackwell: "Blackwell",
    hopper: "Hopper",
    ada: "Ada Lovelace",
    ampere: "Ampere",
  },
  {
    label: "Process Node",
    blackwell: "4NP TSMC",
    hopper: "4nm TSMC",
    ada: "5nm TSMC 4N",
    ampere: "7nm TSMC",
  },
  {
    label: "Max Memory",
    blackwell: "384GB HBM3e",
    hopper: "141GB HBM3e",
    ada: "48GB GDDR6",
    ampere: "80GB HBM2e",
  },
  {
    label: "Memory Bandwidth",
    blackwell: "8 TB/s",
    hopper: "4.8 TB/s",
    ada: "960 GB/s",
    ampere: "2 TB/s",
  },
  {
    label: "FP8 Performance",
    blackwell: "9000 TFLOPS",
    hopper: "3958 TFLOPS",
    ada: "2816 TFLOPS",
    ampere: "—",
  },
  {
    label: "FP4 Performance",
    blackwell: "20 PFLOPS",
    hopper: "—",
    ada: "—",
    ampere: "—",
  },
  {
    label: "NVLink",
    blackwell: "5.0 (1.8 TB/s)",
    hopper: "4.0 (900 GB/s)",
    ada: "Optional",
    ampere: "3.0 (600 GB/s)",
  },
  {
    label: "Tensor Cores",
    blackwell: "5th gen",
    hopper: "4th gen",
    ada: "4th gen",
    ampere: "3rd gen",
  },
  {
    label: "TDP (max)",
    blackwell: "1000W",
    hopper: "700W",
    ada: "350W",
    ampere: "400W",
  },
];

const TECH_CARDS = [
  {
    icon: Cpu,
    title: "Blackwell & Hopper",
    description: "Latest architectures powering trillion-parameter AI models",
    stat: "20 PFLOPS",
    statLabel: "FP4 Performance",
  },
  {
    icon: Zap,
    title: "Transformer Engine",
    description: "Hardware acceleration for transformer-based AI models",
    stat: "2.5x",
    statLabel: "Faster Training",
  },
  {
    icon: Network,
    title: "NVLink 5.0",
    description: "Seamless GPU interconnect for scale-out clusters",
    stat: "1.8 TB/s",
    statLabel: "Per-GPU Bandwidth",
  },
  {
    icon: Boxes,
    title: "Multi-Instance GPU",
    description: "Partition a single GPU into isolated instances",
    stat: "7x",
    statLabel: "Instances per GPU",
  },
];

function MiniScene() {
  return (
    <div className="w-full h-full">
      <ChipScene />
    </div>
  );
}

export default function TechnologyPage() {
  return (
    <>
      <PageHero
        label="The Technology"
        title="Built for the Next Generation of AI Computing"
        subtitle="From Blackwell's FP4 precision to AMD CDNA 3 and Intel Granite Rapids — we deliver the most advanced chip architectures in the industry. Explore the technologies powering next-gen AI."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Technology" }]}
      />

      {/* Technology section */}
      <section
        id="technology"
        className="relative py-20 md:py-28 bg-bg-dark overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="glow-blob w-96 h-96 bg-primary top-20 right-0" />
        <div className="glow-blob w-80 h-80 bg-secondary bottom-20 left-0" />

        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            label="The Technology"
            title="Built for the Next Generation of AI Computing"
            subtitle="From Blackwell's FP4 precision to AMD CDNA 3 and Intel AMX — we deliver the most advanced chip architectures in the industry."
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16">
            {/* Left: 3D Scene */}
            <div className="relative h-[320px] md:h-[420px] rounded-2xl border border-border bg-surface overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-20" />
              <MiniScene />
              {/* Floating stat */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute top-4 right-4 px-3 py-1.5 rounded-lg border border-primary/30 bg-surface/90 backdrop-blur-sm"
              >
                <div className="text-[10px] font-mono text-text-dim">
                  MEMORY BANDWIDTH
                </div>
                <div className="text-sm font-bold text-primary font-mono">
                  8 TB/s
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg border border-secondary/30 bg-surface/90 backdrop-blur-sm"
              >
                <div className="text-[10px] font-mono text-text-dim">
                  ARCHITECTURE
                </div>
                <div className="text-sm font-bold text-secondary font-mono">
                  Blackwell
                </div>
              </motion.div>
            </div>

            {/* Right: Feature list */}
            <div>
              <ul className="space-y-3.5">
                {TECHNOLOGY_FEATURES.map((feature, i) => (
                  <li
                    key={feature.title}
                    className="flex items-start gap-3 group"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-transform">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-text">
                        {feature.title}
                      </span>
                      <p className="text-xs text-text-muted mt-0.5">
                        {feature.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Tech cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TECH_CARDS.map((card, i) => (
              <div
                key={card.title}
                className="rounded-xl border border-border bg-surface p-5 card-hover"
              >
                <card.icon className="w-7 h-7 text-primary mb-3" />
                <h3 className="text-sm font-bold text-text mb-1">
                  {card.title}
                </h3>
                <p className="text-xs text-text-muted mb-3 leading-relaxed">
                  {card.description}
                </p>
                <div className="pt-3 border-t border-border">
                  <div className="text-xl font-black text-primary font-mono">
                    {card.stat}
                  </div>
                  <div className="text-[10px] text-text-dim uppercase tracking-wider">
                    {card.statLabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture timeline */}
      <section className="py-20 md:py-28 bg-bg-body relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-15" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Architecture Timeline
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Four Generations of AI Computing
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              Each generation delivers a step-change in AI performance — from
              Ampere&apos;s MIG to Blackwell&apos;s FP4.
            </p>
          </div>

          <div className="space-y-5">
            {ARCHITECTURE_TIMELINE.map((arch, i) => (
              <div
                key={arch.name}
                className="relative rounded-2xl border border-border bg-surface p-6 md:p-8 overflow-hidden"
              >
                <div
                  className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-25"
                  style={{ backgroundColor: arch.color }}
                />
                <div className="relative grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-6 items-start">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center border"
                      style={{
                        backgroundColor: `${arch.color}15`,
                        borderColor: `${arch.color}40`,
                      }}
                    >
                      <arch.icon
                        className="w-6 h-6"
                        style={{ color: arch.color }}
                      />
                    </div>
                    <div>
                      <div className="text-xs font-mono text-text-dim">
                        {arch.year}
                      </div>
                      <h3 className="text-xl font-black text-text">
                        {arch.name}
                      </h3>
                      <div
                        className="text-xs font-mono"
                        style={{ color: arch.color }}
                      >
                        {arch.highlight}
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-text-muted leading-relaxed mb-4">
                      {arch.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {arch.features.map((f) => (
                        <span
                          key={f}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-surface-2 border border-border text-[11px] font-mono text-text-muted"
                        >
                          <Check
                            className="w-3 h-3"
                            style={{ color: arch.color }}
                          />
                          {f}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-text-dim">
                      <span className="font-mono uppercase tracking-wider">
                        Chips:
                      </span>
                      {arch.chips.map((c) => (
                        <Link
                          key={c}
                          href="/products"
                          className="font-mono text-text hover:text-primary transition-transform"
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-1">
                      Process Node
                    </div>
                    <div className="text-sm font-mono font-bold text-text">
                      {arch.node}
                    </div>
                    <div className="text-[10px] font-mono text-text-dim mt-2">
                      Gen {i + 1} of {ARCHITECTURE_TIMELINE.length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature deep dives */}
      <section className="py-20 md:py-28 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Feature Deep Dives
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Inside the Technology Stack
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              The innovations across NVIDIA, AMD, Intel and more that power AI,
              HPC, and accelerated computing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {FEATURE_DEEP_DIVES.map((f) => (
              <div
                key={f.title}
                className="group relative rounded-2xl border border-border bg-surface p-6 md:p-8 card-hover overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-transform" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-transform">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-5">
                    {f.description}
                  </p>
                  <div className="pt-4 border-t border-border">
                    <div className="text-2xl font-black text-primary font-mono">
                      {f.stat}
                    </div>
                    <div className="text-[10px] text-text-dim uppercase tracking-wider">
                      {f.statLabel}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tech features list */}
          <div className="mt-12 rounded-2xl border border-border bg-surface p-6 md:p-8">
            <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider mb-5 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Multi-Platform Highlights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {TECHNOLOGY_FEATURES.map((feature) => (
                <div key={feature.title} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </span>
                  <div>
                    <span className="text-sm font-bold text-text">
                      {feature.title}
                    </span>
                    <p className="text-xs text-text-muted mt-0.5">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Architecture comparison table */}
      <section className="py-20 md:py-28 bg-bg-body border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Architecture Comparison
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Specs Side-by-Side
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              Compare modern chip architectures across key metrics.
            </p>
          </div>

          <div className="max-w-5xl mx-auto rounded-2xl border border-border bg-surface overflow-hidden overflow-x-auto scrollbar-neon">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface-2">
                  <th className="text-left p-4 text-xs font-mono text-text-dim uppercase tracking-wider">
                    Specification
                  </th>
                  <th className="text-left p-4 text-xs font-mono font-bold text-primary uppercase tracking-wider">
                    Blackwell
                  </th>
                  <th className="text-left p-4 text-xs font-mono font-bold text-secondary uppercase tracking-wider">
                    Hopper
                  </th>
                  <th
                    className="text-left p-4 text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: "#AA00FF" }}
                  >
                    Ada Lovelace
                  </th>
                  <th
                    className="text-left p-4 text-xs font-mono font-bold uppercase tracking-wider"
                    style={{ color: "#FFD600" }}
                  >
                    Ampere
                  </th>
                </tr>
              </thead>
              <tbody>
                {ARCHITECTURE_COMPARISON.map((row) => (
                  <tr
                    key={row.label}
                    className="border-b border-border last:border-0 hover:bg-surface-2/50"
                  >
                    <td className="p-4 text-xs font-mono text-text-dim uppercase tracking-wider">
                      {row.label}
                    </td>
                    <td className="p-4 text-sm font-mono text-text">
                      {row.blackwell}
                    </td>
                    <td className="p-4 text-sm font-mono text-text">
                      {row.hopper}
                    </td>
                    <td className="p-4 text-sm font-mono text-text">
                      {row.ada}
                    </td>
                    <td className="p-4 text-sm font-mono text-text">
                      {row.ampere}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link href="/products">
              <Button variant="solid" className="font-semibold">
                Browse All Chips <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/comparison">
              <Button
                variant="outline"
                className="border-border text-text-muted hover:text-text"
              >
                Compare Specific Chips
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
