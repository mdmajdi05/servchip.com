import type { NetworkingProduct } from "@/types";

export const BROADCOM_NETWORKING: NetworkingProduct[] = [
  {
    id: "broadcom-tomahawk-6",
    name: "Broadcom Tomahawk 6",
    slug: "broadcom-tomahawk-6",
    manufacturer: "Broadcom",
    manufacturerId: "broadcom",
    series: "Tomahawk 6",
    categoryId: "broadcom-ethernet",
    parentCategoryId: "networking",
    categoryName: "Ethernet Switches",
    images: ["/images/server-room-1.jpg"],
    description:
      "World's highest-bandwidth Ethernet switch with 51.2 Tbps switching capacity for AI and HPC data center fabrics.",
    longDescription:
      "The Broadcom Tomahawk 6 is the industry's first 51.2 Tbps Ethernet switch chip, enabling 64 ports of 800GbE or 128 ports of 400GbE. Built on 5nm process, it delivers breakthrough power efficiency and density for AI backend networks, cloud fabrics, and HPC clusters with advanced load balancing and congestion management.",
    keyFeatures: [
      "51.2 Tbps Switching Capacity",
      "64x 800GbE / 128x 400GbE",
      "5nm Process",
      "Advanced Telemetry",
      "Load Balancing",
    ],
    useCases: ["ai-training", "hpc", "data-analytics"],
    bestFor: "AI Data Center Fabrics",
    specs: {
      type: "Ethernet Switch ASIC",
      speed: "51.2 Tbps",
      ports: "64x 800GbE / 128x 400GbE",
      formFactor: "BGA Package",
      management: "SDK / SAIL",
    },
    status: "in_stock",
    sortOrder: 1,
    isFeatured: true,
    isPopular: true,
    seo: {
      metaTitle: "Broadcom Tomahawk 6 | Servchip",
      metaDescription: "51.2 Tbps Ethernet switch for AI fabrics.",
    },
    createdAt: "2024-09-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "broadcom-jericho-3ai",
    name: "Broadcom Jericho 3AI",
    slug: "broadcom-jericho-3ai",
    manufacturer: "Broadcom",
    manufacturerId: "broadcom",
    series: "Jericho 3AI",
    categoryId: "broadcom-ethernet",
    parentCategoryId: "networking",
    categoryName: "Ethernet Switches",
    images: ["/images/server-room-2.jpg"],
    description:
      "AI-optimized Ethernet switch with in-network computing for distributed AI training workloads.",
    longDescription:
      "The Broadcom Jericho 3AI is purpose-built for AI/ML data center networks, featuring in-network computing capabilities that accelerate distributed training. With support for 800GbE ports and advanced congestion control algorithms, it eliminates GPU idle time in large-scale AI clusters.",
    keyFeatures: [
      "AI-Optimized Architecture",
      "In-Network Computing",
      "800GbE Support",
      "Congestion Control",
      "Telemetry",
    ],
    useCases: ["ai-training", "ai-inference"],
    bestFor: "AI Training Networks",
    specs: {
      type: "AI Ethernet Switch",
      speed: "Up to 800GbE per port",
      ports: "48x 800GbE",
      formFactor: "Switch Silicon",
      management: "Broadcom SDK",
    },
    status: "in_stock",
    sortOrder: 2,
    isFeatured: true,
    isPopular: false,
    seo: {
      metaTitle: "Broadcom Jericho 3AI | Servchip",
      metaDescription: "AI-optimized Ethernet switch for distributed training.",
    },
    createdAt: "2024-06-01",
    updatedAt: "2025-01-01",
  },
];

export const BROADCOM_PRODUCTS = [...BROADCOM_NETWORKING];
