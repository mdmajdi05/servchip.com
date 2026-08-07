import type { SeoPageTemplate } from "../types";

export const blog: SeoPageTemplate = {
  path: "/blog",
  label: "Blog",
  title:
    "Blog — Enterprise AI Hardware Guides, Chip Architecture Insights & Semiconductor Procurement",
  description:
    "Expert guides on NVIDIA Blackwell, AMD CDNA 3, Intel Granite Rapids & more. Enterprise AI chip comparisons, deployment best practices, semiconductor procurement tips & data center infrastructure insights.",
  keywords: [
    "AI hardware guides",
    "enterprise chip blog",
    "NVIDIA Blackwell architecture",
    "AMD CDNA 3 guide",
    "semiconductor procurement",
    "data center infrastructure",
    "AI chip comparison",
    "enterprise GPU guide",
  ],
  openGraphTitle: "Blog | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
  twitterTitle: "Blog | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
  country: {
    title: "AI Hardware Blog — {{name}} Edition | Servchip",
    description:
      "Enterprise AI hardware guides, chip architecture insights and semiconductor procurement tips for buyers in {{name}}.",
    keywords: [
      "AI hardware guides {{name}}",
      "enterprise chip blog {{name}}",
      "semiconductor procurement {{name}}",
      "data center infrastructure {{name}}",
    ],
    openGraphTitle: "AI Hardware Blog — {{name}} | Servchip",
    twitterTitle: "AI Hardware Blog — {{name}} | Servchip",
  },
};
