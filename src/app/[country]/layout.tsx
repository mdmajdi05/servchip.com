import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { SUPPORTED_COUNTRIES } from "@/lib/localized-path";

/**
 * Single choke point for every `/{country}/...` route.
 *
 * Only locale codes that have BOTH a market definition and a country record
 * are real pages. Any other code (e.g. /om, /ph, /qa, /sg) previously fell
 * through to soft-404 homepage content — a redirect-free hard 404 is emitted
 * here so Google never treats a nonexistent locale as a live page.
 */
export default async function CountryLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!SUPPORTED_COUNTRIES.includes(country)) {
    notFound();
  }
  return <>{children}</>;
}
