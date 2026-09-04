import type { SeoPageTemplate } from "../types";

export const industries: SeoPageTemplate = {
  path: "/industries",
  label: "Industries",
  title: "Industries | Enterprise AI GPU Solutions",
  description:
    "Enterprise AI and data center hardware solutions for healthcare, finance, government, research, telecom and manufacturing.",
  keywords: [
    "enterprise AI by industry",
    "AI infrastructure solutions",
    "data center GPU industry solutions",
    "healthcare AI hardware",
    "financial AI hardware",
    "enterprise chip distributor",
  ],
  openGraphTitle: "Industries We Serve | Servchip",
  twitterTitle: "Industries We Serve | Servchip",
  country: {
    title: "Industries{{countrySuffix}} | Enterprise AI Solutions",
    description:
      "Enterprise AI and data center hardware{{countrySuffix}} for healthcare, finance, government, research, telecom and manufacturing.",
    keywords: [
      "enterprise AI by industry{{countrySuffix}}",
      "AI infrastructure solutions{{countrySuffix}}",
      "data center GPU industry solutions{{countrySuffix}}",
      "healthcare AI hardware{{countrySuffix}}",
    ],
    openGraphTitle: "Industries We Serve{{countrySuffix}} | Servchip",
    twitterTitle: "Industries We Serve{{countrySuffix}} | Servchip",
  },
};
