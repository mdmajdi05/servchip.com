import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { CATEGORIES } from "@/data/categories";
import { createSeoMetadata, productSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import ProductDetailPage from "@/app/products/[slug]/page-client";

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!countryObj || !market || !product) return {};

  return createSeoMetadata({
    title: `Buy ${product.name} in ${countryObj.name}`,
    description: `${product.name} (${product.series}) available in ${countryObj.name}. Priced in ${market.currency}, shipped from ${market.warehouse}. Authentic, warrantied — request a quote today.`,
    path: `/${country}/products/${slug}`,
    keywords: [
      `buy ${product.name} ${countryObj.name}`,
      `${product.manufacturer} ${product.series} ${countryObj.name}`,
      `${product.categoryName} supplier ${countryObj.name}`,
      `data center hardware ${countryObj.name}`,
    ],
    openGraphTitle: `${product.name} — Buy in ${countryObj.name} | Servchip`,
    twitterTitle: `${product.name} — Buy in ${countryObj.name} | Servchip`,
    openGraphDescription: `${product.name} available in ${countryObj.name} with delivery across the region. Request a quote.`,
    twitterDescription: `${product.name} available in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/products/${slug}`,
        [market.locale]: `${SITE.url}/${country}/products/${slug}`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!countryObj || !product) notFound();

  const parentCategory =
    "parentCategoryId" in product
      ? CATEGORIES.find((c) => c.id === product.parentCategoryId)
      : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Products", url: `/${country}/products` },
          { name: product.name, url: `/${country}/products/${slug}` },
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
      <ProductDetailPage
        product={product}
        parentCategory={parentCategory ?? null}
      />
    </>
  );
}
