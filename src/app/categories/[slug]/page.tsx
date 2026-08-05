import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { ALL_PRODUCTS } from "@/data/products";
import { createSeoMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  return createSeoMetadata({
    title: `${cat.name} — Buy Enterprise ${cat.name} | Servchip Semiconductor Procurement`,
    description: `${cat.description} Buy authentic ${cat.name} from an ISO 9001 certified enterprise chip distributor. AI accelerator & semiconductor procurement with global shipping.`,
    path: `/categories/${slug}`,
    keywords: [
      `buy ${cat.name.toLowerCase()}`,
      `${cat.name.toLowerCase()} supplier`,
      "enterprise chip distributor",
      "semiconductor procurement",
      "AI accelerator distributor",
    ],
    openGraphTitle: `${cat.name} | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: `Buy ${cat.name} from an ISO 9001 certified distributor.`,
    twitterTitle: `${cat.name} | Servchip — Enterprise Chip Distributor`,
    twitterDescription: `Buy ${cat.name} from an ISO 9001 certified distributor.`,
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Categories", url: "/categories" },
          ...(cat ? [{ name: cat.name, url: `/categories/${slug}` }] : []),
        ])}
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
