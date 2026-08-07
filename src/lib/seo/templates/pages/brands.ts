import type { SeoPageTemplate } from "../types";

export const brands: SeoPageTemplate = {
  path: "/brands",
  label: "Brands",
  title:
    "All Brands — NVIDIA, AMD, Intel, Dell, HPE & 27+ Enterprise Chip Manufacturers | Servchip",
  description:
    "Browse every brand we stock: NVIDIA, AMD, Intel, Google, Amazon, Dell Technologies, HPE, Supermicro, Broadcom, Micron and 27+ more. Authentic enterprise chips from an ISO 9001 certified distributor with global shipping.",
  keywords: [
    "NVIDIA distributor",
    "AMD enterprise distributor",
    "Intel Xeon supplier",
    "enterprise chip brands",
    "AI hardware manufacturer",
    "semiconductor brand directory",
  ],
  openGraphTitle: "All Brands | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE and 27+ manufacturers.",
  twitterTitle: "All Brands | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE and 27+ manufacturers.",
  country: {
    title: "Brand Directory in {{name}} | NVIDIA, AMD, Intel & More",
    description:
      "Browse authentic enterprise hardware brands available in {{name}} — NVIDIA, AMD, Intel, HPE, Dell & more. Priced in {{currency}}, shipped from {{warehouse}}.",
    keywords: [
      "NVIDIA distributor {{name}}",
      "AMD distributor {{name}}",
      "Intel distributor {{name}}",
      "brands in {{name}}",
      "enterprise hardware brands {{name}}",
    ],
    openGraphTitle: "Brand Directory in {{name}} | Servchip",
    twitterTitle: "Brand Directory in {{name}} | Servchip",
  },
};
