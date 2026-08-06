import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/data/brands";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import BrandCategoryPage from "@/app/brands/[slug]/[categorySlug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    BRANDS.flatMap((brand) =>
      brand.categories.map((cat) => ({
        country,
        slug: brand.slug,
        categorySlug: cat.slug,
      })),
    ),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { country, slug, categorySlug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const brand = getBrandBySlug(slug);
  const category = brand?.categories.find((c) => c.slug === categorySlug);
  if (!countryObj || !market || !brand || !category) return {};

  return createSeoMetadata({
    title: `Buy ${brand.name} ${category.name} in ${countryObj.name} | Servchip`,
    description: `Buy authentic ${brand.name} ${category.name} in ${countryObj.name}. Priced in ${market.currency}, shipped from ${market.warehouse}. ISO 9001 certified distributor.`,
    path: `/${country}/brands/${brand.slug}/${category.slug}`,
    keywords: [
      `${brand.name} ${category.name} ${countryObj.name}`,
      `buy ${brand.name} products ${countryObj.name}`,
      `${brand.name} distributor ${countryObj.name}`,
    ],
    openGraphTitle: `${brand.name} ${category.name} in ${countryObj.name} | Servchip`,
    twitterTitle: `${brand.name} ${category.name} in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/brands/${brand.slug}/${category.slug}`,
        [market.locale]: `${SITE.url}/${country}/brands/${brand.slug}/${category.slug}`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string; categorySlug: string }>;
}) {
  const { country, slug, categorySlug } = await props.params;
  const countryObj = getCountryByCode(country);
  const brand = getBrandBySlug(slug);
  const category = brand?.categories.find((c) => c.slug === categorySlug);
  if (!countryObj || !brand || !category) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Brands", url: `/${country}/brands` },
          { name: brand.name, url: `/${country}/brands/${brand.slug}` },
          {
            name: category.name,
            url: `/${country}/brands/${brand.slug}/${category.slug}`,
          },
        ])}
      />
      <BrandCategoryPage />
    </>
  );
}
