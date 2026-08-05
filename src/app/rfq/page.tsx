import type { Metadata } from "next";
import { Suspense } from "react";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Request a Quote — Enterprise AI Hardware Pricing & Semiconductor Procurement",
  description:
    "Request a personalized quote for enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon & Gaudi 3. Volume discounts, 24-hour response time & global shipping from an ISO 9001 certified distributor.",
  path: "/rfq",
  keywords: [
    "enterprise chip pricing",
    "NVIDIA H100 quote",
    "AI accelerator pricing",
    "semiconductor procurement quote",
    "bulk chip pricing",
    "data center hardware quote",
  ],
  openGraphTitle: "Request a Quote | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Get enterprise chip pricing. NVIDIA, AMD, Intel hardware. Volume discounts & 24-hour quotes.",
  twitterTitle: "Request a Quote | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Get enterprise chip pricing. NVIDIA, AMD, Intel hardware. Volume discounts & 24-hour quotes.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Request a Quote", url: "/rfq" },
        ])}
      />
      <Suspense fallback={null}>
        <PageClient />
      </Suspense>
    </>
  );
}
