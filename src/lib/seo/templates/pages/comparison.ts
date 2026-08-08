import type { SeoPageTemplate } from "../types";

export const comparison: SeoPageTemplate = {
  path: "/comparison",
  label: "Comparison",
  title: "GPU Comparison | H100 vs MI300X vs Gaudi",
  description:
    "Compare NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3 — memory, bandwidth, TFLOPS, TDP and architecture specs.",
  keywords: [
    "NVIDIA H100 vs AMD MI300X",
    "AI chip comparison",
    "enterprise GPU specs",
    "data center accelerator comparison",
    "NVIDIA H100 specifications",
    "AMD MI300X benchmark",
    "semiconductor procurement guide",
  ],
  openGraphTitle:
    "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
  openGraphDescription:
    "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
  twitterTitle:
    "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
  twitterDescription:
    "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
  country: {
    title: "GPU Comparison in {{name}} | H100 vs MI300X",
    description:
      "Compare enterprise AI accelerators in {{name}} — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3. Specs and procurement guidance.",
    keywords: [
      "NVIDIA H100 vs AMD MI300X {{name}}",
      "AI chip comparison {{name}}",
      "enterprise GPU specs {{name}}",
      "data center accelerator comparison {{name}}",
    ],
    openGraphTitle: "AI Chip Comparison {{name}} | H100 vs MI300X vs Gaudi 3",
    twitterTitle: "AI Chip Comparison {{name}} | H100 vs MI300X vs Gaudi 3",
    openGraphDescription:
      "Side-by-side enterprise chip comparison for buyers in {{name}}.",
    twitterDescription:
      "Side-by-side enterprise chip comparison for buyers in {{name}}.",
  },
};
