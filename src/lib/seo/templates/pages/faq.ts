import type { SeoPageTemplate } from "../types";

export const faq: SeoPageTemplate = {
  path: "/faq",
  label: "FAQ",
  title: "FAQ | AI Chip Distributor Questions",
  description:
    "Answers about buying AI chips, enterprise chip purchasing, semiconductor procurement, bulk ordering, shipping, warranty and support.",
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
    title: "FAQ{{countrySuffix}} | AI Chip Distributor Questions",
    description:
      "Answers about buying AI chips and enterprise chip purchasing{{countrySuffix}}. Authenticity, bulk ordering, {{currency}} pricing, shipping and support.",
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
