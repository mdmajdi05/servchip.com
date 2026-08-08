import type { SeoPageTemplate } from "../types";

export const privacy: SeoPageTemplate = {
  path: "/privacy",
  label: "Privacy Policy",
  title: "Privacy Policy | Servchip",
  description:
    "Servchip privacy policy explains how we collect, use and protect your personal data when you browse our store or contact our sales team.",
  openGraphTitle: "Privacy Policy | Servchip",
  openGraphDescription:
    "How Servchip collects, uses, and protects your personal data.",
  twitterTitle: "Privacy Policy | Servchip",
  twitterDescription:
    "How Servchip collects, uses, and protects your personal data.",
  country: {
    title: "Privacy Policy{{countrySuffix}} | Servchip",
    description:
      "Servchip privacy policy explains how we collect, use and protect your personal data{{countrySuffix}} when you browse our store or contact our sales team.",
    openGraphTitle: "Privacy Policy {{name}} | Servchip",
    twitterTitle: "Privacy Policy {{name}} | Servchip",
    openGraphDescription:
      "How Servchip collects, uses, and protects your personal data{{countrySuffix}}.",
    twitterDescription:
      "How Servchip collects, uses, and protects your personal data{{countrySuffix}}.",
  },
};
