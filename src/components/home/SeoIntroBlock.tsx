"use client";

import { useState } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Server,
  HardDrive,
  Network,
  ShieldCheck,
  Factory,
  Building2,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const KEYWORD_TAGS = [
  { label: "AI Accelerators", href: "/categories/ai-accelerators", icon: Cpu },
  { label: "Server CPUs", href: "/categories/server-cpus", icon: Server },
  {
    label: "HBM Memory",
    href: "/categories/memory-storage",
    icon: HardDrive,
  },
  {
    label: "Data Center GPUs",
    href: "/categories/ai-accelerators",
    icon: Network,
  },
];

const FLOW_STEPS = [
  {
    icon: Factory,
    title: "27+ Manufacturers",
    desc: "NVIDIA · AMD · Intel · Broadcom · Marvell",
  },
  {
    icon: ShieldCheck,
    title: "Servchip Verified",
    desc: "ISO 9001:2015 · Chain of custody · Zero counterfeit",
    highlight: true,
  },
  {
    icon: Building2,
    title: "Your Enterprise",
    desc: "AI clusters · HPC · Data centers · 150+ countries",
  },
];

function DistributionFlow() {
  return (
    <div className="relative">
      {/* Glow behind flow */}
      <div className="absolute -inset-8 bg-gradient-to-b from-primary/10 to-secondary/10 rounded-[2rem] blur-2xl" />

      {/* Main framed panel */}
      <div className="relative rounded-2xl border border-border/60 bg-surface/40 backdrop-blur-sm overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.05]" />

        <div className="relative p-6 sm:p-8">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-primary/20 bg-primary/5 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
              The Supply Chain Behind AI Infrastructure
            </span>
          </div>

          <div className="space-y-0">
            {FLOW_STEPS.map((step, i) => (
              <div key={step.title} className="relative">
                <div
                  className={`relative flex items-center gap-4 rounded-xl border p-4 transition-colors ${
                    step.highlight
                      ? "border-primary/30 bg-primary/[0.06]"
                      : "border-border/70 bg-bg-dark/60"
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      step.highlight
                        ? "bg-primary/20 border border-primary/30"
                        : "bg-primary/10 border border-primary/20"
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 ${
                        step.highlight ? "text-primary" : "text-primary/80"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-text truncate">
                        {step.title}
                      </p>
                      {step.highlight && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 border border-green-500/30 px-2 py-0.5">
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                          <span className="text-[9px] font-mono font-bold text-green-400 uppercase">
                            Trusted
                          </span>
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-text-dim truncate">
                      {step.desc}
                    </p>
                  </div>
                </div>

                {i < FLOW_STEPS.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <div className="flex items-center gap-1 text-primary/60">
                      <span className="w-px h-5 bg-primary/30" />
                      <span className="text-primary/50 text-xs font-mono">
                        {i === 0 ? "SOURCED DIRECT" : "DELIVERED DUTY-FREE"}
                      </span>
                      <span className="w-px h-5 bg-primary/30" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom brand chips */}
          <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap justify-center gap-2">
            {["NVIDIA", "AMD", "INTEL", "SK hynix"].map((brand) => (
              <span
                key={brand}
                className="inline-flex items-center rounded-full border border-border/60 bg-bg-dark/80 px-3 py-1 text-[10px] font-mono font-bold text-text-dim uppercase tracking-wider"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating mini-badge */}
      <div className="absolute -top-3 -right-3 glass rounded-full border border-primary/20 px-4 py-1.5">
        <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
          Gen-AI Ready · 2026
        </span>
      </div>
    </div>
  );
}

export function SeoIntroBlock() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative py-16 md:py-24 bg-bg-body overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" />
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-secondary/[0.04] rounded-full blur-[100px]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT — Visual flow diagram */}
          <div className="order-2 lg:order-1">
            <DistributionFlow />
          </div>

          {/* RIGHT — SEO content */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-3">
              <span className="w-6 h-px bg-primary" />
              Understanding AI Chip Distribution
              <span className="w-6 h-px bg-primary" />
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-text leading-tight mb-4 tracking-tight">
              What Is an{" "}
              <span className="gradient-text">AI Chip Distributor</span> and Why
              Your Enterprise Needs One
            </h2>

            <p className="text-text-muted text-base leading-relaxed mb-8 max-w-xl">
              A complete guide to enterprise semiconductor distribution — how AI
              accelerators, server CPUs, and data center GPUs reach your
              infrastructure.
            </p>

            {/* Expandable SEO content — text ALWAYS in DOM for crawlers */}
            <div className="relative rounded-2xl border border-border/60 bg-surface/50 backdrop-blur-sm p-5 sm:p-6">
              <div
                className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                  expanded ? "max-h-[900px]" : "max-h-[200px]"
                }`}
              >
                <div className="text-text-muted text-sm leading-relaxed space-y-4">
                  <p>
                    <strong className="text-text">
                      An AI chip distributor
                    </strong>{" "}
                    is a specialized enterprise supplier that sources, procures,
                    and delivers semiconductor hardware — including AI
                    accelerators, server processors, high-bandwidth memory, and
                    data center GPUs — directly from manufacturers to businesses
                    building compute-intensive infrastructure. Unlike general IT
                    resellers, an{" "}
                    <strong className="text-text">
                      authorized chip distributor
                    </strong>{" "}
                    maintains direct partnerships with semiconductor
                    manufacturers like{" "}
                    <Link
                      href="/brands/nvidia"
                      className="text-primary hover:underline"
                    >
                      NVIDIA
                    </Link>
                    ,{" "}
                    <Link
                      href="/brands/amd"
                      className="text-primary hover:underline"
                    >
                      AMD
                    </Link>
                    , and{" "}
                    <Link
                      href="/brands/intel"
                      className="text-primary hover:underline"
                    >
                      Intel
                    </Link>
                    , ensuring every product is authentic, warranty-backed, and
                    sourced through official supply chains.
                  </p>

                  <p>
                    For enterprises deploying AI training clusters,
                    high-performance computing (HPC) workloads, or large-scale
                    data center operations, working with a certified
                    semiconductor distributor eliminates counterfeit risk,
                    reduces procurement lead times, and provides access to
                    volume pricing that retail channels cannot match. At
                    Servchip, we hold authorized distribution agreements with{" "}
                    <strong className="text-text">27+ manufacturers</strong>,
                    giving our clients direct access to the full range of{" "}
                    <Link
                      href="/brands/nvidia"
                      className="text-primary hover:underline"
                    >
                      NVIDIA H100, H200, and B200 Tensor Core GPUs
                    </Link>
                    ,{" "}
                    <Link
                      href="/brands/amd"
                      className="text-primary hover:underline"
                    >
                      AMD Instinct MI300X accelerators
                    </Link>
                    ,{" "}
                    <Link
                      href="/brands/intel"
                      className="text-primary hover:underline"
                    >
                      Intel Xeon server processors
                    </Link>
                    , and{" "}
                    <Link
                      href="/categories/memory-storage"
                      className="text-primary hover:underline"
                    >
                      SK hynix HBM3E memory
                    </Link>
                    .
                  </p>

                  <p>
                    Whether you are a cloud provider scaling GPU capacity, an AI
                    startup building your first training cluster, or an
                    enterprise data center expanding compute infrastructure,
                    choosing the right chip distributor directly impacts your
                    hardware budget, deployment timeline, and long-term
                    reliability. Servchip combines{" "}
                    <strong className="text-text">
                      ISO 9001:2015 certified operations
                    </strong>{" "}
                    with dedicated engineering support to help you select,
                    procure, and deploy the exact semiconductor hardware your
                    workload demands — with global shipping from India and UAE
                    to 150+ countries.
                  </p>
                </div>

                {!expanded && (
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-surface via-surface/80 to-transparent pointer-events-none" />
                )}
              </div>

              <div className="mt-3 text-center">
                <button
                  onClick={() => setExpanded((p) => !p)}
                  aria-expanded={expanded}
                  className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline"
                >
                  {expanded ? (
                    <>
                      Show Less
                      <ChevronDown className="w-3.5 h-3.5 rotate-180 transition-transform" />
                    </>
                  ) : (
                    <>
                      Read Full Guide
                      <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Keyword tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {KEYWORD_TAGS.map((tag) => (
                <Link
                  key={tag.label}
                  href={tag.href}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface text-xs font-semibold text-text px-4 py-2 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                >
                  <tag.icon className="w-3.5 h-3.5 text-primary" />
                  {tag.label}
                  <ArrowRight className="w-3 h-3 text-text-dim" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
