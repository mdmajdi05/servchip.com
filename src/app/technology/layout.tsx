import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Technology — Multi-Vendor AI Chip Architecture, GPU Interconnects & Enterprise Solutions",
  description:
    "Explore enterprise chip technology — NVIDIA Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids. AI acceleration, HBM3E memory, NVLink interconnects & more for data center deployments. Semiconductor procurement expertise.",
  path: "/technology",
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
  openGraphTitle:
    "Technology Portfolio | Servchip — Enterprise AI Hardware Distributor",
  openGraphDescription:
    "Multi-vendor chip architecture expertise across NVIDIA, AMD, Intel for enterprise AI, HPC & data center workloads.",
  twitterTitle:
    "Technology Portfolio | Servchip — Enterprise AI Hardware Distributor",
  twitterDescription:
    "Multi-vendor chip architecture expertise across NVIDIA, AMD, Intel for enterprise AI, HPC & data center workloads.",
});

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
