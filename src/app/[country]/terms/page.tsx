import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/terms/page-client";

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
    title: `Terms of Service — Servchip Terms & Conditions in ${countryObj.name}`,
    description: `Servchip terms of service govern the use of our website, product purchases, warranty claims, and enterprise account management for customers in ${countryObj.name}.`,
    path: `/${country}/terms`,
    openGraphTitle: `Terms of Service ${countryObj.name} | Servchip`,
    twitterTitle: `Terms of Service ${countryObj.name} | Servchip`,
    openGraphDescription: `Terms & conditions for using Servchip's website and services in ${countryObj.name}.`,
    twitterDescription: `Terms & conditions for using Servchip's website and services in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/terms`,
        [market.locale]: `${SITE.url}/${country}/terms`,
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
          { name: "Terms of Service", url: `/${country}/terms` },
        ])}
      />
      <PageClient />
    </>
  );
}
