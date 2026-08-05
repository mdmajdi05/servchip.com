import type { Metadata } from "next";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title: "Account Dashboard — Servchip Enterprise Portal",
  description:
    "Manage your Servchip account, track orders, view quotes, and access your enterprise dashboard for chip procurement across all manufacturers.",
  path: "/dashboard",
  keywords: [
    "Servchip account dashboard",
    "enterprise chip orders",
    "semiconductor procurement portal",
    "chip distributor account",
    "AI hardware procurement",
  ],
  noindex: true,
  openGraphTitle: "Account Dashboard | Servchip",
  openGraphDescription:
    "Manage your Servchip enterprise account, track orders, view quotes, and access procurement tools.",
  twitterTitle: "Account Dashboard | Servchip",
  twitterDescription: "Manage your Servchip enterprise account and orders.",
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Dashboard", url: "/dashboard" },
        ])}
      />
      <PageClient />
    </>
  );
}
