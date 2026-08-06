import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountryPath, getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/countries/page-client";

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
    title: `Enterprise AI Chips by Country | Global Delivery | Servchip`,
    description: `Enterprise AI hardware and data center chips delivered across India, UAE, USA, UK, Germany and more. NVIDIA, AMD & Intel with full customs handling and ${market.currency} regional pricing.`,
    path: `/${country}/countries`,
    keywords: [
      `AI chip distributor by country`,
      `enterprise chip distributor ${countryObj.name}`,
      `NVIDIA GPU global delivery ${countryObj.name}`,
      `semiconductor distributor`,
    ],
    openGraphTitle: `Enterprise AI Chips by Country | Servchip`,
    twitterTitle: `Enterprise AI Chips by Country | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/countries`,
        [market.locale]: `${SITE.url}/${country}/countries`,
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
          { name: "Countries", url: `/${country}/countries` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          COUNTRIES.map((c) => ({
            name: c.name,
            url: getCountryPath(c),
          })),
        )}
      />
      <PageClient />
    </>
  );
}
