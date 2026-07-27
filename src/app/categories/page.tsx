import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Product Categories — Data Center GPUs, AI Accelerators, Server CPUs & Enterprise Hardware | Servchip",
  description:
    "Browse enterprise chip categories — NVIDIA data center GPUs, AMD Instinct accelerators, Intel Xeon CPUs, AI servers, networking, memory & storage from an ISO 9001 certified distributor for semiconductor procurement.",
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
  alternates: { canonical: `${SITE.url}/categories` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Product Categories | Servchip — Enterprise Chip Distributor",
    description:
      "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Product Categories",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Product Categories | Servchip — Enterprise Chip Distributor",
    description:
      "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
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
          { name: "Categories", url: "/categories" },
        ])}
      />
      <PageClient />
    </>
  );
}
