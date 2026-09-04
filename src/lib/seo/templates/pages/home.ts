import { SITE } from "@/lib/constants";
import type { SeoPageTemplate } from "../types";

export const home: SeoPageTemplate = {
  path: "/",
  label: "Home",
  title: `AI Chip Distributor | Enterprise GPU & Accelerator Supplier | Servchip`,
  description:
    "Servchip supplies AI chips, GPUs, and accelerators globally with certified procurement and engineering support.",
  keywords: [
    "AI chip company",
    "enterprise GPU distributor",
    "nvidia ai chips",
    "amd ai chip",
    "amd authorized distributors",
    "data center gpu",
    "nvidia data center gpu",
    "intel data center gpu",
    "nvidia data center",
    "nvidia h200 supplier",
    "nvidia b200 gpu",
    "nvidia h100",
    "h100 gpu",
    "enterprise chip distributor",
    "AI chip distributor",
    "Data center GPU supplier",
    "NVIDIA H100 distributor",
    "AMD Instinct distributor",
    "Intel Gaudi distributor",
    "enterprise semiconductor distributor",
    "Server processor supplier",
    "HPC chip distributor",
    "AI accelerator supplier",
    "nvidia authorized dealer",
    "amd authorized distributors",
    "intel authorized distributors",
  ],
  openGraphTitle: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor`,
  openGraphDescription:
    "Authorized NVIDIA, AMD & Intel distributor. NVIDIA H100, AMD Instinct MI300X, Intel Gaudi — data center GPUs & AI accelerators with global shipping.",
  twitterTitle: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor`,
  twitterDescription:
    "Authorized NVIDIA, AMD & Intel distributor. NVIDIA H100, AMD Instinct MI300X, Intel Gaudi — data center GPUs & AI accelerators with global shipping.",
  country: ({ metaTitle, metaDescription, metaKeywords }) => ({
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords,
    openGraphTitle: `{{name}} | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `{{name}} | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: metaDescription,
    twitterDescription: metaDescription,
  }),
};
