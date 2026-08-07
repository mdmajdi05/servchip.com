import type { SeoPageTemplate } from "../types";

export const categories: SeoPageTemplate = {
  path: "/categories",
  label: "Categories",
  title:
    "Product Categories — Data Center GPUs, AI Accelerators, Server CPUs & Enterprise Hardware | Servchip",
  description:
    "Browse enterprise chip categories — NVIDIA data center GPUs, AMD Instinct accelerators, Intel Xeon CPUs, AI servers, networking, memory & storage from an ISO 9001 certified distributor for semiconductor procurement.",
  keywords: [
    "enterprise chip categories",
    "data center GPUs",
    "AI accelerators",
    "server CPUs",
    "enterprise hardware",
    "NVIDIA GPU categories",
    "AMD Instinct",
    "Intel Xeon",
  ],
  openGraphTitle: "Product Categories | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
  twitterTitle: "Product Categories | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
  country: {
    title:
      "Product Categories in {{name}} | Data Center GPUs & AI Accelerators",
    description:
      "Browse enterprise chip categories in {{name}} — NVIDIA data center GPUs, AMD Instinct, Intel Xeon, AI servers, networking, memory & storage. Priced in {{currency}}.",
    keywords: [
      "enterprise chip categories {{name}}",
      "data center GPUs {{name}}",
      "AI accelerators {{name}}",
      "server CPUs {{name}}",
      "NVIDIA GPU categories {{name}}",
    ],
    openGraphTitle: "Product Categories in {{name}} | Servchip",
    twitterTitle: "Product Categories in {{name}} | Servchip",
  },
};
