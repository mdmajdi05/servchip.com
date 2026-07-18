import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import {
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "About Servchip — ISO 9001 Certified Enterprise Chip Distributor | Semiconductor Procurement",
  description:
    "Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner. Authorized distribution for NVIDIA, AMD, Intel with 27+ manufacturer partnerships, serving 500+ enterprises across 150+ countries from India & UAE.",
  keywords: [
    "about Servchip",
    "enterprise chip distributor",
    "semiconductor procurement company",
    "NVIDIA authorized distributor India",
    "AI hardware supplier",
    "data center hardware procurement",
    "chip sourcing company",
    "bulk semiconductor purchasing",
  ],
  alternates: { canonical: `${SITE.url}/about` },
  openGraph: {
    title:
      "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
    description:
      "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "About Servchip — Enterprise Chip Distributor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
    description:
      "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
    images: [OG_IMAGE],
  },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@type": "AboutPage",
          name: "About Servchip — Enterprise Chip Distributor",
          url: `${SITE.url}/about`,
          mainEntity: {
            "@type": "Organization",
            name: "Servchip Inc.",
            url: SITE.url,
            foundingDate: "2018",
            description:
              "ISO 9001 certified enterprise chip distributor supplying NVIDIA, AMD, Intel, and 27+ manufacturers. Semiconductor procurement partner for 500+ enterprises across 150+ countries.",
          },
        })}
      />
      <PageClient />
    </>
  );
}
