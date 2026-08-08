import type { SeoPageTemplate } from "../types";

export const brands: SeoPageTemplate = {
  path: "/brands",
  label: "Brands",
  title: "All Brands | NVIDIA, AMD, Intel & More",
  description:
    "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE, Supermicro, Broadcom, Micron and 27+ more, with global shipping.",
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
    title: "Brand Directory in {{name}} | NVIDIA & AMD",
    description:
      "Browse authentic enterprise hardware brands in {{name}} — NVIDIA, AMD, Intel, HPE, Dell and more. Priced in {{currency}}, shipped from {{warehouse}}.",
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
