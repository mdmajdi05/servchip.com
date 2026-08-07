import type { Metadata } from "next";
import {
  createMetadata,
  createBreadcrumb,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("solutions");

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
        dangerouslySetInnerHTML={breadcrumbSchema(
          createBreadcrumb("solutions"),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceSchema(SOLUTIONS)}
      />
      <PageClient />
    </>
  );
}
