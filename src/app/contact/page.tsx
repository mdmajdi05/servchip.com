import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import {
  contactPageSchema,
  breadcrumbSchema,
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title:
    "Contact Us — Buy Enterprise Chips, AI Accelerators & Semiconductor Procurement",
  description:
    "Contact Servchip for enterprise chip pricing, AI accelerator availability, and semiconductor procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon & more. Enterprise hardware distributor with 24-hour response time & global shipping.",
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
  alternates: { canonical: `${SITE.url}/contact` },
  openGraph: {
    title:
      "Contact Servchip — Enterprise Chip Distributor | Buy AI Chips & Get Pricing",
    description:
      "Get enterprise chip pricing & semiconductor procurement quotes. 24-hour response time. Buy AI accelerators with global shipping from India & UAE.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Contact Servchip — Enterprise Chip Distributor",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Contact Servchip — Enterprise Chip Distributor | Buy AI Chips & Get Pricing",
    description:
      "Get enterprise chip pricing & semiconductor procurement quotes. 24-hour response time. Buy AI accelerators with global shipping from India & UAE.",
    images: [OG_IMAGE],
  },
};

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
