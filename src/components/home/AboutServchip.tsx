"use client";

import { useState } from "react";
import Image from "next/image";
import { AppLink as Link } from "@/components/ui/AppLink";
import {
  ShieldCheck,
  Award,
  Globe,
  Headphones,
  ArrowRight,
  ChevronDown,
  Building2,
} from "lucide-react";

const ABOUT_STATS = [
  { icon: ShieldCheck, value: "100%", label: "Authentic Chips" },
  { icon: Award, value: "ISO 9001", label: "Certified Ops" },
  { icon: Globe, value: "150+", label: "Countries Served" },
  { icon: Headphones, value: "24/7", label: "Expert Support" },
];

export function AboutServchip() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="relative min-h-[85vh] flex items-center bg-bg-dark overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dot-grid opacity-[0.07]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/[0.03] rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 py-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left — Image + Overlay */}
          <div className="relative">
            <div className="relative h-[320px] sm:h-[380px] lg:h-[420px] rounded-2xl overflow-hidden border border-border/50">
              <Image
                src="/images/server-room-2.webp"
                alt="Servchip enterprise data center — ISO certified semiconductor warehouse with verified NVIDIA, AMD and Intel AI chips ready for global distribution"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/40 to-transparent" />

              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black/60 backdrop-blur-md border border-primary/20">
                <Building2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                  Est. 2018
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest">
                    ISO 9001:2015 Certified Facility
                  </span>
                </div>
                <p className="text-white/80 text-xs font-mono">
                  New Delhi, India &amp; Sharjah, UAE
                </p>
              </div>
            </div>

            <div className="hidden lg:block absolute -bottom-5 -right-5 glass rounded-xl border border-primary/15 px-5 py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-lg font-black font-mono">
                    27+
                  </span>
                </div>
                <div>
                  <p className="text-text text-xs font-bold">
                    Manufacturer Partnerships
                  </p>
                  <p className="text-text-dim text-[10px] font-mono">
                    NVIDIA · AMD · Intel
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-primary/10 border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                About Servchip
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-text leading-tight tracking-tight">
              Enterprise Chip Distributor{" "}
              <span className="gradient-text">Since 2018</span>
            </h2>

            {/* Expandable SEO content — text ALWAYS in DOM for crawlers */}
            <div className="relative">
              <div
                className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
                  expanded ? "max-h-[1000px]" : "max-h-[130px]"
                }`}
              >
                <div className="space-y-3 text-text-muted text-sm leading-relaxed">
                  <p>
                    <strong className="text-text">
                      Servchip is a global enterprise chip distributor
                    </strong>{" "}
                    founded in 2018 with a simple mission: make semiconductor
                    procurement fast, transparent, and counterfeit-free.
                    Headquartered in{" "}
                    <strong className="text-text">New Delhi, India</strong> with
                    a regional hub in{" "}
                    <strong className="text-text">Sharjah, UAE</strong>, we
                    source and supply AI accelerators, server CPUs, HBM memory,
                    data center GPUs, and enterprise networking hardware from{" "}
                    <strong className="text-text">
                      27+ authorized manufacturer partnerships
                    </strong>{" "}
                    including{" "}
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
                    ,{" "}
                    <Link
                      href="/brands/intel"
                      className="text-primary hover:underline"
                    >
                      Intel
                    </Link>
                    , Broadcom, Marvell, Cisco, Samsung, SK hynix, Micron, and
                    Dell.
                  </p>

                  <p>
                    As an{" "}
                    <strong className="text-text">
                      authorized NVIDIA distributor
                    </strong>{" "}
                    and multi-vendor semiconductor partner, we serve over{" "}
                    <strong className="text-text">
                      500 enterprise clients
                    </strong>{" "}
                    spanning cloud service providers, AI research labs,
                    hyperscale data centers, financial institutions, and
                    government organizations across 150+ countries. Every chip
                    we deliver comes with full chain-of-custody documentation,
                    manufacturer warranty, and our{" "}
                    <strong className="text-text">
                      zero-counterfeit guarantee
                    </strong>{" "}
                    enforced through ISO 9001:2015 certified quality management
                    processes.
                  </p>

                  <p>
                    Our engineering team specializes in matching the right
                    accelerator and memory configuration to your specific
                    workload — whether you are training large language models on{" "}
                    <Link
                      href="/brands/nvidia"
                      className="text-primary hover:underline"
                    >
                      NVIDIA H100 clusters
                    </Link>
                    , deploying{" "}
                    <Link
                      href="/brands/amd"
                      className="text-primary hover:underline"
                    >
                      AMD MI300X
                    </Link>{" "}
                    for high-bandwidth inference, or building{" "}
                    <Link
                      href="/brands/intel"
                      className="text-primary hover:underline"
                    >
                      Intel Gaudi 3
                    </Link>{" "}
                    powered AI infrastructure. From single-chip procurement to
                    full rack-level data center integration, we handle sourcing,
                    logistics, customs documentation, and post-delivery
                    technical support.
                  </p>

                  <p>
                    Looking to procure enterprise semiconductor hardware?{" "}
                    <Link
                      href="/products"
                      className="text-primary font-semibold hover:underline"
                    >
                      Explore our full product catalog
                    </Link>{" "}
                    or{" "}
                    <Link
                      href="/about"
                      className="text-primary font-semibold hover:underline"
                    >
                      learn more about our team and mission
                    </Link>
                    .
                  </p>
                </div>

                {/* Gradient fade — only when collapsed */}
                {!expanded && (
                  <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent pointer-events-none" />
                )}
              </div>

              {/* Toggle button */}
              <button
                onClick={() => setExpanded((p) => !p)}
                aria-expanded={expanded}
                className="mt-2 inline-flex items-center gap-1.5 text-primary text-xs font-semibold hover:underline"
              >
                {expanded ? (
                  <>
                    Show Less{" "}
                    <ChevronDown className="w-3.5 h-3.5 rotate-180 transition-transform" />
                  </>
                ) : (
                  <>
                    See More About Servchip
                    <ChevronDown className="w-3.5 h-3.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              {ABOUT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="group relative rounded-xl border border-border/60 bg-surface/50 backdrop-blur-sm px-3 py-3 text-center hover:border-primary/30 transition-colors"
                >
                  <stat.icon className="w-4 h-4 text-primary mx-auto mb-1.5" />
                  <p className="text-text text-sm font-black font-mono">
                    {stat.value}
                  </p>
                  <p className="text-text-dim text-[9px] font-mono uppercase tracking-wider leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-black text-sm font-bold hover:bg-primary/90 transition-colors"
              >
                Learn More About Us
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
              >
                Explore Products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
