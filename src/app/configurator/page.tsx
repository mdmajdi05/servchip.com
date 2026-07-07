"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Icons from "lucide-react";
import { ArrowRight, ArrowLeft, Check, Zap, Sparkles, RotateCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { USE_CASES } from "@/data/use-cases";
import { CHIPS } from "@/data/chips";
import type { ChipProduct } from "@/types";
import { cn } from "@/lib/utils";

const BUDGET_TIERS = [
  { id: "budget", label: "Budget", description: "Cost-effective, efficient solutions" },
  { id: "mid-range", label: "Mid-Range", description: "Balanced performance and value" },
  { id: "high-end", label: "High-End", description: "Premium performance for demanding workloads" },
  { id: "enterprise", label: "Enterprise", description: "Maximum performance, data-center grade" },
] as const;

const PERFORMANCE_PRIORITIES = [
  { id: "memory", label: "Memory Capacity", description: "Maximize VRAM for large models" },
  { id: "compute", label: "Compute", description: "Maximize TFLOPS for training" },
  { id: "bandwidth", label: "Memory Bandwidth", description: "Maximize throughput for inference" },
  { id: "balanced", label: "Balanced", description: "Even performance across all dimensions" },
] as const;

const STATUS_CONFIG: Record<string, { label: string; clr: string; dot: string }> = {
  in_stock: { label: "In Stock", clr: "text-success border-success/30 bg-success/5", dot: "bg-success" },
  on_order: { label: "On Order", clr: "text-warning border-warning/30 bg-warning/5", dot: "bg-warning" },
  limited: { label: "Limited", clr: "text-warning border-warning/30 bg-warning/5", dot: "bg-warning" },
  pre_order: { label: "Pre-Order", clr: "text-secondary border-secondary/30 bg-secondary/5", dot: "bg-secondary" },
  discontinued: { label: "Discontinued", clr: "text-error border-error/30 bg-error/5", dot: "bg-error" },
};

export default function ConfiguratorPage() {
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [useCase, setUseCase] = useState<string | null>(null);
  const [budget, setBudget] = useState("high-end");
  const [performance, setPerformance] = useState("balanced");
  const [quantity, setQuantity] = useState(4);

  const selectedUseCase = USE_CASES.find((u) => u.id === useCase);

  const matchingChips = (selectedUseCase?.suggestedChips || [])
    .map((chipId) => {
      const chip = CHIPS.find((c) => c.id === chipId);
      if (!chip) return null;
      let match = 75;
      if (budget === "enterprise" && chip.specifications.tdp.includes("700")) match += 15;
      if (budget === "budget" && chip.specifications.tdp.includes("72")) match += 15;
      if (budget === "mid-range" && (chip.specifications.tdp.includes("350") || chip.specifications.tdp.includes("300"))) match += 15;
      if (performance === "memory" && chip.specifications.memory.includes("141")) match += 10;
      if (performance === "compute" && chip.specifications.fp8TFLOPS && parseInt(chip.specifications.fp8TFLOPS) > 3000) match += 10;
      if (performance === "bandwidth" && chip.specifications.memoryBandwidth.includes("TB")) match += 10;
      match = Math.min(match, 99);
      return { chip, match };
    })
    .filter(Boolean)
    .sort((a, b) => b!.match - a!.match) as { chip: ChipProduct; match: number }[];

  const handleQuote = (chips: ChipProduct[]) => {
    if (chips.length === 0) {
      router.push("/rfq");
      return;
    }
    const slugs = chips.map((c) => c.slug).join(",");
    router.push(`/rfq?chips=${slugs}`);
  };

  const reset = () => {
    setStep(1);
    setUseCase(null);
    setBudget("high-end");
    setPerformance("balanced");
    setQuantity(4);
  };

  return (
    <>
      <PageHero
        label="Chip Configurator"
        title="Find Your Perfect NVIDIA Chip Match"
        subtitle="Answer a few questions and our AI-powered configurator will recommend the optimal NVIDIA chips for your specific workload, performance needs, and budget — backed by certified engineering expertise."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Configurator" },
        ]}
      />

      <section id="configurator" className="py-20 md:py-28 bg-bg-body scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute w-96 h-96 rounded-full bg-primary/10 blur-3xl top-20 right-1/4 pointer-events-none" aria-hidden />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            label="Chip Configurator"
            title="Find Your Perfect Chip Match"
            subtitle="Answer a few questions and our AI-powered configurator will recommend the optimal NVIDIA chips for your specific workload and requirements."
          />

          <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-surface p-6 md:p-8">
            {/* Progress bar */}
            <div className="flex items-center justify-between mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-mono transition-all border-2",
                      step >= s
                        ? "bg-primary text-bg-dark border-primary"
                        : "bg-surface text-text-dim border-border"
                    )}
                  >
                    {step > s ? <Check className="w-4 h-4" /> : s}
                  </div>
                  {s < 4 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1 mx-2 transition-colors",
                        step > s ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Use Case */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <h3 className="text-lg font-bold text-text mb-1">What&apos;s your primary use case?</h3>
                  <p className="text-sm text-text-muted mb-6">Select the workload that best describes your project.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {USE_CASES.map((uc) => {
                      const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[uc.icon] || Icons.Circle;
                      const selected = useCase === uc.id;
                      return (
                        <button
                          key={uc.id}
                          onClick={() => setUseCase(uc.id)}
                          className={cn(
                            "p-4 rounded-xl border text-left transition-all",
                            selected
                              ? "border-primary bg-primary/10"
                              : "border-border bg-surface hover:border-primary/30"
                          )}
                        >
                          <Icon
                            className={cn(
                              "w-6 h-6 mb-2",
                              selected ? "text-primary" : "text-text-muted"
                            )}
                          />
                          <p className={cn("text-sm font-bold mb-1", selected ? "text-primary" : "text-text")}>
                            {uc.label}
                          </p>
                          <p className="text-[11px] text-text-dim line-clamp-2">{uc.description}</p>
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!useCase}
                    >
                      Continue <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Parameters */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <h3 className="text-lg font-bold text-text mb-1">Configure your parameters</h3>
                  <p className="text-sm text-text-muted mb-6">Set your budget, performance priority, and quantity.</p>

                  <div className="space-y-6">
                    {/* Budget */}
                    <div>
                      <label className="text-sm font-medium text-text mb-2 block">Budget Tier</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {BUDGET_TIERS.map((b) => (
                          <button
                            key={b.id}
                            onClick={() => setBudget(b.id)}
                            className={cn(
                              "p-3 rounded-lg border text-left transition-all",
                              budget === b.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/30"
                            )}
                          >
                            <p className={cn("text-sm font-bold", budget === b.id ? "text-primary" : "text-text")}>
                              {b.label}
                            </p>
                            <p className="text-[10px] text-text-dim mt-0.5">{b.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Performance Priority */}
                    <div>
                      <label className="text-sm font-medium text-text mb-2 block">Performance Priority</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {PERFORMANCE_PRIORITIES.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setPerformance(p.id)}
                            className={cn(
                              "p-3 rounded-lg border text-left transition-all",
                              performance === p.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/30"
                            )}
                          >
                            <p className={cn("text-sm font-bold", performance === p.id ? "text-primary" : "text-text")}>
                              {p.label}
                            </p>
                            <p className="text-[10px] text-text-dim mt-0.5">{p.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quantity */}
                    <div>
                      <label className="text-sm font-medium text-text mb-2 block">
                        Quantity: <span className="text-primary font-mono">{quantity} units</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="100"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        className="w-full accent-primary"
                      />
                      <div className="flex justify-between text-xs text-text-dim mt-1">
                        <span>1</span>
                        <span>50</span>
                        <span>100</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(1)}>
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button onClick={() => setStep(3)}>
                      See Results <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Results */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-bold text-text">Your Recommended Chips</h3>
                  </div>
                  <p className="text-sm text-text-muted mb-6">
                    Based on <span className="text-primary">{selectedUseCase?.label}</span> workload,
                    <span className="text-primary"> {BUDGET_TIERS.find((b) => b.id === budget)?.label}</span> budget,
                    and <span className="text-primary">{quantity}</span> units needed.
                  </p>

                  <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                    {matchingChips.map(({ chip, match }) => {
                      const sc = STATUS_CONFIG[chip.status] || STATUS_CONFIG.in_stock;
                      return (
                        <div
                          key={chip.id}
                          className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surface"
                        >
                          {/* Match circle */}
                          <div className="relative w-14 h-14 shrink-0">
                            <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                              <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-border" />
                              <circle
                                cx="28"
                                cy="28"
                                r="24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="4"
                                strokeDasharray={`${(match / 100) * 150.8} 150.8`}
                                strokeLinecap="round"
                                className="text-primary"
                              />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-sm font-bold text-primary font-mono">{match}%</span>
                            </div>
                          </div>

                          {/* Chip info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text truncate">{chip.name}</p>
                            <p className="text-xs text-text-muted font-mono">
                              {chip.specifications.memory} · {chip.architecture} · {chip.specifications.tdp}
                            </p>
                            <div className="mt-1.5">
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${sc.clr}`}>
                                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${sc.dot}`} />
                                {sc.label}
                              </span>
                            </div>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleQuote([chip])}
                          >
                            <Zap className="w-3.5 h-3.5" />
                            Quote
                          </Button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between mt-6">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4" /> Back
                    </Button>
                    <Button
                      onClick={() => {
                        handleQuote(matchingChips.map((m) => m.chip));
                      }}
                    >
                      Request Quote for All <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reset button (when not on step 1) */}
            {step > 1 && (
              <button
                onClick={reset}
                className="mt-4 mx-auto flex items-center gap-1.5 text-xs text-text-dim hover:text-primary transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                Start over
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
