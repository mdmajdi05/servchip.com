import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { SITE } from "@/lib/constants";
import {
  productSchema,
  breadcrumbSchema,
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
} from "@/lib/seo";
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

  return {
    title: getProductName(product),
    description: product.description,
    keywords: [
      `buy ${product.name}`,
      `${product.manufacturer} ${product.series}`,
      `${product.categoryName} supplier`,
      "enterprise chip distributor",
      "semiconductor procurement",
      "data center hardware",
    ],
    alternates: { canonical: `${SITE.url}/products/${slug}` },
    openGraph: {
      title: `${product.name} — Servchip`,
      description: product.description,
      type: "website",
      images: product.images?.[0]
        ? [
            {
              url: product.images[0],
              width: 800,
              height: 600,
              alt: product.name,
            },
          ]
        : [
            {
              url: OG_IMAGE,
              width: OG_WIDTH,
              height: OG_HEIGHT,
              alt: product.name,
            },
          ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} — Servchip`,
      description: product.description,
      images: [product.images?.[0] || OG_IMAGE],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Products", url: "/products" },
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
      <PageClient />
    </>
  );
}
