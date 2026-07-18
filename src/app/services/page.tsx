import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import {
  serviceSchema,
  breadcrumbSchema,
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
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
  alternates: { canonical: `${SITE.url}/services` },
  openGraph: {
    title:
      "Enterprise Chip Services | Servchip — Semiconductor Procurement & Integration",
    description:
      "Custom semiconductor procurement, system integration, AI infrastructure consulting, and enterprise hardware support from an ISO 9001 certified chip distributor.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Enterprise Chip Services",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Enterprise Chip Services | Servchip — Semiconductor Procurement & Integration",
    description:
      "Custom semiconductor procurement, system integration, AI infrastructure consulting, and enterprise hardware support from an ISO 9001 certified chip distributor.",
    images: [OG_IMAGE],
  },
};

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
