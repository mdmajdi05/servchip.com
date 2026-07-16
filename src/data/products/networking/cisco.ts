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
];

export const CISCO_PRODUCTS = [...CISCO_NETWORKING];
