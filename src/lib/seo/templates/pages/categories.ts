import type { SeoPageTemplate } from "../types";

export const categories: SeoPageTemplate = {
  path: "/categories",
  label: "Categories",
  title: "Chip Categories | GPUs, AI Accelerators & CPUs",
  description:
    "Browse enterprise chip categories — NVIDIA data center GPUs, AMD Instinct, Intel Xeon, AI servers, networking, memory and storage.",
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
    title: "Chip Categories{{countrySuffix}} | GPUs & AI",
    description:
      "Browse enterprise chip categories{{countrySuffix}} — NVIDIA data center GPUs, AMD Instinct, Intel Xeon and AI servers.",
    keywords: [
      "enterprise chip categories{{countrySuffix}}",
      "data center GPUs{{countrySuffix}}",
      "AI accelerators{{countrySuffix}}",
      "server CPUs{{countrySuffix}}",
      "NVIDIA GPU categories{{countrySuffix}}",
    ],
    openGraphTitle: "Product Categories{{countrySuffix}} | Servchip",
    twitterTitle: "Product Categories{{countrySuffix}} | Servchip",
  },
};
