import type { Metadata } from "next";
import {
  createSeoMetadata,
  contactPageSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Contact Us — Buy Enterprise Chips, AI Accelerators & Semiconductor Procurement",
  description:
    "Contact Servchip for enterprise chip pricing, AI accelerator availability, and semiconductor procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon & more. Enterprise hardware distributor with 24-hour response time & global shipping.",
  path: "/contact",
  keywords: [
    "contact Servchip",
    "buy enterprise chips",
    "AI accelerator pricing",
    "NVIDIA H100 quote",
    "semiconductor procurement contact",
    "enterprise hardware pricing",
    "data center GPU availability",
    "bulk chip ordering",
  ],
  openGraphTitle:
    "Contact Servchip — Enterprise Chip Distributor | Buy AI Chips & Get Pricing",
  openGraphDescription:
    "Get enterprise chip pricing & semiconductor procurement quotes. 24-hour response time. Buy AI accelerators with global shipping from India & UAE.",
  twitterTitle:
    "Contact Servchip — Enterprise Chip Distributor | Buy AI Chips & Get Pricing",
  twitterDescription:
    "Get enterprise chip pricing & semiconductor procurement quotes. 24-hour response time. Buy AI accelerators with global shipping from India & UAE.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={contactPageSchema()}
      />
      <PageClient />
    </>
  );
}
