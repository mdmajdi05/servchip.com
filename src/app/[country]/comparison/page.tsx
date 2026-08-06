import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/comparison/page-client";

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
    title: `AI Chip Comparison in ${countryObj.name} — H100 vs MI300X vs Gaudi 3`,
    description: `Compare enterprise AI accelerators for buyers in ${countryObj.name} — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3. Memory, bandwidth, TFLOPS, TDP & architecture specs for ${market.currency} data center procurement decisions.`,
    path: `/${country}/comparison`,
    keywords: [
      `NVIDIA H100 vs AMD MI300X ${countryObj.name}`,
      `AI chip comparison ${countryObj.name}`,
      `enterprise GPU specs ${countryObj.name}`,
      `data center accelerator comparison ${countryObj.name}`,
    ],
    openGraphTitle: `AI Chip Comparison ${countryObj.name} | H100 vs MI300X vs Gaudi 3`,
    twitterTitle: `AI Chip Comparison ${countryObj.name} | H100 vs MI300X vs Gaudi 3`,
    openGraphDescription: `Side-by-side enterprise chip comparison for buyers in ${countryObj.name}.`,
    twitterDescription: `Side-by-side enterprise chip comparison for buyers in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/comparison`,
        [market.locale]: `${SITE.url}/${country}/comparison`,
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
          { name: "Comparison", url: `/${country}/comparison` },
        ])}
      />
      <PageClient />
    </>
  );
}
