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
  {
    id: "marvell-octeon-10",
    name: "Marvell OCTEON 10 DPU",
    slug: "marvell-octeon-10",
    manufacturer: "Marvell",
    manufacturerId: "marvell",
    series: "OCTEON 10",
    categoryId: "marvell-dpu",
    parentCategoryId: "networking",
    categoryName: "Data Processing Units",
    images: ["/images/server-room-5.jpg"],
    description:
      "Arm-based DPU with hardware acceleration for networking, storage, and security offload.",
    longDescription:
      "The Marvell OCTEON 10 DPU is a data processing unit featuring Arm Neoverse N2 cores with hardware acceleration for networking, storage, and security. Supporting up to 200GbE connectivity, it offloads infrastructure workloads from host CPUs in cloud, telco, and edge environments, delivering significant TCO improvements for hyperscale data centers.",
    keyFeatures: [
      "Arm Neoverse N2 Cores",
      "200GbE Connectivity",
      "Network Function Acceleration",
      "Inline Security Processing",
      "Storage Virtualization",
    ],
    useCases: ["virtualization", "ai-inference", "edge-computing"],
    bestFor: "Data Center Infrastructure Offload",
    specs: {
      type: "Data Processing Unit",
      speed: "200 Gbps",
      ports: "2x 100GbE / 1x 200GbE",
      formFactor: "PCIe Gen5 x16",
      management: "Marvell OCTEON SDK",
    },
    status: "in_stock",
    sortOrder: 2,
    isFeatured: false,
    isPopular: false,
    seo: {
      metaTitle: "Marvell OCTEON 10 DPU | Servchip",
      metaDescription:
        "Arm-based DPU for networking, storage, and security offload.",
    },
    createdAt: "2024-03-01",
    updatedAt: "2024-09-01",
  },
  {
    id: "marvell-aquila-2",
    name: "Marvell Aquila 2 Memory Controller",
    slug: "marvell-aquila-2",
    manufacturer: "Marvell",
    manufacturerId: "marvell",
    series: "Aquila 2",
    categoryId: "marvell-memory",
    parentCategoryId: "networking",
    categoryName: "Memory Controllers",
    images: ["/images/server-room-3.webp"],
    description:
      "High-performance DDR5 memory controller for server and AI accelerator platforms.",
    longDescription:
      "The Marvell Aquila 2 is a DDR5 memory controller designed for next-generation server and AI accelerator platforms. Delivering support for DDR5-6400+ speeds with advanced ECC and RAS features, it enables memory bandwidth and capacity scaling for AI training, HPC, and in-memory database workloads in hyperscale data centers.",
    keyFeatures: [
      "DDR5-6400+ Support",
      "Advanced ECC",
      "RAS Features",
      "Multi-Channel Architecture",
      "AI Memory Optimized",
    ],
    useCases: ["ai-training", "hpc", "data-analytics"],
    bestFor: "Server & AI Memory Scaling",
    specs: {
      type: "Memory Controller",
      speed: "DDR5-6400+ MT/s",
      ports: "Multi-Channel DDR5",
      formFactor: "ASIC",
      management: "Marvell SDK",
    },
    status: "in_stock",
    sortOrder: 3,
    isFeatured: false,
    isPopular: false,
    seo: {
      metaTitle: "Marvell Aquila 2 Memory Controller | Servchip",
      metaDescription:
        "DDR5 memory controller for server and AI accelerator platforms.",
    },
    createdAt: "2024-06-01",
    updatedAt: "2024-12-01",
  },
];

export const MARVELL_PRODUCTS = [...MARVELL_NETWORKING];
