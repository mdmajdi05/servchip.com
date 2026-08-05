import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { createSeoMetadata, productSchema, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

function getProductName(product: {
  name: string;
  specifications?: object;
  formFactor?: string;
}): string {
  if ("specifications" in (product || {}))
    return `${product.name} — Specifications, Pricing & Availability`;
  if (product.formFactor) return `${product.name} — AI Server Specs & Pricing`;
  return `${product.name} — Product Details & Pricing`;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};

  const productImage = product.images?.[0]
    ? { url: product.images[0], alt: product.name, width: 800, height: 600 }
    : undefined;

  return createSeoMetadata({
    title: getProductName(product),
    description: product.description,
    path: `/products/${slug}`,
    keywords: [
      `buy ${product.name}`,
      `${product.manufacturer} ${product.series}`,
      `${product.categoryName} supplier`,
      "enterprise chip distributor",
      "semiconductor procurement",
      "data center hardware",
    ],
    ...(productImage ? { image: productImage } : {}),
    openGraphTitle: `${product.name} — Servchip`,
    openGraphDescription: product.description,
    twitterTitle: `${product.name} — Servchip`,
    twitterDescription: product.description,
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
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
      <PageClient product={product} parentCategory={parentCategory ?? null} />
    </>
  );
}
