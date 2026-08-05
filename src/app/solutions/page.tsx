import type { Metadata } from "next";
import { createSeoMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Enterprise AI & HPC Solutions — Data Center, Edge & Cloud Infrastructure | Servchip",
  description:
    "Multi-vendor enterprise solutions for AI training, HPC, data center acceleration, edge computing & professional visualization. NVIDIA, AMD, Intel hardware for enterprise deployments with global semiconductor procurement.",
  path: "/solutions",
  keywords: [
    "enterprise AI solutions",
    "HPC solutions",
    "data center infrastructure",
    "AI training solutions",
    "GPU cluster deployment",
    "edge computing hardware",
    "enterprise chip distributor",
    "semiconductor procurement",
  ],
  openGraphTitle:
    "Enterprise AI & HPC Solutions | Servchip — Data Center GPU Distributor",
  openGraphDescription:
    "Multi-vendor enterprise solutions for AI training, HPC, and data center workloads featuring NVIDIA, AMD, and Intel hardware.",
  twitterTitle:
    "Enterprise AI & HPC Solutions | Servchip — Data Center GPU Distributor",
  twitterDescription:
    "Multi-vendor enterprise solutions for AI training, HPC, and data center workloads featuring NVIDIA, AMD, and Intel hardware.",
});

const SOLUTIONS = [
  {
    name: "AI Training Solutions",
    description:
      "Multi-GPU clusters for large-scale AI model training with high-speed NVLink interconnects and optimized cooling.",
    url: "/solutions",
  },
  {
    name: "HPC Infrastructure",
    description:
      "High-performance computing deployments for scientific simulation, molecular modeling, and financial analytics.",
    url: "/solutions",
  },
  {
    name: "Data Center Acceleration",
    description:
      "GPU-accelerated data center deployments for inference, analytics, and real-time processing workloads.",
    url: "/solutions",
  },
];

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Solutions", url: "/solutions" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceSchema(SOLUTIONS)}
      />
      <PageClient />
    </>
  );
}
