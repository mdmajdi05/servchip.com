import type { SeoPageTemplate } from "../types";

export const faq: SeoPageTemplate = {
  path: "/faq",
  label: "FAQ",
  title:
    "FAQ — Enterprise Chip Distributor | Buy AI Chips, Semiconductor Procurement",
  description:
    "Answers about buying AI chips, enterprise chip purchasing, semiconductor procurement, authenticity verification, bulk ordering, shipping, warranty & support from Servchip — ISO 9001 certified distributor for NVIDIA, AMD, Intel.",
  keywords: [
    "buy AI chips",
    "enterprise chip purchasing",
    "semiconductor procurement",
    "NVIDIA H100 buying guide",
    "bulk semiconductor purchasing",
    "enterprise GPU procurement",
    "data center hardware FAQ",
    "chip distributor questions",
  ],
  openGraphTitle: "FAQ | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Common questions about buying AI chips, semiconductor procurement, enterprise chip purchasing, shipping, warranty & support.",
  twitterTitle: "FAQ | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Common questions about buying AI chips, semiconductor procurement, enterprise chip purchasing, shipping, warranty & support.",
  country: {
    title: "FAQ — Enterprise Chip Distribution{{countrySuffix}} | Servchip",
    description:
      "Answers about buying AI chips, enterprise chip purchasing and semiconductor procurement{{countrySuffix}}. Authenticity, bulk ordering, {{currency}} pricing, shipping, warranty & support.",
    keywords: [
      "buy AI chips {{name}}",
      "enterprise chip purchasing {{name}}",
      "semiconductor procurement {{name}}",
      "NVIDIA H100 buying guide {{name}}",
    ],
    openGraphTitle: "FAQ {{name}} | Servchip — Enterprise Chip Distributor",
    twitterTitle: "FAQ {{name}} | Servchip — Enterprise Chip Distributor",
    openGraphDescription:
      "Common questions about buying AI chips and enterprise hardware{{countrySuffix}}.",
    twitterDescription:
      "Common questions about buying AI chips and enterprise hardware{{countrySuffix}}.",
  },
};
