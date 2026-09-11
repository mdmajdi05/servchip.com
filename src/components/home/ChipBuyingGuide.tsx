"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  Workflow,
  MemoryStick,
  Gauge,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  GitCompareArrows,
  FileText,
} from "lucide-react";

const STEPS = [
  {
    icon: Workflow,
    title: "Define Your Workload",
    desc: (
      <>
        AI training demands maximum memory bandwidth and NVLink scalability —{" "}
        <strong className="text-text">NVIDIA H100 and H200</strong> or{" "}
        <strong className="text-text">AMD MI300X</strong> excel here. AI
        inference favors low latency and per-watt efficiency, where{" "}
        <strong className="text-text">NVIDIA L40S and Intel Gaudi 3</strong>{" "}
        shine. HPC and cloud workloads need high core counts and memory density
        from <strong className="text-text">AMD EPYC and Intel Xeon</strong>.
      </>
    ),
  },
  {
    icon: MemoryStick,
    title: "Match Memory & Bandwidth",
    desc: (
      <>
        Memory bandwidth decides how fast model weights move through your
        accelerator. <strong className="text-text">NVIDIA H200</strong> delivers
        141GB HBM3e at 4.8 TB/s,{" "}
        <strong className="text-text">AMD MI300X</strong> offers 192GB HBM3 at
        5.2 TB/s, and <strong className="text-text">Intel Gaudi 3</strong>{" "}
        provides 144GB HBM2e at 3.9 TB/s. Larger memory means bigger models and
        longer context windows — reducing cluster size and total cost of
        ownership.
      </>
    ),
  },
  {
    icon: Gauge,
    title: "Plan Scale & Budget",
    desc: (
      <>
        Volume pricing, power and cooling (air vs liquid), and network topology
        — <strong className="text-text">NVLink, InfiniBand or 400GbE</strong> —
        directly drive total cost of ownership. Our engineers model per-GPU TCO
        across clusters from a single unit to 1000+ GPUs, with no minimum order
        quantity.
      </>
    ),
  },
  {
    icon: ShieldCheck,
    title: "Verify Authenticity & Support",
    desc: (
      <>
        Always buy from an{" "}
        <strong className="text-text">authorized distributor</strong> with
        chain-of-custody documentation and manufacturer warranty — counterfeit
        and grey-market GPUs void NVIDIA, AMD and Intel support. Servchip ships{" "}
        <strong className="text-text">
          ISO 9001 certified, warranty-backed hardware
        </strong>{" "}
        to 150+ countries with 24/7 engineering support.
      </>
    ),
  },
];

export function ChipBuyingGuide() {
  return (
    <section className="relative py-20 bg-bg-dark overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-primary/[0.04] rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[350px] h-[350px] bg-secondary/[0.04] rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading
          label="Buying Guide"
          title="How to Choose the Right AI Chip for Your Workload"
          subtitle="A practical guide to buying AI accelerators, server CPUs and GPU infrastructure — comparing NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3"
          align="center"
        />

        {/* Timeline rail */}
        <div className="relative max-w-3xl mx-auto">
          <div className="hidden md:block absolute top-2 bottom-2 left-[27px] w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />

          <div className="space-y-6">
            {STEPS.map((step, i) => (
              <div key={step.title} className="relative flex gap-5 md:gap-7">
                {/* Number node */}
                <div className="relative z-10 flex-shrink-0">
                  <div className="w-14 h-14 rounded-2xl border border-primary/30 bg-bg-body flex items-center justify-center shadow-lg shadow-primary/10">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 font-mono text-[10px] font-black text-primary">
                    0{i + 1}
                  </span>
                </div>

                {/* Step card */}
                <div className="group relative flex-1 rounded-2xl border border-border/60 bg-surface p-6 hover:border-primary/30 transition-colors">
                  <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-transform" />
                  <div className="relative">
                    <h3 className="text-lg font-bold text-text mb-3">
                      {step.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA strip */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/[0.08] to-secondary/[0.04] p-6 sm:p-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-wider">
                Still not sure which chip fits?
              </span>
            </div>

            <p className="text-text-muted text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
              Use our AI-powered chip configurator or compare accelerators
              side-by-side — then get a volume quote within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
              <Link
                href="/configurator"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary text-black text-sm font-bold px-5 py-3 hover:bg-primary/90 transition-colors"
              >
                Try the AI Configurator
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/comparison"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-primary/40 text-primary text-sm font-semibold px-5 py-3 hover:bg-primary/10 transition-colors"
              >
                <GitCompareArrows className="w-4 h-4" />
                Compare NVIDIA vs AMD vs Intel
              </Link>
              <Link
                href="/rfq"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-surface text-text text-sm font-semibold px-5 py-3 hover:border-primary/30 transition-colors"
              >
                <FileText className="w-4 h-4 text-primary" />
                Get a Free Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
