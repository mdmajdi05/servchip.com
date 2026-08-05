import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Chip Configurator — Find the Right AI Accelerator for Your Workload | Servchip",
  description:
    "Configure your ideal chip setup from NVIDIA, AMD, Intel and more. Answer a few questions and get matched with the right AI accelerator for training, inference, HPC, or professional graphics. Enterprise chip distributor.",
  path: "/configurator",
  keywords: [
    "chip configurator",
    "AI accelerator finder",
    "GPU selector tool",
    "enterprise chip matching",
    "workload-based chip recommendation",
  ],
  robots: { index: false, follow: true },
  openGraphTitle:
    "Chip Configurator | Servchip — Find the Right AI Accelerator",
  openGraphDescription:
    "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
  twitterTitle: "Chip Configurator | Servchip — Find the Right AI Accelerator",
  twitterDescription:
    "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Configurator", url: "/configurator" },
        ])}
      />
      <PageClient />
    </>
  );
}
