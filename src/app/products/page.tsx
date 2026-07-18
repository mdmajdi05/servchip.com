import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Buy Enterprise Chips — NVIDIA H100, AMD MI300X, Intel Xeon & AI Accelerators | Servchip",
  description:
    "Buy authentic enterprise chips from an ISO 9001 certified distributor. NVIDIA H100, H200, B200, AMD MI300X, Intel Xeon & Gaudi 3. AI accelerators, server CPUs, data center GPUs. Semiconductor procurement with global shipping.",
  keywords: [
    "buy AI chips",
    "enterprise chip distributor",
    "NVIDIA H100 buy",
    "AMD MI300X supplier",
    "AI accelerator distributor",
    "semiconductor procurement",
    "data center GPU supplier",
    "enterprise hardware store",
  ],
  alternates: { canonical: `${SITE.url}/products` },
  openGraph: {
    title:
      "Buy Enterprise Chips | Servchip — NVIDIA, AMD, Intel AI Accelerators",
    description:
      "Buy authentic enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon. ISO 9001 certified distributor with global shipping.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Enterprise Chip Products",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Buy Enterprise Chips | Servchip — NVIDIA, AMD, Intel AI Accelerators",
    description:
      "Buy authentic enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon. ISO 9001 certified distributor with global shipping.",
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
          { name: "Products", url: "/products" },
        ])}
      />
      <PageClient />
    </>
  );
}
