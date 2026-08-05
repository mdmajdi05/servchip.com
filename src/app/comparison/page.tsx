import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "AI Chip Comparison — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3 | Enterprise Chip Specs",
  description:
    "Compare enterprise AI accelerators side by side — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3. Memory, bandwidth, TFLOPS, TDP & architecture specs for data center GPU procurement decisions.",
  path: "/comparison",
  keywords: [
    "NVIDIA H100 vs AMD MI300X",
    "AI chip comparison",
    "enterprise GPU specs",
    "data center accelerator comparison",
    "NVIDIA H100 specifications",
    "AMD MI300X benchmark",
    "semiconductor procurement guide",
  ],
  openGraphTitle:
    "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
  openGraphDescription:
    "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
  twitterTitle:
    "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
  twitterDescription:
    "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Comparison", url: "/comparison" },
        ])}
      />
      <PageClient />
    </>
  );
}
