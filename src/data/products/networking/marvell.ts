import type { NetworkingProduct } from "@/types";

export const MARVELL_NETWORKING: NetworkingProduct[] = [
  {
    id: "marvell-teralynx-10",
    name: "Marvell Teralynx 10",
    slug: "marvell-teralynx-10",
    manufacturer: "Marvell",
    manufacturerId: "marvell",
    series: "Teralynx 10",
    categoryId: "marvell-ethernet",
    parentCategoryId: "networking",
    categoryName: "Ethernet Switches",
    images: ["/images/server-room-1.jpg"],
    description:
      "51.2 Tbps Ethernet switch with industry-leading power efficiency for cloud and AI data centers.",
    longDescription:
      "The Marvell Teralynx 10 delivers 51.2 Tbps of switching capacity with breakthrough power efficiency of under 1W per 100GbE. Designed for next-generation cloud and AI data centers, it supports 64 ports of 800GbE with advanced features like dynamic load balancing, congestion management, and comprehensive telemetry.",
    keyFeatures: [
      "51.2 Tbps Capacity",
      "Under 1W/100GbE",
      "64x 800GbE",
      "Programmable Pipeline",
      "Telemetry",
    ],
    useCases: ["ai-training", "hpc", "virtualization"],
    bestFor: "Cloud & AI Data Centers",
    specs: {
      type: "Ethernet Switch ASIC",
      speed: "51.2 Tbps",
      ports: "64x 800GbE / 128x 400GbE",
      formFactor: "BGA",
      management: "SDK / Open APIs",
    },
    status: "in_stock",
    sortOrder: 1,
    isFeatured: true,
    isPopular: false,
    seo: {
      metaTitle: "Marvell Teralynx 10 | Servchip",
      metaDescription: "51.2 Tbps Ethernet switch for AI data centers.",
    },
    createdAt: "2024-08-01",
    updatedAt: "2025-01-01",
  },
];

export const MARVELL_PRODUCTS = [...MARVELL_NETWORKING];
