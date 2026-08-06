import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/developer-hub/page-client";

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
    title: `Developer Hub in ${countryObj.name} — SDK & Integration Guides | Servchip`,
    description: `Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI in ${countryObj.name}. SDK documentation, API reference and code samples for enterprise AI chip development.`,
    path: `/${country}/developer-hub`,
    keywords: [
      `NVIDIA CUDA SDK ${countryObj.name}`,
      `AMD ROCm guide ${countryObj.name}`,
      `Intel oneAPI docs ${countryObj.name}`,
      `AI chip development ${countryObj.name}`,
    ],
    openGraphTitle: `Developer Hub ${countryObj.name} | Servchip`,
    twitterTitle: `Developer Hub ${countryObj.name} | Servchip`,
    openGraphDescription: `SDK docs, API reference & integration guides for enterprise chip platforms in ${countryObj.name}.`,
    twitterDescription: `SDK docs, API reference & integration guides for enterprise chip platforms in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/developer-hub`,
        [market.locale]: `${SITE.url}/${country}/developer-hub`,
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
          { name: "Developer Hub", url: `/${country}/developer-hub` },
        ])}
      />
      <PageClient />
    </>
  );
}
