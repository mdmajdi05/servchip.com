"use client";

import type { ChipProduct } from "@/types";

interface ChipSpecsProps {
  specifications: ChipProduct["specifications"];
  className?: string;
}

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

export function ChipSpecs({ specifications, className = "" }: ChipSpecsProps) {
  return (
    <div className={className}>
      {SPEC_GROUPS.map((group) => (
        <div key={group.label} className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">
            {group.label}
          </h4>
          <div className="space-y-2">
            {group.keys.map((key) => {
              const value = specifications[key];
              if (!value || value === "—") return null;
              return (
                <div key={key} className="flex justify-between py-1.5 border-b border-border/50 last:border-0">
                  <span className="text-sm text-text-dim">{SPEC_LABELS[key] || key}</span>
                  <span className="text-sm text-text-muted font-mono">{value}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
