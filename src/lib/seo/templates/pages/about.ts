import type { SeoPageTemplate } from "../types";

export const about: SeoPageTemplate = {
  path: "/about",
  label: "About",
  title:
    "About Servchip — ISO 9001 Certified Enterprise Chip Distributor | Semiconductor Procurement",
  description:
    "Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner. Authorized distribution for NVIDIA, AMD, Intel with 27+ manufacturer partnerships, serving 500+ enterprises across 150+ countries from India & UAE.",
  keywords: [
    "about Servchip",
    "enterprise chip distributor",
    "semiconductor procurement company",
    "NVIDIA authorized distributor India",
    "AI hardware supplier",
    "data center hardware procurement",
    "chip sourcing company",
    "bulk semiconductor purchasing",
  ],
  openGraphTitle:
    "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
  openGraphDescription:
    "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
  twitterTitle:
    "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
  twitterDescription:
    "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
  country: {
    title:
      "About Servchip — ISO 9001 Enterprise Chip Distributor{{countrySuffix}}",
    description:
      "Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner serving {{name}}. Authorized NVIDIA, AMD & Intel distribution with local {{currency}} pricing and shipping from {{warehouse}}.",
    keywords: [
      "about Servchip {{name}}",
      "enterprise chip distributor {{name}}",
      "semiconductor procurement {{name}}",
      "NVIDIA authorized distributor {{name}}",
    ],
    openGraphTitle: "About Servchip {{name}} | Enterprise Chip Distributor",
    twitterTitle: "About Servchip {{name}} | Enterprise Chip Distributor",
    openGraphDescription:
      "ISO 9001 certified enterprise chip distributor serving {{name}}.",
    twitterDescription:
      "ISO 9001 certified enterprise chip distributor serving {{name}}.",
  },
};
