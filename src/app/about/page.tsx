import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { createSeoMetadata, breadcrumbSchema, jsonLd } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "About Servchip — ISO 9001 Certified Enterprise Chip Distributor | Semiconductor Procurement",
  description:
    "Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner. Authorized distribution for NVIDIA, AMD, Intel with 27+ manufacturer partnerships, serving 500+ enterprises across 150+ countries from India & UAE.",
  path: "/about",
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
  openGraphTitle:
    "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
  openGraphDescription:
    "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
  twitterTitle:
    "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
  twitterDescription:
    "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
});

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
