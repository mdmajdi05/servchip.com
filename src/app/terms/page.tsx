import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title: "Terms of Service — Servchip Terms & Conditions",
  description:
    "Servchip terms of service govern the use of our website, product purchases, warranty claims, and enterprise account management.",
  path: "/terms",
  openGraphTitle: "Terms of Service | Servchip",
  openGraphDescription:
    "Terms & conditions for using Servchip's website and services.",
  twitterTitle: "Terms of Service | Servchip",
  twitterDescription:
    "Terms & conditions for using Servchip's website and services.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Terms of Service", url: "/terms" },
        ])}
      />
      <PageClient />
    </>
  );
}
