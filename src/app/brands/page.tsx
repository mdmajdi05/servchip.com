import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "All Brands — NVIDIA, AMD, Intel, Dell, HPE & 27+ Enterprise Chip Manufacturers | Servchip",
  description:
    "Browse every brand we stock: NVIDIA, AMD, Intel, Google, Amazon, Dell Technologies, HPE, Supermicro, Broadcom, Micron and 27+ more. Authentic enterprise chips from an ISO 9001 certified distributor with global shipping.",
  path: "/brands",
  keywords: [
    "NVIDIA distributor",
    "AMD enterprise distributor",
    "Intel Xeon supplier",
    "enterprise chip brands",
    "AI hardware manufacturer",
    "semiconductor brand directory",
  ],
  openGraphTitle: "All Brands | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE and 27+ manufacturers.",
  twitterTitle: "All Brands | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE and 27+ manufacturers.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/brands" },
        ])}
      />
      <PageClient />
    </>
  );
}
