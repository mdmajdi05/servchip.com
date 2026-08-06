import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, productSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "./page-client";

export async function generateMetadata(props: {
  params: Promise<{ countrySlug: string; slug: string }>;
}): Promise<Metadata> {
  const { countrySlug, slug } = await props.params;
  const country = getCountryByCode(countrySlug);
  const market = COUNTRY_MARKETS[countrySlug];
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!country || !market || !product) return {};

  return createSeoMetadata({
    title: `Buy ${product.name} in ${country.name}`,
    description: `${product.name} (${product.series}) available in ${country.name}. Priced in ${market.currency}, shipped from ${market.warehouse}. Authentic, warrantied — request a quote today.`,
    path: `/${countrySlug}/products/${slug}`,
    keywords: [
      `buy ${product.name} ${country.name}`,
      `${product.manufacturer} ${product.series} ${country.name}`,
      `${product.categoryName} supplier ${country.name}`,
      `data center hardware ${country.name}`,
    ],
    openGraphTitle: `${product.name} — Buy in ${country.name} | Servchip`,
    twitterTitle: `${product.name} — Buy in ${country.name} | Servchip`,
    openGraphDescription: `${product.name} available in ${country.name} with delivery across the region. Request a quote.`,
    twitterDescription: `${product.name} available in ${country.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/products/${slug}`,
        [market.locale]: `${SITE.url}/${countrySlug}/products/${slug}`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ countrySlug: string; slug: string }>;
}) {
  const { countrySlug, slug } = await props.params;
  const country = getCountryByCode(countrySlug);
  const market = COUNTRY_MARKETS[countrySlug];
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!country || !market || !product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: country.name, url: `/${countrySlug}` },
          { name: "Products", url: `/${countrySlug}/products` },
          { name: product.name, url: `/${countrySlug}/products/${slug}` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={productSchema({
          name: product.name,
          description: product.description,
          id: product.id,
          manufacturer: product.manufacturer,
          categoryName: product.categoryName,
          slug: product.slug,
          images: product.images,
          status: product.status,
        })}
      />
      <PageClient country={country} market={market} product={product} />
    </>
  );
}
