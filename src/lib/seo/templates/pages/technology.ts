import type { SeoPageTemplate } from "../types";

export const technology: SeoPageTemplate = {
  path: "/technology",
  label: "Technology",
  title: "AI Chip Technology | Blackwell, Hopper & CDNA",
  description:
    "Explore GPU architecture generations — NVIDIA Blackwell, Hopper, AMD CDNA 3 and Intel Granite Rapids. NVLink, MIG and HBM3e memory.",
  keywords: [
    "NVIDIA Blackwell architecture",
    "Hopper Transformer Engine",
    "AI chip technology",
    "GPU architecture comparison",
    "NVLink 5.0",
    "HBM3e memory",
    "AMD CDNA 3",
    "Intel Granite Rapids",
    "enterprise AI hardware",
    "GPU compute technology",
    "data center GPU architecture",
    "AI accelerator technology",
  ],
  openGraphTitle:
    "AI Chip Technology — NVIDIA & AMD & Intel GPU Architectures | Servchip",
  openGraphDescription:
    "Deep dive into Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids. Compare GPU architectures, memory bandwidth, tensor core generations & more from Servchip.",
  twitterTitle:
    "AI Chip Technology — NVIDIA & AMD & Intel GPU Architectures | Servchip",
  twitterDescription:
    "Deep dive into Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids — GPU architectures powering next-gen AI.",
  country: {
    title: "AI Chip Technology{{countrySuffix}} | Blackwell & CDNA",
    description:
      "Explore GPU architecture generations{{countrySuffix}} — NVIDIA Blackwell, Hopper, AMD CDNA 3 and Intel Granite Rapids. NVLink and HBM3e memory.",
    keywords: [
      "NVIDIA Blackwell architecture {{name}}",
      "AI chip technology {{name}}",
      "GPU architecture comparison {{name}}",
      "enterprise AI hardware {{name}}",
    ],
    openGraphTitle: "AI Chip Technology{{countrySuffix}} | Servchip",
    twitterTitle: "AI Chip Technology{{countrySuffix}} | Servchip",
    openGraphDescription:
      "Deep dive into Blackwell, Hopper, AMD CDNA 3 and Intel architectures{{countrySuffix}}.",
    twitterDescription:
      "Deep dive into Blackwell, Hopper, AMD CDNA 3 and Intel architectures{{countrySuffix}}.",
  },
};
