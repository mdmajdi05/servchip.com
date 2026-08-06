import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/about/page-client";

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
    title: `About Servchip — ISO 9001 Enterprise Chip Distributor in ${countryObj.name}`,
    description: `Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner serving ${countryObj.name}. Authorized NVIDIA, AMD & Intel distribution with local ${market.currency} pricing and shipping from ${market.warehouse}.`,
    path: `/${country}/about`,
    keywords: [
      `about Servchip ${countryObj.name}`,
      `enterprise chip distributor ${countryObj.name}`,
      `semiconductor procurement ${countryObj.name}`,
      `NVIDIA authorized distributor ${countryObj.name}`,
    ],
    openGraphTitle: `About Servchip ${countryObj.name} | Enterprise Chip Distributor`,
    twitterTitle: `About Servchip ${countryObj.name} | Enterprise Chip Distributor`,
    openGraphDescription: `ISO 9001 certified enterprise chip distributor serving ${countryObj.name}.`,
    twitterDescription: `ISO 9001 certified enterprise chip distributor serving ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/about`,
        [market.locale]: `${SITE.url}/${country}/about`,
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
          { name: "About", url: `/${country}/about` },
        ])}
      />
      <PageClient />
    </>
  );
}
