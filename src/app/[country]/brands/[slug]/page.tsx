import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/data/brands";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import BrandPage from "@/app/brands/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    BRANDS.map((brand) => ({ country, slug: brand.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const brand = getBrandBySlug(slug);
  if (!countryObj || !market || !brand) return {};

  return createSeoMetadata({
    title: `Buy ${brand.name} Products in ${countryObj.name} | Servchip`,
    description: `Buy authentic ${brand.name} enterprise hardware in ${countryObj.name}. Priced in ${market.currency}, shipped from ${market.warehouse}. ISO 9001 certified distributor.`,
    path: `/${country}/brands/${brand.slug}`,
    keywords: [
      `buy ${brand.name} chips ${countryObj.name}`,
      `${brand.name} distributor ${countryObj.name}`,
      `${brand.name} products ${countryObj.name}`,
      `enterprise ${brand.name} hardware ${countryObj.name}`,
    ],
    openGraphTitle: `${brand.name} Products in ${countryObj.name} | Servchip`,
    twitterTitle: `${brand.name} Products in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/brands/${brand.slug}`,
        [market.locale]: `${SITE.url}/${country}/brands/${brand.slug}`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const brand = getBrandBySlug(slug);
  if (!countryObj || !brand) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Brands", url: `/${country}/brands` },
          { name: brand.name, url: `/${country}/brands/${brand.slug}` },
        ])}
      />
      <BrandPage />
    </>
  );
}
