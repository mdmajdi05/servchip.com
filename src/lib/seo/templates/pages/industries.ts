import type { SeoPageTemplate } from "../types";

export const industries: SeoPageTemplate = {
  path: "/industries",
  label: "Industries",
  title: "Industries We Serve | Enterprise AI Solutions by Sector | Servchip",
  description:
    "Enterprise AI and data center hardware solutions for data centers, healthcare, finance, government, research, telecom and manufacturing. NVIDIA, AMD & Intel hardware by industry.",
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
    title:
      "Industries We Serve in {{name}} | Enterprise AI Solutions by Sector",
    description:
      "Enterprise AI and data center hardware solutions in {{name}} for data centers, healthcare, finance, government, research, telecom and manufacturing. NVIDIA, AMD & Intel hardware with {{currency}} pricing.",
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
