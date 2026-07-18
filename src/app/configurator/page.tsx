import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Chip Configurator — Find the Right AI Accelerator for Your Workload | Servchip",
  description:
    "Configure your ideal chip setup from NVIDIA, AMD, Intel and more. Answer a few questions and get matched with the right AI accelerator for training, inference, HPC, or professional graphics. Enterprise chip distributor.",
  keywords: [
    "chip configurator",
    "AI accelerator finder",
    "GPU selector tool",
    "enterprise chip matching",
    "workload-based chip recommendation",
  ],
  alternates: { canonical: `${SITE.url}/configurator` },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Chip Configurator | Servchip — Find the Right AI Accelerator",
    description:
      "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Chip Configurator",
        type: "image/png",
      },
    ],
  },
};

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
