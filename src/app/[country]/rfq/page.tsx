import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/rfq/page-client";

export async function generateStaticParams() {
  return Object.keys(COUNTRY_MARKETS).map((code) => ({ country: code }));
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  if (!countryObj || !market) return {};

  return createSeoMetadata({
    title: `Request a Quote in ${countryObj.name} — Enterprise AI Hardware Pricing`,
    description: `Request a personalized quote for enterprise chips in ${countryObj.name} — NVIDIA H100, AMD MI300X, Intel Xeon & Gaudi 3. ${market.currency} volume discounts, 24-hour response time, shipped from ${market.warehouse}.`,
    path: `/${country}/rfq`,
    keywords: [
      `enterprise chip pricing ${countryObj.name}`,
      `NVIDIA H100 quote ${countryObj.name}`,
      `AI accelerator pricing ${countryObj.name}`,
      `semiconductor procurement quote ${countryObj.name}`,
    ],
    openGraphTitle: `Request a Quote in ${countryObj.name} | Servchip`,
    twitterTitle: `Request a Quote in ${countryObj.name} | Servchip`,
    openGraphDescription: `Get enterprise chip pricing in ${countryObj.name}. NVIDIA, AMD, Intel. Volume discounts & 24-hour quotes.`,
    twitterDescription: `Get enterprise chip pricing in ${countryObj.name}. NVIDIA, AMD, Intel.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/rfq`,
        [market.locale]: `${SITE.url}/${country}/rfq`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await props.params;
  const countryObj = getCountryByCode(country);
  if (!countryObj) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: `/${country}` },
          { name: countryObj.name, url: `/${country}` },
          { name: "Request a Quote", url: `/${country}/rfq` },
        ])}
      />
      <Suspense fallback={null}>
        <PageClient />
      </Suspense>
    </>
  );
}
