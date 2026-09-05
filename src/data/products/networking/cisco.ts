import type { NetworkingProduct } from "@/types";

export const CISCO_NETWORKING: NetworkingProduct[] = [
  {
    id: "cisco-silicon-one",
    name: "Cisco Silicon One G100",
    slug: "cisco-silicon-one-g100",
    manufacturer: "Cisco",
    manufacturerId: "cisco",
    series: "Silicon One G100",
    categoryId: "cisco-silicon-one",
    parentCategoryId: "networking",
    categoryName: "Networking Silicon",
    images: ["/images/server-room-1.jpg"],
    description:
      "Unified programmable network processor for routing and switching at 25.6 Tbps.",
    longDescription:
      "The Cisco Silicon One G100 is a programmable network processor that unifies routing and switching in a single architecture. With 25.6 Tbps capacity, it enables service providers and cloud operators to build simplified, efficient networks with Cisco's IOS XR software stack.",
    keyFeatures: [
      "25.6 Tbps Capacity",
      "Routing + Switching Unified",
      "Programmable",
      "IOS XR Support",
      "Power Efficient",
    ],
    useCases: ["virtualization", "data-analytics"],
    bestFor: "Service Provider & Cloud Networks",
    specs: {
      type: "Network Processor",
      speed: "25.6 Tbps",
      ports: "64x 400GbE",
      formFactor: "SoC",
      management: "IOS XR",
    },
    status: "in_stock",
    sortOrder: 1,
    isFeatured: true,
    isPopular: false,
    seo: {
      metaTitle: "Cisco Silicon One | Servchip",
      metaDescription:
        "Unified programmable network processor for routing and switching.",
    },
    createdAt: "2023-06-01",
    updatedAt: "2024-06-01",
  },
  {
    id: "cisco-nexus-9800",
    name: "Cisco Nexus 9800",
    slug: "cisco-nexus-9800",
    manufacturer: "Cisco",
    manufacturerId: "cisco",
    series: "Nexus 9800",
    categoryId: "cisco-switches",
    parentCategoryId: "networking",
    categoryName: "Data Center Switches",
    images: ["/images/server-room-4.webp"],
    description:
      "51.2T modular data center switch for AI/ML fabrics and cloud-scale networking.",
    longDescription:
      "The Cisco Nexus 9800 is a 51.2 Tbps modular data center switch built on Cisco Silicon One, designed for the highest-performance AI/ML and cloud-scale data center fabrics. Supporting line-rate 800GbE on every port with Cisco ACI integration, it delivers lossless, ultra-low-latency connectivity for distributed AI training clusters and hyperscale cloud environments.",
    keyFeatures: [
      "51.2 Tbps Switching Capacity",
      "800GbE Line Rate",
      "Cisco Silicon One",
      "ACI Fabric Support",
      "Lossless AI Networking",
    ],
    useCases: ["ai-training", "hpc", "virtualization"],
    bestFor: "AI/ML & Cloud Data Center Fabrics",
    specs: {
      type: "Modular Switch",
      speed: "51.2 Tbps",
      ports: "Up to 64x 800GbE",
      formFactor: "Modular Chassis",
      management: "Cisco NX-OS / ACI",
    },
    status: "in_stock",
    sortOrder: 2,
    isFeatured: true,
    isPopular: false,
    seo: {
      metaTitle: "Cisco Nexus 9800 Switch | Servchip",
      metaDescription:
        "51.2T modular switch for AI/ML and cloud-scale data center fabrics.",
    },
    createdAt: "2024-09-01",
    updatedAt: "2025-01-01",
  },
  {
    id: "cisco-ucs-fi-m-6120",
    name: "Cisco UCS Fabric Interconnect M6120",
    slug: "cisco-ucs-fi-m-6120",
    manufacturer: "Cisco",
    manufacturerId: "cisco",
    series: "UCS Fabric Interconnect",
    categoryId: "cisco-ucs",
    parentCategoryId: "networking",
    categoryName: "Fabric Interconnects",
    images: ["/images/server-room-2.jpg"],
    description:
      "Next-generation fabric interconnect for Cisco UCS and HyperFlex infrastructure management.",
    longDescription:
      "The Cisco UCS Fabric Interconnect M6120 provides a single point of management and connectivity for Cisco UCS blade and rack servers. Supporting 25/100GbE uplinks and Cisco Intersight cloud management, it simplifies infrastructure orchestration and reduces management complexity for converged and hyperconverged data center environments.",
    keyFeatures: [
      "25/100GbE Uplinks",
      "Cisco Intersight Cloud Managed",
      "Unified Fabric",
      "Zero-Touch Provisioning",
      "Fibre Channel Support",
    ],
    useCases: ["virtualization", "hybrid-cloud"],
    bestFor: "Unified Infrastructure Management",
    specs: {
      type: "Fabric Interconnect",
      speed: "100 Gbps uplinks",
      ports: "48x 25GbE + 8x 100GbE",
      formFactor: "1RU",
      management: "Cisco Intersight / UCS Manager",
    },
    status: "in_stock",
    sortOrder: 3,
    isFeatured: false,
    isPopular: false,
    seo: {
      metaTitle: "Cisco UCS Fabric Interconnect M6120 | Servchip",
      metaDescription:
        "Next-gen fabric interconnect for UCS and HyperFlex infrastructure.",
    },
    createdAt: "2024-06-01",
    updatedAt: "2024-12-01",
  },
];

export const CISCO_PRODUCTS = [...CISCO_NETWORKING];
