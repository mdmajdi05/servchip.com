import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title: "Terms of Service — Servchip Terms & Conditions",
  description:
    "Servchip terms of service govern the use of our website, product purchases, warranty claims, and enterprise account management.",
  alternates: { canonical: `${SITE.url}/terms` },
  openGraph: {
    title: "Terms of Service | Servchip",
    description:
      "Terms & conditions for using Servchip's website and services.",
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip Terms of Service",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Servchip",
    description:
      "Terms & conditions for using Servchip's website and services.",
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
          { name: "Terms of Service", url: "/terms" },
        ])}
      />
      <PageClient />
    </>
  );
}
