"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Brain,
  Server,
  HeartPulse,
  BarChart3,
  ArrowRight,
  Cpu,
} from "lucide-react";

const INDUSTRIES = [
  {
    icon: Brain,
    slug: "ai-infrastructure",
    title: "AI & Machine Learning Infrastructure",
    desc: "Build production AI systems with authentic NVIDIA H100, H200, B200 and AMD Instinct MI300X accelerators. From single-node AI workstations to thousand-GPU training clusters, Servchip designs infrastructure matched to your model training, fine-tuning and inference workloads.",
    bullets: [
      "AI training clusters",
      "LLM inference platforms",
      "GPU capacity at scale",
    ],
    featured: true,
  },
  {
    icon: Server,
    slug: "data-centers",
    title: "Cloud & Data Center Hardware",
    desc: "Equip cloud providers and data centers with NVIDIA HGX platforms, Spectrum-X networking, HBM memory and NVMe storage. We deliver rack-scale AI clusters and colocation-ready GPU infrastructure across 150+ countries.",
    bullets: [
      "Rack-scale AI clusters",
      "400GbE networking",
      "Colocation-ready",
    ],
    featured: false,
  },
  {
    icon: HeartPulse,
    slug: "healthcare",
    title: "Healthcare & Life Sciences",
    desc: "Accelerate medical imaging AI, genomics and drug discovery with NVIDIA RTX and data center GPUs. Hospitals, pharma companies and research labs rely on our authentic hardware and full documentation.",
    bullets: ["Medical imaging GPUs", "Drug discovery compute", "Genomics"],
    featured: false,
  },
  {
    icon: BarChart3,
    slug: "finance",
    title: "Finance & Fintech Computing",
    desc: "Deploy low-latency trading servers, GPU-accelerated risk analytics and fraud-detection infrastructure. We supply Intel Xeon & AMD EPYC servers and NVIDIA GPUs to financial institutions worldwide.",
    bullets: [
      "Low-latency trading",
      "Monte Carlo risk analytics",
      "24/7 support",
    ],
    featured: false,
  },
];

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  const Icon = industry.icon;
  return (
    <div
      className={`group relative rounded-2xl border p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
        industry.featured
          ? "md:col-span-2 border-primary/30 bg-gradient-to-br from-primary/[0.07] to-secondary/[0.03] hover:shadow-lg hover:shadow-primary/10"
          : "border-border bg-surface hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
      }`}
    >
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-transform" />

      <div className="relative">
        <div className="flex items-start gap-4 mb-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-transform">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-text leading-snug">
              {industry.title}
            </h3>
            {industry.featured && (
              <span className="inline-flex items-center gap-1 mt-1 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5">
                <Cpu className="w-3 h-3 text-primary" />
                <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-wider">
                  Most Sourced
                </span>
              </span>
            )}
          </div>
        </div>

        <p className="text-text-muted text-sm leading-relaxed mb-4">
          {industry.desc}
        </p>

        <ul className="flex flex-wrap gap-2 mb-5">
          {industry.bullets.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/80 px-3 py-1 text-[11px] font-medium text-text-dim"
            >
              <span className="w-1 h-1 rounded-full bg-primary/70" />
              {b}
            </li>
          ))}
        </ul>

        <Link
          href={`/industries/${industry.slug}`}
          aria-label={`Explore enterprise hardware solutions for ${industry.title}`}
          className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold group/link"
        >
          Explore Solutions
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

export function IndustrySolutions() {
  return (
    <section className="relative py-20 bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-secondary/[0.04] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          label="Industry Solutions"
          title="AI Hardware for Every Industry"
          subtitle="From AI research labs to global financial markets — GPU accelerators, server CPUs and data center infrastructure for every enterprise workload"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">
          {INDUSTRIES.map((industry) => (
            <IndustryCard key={industry.slug} industry={industry} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/industries"
            aria-label="View all enterprise industry solutions"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            View All Industries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
