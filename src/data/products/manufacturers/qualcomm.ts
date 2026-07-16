import type { ChipProduct } from "@/types";

export const QUALCOMM_DC: ChipProduct[] = [
  {
    id: "qualcomm-dc-cpu",
    name: "Qualcomm Data Center CPU",
    slug: "qualcomm-data-center-cpu",
    manufacturer: "Qualcomm",
    manufacturerId: "qualcomm",
    series: "DC CPU",
    architecture: "Oryon",
    categoryId: "qualcomm-dc",
    parentCategoryId: "server-cpus",
    categoryName: "Server CPUs",
    images: ["/images/ai-chip-1.jpg"],
    description:
      "Qualcomm's emerging data center CPU based on Oryon architecture for cloud workloads.",
    longDescription:
      "Qualcomm is developing a data center CPU based on its high-performance Oryon architecture, bringing the power efficiency and performance of custom Arm cores to the cloud. Designed for cloud-native workloads, edge computing, and AI inference, it aims to deliver industry-leading performance-per-watt for data center deployments.",
    keyFeatures: [
      "Oryon Architecture",
      "Arm Ecosystem",
      "High Performance/Watt",
      "Cloud Native",
      "Emerging Platform",
    ],
    useCases: ["virtualization", "edge-computing", "ai-inference"],
    bestFor: "Cloud-Native & Edge Workloads",
    specifications: {
      memory: "—",
      memoryBandwidth: "—",
      tensorCores: "—",
      cudaCores: "—",
      fp8TFLOPS: "—",
      fp16TFLOPS: "—",
      tf32TFLOPS: "—",
      fp64TFLOPS: "—",
      interconnect: "—",
      tdp: "—",
      formFactor: "—",
      cooling: "—",
      launchDate: "TBD",
      manufacturingProcess: "—",
    },
    status: "pre_order",
    sortOrder: 1,
    isFeatured: false,
    isPopular: false,
    seo: {
      metaTitle: "Qualcomm Data Center CPU | Servchip",
      metaDescription: "Qualcomm's Oryon-based DC CPU for cloud workloads.",
    },
    createdAt: "2025-06-01",
    updatedAt: "2026-06-01",
  },
];

export const QUALCOMM_PRODUCTS = [...QUALCOMM_DC];
