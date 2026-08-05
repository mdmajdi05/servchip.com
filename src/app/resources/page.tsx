import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Resources — Enterprise AI Hardware Guides, Blog & Semiconductor Procurement Insights",
  description:
    "Technical guides, blog articles, case studies & whitepapers on AI computing, GPU architectures, HPC deployments, semiconductor procurement tips & enterprise chip solutions from Servchip's certified engineers.",
  path: "/resources",
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
});

export default function ResourcesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Resources", url: "/resources" },
        ])}
      />
      <PageClient />
    </>
  );
}
