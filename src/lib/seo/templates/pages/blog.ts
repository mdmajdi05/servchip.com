import type { SeoPageTemplate } from "../types";

export const blog: SeoPageTemplate = {
  path: "/blog",
  label: "Blog",
  title: "AI Chip Blog | Guides, Comparisons & GPU Insights",
  description:
    "Expert guides on NVIDIA Blackwell, AMD CDNA 3 and Intel Granite Rapids. AI chip comparisons and deployment best practices.",
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
    title: "AI Chip Blog for Buyers{{countrySuffix}} | Servchip",
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
