import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title: "Privacy Policy — Servchip Data Protection & Privacy Practices",
  description:
    "Servchip privacy policy explains how we collect, use, and protect your personal data when you browse our store or contact our sales team.",
  path: "/privacy",
  openGraphTitle: "Privacy Policy | Servchip",
  openGraphDescription:
    "How Servchip collects, uses, and protects your personal data.",
  twitterTitle: "Privacy Policy | Servchip",
  twitterDescription:
    "How Servchip collects, uses, and protects your personal data.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Privacy Policy", url: "/privacy" },
        ])}
      />
      <PageClient />
    </>
  );
}
