import type { SeoPageTemplate } from "../types";

export const services: SeoPageTemplate = {
  path: "/services",
  label: "Services",
  title:
    "Enterprise Chip Services — Semiconductor Procurement, Integration & AI Infrastructure Consulting",
  description:
    "End-to-end enterprise chip services — custom semiconductor procurement, hardware sourcing, system integration, AI infrastructure consulting, and enterprise support. ISO 9001 certified chip distributor with global delivery.",
  keywords: [
    "enterprise chip services",
    "semiconductor procurement services",
    "AI infrastructure consulting",
    "hardware sourcing solutions",
    "enterprise chip integration",
    "data center deployment services",
    "NVIDIA server configuration",
    "bulk chip procurement",
  ],
  openGraphTitle:
    "Enterprise Chip Services | Servchip — Semiconductor Procurement & Integration",
  openGraphDescription:
    "Custom semiconductor procurement, system integration, AI infrastructure consulting, and enterprise hardware support from an ISO 9001 certified chip distributor.",
  twitterTitle:
    "Enterprise Chip Services | Servchip — Semiconductor Procurement & Integration",
  twitterDescription:
    "Custom semiconductor procurement, system integration, AI infrastructure consulting, and enterprise hardware support from an ISO 9001 certified chip distributor.",
  country: {
    title:
      "Enterprise Chip Services in {{name}} — Semiconductor Procurement & Integration",
    description:
      "End-to-end enterprise chip services in {{name}} — custom semiconductor procurement, hardware sourcing, system integration and AI infrastructure consulting. ISO 9001 certified distributor with {{currency}} pricing and delivery from {{warehouse}}.",
    keywords: [
      "enterprise chip services {{name}}",
      "semiconductor procurement services {{name}}",
      "AI infrastructure consulting {{name}}",
      "hardware sourcing {{name}}",
    ],
    openGraphTitle: "Enterprise Chip Services {{name}} | Servchip",
    twitterTitle: "Enterprise Chip Services {{name}} | Servchip",
    openGraphDescription:
      "Custom semiconductor procurement and AI infrastructure consulting in {{name}}.",
    twitterDescription:
      "Custom semiconductor procurement and AI infrastructure consulting in {{name}}.",
  },
};
