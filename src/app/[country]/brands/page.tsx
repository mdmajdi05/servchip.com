import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import BrandsPage from "@/app/brands/page-client";

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
    title: `Brand Directory in ${countryObj.name} | NVIDIA, AMD, Intel & More`,
    description: `Browse authentic enterprise hardware brands available in ${countryObj.name} — NVIDIA, AMD, Intel, HPE, Dell & more. Priced in ${market.currency}, shipped from ${market.warehouse}.`,
    path: `/${country}/brands`,
    keywords: [
      `NVIDIA distributor ${countryObj.name}`,
      `AMD distributor ${countryObj.name}`,
      `Intel distributor ${countryObj.name}`,
      `brands in ${countryObj.name}`,
      `enterprise hardware brands ${countryObj.name}`,
    ],
    openGraphTitle: `Brand Directory in ${countryObj.name} | Servchip`,
    twitterTitle: `Brand Directory in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/brands`,
        [market.locale]: `${SITE.url}/${country}/brands`,
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
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Brands", url: `/${country}/brands` },
        ])}
      />
      <BrandsPage />
    </>
  );
}
