import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/resources/page-client";

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
    title: `Resources — Enterprise AI Hardware Guides in ${countryObj.name} | Servchip`,
    description: `Technical guides, blog articles, case studies & whitepapers on AI computing, GPU architectures, HPC deployments and semiconductor procurement for buyers in ${countryObj.name}.`,
    path: `/${country}/resources`,
    keywords: [
      `AI hardware guides ${countryObj.name}`,
      `enterprise chip resources ${countryObj.name}`,
      `semiconductor procurement ${countryObj.name}`,
      `GPU architecture guides ${countryObj.name}`,
    ],
    openGraphTitle: `Resources & Guides in ${countryObj.name} | Servchip`,
    twitterTitle: `Resources & Guides in ${countryObj.name} | Servchip`,
    openGraphDescription: `Technical guides, case studies & whitepapers on AI computing for buyers in ${countryObj.name}.`,
    twitterDescription: `Technical guides, case studies & whitepapers on AI computing for buyers in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/resources`,
        [market.locale]: `${SITE.url}/${country}/resources`,
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
          { name: "Resources", url: `/${country}/resources` },
        ])}
      />
      <PageClient />
    </>
  );
}
