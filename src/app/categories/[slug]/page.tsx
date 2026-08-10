import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { ALL_PRODUCTS } from "@/data/products";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/seo";
import { getCategorySeo } from "@/lib/seo/content";
import PageClient from "./page-client";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const seo = cat ? getCategorySeo(cat.id) : undefined;
  if (!cat || !seo) return {};
  return (
    createEntityMetadata("category", undefined, {
      slug: cat.slug,
      category: cat.name,
      categoryLower: cat.name.toLowerCase(),
      categoryDescription: cat.description,
      categoryMetaTitle: seo.metaTitle,
      categoryMetaDescription: seo.metaDescription,
      categoryKeywords: seo.keywords ?? [],
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === slug);

  const categoryProducts = cat
    ? ALL_PRODUCTS.filter(
        (p) => "parentCategoryId" in p && p.parentCategoryId === cat.id,
      )
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
            { name: "Categories", url: "/categories" },
            ...(cat ? [{ name: cat.name, url: `/categories/${slug}` }] : []),
          ]),
        )}
      />
      {categoryProducts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemListSchema(
            categoryProducts.map((p) => ({
              name: p.name,
              url: `/products/${p.slug}`,
              description: p.description,
              ...(p.images?.[0] ? { image: p.images[0] } : {}),
            })),
          )}
        />
      )}
      <PageClient />
    </>
  );
}
