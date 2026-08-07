import type { SeoPageTemplate } from "../types";

export const developerHub: SeoPageTemplate = {
  path: "/developer-hub",
  label: "Developer Hub",
  title:
    "Developer Hub — SDK, API Docs & Integration Guides for AI Chips | Servchip",
  description:
    "Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI. SDK documentation, API reference, and code samples for enterprise AI chip development and semiconductor deployment.",
  keywords: [
    "NVIDIA CUDA SDK",
    "AMD ROCm guide",
    "Intel oneAPI docs",
    "AI chip development",
    "enterprise chip integration",
    "GPU SDK documentation",
  ],
  openGraphTitle: "Developer Hub | Servchip — Enterprise AI Hardware",
  openGraphDescription:
    "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
  twitterTitle: "Developer Hub | Servchip — Enterprise AI Hardware",
  twitterDescription:
    "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
  country: {
    title:
      "Developer Hub{{countrySuffix}} — SDK & Integration Guides | Servchip",
    description:
      "Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI{{countrySuffix}}. SDK documentation, API reference and code samples for enterprise AI chip development.",
    keywords: [
      "NVIDIA CUDA SDK {{name}}",
      "AMD ROCm guide {{name}}",
      "Intel oneAPI docs {{name}}",
      "AI chip development {{name}}",
    ],
    openGraphTitle: "Developer Hub {{name}} | Servchip",
    twitterTitle: "Developer Hub {{name}} | Servchip",
    openGraphDescription:
      "SDK docs, API reference & integration guides for enterprise chip platforms{{countrySuffix}}.",
    twitterDescription:
      "SDK docs, API reference & integration guides for enterprise chip platforms{{countrySuffix}}.",
  },
};
