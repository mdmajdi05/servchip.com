import type { SeoPageTemplate } from "../types";

export const about: SeoPageTemplate = {
  path: "/about",
  label: "About",
  title: "About Servchip | Enterprise Chip Distributor",
  description:
    "Servchip is an ISO 9001 certified enterprise chip distributor & semiconductor procurement partner serving 500+ global enterprises across 150+ countries.",
  keywords: [
    "about Servchip",
    "enterprise chip distributor",
    "semiconductor procurement company",
    "AI hardware supplier",
    "data center hardware procurement",
    "chip sourcing company",
    "bulk semiconductor purchasing",
  ],
  openGraphTitle:
    "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
  openGraphDescription:
    "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries.",
  twitterTitle:
    "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
  twitterDescription:
    "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries.",
  country: {
    title: "About Servchip | Chip Distributor{{countrySuffix}}",
    description:
      "ISO 9001 certified enterprise chip distributor serving{{countrySuffix}} with authorized NVIDIA, AMD and Intel distribution and {{currency}} pricing from {{warehouse}}.",
    keywords: [
      "about Servchip{{countrySuffix}}",
      "enterprise chip distributor{{countrySuffix}}",
      "semiconductor procurement{{countrySuffix}}",
      "NVIDIA authorized distributor{{countrySuffix}}",
    ],
    openGraphTitle:
      "About Servchip{{countrySuffix}} | Enterprise Chip Distributor",
    twitterTitle:
      "About Servchip{{countrySuffix}} | Enterprise Chip Distributor",
    openGraphDescription:
      "ISO 9001 certified enterprise chip distributor serving{{countrySuffix}}.",
    twitterDescription:
      "ISO 9001 certified enterprise chip distributor serving{{countrySuffix}}.",
  },
};
