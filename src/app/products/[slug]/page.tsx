import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  productSchema,
  breadcrumbSchema,
  stripServchip,
} from "@/lib/seo";
import PageClient from "./page-client";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  const productImage = product.images?.[0]
    ? { url: product.images[0], alt: product.name, width: 800, height: 600 }
    : undefined;

  return (
    createEntityMetadata(
      "product",
      undefined,
      {
        slug: product.slug,
        product: product.name,
        productName: stripServchip(product.seo.metaTitle),
        productDescription: product.description,
        manufacturer: product.manufacturer,
        series: product.series,
        categoryName: product.categoryName,
      },
      productImage ? { image: productImage } : {},
    ) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const parentCategory =
    "parentCategoryId" in product
      ? CATEGORIES.find((c) => c.id === product.parentCategoryId)
      : undefined;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
            { name: "Products", url: "/products" },
            ...(parentCategory
              ? [
                  {
                    name: parentCategory.name,
                    url: `/categories/${parentCategory.slug}`,
                  },
                ]
              : []),
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
      <PageClient product={product} parentCategory={parentCategory ?? null} />
    </>
  );
}
