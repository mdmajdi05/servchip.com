import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import CategoryDetailPage from "@/app/categories/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    CATEGORIES.map((cat) => ({ country, slug: cat.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!countryObj || !market || !category) return {};

  return createSeoMetadata({
    title: `Buy ${category.name} in ${countryObj.name} | Servchip`,
    description: `Buy ${category.name} products in ${countryObj.name}. Priced in ${market.currency}, shipped from ${market.warehouse}. Authentic, warrantied enterprise hardware.`,
    path: `/${country}/categories/${category.slug}`,
    keywords: [
      `buy ${category.name} ${countryObj.name}`,
      `${category.name} supplier ${countryObj.name}`,
      `data center hardware ${countryObj.name}`,
      `enterprise ${category.name} ${countryObj.name}`,
    ],
    openGraphTitle: `${category.name} in ${countryObj.name} | Servchip`,
    twitterTitle: `${category.name} in ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/categories/${category.slug}`,
        [market.locale]: `${SITE.url}/${country}/categories/${category.slug}`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!countryObj || !category) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Categories", url: `/${country}/categories` },
          {
            name: category.name,
            url: `/${country}/categories/${category.slug}`,
          },
        ])}
      />
      <CategoryDetailPage />
    </>
  );
}
