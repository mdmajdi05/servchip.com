import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { CATEGORIES } from "@/data/categories";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  productSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import ProductDetailPage from "@/app/products/[slug]/page-client";

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!countryObj || !market || !product) return {};

  return (
    createEntityMetadata("product", country, {
      slug: product.slug,
      product: product.name,
      productDescription: product.description,
      manufacturer: product.manufacturer,
      series: product.series,
      categoryName: product.categoryName,
    }) ?? {}
  );
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
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Products", url: "/products" },
            { name: product.name, url: `/products/${slug}` },
          ]),
        )}
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
