"use client";

import { useState } from "react";
import { Calculator, Cpu, HardDrive, DollarSign, Info } from "lucide-react";

const PRECISION_BYTES: Record<string, number> = {
  "fp32": 4,
  "fp16": 2,
  "bf16": 2,
  "int8": 1,
  "int4": 0.5,
};

const OPTIMIZER_MULTIPLIER: Record<string, number> = {
  "adam": 12,
  "sgd": 4,
  "none": 0,
};

const GPU_MODELS: { name: string; vram: number }[] = [
  { name: "RTX 4090", vram: 24 },
  { name: "RTX 5090", vram: 32 },
  { name: "A100 40GB", vram: 40 },
  { name: "A100 80GB", vram: 80 },
  { name: "H100 SXM", vram: 80 },
  { name: "H200 SXM", vram: 141 },
  { name: "B200 SXM", vram: 192 },
  { name: "MI300X", vram: 192 },
  { name: "MI350X", vram: 288 },
];

function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  return n.toFixed(1);
}

export function GpuCalculator() {
  const [params, setParams] = useState(7);
  const [precision, setPrecision] = useState("fp16");
  const [optimizer, setOptimizer] = useState("adam");
  const [batchSize, setBatchSize] = useState(1);
  const [seqLen, setSeqLen] = useState(2048);
  const [gpuVram, setGpuVram] = useState(80);
  const [activationCheckpoint, setActivationCheckpoint] = useState(false);

  const bytesPerParam = PRECISION_BYTES[precision] || 2;
  const optMultiplier = OPTIMIZER_MULTIPLIER[optimizer] || 0;
  const paramsB = params * 1_000_000_000;

  const weightsBytes = paramsB * bytesPerParam;
  const gradientsBytes = optimizer !== "none" ? paramsB * bytesPerParam : 0;
  const optimizerBytes = optimizer !== "none" ? paramsB * optMultiplier : 0;
  const paramMemoryGb = (weightsBytes + gradientsBytes + optimizerBytes) / 1_000_000_000;

  const activationFactor = activationCheckpoint ? 0.15 : 1;
  const activationBytes =
    paramsB * bytesPerParam * 0.1 * batchSize * (seqLen / 1024) * activationFactor;
  const activationGb = activationBytes / 1_000_000_000;

  const totalVramGb = paramMemoryGb + activationGb;
  const usablePerGpu = gpuVram * 0.85;
  const gpusRaw = totalVramGb / usablePerGpu;
  const gpusNeeded = Math.ceil(gpusRaw);

  const recommendedGpu = GPU_MODELS.find((g) => g.vram >= gpuVram) || GPU_MODELS[0];
  const gpuCostPerHour = {
    "24": 0.35,
    "32": 0.5,
    "40": 1.1,
    "80": 1.5,
    "141": 2.5,
    "192": 3.2,
    "288": 4.0,
  };
  const hourlyRate = gpuCostPerHour[String(gpuVram) as keyof typeof gpuCostPerHour] || 1.5;
  const trainingHours = params <= 13 ? 24 : params <= 30 ? 72 : params <= 70 ? 168 : 336;
  const totalCost = gpusNeeded * hourlyRate * trainingHours;

  return (
    <div className="my-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.02] to-transparent p-6 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-text">
          Interactive GPU Calculator
        </h3>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-text-dim mb-1.5">
              Model Parameters (B)
            </label>
            <input
              type="range"
              min={1}
              max={175}
              step={1}
              value={params}
              onChange={(e) => setParams(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-text-dim mt-1">
              <span>1B</span>
              <span className="font-semibold text-text">{params}B</span>
              <span>175B</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">
                Precision
              </label>
              <select
                value={precision}
                onChange={(e) => setPrecision(e.target.value)}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text"
              >
                <option value="fp32">FP32</option>
                <option value="bf16">BF16</option>
                <option value="fp16">FP16</option>
                <option value="int8">INT8</option>
                <option value="int4">INT4</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">
                Optimizer
              </label>
              <select
                value={optimizer}
                onChange={(e) => setOptimizer(e.target.value)}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text"
              >
                <option value="adam">Adam</option>
                <option value="sgd">SGD</option>
                <option value="none">Inference only</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">
                Batch Size
              </label>
              <select
                value={batchSize}
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text"
              >
                {[1, 2, 4, 8, 16, 32, 64].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-text-dim mb-1.5">
                Sequence Length
              </label>
              <select
                value={seqLen}
                onChange={(e) => setSeqLen(Number(e.target.value))}
                className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text"
              >
                {[512, 1024, 2048, 4096, 8192, 16384].map((n) => (
                  <option key={n} value={n}>
                    {n.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-text-dim mb-1.5">
              GPU VRAM (GB per card)
            </label>
            <select
              value={gpuVram}
              onChange={(e) => setGpuVram(Number(e.target.value))}
              className="w-full bg-bg-dark border border-border rounded-lg px-3 py-2 text-sm text-text"
            >
              {GPU_MODELS.map((g, i) => (
                <option key={`${g.name}-${i}`} value={g.vram}>
                  {g.name} ({g.vram} GB)
                </option>
              ))}
            </select>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={activationCheckpoint}
              onChange={(e) => setActivationCheckpoint(e.target.checked)}
              className="w-4 h-4 rounded border-border accent-primary"
            />
            <span className="text-sm text-text-muted">
              Enable gradient checkpointing (saves ~85% activation memory)
            </span>
          </label>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-bg-dark p-5">
            <h4 className="text-xs font-bold text-text-dim uppercase tracking-wider mb-3">
              Results
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <HardDrive className="w-4 h-4 text-primary" />
                  Total VRAM
                </div>
                <span className="text-lg font-bold text-text font-mono">
                  {totalVramGb.toFixed(0)} GB
                </span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <Cpu className="w-4 h-4 text-primary" />
                  GPUs Needed
                </div>
                <span className="text-lg font-bold text-text font-mono">
                  {gpusNeeded}
                </span>
              </div>
              <div className="h-px bg-border/50" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-text-muted">
                  <DollarSign className="w-4 h-4 text-primary" />
                  Est. Training Cost
                </div>
                <span className="text-lg font-bold text-text font-mono">
                  ${totalCost.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border/50 bg-bg-dark/50 p-4">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <div className="text-xs text-text-dim leading-relaxed">
                <strong className="text-text-muted">Memory breakdown:</strong>{" "}
                Parameters ({paramMemoryGb.toFixed(0)} GB) + Activations (
                {activationGb.toFixed(0)} GB) ={" "}
                {totalVramGb.toFixed(0)} GB total.
                <br />
                <strong className="text-text-muted">Usable per GPU:</strong>{" "}
                {gpuVram} GB &times; 0.85 overhead = {usablePerGpu.toFixed(0)}{" "}
                GB.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
