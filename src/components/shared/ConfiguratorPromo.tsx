"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, Cpu, Zap, Brain } from "lucide-react";

const PERKS = [
  { icon: Cpu, text: "Workload-matched picks" },
  { icon: Zap, text: "Budget & performance aware" },
  { icon: Brain, text: "Backed by certified engineers" },
];

export function ConfiguratorPromo() {
  return (
    <section className="py-16 md:py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl border border-primary/20 bg-surface overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-16 w-72 h-72 bg-secondary/5 rounded-full blur-3xl" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          </div>

          <div className="relative px-6 md:px-12 py-10 md:py-14 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                  Chip Configurator
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-text mb-2">
                Not sure which chip fits your workload?
              </h2>
              <p className="text-sm md:text-base text-text-muted mb-6 max-w-xl">
                Answer 3 quick questions and our AI-powered configurator will
                recommend the optimal NVIDIA, AMD or Intel chip for your AI
                training, inference, HPC or professional workload.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <Link href="/configurator">
                  <span className="inline-flex items-center gap-2 bg-primary text-bg-dark px-6 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25">
                    <Sparkles className="w-4 h-4" />
                    Try the Configurator
                  </span>
                </Link>
                <ul className="flex flex-col sm:flex-row gap-3">
                  {PERKS.map((perk) => (
                    <li
                      key={perk.text}
                      className="flex items-center gap-1.5 text-xs text-text-dim"
                    >
                      <perk.icon className="w-3.5 h-3.5 text-primary/70" />
                      {perk.text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full lg:w-72 shrink-0">
              <div className="rounded-xl border border-border bg-bg-dark p-5">
                <div className="flex items-center gap-2 mb-4">
                  <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  <span className="text-xs font-semibold text-text">
                    How it works
                  </span>
                </div>
                <ol className="space-y-3">
                  {[
                    "Pick your workload",
                    "Set budget & performance",
                    "Get matched chips + quote",
                  ].map((step, i) => (
                    <li key={step} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-sm text-text-muted">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
