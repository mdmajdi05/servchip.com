"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, ArrowRight, Cpu, Check } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CHIPS } from "@/data/chips";
import type { ChipProduct } from "@/types";

const DEFAULT_SERIES = ["H100", "H200", "B200"];

const STATUS_STYLES: Record<
  ChipProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};

const SPEC_GROUPS: { label: string; keys: (keyof ChipProduct["specifications"])[] }[] = [
  {
    label: "Memory",
    keys: ["memory", "memoryBandwidth"],
  },
  {
    label: "Compute",
    keys: ["tensorCores", "cudaCores", "fp8TFLOPS", "fp16TFLOPS", "tf32TFLOPS", "fp64TFLOPS"],
  },
  {
    label: "Connectivity",
    keys: ["interconnect"],
  },
  {
    label: "Physical",
    keys: ["tdp", "formFactor", "cooling", "launchDate", "manufacturingProcess"],
  },
];

const SPEC_LABELS: Record<string, string> = {
  memory: "Memory",
  memoryBandwidth: "Memory Bandwidth",
  tensorCores: "Tensor Cores",
  cudaCores: "CUDA Cores",
  fp8TFLOPS: "FP8 TFLOPS",
  fp16TFLOPS: "FP16 TFLOPS",
  tf32TFLOPS: "TF32 TFLOPS",
  fp64TFLOPS: "FP64 TFLOPS",
  interconnect: "Interconnect",
  tdp: "TDP",
  formFactor: "Form Factor",
  cooling: "Cooling",
  launchDate: "Launch Date",
  manufacturingProcess: "Manufacturing Process",
};

export default function ComparisonPage() {
  const defaultIds = useMemo(
    () =>
      CHIPS.filter((c) => DEFAULT_SERIES.includes(c.series)).map((c) => c.id),
    []
  );

  const [selectedIds, setSelectedIds] = useState<string[]>(defaultIds);

  const selectedChips = useMemo(
    () => CHIPS.filter((c) => selectedIds.includes(c.id)),
    [selectedIds]
  );

  function toggleChip(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Compare"
          title="Compare NVIDIA Chips"
          subtitle="Select chips below to view a detailed side-by-side specification comparison"
          align="center"
        />

        {/* Chip Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CHIPS.map((chip) => {
            const selected = selectedIds.includes(chip.id);
            return (
              <motion.button
                key={chip.id}
                onClick={() => toggleChip(chip.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-sm font-semibold
                  transition-all duration-200 cursor-pointer
                  ${
                    selected
                      ? "bg-primary/10 border-primary text-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_15%,transparent)]"
                      : "bg-surface border-border text-text-muted hover:border-primary/30 hover:text-text"
                  }
                `}
              >
                <span
                  className={`
                    w-4 h-4 rounded border flex items-center justify-center transition-colors
                    ${selected ? "bg-primary border-primary" : "border-border"}
                  `}
                >
                  {selected && <Check className="w-3 h-3 text-bg-dark" />}
                </span>
                <Cpu className="w-3.5 h-3.5" />
                {chip.series}
                {selected && (
                  <X className="w-3.5 h-3.5 text-primary/60 hover:text-primary" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Comparison Table or Empty State */}
        {selectedChips.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface border border-border flex items-center justify-center">
              <Cpu className="w-7 h-7 text-text-dim" />
            </div>
            <h3 className="text-lg font-bold text-text mb-1">
              No Chips Selected
            </h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Click on any chip above to add it to the comparison table and view specifications side by side.
            </p>
          </motion.div>
        ) : (
          <div className="overflow-x-auto pb-4 scrollbar-thin">
            <div className="min-w-[640px]">
              {/* Header Row */}
              <div className="grid grid-cols-[180px_repeat(auto-fit,minmax(200px,1fr))] gap-px mb-px">
                <div className="sticky left-0 z-10 bg-bg-dark" />
                {selectedChips.map((chip) => (
                  <Card
                    key={chip.id}
                    variant="elevated"
                    padding="sm"
                    className="text-center"
                  >
                    <div className="mb-1">
                      <Badge
                        variant={STATUS_STYLES[chip.status].variant}
                        size="sm"
                      >
                        {STATUS_STYLES[chip.status].label}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-text leading-tight">
                      {chip.series}
                    </h3>
                    <p className="text-[10px] text-text-dim mt-0.5 leading-tight line-clamp-1">
                      {chip.architecture}
                    </p>
                    <button
                      onClick={() => toggleChip(chip.id)}
                      className="mt-2 text-text-dim hover:text-error transition-colors"
                      aria-label={`Remove ${chip.series}`}
                    >
                      <X className="w-3.5 h-3.5 mx-auto" />
                    </button>
                  </Card>
                ))}
              </div>

              {/* Spec Rows */}
              {SPEC_GROUPS.map((group) => (
                <div key={group.label} className="mb-px">
                  {/* Group Header */}
                  <div className="grid grid-cols-[180px_repeat(auto-fit,minmax(200px,1fr))] gap-px mb-px">
                    <div className="sticky left-0 z-10 bg-surface-2 rounded-tl-lg px-4 py-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {group.label}
                      </span>
                    </div>
                    {selectedChips.map((chip) => (
                      <div
                        key={chip.id}
                        className="bg-surface-2 px-4 py-2"
                      />
                    ))}
                  </div>

                  {/* Spec Values */}
                  {group.keys.map((key) => (
                    <div
                      key={key}
                      className="grid grid-cols-[180px_repeat(auto-fit,minmax(200px,1fr))] gap-px mb-px"
                    >
                      <div className="sticky left-0 z-10 bg-surface rounded-l-lg px-4 py-3 flex items-center">
                        <span className="text-xs text-text-dim">
                          {SPEC_LABELS[key] || key}
                        </span>
                      </div>
                      {selectedChips.map((chip) => (
                        <div
                          key={chip.id}
                          className="bg-surface px-4 py-3 flex items-center"
                        >
                          <span className="text-xs text-text-muted font-mono">
                            {chip.specifications[key] || "—"}
                          </span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Quote Row */}
              <div className="grid grid-cols-[180px_repeat(auto-fit,minmax(200px,1fr))] gap-px mt-2">
                <div className="sticky left-0 z-10" />
                {selectedChips.map((chip) => (
                  <div key={chip.id} className="px-2 pt-2">
                    <Link href={`/rfq?chip=${chip.slug}`}>
                      <Button variant="solid" size="sm" fullWidth>
                        Get Quote <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Browse All Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
