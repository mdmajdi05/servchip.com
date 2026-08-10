import type { SeoEntry } from "./types";

// Solution page SEO. Key = solution slug (src/data/solutions.ts).
export const SOLUTION_SEO: Record<string, SeoEntry> = {
  "ai-training": {
    metaTitle: "AI Training Clusters | NVIDIA H100, H200, GB200 | Servchip",
    metaDescription:
      "Build production AI training clusters with NVIDIA H100, H200, B200, GB200 and AMD Instinct MI300X. Enterprise AI training infrastructure from Servchip.",
    keywords: [
      "AI training cluster",
      "NVIDIA H100 training",
      "GB200 NVL72",
      "GPU training infrastructure",
      "foundation model training",
    ],
  },
  "ai-inference": {
    metaTitle: "AI Inference Infrastructure | NVIDIA L40S, H200 | Servchip",
    metaDescription:
      "Production AI inference platforms — NVIDIA L40S, H200, RTX 6000 for LLM serving, computer vision and real-time AI. Enterprise inference hardware.",
    keywords: [
      "AI inference",
      "LLM inference",
      "NVIDIA L40S",
      "inference server",
      "real-time AI serving",
    ],
  },
  hpc: {
    metaTitle: "HPC Clusters & Solutions | NVIDIA, AMD | Servchip",
    metaDescription:
      "HPC clusters for scientific simulation, molecular dynamics and financial analytics. NVIDIA & AMD high-performance computing infrastructure from Servchip.",
    keywords: [
      "HPC cluster",
      "high-performance computing",
      "scientific simulation hardware",
      "molecular dynamics GPU",
      "financial analytics HPC",
    ],
  },
  "ai-infrastructure": {
    metaTitle: "Enterprise AI Infrastructure | Servchip",
    metaDescription:
      "Complete AI infrastructure — NVIDIA & AMD accelerators, GPU servers, networking, HBM memory and storage. Enterprise AI hardware from Servchip.",
    keywords: [
      "enterprise AI infrastructure",
      "GPU server",
      "AI data center",
      "AI hardware solutions",
      "accelerator infrastructure",
    ],
  },
  "data-centers": {
    metaTitle: "Data Center Acceleration Solutions | NVIDIA | Servchip",
    metaDescription:
      "GPU-accelerated data center deployments for cloud, enterprise and colocation providers. NVIDIA acceleration hardware, networking and storage from Servchip.",
    keywords: [
      "data center acceleration",
      "GPU capacity deployment",
      "accelerated data center",
      "NVIDIA data center",
      "colocation GPU",
    ],
  },
  "enterprise-procurement": {
    metaTitle: "Enterprise Chip Procurement | RFQ & Bulk Sourcing | Servchip",
    metaDescription:
      "Enterprise semiconductor procurement — RFQ, bulk sourcing, import/export and supply chain support. ISO 9001 certified distributor from Servchip.",
    keywords: [
      "chip procurement",
      "semiconductor sourcing",
      "bulk chip supply",
      "enterprise RFQ",
      "chip supply chain",
    ],
  },
};
