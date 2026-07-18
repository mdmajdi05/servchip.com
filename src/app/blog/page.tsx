import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Blog — Enterprise AI Hardware Guides, Chip Architecture Insights & Semiconductor Procurement",
  description:
    "Expert guides on NVIDIA Blackwell, AMD CDNA 3, Intel Granite Rapids & more. Enterprise AI chip comparisons, deployment best practices, semiconductor procurement tips & data center infrastructure insights.",
  keywords: [
    "AI hardware guides",
    "enterprise chip blog",
    "NVIDIA Blackwell architecture",
    "AMD CDNA 3 guide",
    "semiconductor procurement",
    "data center infrastructure",
    "AI chip comparison",
    "enterprise GPU guide",
  ],
  alternates: { canonical: `${SITE.url}/blog` },
  openGraph: {
    title: "Blog | Servchip — Enterprise Chip Distributor",
    description:
      "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Blog — Enterprise AI Hardware Guides",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Servchip — Enterprise Chip Distributor",
    description:
      "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
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
          { name: "Blog", url: "/blog" },
        ])}
      />
      <PageClient />
    </>
  );
}
