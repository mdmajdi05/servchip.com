import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return Object.keys(COUNTRY_MARKETS).map((code) => ({ countrySlug: code }));
}

export async function generateMetadata(props: {
  params: Promise<{ countrySlug: string }>;
}): Promise<Metadata> {
  const { countrySlug } = await props.params;
  const country = getCountryByCode(countrySlug);
  const market = COUNTRY_MARKETS[countrySlug];
  if (!country || !market) return {};

  return createSeoMetadata({
    title: `Buy AI Chips & Hardware in ${country.name} | NVIDIA, AMD, Intel`,
    description: `Buy NVIDIA H100, H200, B200, AMD Instinct & Intel accelerators in ${country.name}. Enterprise AI chip distributor with ${market.warehouse} warehouse and ${market.leadTime} delivery.`,
    path: `/${countrySlug}/products`,
    keywords: [
      `buy AI chips ${country.name}`,
      `NVIDIA GPU distributor ${country.name}`,
      `data center GPU supplier ${country.name}`,
      `GPU server supplier ${country.name}`,
      `semiconductor distributor ${country.name}`,
    ],
    openGraphTitle: `${country.name} Products | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `${country.name} Products | Servchip — Enterprise Chip Distributor`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/products`,
        [market.locale]: `${SITE.url}/${countrySlug}/products`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ countrySlug: string }>;
}) {
  const { countrySlug } = await props.params;
  const country = getCountryByCode(countrySlug);
  if (!country) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: country.name, url: `/${countrySlug}` },
          { name: "Products", url: `/${countrySlug}/products` },
        ])}
      />
      <PageClient />
    </>
  );
}
