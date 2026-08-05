import type { Metadata } from "next";
import { INDUSTRIES } from "@/data/industries";
import { createSeoMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title: "Industries We Serve | Enterprise AI Solutions by Sector | Servchip",
  description:
    "Enterprise AI and data center hardware solutions for data centers, healthcare, finance, government, research, telecom and manufacturing. NVIDIA, AMD & Intel hardware by industry.",
  path: "/industries",
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
});

export default async function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries", url: "/industries" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          INDUSTRIES.map((i) => ({
            name: i.name,
            url: `/industries/${i.slug}`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
