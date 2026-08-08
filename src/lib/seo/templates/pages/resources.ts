import type { SeoPageTemplate } from "../types";

export const resources: SeoPageTemplate = {
  path: "/resources",
  label: "Resources",
  title: "Resources | AI Chip Guides & Whitepapers",
  description:
    "Technical guides, blog articles, case studies and whitepapers on AI computing, GPU architectures and semiconductor procurement.",
  keywords: [
    "AI hardware guides",
    "enterprise chip resources",
    "semiconductor procurement",
    "GPU architecture guides",
    "data center deployment",
    "HPC best practices",
  ],
  openGraphTitle: "Resources & Guides | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Technical guides, case studies & whitepapers on AI computing, GPU architectures & enterprise chip solutions.",
  twitterTitle: "Resources & Guides | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Technical guides, case studies & whitepapers on AI computing, GPU architectures & enterprise chip solutions.",
  country: {
    title: "Resources & Guides{{countrySuffix}} | Servchip",
    description:
      "Technical guides, blog articles and whitepapers on AI computing, GPU architectures and semiconductor procurement{{countrySuffix}}.",
    keywords: [
      "AI hardware guides {{name}}",
      "enterprise chip resources {{name}}",
      "semiconductor procurement {{name}}",
      "GPU architecture guides {{name}}",
    ],
    openGraphTitle: "Resources & Guides{{countrySuffix}} | Servchip",
    twitterTitle: "Resources & Guides{{countrySuffix}} | Servchip",
    openGraphDescription:
      "Technical guides, case studies & whitepapers on AI computing for buyers{{countrySuffix}}.",
    twitterDescription:
      "Technical guides, case studies & whitepapers on AI computing for buyers{{countrySuffix}}.",
  },
};
