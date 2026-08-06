import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import TechnologyPage from "@/app/technology/page";

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
    title: `AI Chip Technology in ${countryObj.name} — Blackwell, Hopper & CDNA 3`,
    description: `Explore GPU architecture generations — NVIDIA Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids in ${countryObj.name}. NVLink 5.0, MIG, HBM3e memory & enterprise AI chip technology from Servchip with ${market.currency} pricing.`,
    path: `/${country}/technology`,
    keywords: [
      `NVIDIA Blackwell architecture ${countryObj.name}`,
      `AI chip technology ${countryObj.name}`,
      `GPU architecture comparison ${countryObj.name}`,
      `enterprise AI hardware ${countryObj.name}`,
    ],
    openGraphTitle: `AI Chip Technology in ${countryObj.name} | Servchip`,
    twitterTitle: `AI Chip Technology in ${countryObj.name} | Servchip`,
    openGraphDescription: `Deep dive into Blackwell, Hopper, AMD CDNA 3 and Intel architectures in ${countryObj.name}.`,
    twitterDescription: `Deep dive into Blackwell, Hopper, AMD CDNA 3 and Intel architectures in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/technology`,
        [market.locale]: `${SITE.url}/${country}/technology`,
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

  return <TechnologyPage prefix={`/${country}`} />;
}
