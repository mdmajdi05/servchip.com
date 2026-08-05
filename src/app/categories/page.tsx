import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Product Categories — Data Center GPUs, AI Accelerators, Server CPUs & Enterprise Hardware | Servchip",
  description:
    "Browse enterprise chip categories — NVIDIA data center GPUs, AMD Instinct accelerators, Intel Xeon CPUs, AI servers, networking, memory & storage from an ISO 9001 certified distributor for semiconductor procurement.",
  path: "/categories",
  keywords: [
    "enterprise chip categories",
    "data center GPUs",
    "AI accelerators",
    "server CPUs",
    "enterprise hardware",
    "NVIDIA GPU categories",
    "AMD Instinct",
    "Intel Xeon",
  ],
  openGraphTitle: "Product Categories | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
  twitterTitle: "Product Categories | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
        ])}
      />
      <PageClient />
    </>
  );
}
