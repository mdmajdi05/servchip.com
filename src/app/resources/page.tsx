import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Resources — Enterprise AI Hardware Guides, Blog & Semiconductor Procurement Insights",
  description:
    "Technical guides, blog articles, case studies & whitepapers on AI computing, GPU architectures, HPC deployments, semiconductor procurement tips & enterprise chip solutions from Servchip's certified engineers.",
  keywords: [
    "AI hardware guides",
    "enterprise chip resources",
    "semiconductor procurement",
    "GPU architecture guides",
    "data center deployment",
    "HPC best practices",
  ],
  alternates: { canonical: `${SITE.url}/resources` },
  openGraph: {
    title: "Resources & Guides | Servchip — Enterprise Chip Distributor",
    description:
      "Technical guides, case studies & whitepapers on AI computing, GPU architectures & enterprise chip solutions.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Resources — Enterprise AI Hardware Guides",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources & Guides | Servchip — Enterprise Chip Distributor",
    description:
      "Technical guides, case studies & whitepapers on AI computing, GPU architectures & enterprise chip solutions.",
    images: [OG_IMAGE],
  },
};

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
