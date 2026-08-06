import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import ProductsPage from "@/app/products/page-client";

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
    title: `Buy Enterprise AI Chips in ${countryObj.name} | NVIDIA, AMD, Intel`,
    description: `Buy authentic NVIDIA H100, AMD MI300X, Intel Xeon & AI accelerators in ${countryObj.name}. Priced in ${market.currency}, shipped from ${market.warehouse}. ISO 9001 certified distributor.`,
    path: `/${country}/products`,
    keywords: [
      `buy AI chips ${countryObj.name}`,
      `NVIDIA GPU distributor ${countryObj.name}`,
      `data center GPU supplier ${countryObj.name}`,
      `GPU server supplier ${countryObj.name}`,
      `semiconductor distributor ${countryObj.name}`,
    ],
    openGraphTitle: `Buy Enterprise AI Chips in ${countryObj.name} | Servchip`,
    twitterTitle: `Buy Enterprise AI Chips in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/products`,
        [market.locale]: `${SITE.url}/${country}/products`,
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
          { name: "Products", url: `/${country}/products` },
        ])}
      />
      <ProductsPage />
    </>
  );
}
