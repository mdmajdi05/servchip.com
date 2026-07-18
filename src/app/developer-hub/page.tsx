import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Developer Hub — SDK, API Docs & Integration Guides for AI Chips | Servchip",
  description:
    "Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI. SDK documentation, API reference, and code samples for enterprise AI chip development and semiconductor deployment.",
  keywords: [
    "NVIDIA CUDA SDK",
    "AMD ROCm guide",
    "Intel oneAPI docs",
    "AI chip development",
    "enterprise chip integration",
    "GPU SDK documentation",
  ],
  alternates: { canonical: `${SITE.url}/developer-hub` },
  openGraph: {
    title: "Developer Hub | Servchip — Enterprise AI Hardware",
    description:
      "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Developer Hub — AI Chip SDK & API Docs",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developer Hub | Servchip — Enterprise AI Hardware",
    description:
      "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
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
          { name: "Developer Hub", url: "/developer-hub" },
        ])}
      />
      <PageClient />
    </>
  );
}
