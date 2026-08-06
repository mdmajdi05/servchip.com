import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import CategoriesPage from "@/app/categories/page-client";

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
    title: `Product Categories in ${countryObj.name} | Data Center GPUs & AI Accelerators`,
    description: `Browse enterprise chip categories in ${countryObj.name} — NVIDIA data center GPUs, AMD Instinct, Intel Xeon, AI servers, networking, memory & storage. Priced in ${market.currency}.`,
    path: `/${country}/categories`,
    keywords: [
      `enterprise chip categories ${countryObj.name}`,
      `data center GPUs ${countryObj.name}`,
      `AI accelerators ${countryObj.name}`,
      `server CPUs ${countryObj.name}`,
      `NVIDIA GPU categories ${countryObj.name}`,
    ],
    openGraphTitle: `Product Categories in ${countryObj.name} | Servchip`,
    twitterTitle: `Product Categories in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/categories`,
        [market.locale]: `${SITE.url}/${country}/categories`,
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
          { name: "Categories", url: `/${country}/categories` },
        ])}
      />
      <CategoriesPage />
    </>
  );
}
