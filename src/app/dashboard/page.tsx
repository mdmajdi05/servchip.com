import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import PageClient from "./page-client";

export const metadata: Metadata = {
  title: "Account Dashboard — Servchip Enterprise Portal",
  description:
    "Manage your Servchip account, track orders, view quotes, and access your enterprise dashboard for chip procurement across all manufacturers.",
  alternates: { canonical: `${SITE.url}/dashboard` },
  robots: { index: false, follow: false },
  twitter: {
    card: "summary",
    title: "Account Dashboard | Servchip",
    description: "Manage your Servchip enterprise account and orders.",
  },
};

export default function Page() {
  return <PageClient />;
}
