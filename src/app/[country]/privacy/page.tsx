import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/privacy/page-client";

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
    title: `Privacy Policy — Servchip Data Protection in ${countryObj.name}`,
    description: `Servchip privacy policy explains how we collect, use, and protect your personal data in ${countryObj.name} when you browse our store or contact our sales team.`,
    path: `/${country}/privacy`,
    openGraphTitle: `Privacy Policy ${countryObj.name} | Servchip`,
    twitterTitle: `Privacy Policy ${countryObj.name} | Servchip`,
    openGraphDescription: `How Servchip collects, uses, and protects your personal data in ${countryObj.name}.`,
    twitterDescription: `How Servchip collects, uses, and protects your personal data in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/privacy`,
        [market.locale]: `${SITE.url}/${country}/privacy`,
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
          { name: "Privacy Policy", url: `/${country}/privacy` },
        ])}
      />
      <PageClient />
    </>
  );
}
