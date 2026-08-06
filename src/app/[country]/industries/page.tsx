import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/industries/page-client";

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
    title: `Industries We Serve in ${countryObj.name} | Enterprise AI Solutions by Sector`,
    description: `Enterprise AI and data center hardware solutions in ${countryObj.name} for data centers, healthcare, finance, government, research, telecom and manufacturing. NVIDIA, AMD & Intel hardware with ${market.currency} pricing.`,
    path: `/${country}/industries`,
    keywords: [
      `enterprise AI by industry ${countryObj.name}`,
      `AI infrastructure solutions ${countryObj.name}`,
      `data center GPU industry solutions ${countryObj.name}`,
      `healthcare AI hardware ${countryObj.name}`,
    ],
    openGraphTitle: `Industries We Serve in ${countryObj.name} | Servchip`,
    twitterTitle: `Industries We Serve in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/industries`,
        [market.locale]: `${SITE.url}/${country}/industries`,
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
          { name: "Industries", url: `/${country}/industries` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          INDUSTRIES.map((i) => ({
            name: i.name,
            url: `/${country}/industries/${i.slug}`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
