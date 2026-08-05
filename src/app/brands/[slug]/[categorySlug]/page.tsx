import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS } from "@/data/brands";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
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
  return createSeoMetadata({
    title: `${brand.name} ${category.name} | Buy Enterprise Chips & AI Accelerators`,
    description: `Buy ${brand.name} ${category.name}. ${category.description} Enterprise chip distributor with semiconductor procurement expertise.`,
    path: `/brands/${slug}/${categorySlug}`,
    keywords: [
      `buy ${brand.name} ${category.name}`,
      `${brand.name} ${category.name} supplier`,
      "enterprise chip distributor",
      "semiconductor procurement",
      "AI accelerator supplier",
    ],
    openGraphTitle: `${brand.name} ${category.name} | Servchip`,
    twitterTitle: `${brand.name} ${category.name} | Servchip`,
    openGraphDescription: `Buy ${brand.name} ${category.name} from an ISO 9001 certified distributor.`,
    twitterDescription: `Buy ${brand.name} ${category.name} from an ISO 9001 certified distributor.`,
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/products" },
          { name: brand.name, url: `/brands/${slug}` },
          {
            name: category.name,
            url: `/brands/${slug}/${categorySlug}`,
          },
        ])}
      />
      <PageClient />
    </>
  );
}
