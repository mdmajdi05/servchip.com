import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "AI Chip Comparison — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3 | Enterprise Chip Specs",
  description:
    "Compare enterprise AI accelerators side by side — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3. Memory, bandwidth, TFLOPS, TDP & architecture specs for data center GPU procurement decisions.",
  keywords: [
    "NVIDIA H100 vs AMD MI300X",
    "AI chip comparison",
    "enterprise GPU specs",
    "data center accelerator comparison",
    "NVIDIA H100 specifications",
    "AMD MI300X benchmark",
    "semiconductor procurement guide",
  ],
  alternates: { canonical: `${SITE.url}/comparison` },
  openGraph: {
    title: "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
    description:
      "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "AI Chip Comparison — NVIDIA vs AMD vs Intel",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
    description:
      "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
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
          { name: "Comparison", url: "/comparison" },
        ])}
      />
      <PageClient />
    </>
  );
}
