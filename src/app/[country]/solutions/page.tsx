import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/solutions/page-client";

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
    title: `Enterprise AI & HPC Solutions in ${countryObj.name} | Servchip`,
    description: `Multi-vendor enterprise solutions for AI training, HPC, data center acceleration, edge computing & professional visualization in ${countryObj.name}. NVIDIA, AMD, Intel hardware with ${market.currency} pricing and ${market.warehouse} shipping.`,
    path: `/${country}/solutions`,
    keywords: [
      `enterprise AI solutions ${countryObj.name}`,
      `HPC solutions ${countryObj.name}`,
      `data center infrastructure ${countryObj.name}`,
      `AI training solutions ${countryObj.name}`,
    ],
    openGraphTitle: `Enterprise AI & HPC Solutions ${countryObj.name} | Servchip`,
    twitterTitle: `Enterprise AI & HPC Solutions ${countryObj.name} | Servchip`,
    openGraphDescription: `Multi-vendor enterprise solutions for AI training, HPC and data center workloads in ${countryObj.name}.`,
    twitterDescription: `Multi-vendor enterprise solutions for AI training, HPC and data center workloads in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/solutions`,
        [market.locale]: `${SITE.url}/${country}/solutions`,
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
          { name: "Solutions", url: `/${country}/solutions` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceSchema(
          [
            "AI Training Solutions",
            "HPC Infrastructure",
            "Data Center Acceleration",
          ].map((name) => ({
            name,
            description: `Servchip ${name.toLowerCase()} for enterprises in ${countryObj.name}.`,
            url: `/${country}/solutions`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
