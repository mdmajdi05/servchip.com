import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title: "Account Dashboard — Servchip Enterprise Portal",
  description:
    "Manage your Servchip account, track orders, view quotes, and access your enterprise dashboard for chip procurement across all manufacturers.",
  keywords: [
    "Servchip account dashboard",
    "enterprise chip orders",
    "semiconductor procurement portal",
    "chip distributor account",
    "AI hardware procurement",
  ],
  alternates: { canonical: `${SITE.url}/dashboard` },
  robots: { index: false, follow: false },
  openGraph: {
    title: "Account Dashboard | Servchip",
    description:
      "Manage your Servchip enterprise account, track orders, view quotes, and access procurement tools.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Account Dashboard",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Dashboard | Servchip",
    description: "Manage your Servchip enterprise account and orders.",
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
          { name: "Dashboard", url: "/dashboard" },
        ])}
      />
      <PageClient />
    </>
  );
}
