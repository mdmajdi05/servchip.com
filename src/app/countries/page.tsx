import type { Metadata } from "next";
import { COUNTRIES } from "@/data/countries";
import { createSeoMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title: "Enterprise AI Chips by Country | Global Delivery | Servchip",
  description:
    "Enterprise AI hardware and data center chips delivered across India, UAE, USA, Saudi Arabia, Qatar and Oman. NVIDIA, AMD & Intel with full customs handling.",
  path: "/countries",
  keywords: [
    "AI chip distributor by country",
    "NVIDIA GPU global delivery",
    "enterprise chip distributor India",
    "AI chip distributor UAE",
    "semiconductor distributor Middle East",
    "enterprise chip distributor",
  ],
  openGraphTitle: "Enterprise AI Chips by Country | Servchip",
  twitterTitle: "Enterprise AI Chips by Country | Servchip",
});

export default async function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Countries", url: "/countries" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          COUNTRIES.map((c) => ({
            name: c.name,
            url: `/countries/${c.slug}`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
