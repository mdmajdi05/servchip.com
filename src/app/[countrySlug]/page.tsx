import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
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

  const cleanTitle = country.seo.metaTitle.replace(/\s*\|\s*Servchip\s*$/i, "");

  return createSeoMetadata({
    title: cleanTitle,
    description: country.seo.metaDescription,
    path: `/${countrySlug}`,
    keywords: country.seo.keywords,
    openGraphTitle: `${country.name} | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `${country.name} | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: country.seo.metaDescription,
    twitterDescription: country.seo.metaDescription,
    alternates: {
      languages: {
        "x-default": SITE.url,
        [market.locale]: `${SITE.url}/${countrySlug}`,
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

  const market = COUNTRY_MARKETS[countrySlug];
  const faqs = market
    ? [
        {
          question: `Do you deliver AI hardware across ${country.name}?`,
          answer: market.shippingNote,
        },
        ...country.faqs,
      ]
    : country.faqs;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: country.name, url: `/${countrySlug}` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(faqs)}
      />
      <PageClient />
    </>
  );
}
