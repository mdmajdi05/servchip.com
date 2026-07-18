import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import {
  serviceSchema,
  breadcrumbSchema,
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Enterprise AI & HPC Solutions — Data Center, Edge & Cloud Infrastructure | Servchip",
  description:
    "Multi-vendor enterprise solutions for AI training, HPC, data center acceleration, edge computing & professional visualization. NVIDIA, AMD, Intel hardware for enterprise deployments with global semiconductor procurement.",
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
  alternates: { canonical: `${SITE.url}/solutions` },
  openGraph: {
    title:
      "Enterprise AI & HPC Solutions | Servchip — Data Center GPU Distributor",
    description:
      "Multi-vendor enterprise solutions for AI training, HPC, and data center workloads featuring NVIDIA, AMD, and Intel hardware.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Enterprise AI & HPC Solutions",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Enterprise AI & HPC Solutions | Servchip — Data Center GPU Distributor",
    description:
      "Multi-vendor enterprise solutions for AI training, HPC, and data center workloads featuring NVIDIA, AMD, and Intel hardware.",
    images: [OG_IMAGE],
  },
};

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
