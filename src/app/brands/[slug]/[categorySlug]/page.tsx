import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS } from "@/data/brands";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  const params: { slug: string; categorySlug: string }[] = [];
  for (const b of BRANDS) {
    for (const c of b.categories) {
      params.push({ slug: b.slug, categorySlug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { slug, categorySlug } = await props.params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) return {};
  const category = brand.categories.find((c) => c.slug === categorySlug);
  if (!category) return {};
  return (
    createEntityMetadata("brandCategory", undefined, {
      brandSlug: brand.slug,
      categorySlug: category.slug,
      brand: brand.name,
      category: category.name,
      categoryDescription: category.description,
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string; categorySlug: string }>;
}) {
  const { slug, categorySlug } = await props.params;
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!brand) notFound();
  const category = brand.categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
            { name: "Brands", url: "/products" },
            { name: brand.name, url: `/brands/${slug}` },
            {
              name: category.name,
              url: `/brands/${slug}/${categorySlug}`,
            },
          ]),
        )}
      />
      <PageClient />
    </>
  );
}
