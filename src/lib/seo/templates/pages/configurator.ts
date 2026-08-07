import type { SeoPageTemplate } from "../types";

export const configurator: SeoPageTemplate = {
  path: "/configurator",
  label: "Configurator",
  title:
    "Chip Configurator — Find the Right AI Accelerator for Your Workload | Servchip",
  description:
    "Configure your ideal chip setup from NVIDIA, AMD, Intel and more. Answer a few questions and get matched with the right AI accelerator for training, inference, HPC, or professional graphics. Enterprise chip distributor.",
  keywords: [
    "chip configurator",
    "AI accelerator finder",
    "GPU selector tool",
    "enterprise chip matching",
    "workload-based chip recommendation",
  ],
  robots: { index: false, follow: true },
  openGraphTitle:
    "Chip Configurator | Servchip — Find the Right AI Accelerator",
  openGraphDescription:
    "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
  twitterTitle: "Chip Configurator | Servchip — Find the Right AI Accelerator",
  twitterDescription:
    "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
  country: {
    title: "Chip Configurator{{countrySuffix}} — Find the Right AI Accelerator",
    description:
      "Configure your ideal chip setup{{countrySuffix}} from NVIDIA, AMD, Intel and more. Get matched with the right AI accelerator for training, inference, HPC or professional graphics.",
    keywords: [
      "chip configurator {{name}}",
      "AI accelerator finder {{name}}",
      "GPU selector tool {{name}}",
      "workload-based chip recommendation {{name}}",
    ],
    openGraphTitle: "Chip Configurator {{name}} | Servchip",
    twitterTitle: "Chip Configurator {{name}} | Servchip",
    openGraphDescription:
      "Configure your ideal AI chip setup{{countrySuffix}}.",
    twitterDescription: "Configure your ideal AI chip setup{{countrySuffix}}.",
  },
};
