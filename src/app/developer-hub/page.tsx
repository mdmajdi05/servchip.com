import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Developer Hub — SDK, API Docs & Integration Guides for AI Chips | Servchip",
  description:
    "Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI. SDK documentation, API reference, and code samples for enterprise AI chip development and semiconductor deployment.",
  path: "/developer-hub",
  keywords: [
    "NVIDIA CUDA SDK",
    "AMD ROCm guide",
    "Intel oneAPI docs",
    "AI chip development",
    "enterprise chip integration",
    "GPU SDK documentation",
  ],
  openGraphTitle: "Developer Hub | Servchip — Enterprise AI Hardware",
  openGraphDescription:
    "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
  twitterTitle: "Developer Hub | Servchip — Enterprise AI Hardware",
  twitterDescription:
    "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
});

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
