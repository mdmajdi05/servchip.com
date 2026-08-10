import type { SeoEntry } from "./types";

// Industry page SEO. Key = industry slug (src/data/industries.ts).
export const INDUSTRY_SEO: Record<string, SeoEntry> = {
  "data-centers": {
    metaTitle: "Data Center GPU Solutions | NVIDIA, AMD | Servchip",
    metaDescription:
      "GPU-accelerated data center solutions — NVIDIA H100, H200, B200, GB200, AMD Instinct, networking & storage. Enterprise chip distributor for data centers.",
    keywords: [
      "data center GPUs",
      "GPU-accelerated data center",
      "NVIDIA data center GPU distributor",
      "AI data center infrastructure",
      "data center hardware supplier",
    ],
  },
  "ai-infrastructure": {
    metaTitle: "AI Infrastructure Solutions | NVIDIA, AMD | Servchip",
    metaDescription:
      "End-to-end AI infrastructure — training clusters, inference platforms, GPU-accelerated servers. Enterprise AI hardware for production workloads.",
    keywords: [
      "AI infrastructure",
      "AI training cluster",
      "GPU cluster supplier",
      "AI inference infrastructure",
      "enterprise AI hardware",
    ],
  },
  healthcare: {
    metaTitle: "Healthcare AI & GPU Solutions | NVIDIA | Servchip",
    metaDescription:
      "GPU-accelerated solutions for healthcare — medical imaging AI, drug discovery, genomics. NVIDIA RTX & data center GPUs for hospitals and pharma.",
    keywords: [
      "healthcare AI",
      "medical imaging GPU",
      "drug discovery GPU",
      "genomics computing",
      "NVIDIA healthcare solutions",
    ],
  },
  finance: {
    metaTitle: "Finance & Fintech GPU Solutions | NVIDIA | Servchip",
    metaDescription:
      "Low-latency GPU and CPU compute for trading, risk analytics and financial AI. Enterprise hardware for banks, hedge funds and fintech from Servchip.",
    keywords: [
      "finance GPU",
      "low-latency trading server",
      "risk analytics GPU",
      "fintech infrastructure",
      "financial AI hardware",
    ],
  },
  government: {
    metaTitle: "Government AI & HPC Solutions | NVIDIA | Servchip",
    metaDescription:
      "Secure, compliant AI and HPC infrastructure for government and public sector — sovereign AI, national research programs and public institutions.",
    keywords: [
      "government AI",
      "sovereign AI infrastructure",
      "public sector HPC",
      "national AI program hardware",
      "government GPU procurement",
    ],
  },
  research: {
    metaTitle: "Research HPC & GPU Clusters | NVIDIA, AMD | Servchip",
    metaDescription:
      "HPC clusters and GPU compute for universities, national labs and scientific research. NVIDIA & AMD data center accelerators sourced by Servchip.",
    keywords: [
      "research HPC",
      "university GPU cluster",
      "academic computing",
      "scientific HPC hardware",
      "national lab GPU",
    ],
  },
  telecom: {
    metaTitle: "Telecom & Edge AI Solutions | NVIDIA | Servchip",
    metaDescription:
      "Edge AI inference, 5G infrastructure and telecom data center hardware. GPU-accelerated edge platforms and networking solutions from Servchip.",
    keywords: [
      "edge AI",
      "telecom infrastructure",
      "5G edge computing",
      "NVIDIA edge AI",
      "distributed data center hardware",
    ],
  },
  manufacturing: {
    metaTitle: "Industrial AI & Digital Twin Solutions | NVIDIA | Servchip",
    metaDescription:
      "GPU compute for digital twins, industrial AI, computer vision and smart manufacturing. NVIDIA enterprise GPUs and AI platforms from Servchip.",
    keywords: [
      "industrial AI",
      "digital twin GPU",
      "smart manufacturing",
      "computer vision hardware",
      "Industry 4.0 infrastructure",
    ],
  },
};
