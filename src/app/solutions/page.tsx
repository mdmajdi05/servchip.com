"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import * as Icons from "lucide-react";
import {
  ArrowRight,
  Building2,
  FlaskConical,
  Rocket,
  HeartPulse,
  Car,
  Landmark,
  GraduationCap,
  Shield,
  Boxes,
  CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { TESTIMONIALS } from "@/data/testimonials";

const SOLUTIONS_INLINE = [
  {
    icon: "Building2",
    title: "Enterprise AI",
    description: "Build and scale enterprise AI platforms with H100/H200 clusters, MLOps pipelines, and production-grade infrastructure.",
    points: ["LLM training & serving", "RAG pipelines", "MLOps automation", "Hybrid cloud"],
  },
  {
    icon: "FlaskConical",
    title: "Research & HPC",
    description: "Power scientific discovery with Grace Hopper superchips and exascale computing for simulations and data analysis.",
    points: ["Climate modeling", "Drug discovery", "Genomics", "Computational chemistry"],
  },
  {
    icon: "Rocket",
    title: "Startups & Scaleups",
    description: "Accelerate your AI startup with cost-effective L40S/L4 inference clusters and flexible procurement options.",
    points: ["Inference at scale", "Cost optimization", "Rapid deployment", "Growth scaling"],
  },
  {
    icon: "HeartPulse",
    title: "Healthcare & Life Sci",
    description: "Deploy Clara-enabled medical imaging, genomics analysis, and biomedical AI on certified NVIDIA hardware.",
    points: ["Medical imaging AI", "Genomics sequencing", "Drug discovery", "Clinical NLP"],
  },
];

const INDUSTRY_SOLUTIONS = [
  {
    icon: Building2,
    title: "Enterprise AI",
    description:
      "Build and scale enterprise AI platforms with H100/H200 clusters, MLOps pipelines, and production-grade infrastructure.",
    points: ["LLM training & serving", "RAG pipelines", "MLOps automation", "Hybrid cloud"],
    recommendedChips: ["H100", "H200", "L40S"],
  },
  {
    icon: FlaskConical,
    title: "Research & HPC",
    description:
      "Power scientific discovery with Grace Hopper superchips and exascale computing for simulations and data analysis.",
    points: ["Climate modeling", "Drug discovery", "Genomics", "Computational chemistry"],
    recommendedChips: ["GH200", "H100", "B200"],
  },
  {
    icon: Rocket,
    title: "Startups & Scaleups",
    description:
      "Accelerate your AI startup with cost-effective L40S/L4 inference clusters and flexible procurement options.",
    points: ["Inference at scale", "Cost optimization", "Rapid deployment", "Growth scaling"],
    recommendedChips: ["L40S", "L4", "A100"],
  },
  {
    icon: HeartPulse,
    title: "Healthcare & Life Sci",
    description:
      "Deploy Clara-enabled medical imaging, genomics analysis, and biomedical AI on certified NVIDIA hardware.",
    points: ["Medical imaging AI", "Genomics sequencing", "Drug discovery", "Clinical NLP"],
    recommendedChips: ["H100", "GH200", "L40S"],
  },
  {
    icon: Car,
    title: "Automotive",
    description:
      "Develop autonomous driving systems with DRIVE Thor and DRIVE Orin SoCs — ASIL-D safety, multi-modal AI.",
    points: ["ADAS / AD stack", "Multi-modal perception", "Digital twins", "Fleet AI"],
    recommendedChips: ["DRIVE Thor", "Jetson AGX Orin"],
  },
  {
    icon: Landmark,
    title: "Financial Services",
    description:
      "Accelerate quant modeling, risk analytics, and fraud detection with low-latency GPU clusters and NVLink fabrics.",
    points: ["Quant modeling", "Risk analytics", "Fraud detection", "High-frequency trading"],
    recommendedChips: ["H100", "H200", "ConnectX-7"],
  },
  {
    icon: GraduationCap,
    title: "Education & Research",
    description:
      "Equip academic labs and universities with shared GPU clusters, MIG partitioning, and EduKit learning paths.",
    points: ["Shared GPU clusters", "MIG partitioning", "Research compute", "Curriculum kits"],
    recommendedChips: ["A100", "H100", "L40S"],
  },
  {
    icon: Shield,
    title: "Government & Defense",
    description:
      "Secure, on-prem NVIDIA deployments for defense AI, intelligence analysis, and sovereign cloud infrastructure.",
    points: ["Sovereign cloud", "Air-gapped deploy", "Confidential computing", "Multi-level security"],
    recommendedChips: ["H100", "B200", "ConnectX-7"],
  },
];

const CASE_STUDIES = [
  {
    industry: "Enterprise AI",
    title: "Tata Research Labs Scales 70B-parameter LLM Training",
    summary:
      "Deployed an 8-node H100 SXM5 cluster to train a domain-specific 70B-parameter LLM, cutting training time from 12 weeks to 18 days.",
    chip: "NVIDIA H100",
    metric: "18 days",
    metricLabel: "Training time",
  },
  {
    industry: "Research & HPC",
    title: "IISC Bangalore Powers Climate Modeling on GH200",
    summary:
      "Grace Hopper superchip cluster enables 4x higher-resolution regional climate models, predicting monsoon patterns with greater accuracy.",
    chip: "NVIDIA GH200",
    metric: "4x",
    metricLabel: "Resolution",
  },
  {
    industry: "Healthcare",
    title: "Reliance Jio Deploys Medical Imaging AI at Scale",
    summary:
      "L40S inference cluster serves 14,000 simultaneous medical image analyses across 230 hospitals with sub-second latency.",
    chip: "NVIDIA L40S",
    metric: "14K",
    metricLabel: "Concurrent analyses",
  },
];

export default function SolutionsPage() {
  useEffect(() => {
    document.title = "Industry Solutions | Servchip — Authorized NVIDIA Distributor";
  }, []);

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Solutions"
        title="Industry-Specific AI Computing Solutions"
        subtitle="From enterprise AI to healthcare, automotive, and government — we architect complete NVIDIA-based solutions tailored to your industry's unique compute, compliance, and scale requirements."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Solutions" },
        ]}
      />

      {/* Inlined Solutions component */}
      <section
        id="solutions"
        className="relative py-20 md:py-28 bg-bg-dark overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-circuit opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            label="Solutions"
            title="Industry-Specific AI Computing Solutions"
            subtitle="From enterprise AI to healthcare and research — we architect complete NVIDIA-based solutions tailored to your industry needs."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {SOLUTIONS_INLINE.map((sol, i) => {
              const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[sol.icon] || Icons.Circle;
              return (
                <motion.div
                  key={sol.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                  className="group relative rounded-2xl border border-border bg-surface p-6 md:p-7 card-hover overflow-hidden"
                >
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-text mb-2">{sol.title}</h3>
                      <p className="text-sm text-text-muted leading-relaxed mb-4">
                        {sol.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {sol.points.map((point) => (
                          <div key={point} className="flex items-center gap-1.5 text-xs text-text-muted">
                            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <a
                    href="#configurator"
                    className="mt-5 pt-5 border-t border-border flex items-center justify-between text-sm font-medium text-primary hover:underline"
                  >
                    Explore solution <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link href="#contact">
              <Button variant="outline" className="border-primary/40 text-primary hover:bg-primary/10 hover:border-primary">
                Discuss Your Solution <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Full industry grid */}
      <section className="py-20 md:py-28 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              All Industries
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Solutions by Industry
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              Eight specialized verticals, each backed by NVIDIA-certified
              engineering expertise and proven reference architectures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {INDUSTRY_SOLUTIONS.map((sol) => (
              <div
                key={sol.title}
                className="group relative rounded-2xl border border-border bg-surface p-6 card-hover overflow-hidden flex flex-col"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all" />
                <div className="relative flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <sol.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-text mb-2 group-hover:text-primary transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed mb-4">
                    {sol.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {sol.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-xs text-text-muted"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-3 border-t border-border">
                    <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider mb-1.5">
                      Recommended
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {sol.recommendedChips.map((c) => (
                        <Link
                          key={c}
                          href="/products"
                          className="px-2 py-0.5 rounded-md bg-surface-2 border border-border text-[10px] font-mono text-text hover:text-primary hover:border-primary/30 transition-colors"
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies */}
      <section className="py-20 md:py-28 bg-surface border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Case Studies
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Proven in Production
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              Real-world deployments from leading Indian enterprises and research institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {CASE_STUDIES.map((cs) => (
              <div
                key={cs.title}
                className="rounded-2xl border border-border bg-surface p-6 md:p-7 flex flex-col"
              >
                <div className="text-[10px] font-mono text-primary uppercase tracking-widest mb-3">
                  {cs.industry}
                </div>
                <h3 className="text-base font-bold text-text mb-3 leading-snug">
                  {cs.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed mb-5 flex-1">
                  {cs.summary}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                      {cs.metricLabel}
                    </div>
                    <div className="text-lg font-black text-primary font-mono">{cs.metric}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                      Built on
                    </div>
                    <div className="text-sm font-mono text-text">{cs.chip}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="mt-12">
            <h3 className="text-sm font-mono font-bold text-primary uppercase tracking-wider mb-5 text-center">
              What Our Clients Say
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-border bg-surface p-5 flex flex-col"
                >
                  <div className="flex items-center gap-1 mb-3 text-[#FFD600]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className="text-xs">★</span>
                    ))}
                  </div>
                  <p className="text-xs text-text-muted leading-relaxed mb-4 flex-1 line-clamp-4">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="pt-3 border-t border-border">
                    <div className="text-sm font-bold text-text">{t.name}</div>
                    <div className="text-[11px] text-text-dim font-mono">
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Boxes className="w-5 h-5 text-primary" />
                <span className="text-xs font-mono text-primary uppercase tracking-widest">
                  Not Sure Where to Start?
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black text-text mb-1">
                Let us architect your solution
              </h3>
              <p className="text-sm text-text-muted max-w-2xl">
                Our NVIDIA-certified engineers will design a complete reference
                architecture tailored to your industry and workload — at no cost.
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <Link href="/contact">
                <Button variant="solid" className="font-semibold">
                  Talk to an Expert <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/configurator">
                <Button variant="outline" className="border-border text-text-muted hover:text-text">
                  Try Configurator
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
