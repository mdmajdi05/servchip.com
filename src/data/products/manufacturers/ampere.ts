import type { ChipProduct } from "@/types";

export const AMPERE_CPUS: ChipProduct[] = [
  {
    id: "ampereone",
    name: "AmpereOne",
    slug: "ampereone",
    manufacturer: "Ampere",
    manufacturerId: "ampere",
    series: "AmpereOne",
    architecture: "AmpereOne",
    categoryId: "ampere-server",
    parentCategoryId: "server-cpus",
    categoryName: "Server CPUs",
    images: ["/images/ai-chip-1.jpg"],
    description:
      "192-core cloud-native Arm server processor with DDR5 and PCIe 5.0 for hyperscale data centers.",
    longDescription:
      "The AmpereOne is a 192-core cloud-native server processor based on Ampere's custom Arm architecture. Designed for hyperscale cloud data centers, it features DDR5 memory, PCIe 5.0, and industry-leading core density. With predictable performance and linear scalability, it excels in cloud-native, microservices, and web-tier workloads.",
    keyFeatures: [
      "192 Arm Cores",
      "Cloud Native",
      "DDR5 Support",
      "PCIe 5.0",
      "Linear Scalability",
    ],
    useCases: ["virtualization", "data-analytics"],
    bestFor: "Cloud-Native & Hyperscale Workloads",
    specifications: {
      memory: "DDR5",
      memoryBandwidth: "—",
      tensorCores: "—",
      cudaCores: "—",
      fp8TFLOPS: "—",
      fp16TFLOPS: "—",
      tf32TFLOPS: "—",
      fp64TFLOPS: "—",
      interconnect: "PCIe 5.0",
      tdp: "—",
      formFactor: "LGA",
      cooling: "Active Heatsink",
      launchDate: "2024",
      manufacturingProcess: "5nm",
    },
    status: "in_stock",
    sortOrder: 1,
    isFeatured: true,
    isPopular: false,
    seo: {
      metaTitle: "AmpereOne CPU | Servchip",
      metaDescription:
        "192-core Arm server processor for cloud-native workloads.",
    },
    createdAt: "2024-06-01",
    updatedAt: "2025-01-01",
  },
];

export const AMPERE_PRODUCTS = [...AMPERE_CPUS];
