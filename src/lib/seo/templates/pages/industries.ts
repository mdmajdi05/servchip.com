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
    title: "Industries in {{name}} | Enterprise AI Solutions",
    description:
      "Enterprise AI and data center hardware in {{name}} for healthcare, finance, government, research, telecom and manufacturing.",
    keywords: [
      "enterprise AI by industry {{name}}",
      "AI infrastructure solutions {{name}}",
      "data center GPU industry solutions {{name}}",
      "healthcare AI hardware {{name}}",
    ],
    openGraphTitle: "Industries We Serve in {{name}} | Servchip",
    twitterTitle: "Industries We Serve in {{name}} | Servchip",
  },
};
