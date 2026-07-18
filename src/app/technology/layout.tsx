import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";

export const metadata: Metadata = {
  title:
    "Technology — Multi-Vendor AI Chip Architecture, GPU Interconnects & Enterprise Solutions",
  description:
    "Explore enterprise chip technology — NVIDIA Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids. AI acceleration, HBM3E memory, NVLink interconnects & more for data center deployments. Semiconductor procurement expertise.",
  keywords: [
    "AI chip architecture",
    "NVIDIA Blackwell",
    "AMD CDNA 3",
    "Intel Granite Rapids",
    "HBM3E memory",
    "NVLink interconnects",
    "enterprise chip technology",
    "semiconductor procurement",
  ],
  alternates: { canonical: `${SITE.url}/technology` },
  openGraph: {
    title:
      "Technology Portfolio | Servchip — Enterprise AI Hardware Distributor",
    description:
      "Multi-vendor chip architecture expertise across NVIDIA, AMD, Intel for enterprise AI, HPC & data center workloads.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Technology — AI Chip Architecture",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Technology Portfolio | Servchip — Enterprise AI Hardware Distributor",
    description:
      "Multi-vendor chip architecture expertise across NVIDIA, AMD, Intel for enterprise AI, HPC & data center workloads.",
    images: [OG_IMAGE],
  },
};

export default function TechnologyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Technology", url: "/technology" },
        ])}
      />
      {children}
    </>
  );
}
