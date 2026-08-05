import type { Metadata } from "next";
import { createSeoMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Enterprise Chip Services — Semiconductor Procurement, Integration & AI Infrastructure Consulting",
  description:
    "End-to-end enterprise chip services — custom semiconductor procurement, hardware sourcing, system integration, AI infrastructure consulting, and enterprise support. ISO 9001 certified chip distributor with global delivery.",
  path: "/services",
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
});

const SERVICES = [
  {
    name: "Enterprise Chip Sourcing",
    description:
      "Custom semiconductor procurement and hard-to-find enterprise chip sourcing through our global manufacturer partnership network.",
    url: "/services",
  },
  {
    name: "System Integration",
    description:
      "Pre-configured rack-level integration for AI servers, GPU clusters, and data center hardware deployment.",
    url: "/services",
  },
  {
    name: "AI Infrastructure Consulting",
    description:
      "Architecture review and workload optimization for AI training, inference, and HPC deployments across NVIDIA, AMD, and Intel.",
    url: "/services",
  },
  {
    name: "Technical Support",
    description:
      "Multi-vendor certified engineers providing pre-sales consultation and post-sales enterprise hardware support.",
    url: "/services",
  },
  {
    name: "Warranty & RMA",
    description:
      "Extended warranty plans and advanced replacement services for enterprise hardware across all manufacturer brands.",
    url: "/services",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Services", url: "/services" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceSchema(SERVICES)}
      />
      <PageClient />
    </>
  );
}
