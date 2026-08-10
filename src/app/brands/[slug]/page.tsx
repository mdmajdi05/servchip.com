import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/data/brands";
import { getBrandSeo } from "@/lib/seo/content";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return BRANDS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const brand = getBrandBySlug(slug);
  const seo = brand ? getBrandSeo(brand.id) : undefined;
  if (!brand || !seo) return {};
  return (
    createEntityMetadata("brand", undefined, {
      slug: brand.slug,
      brand: brand.name,
      brandMetaTitle: seo.metaTitle,
      brandMetaDescription: seo.metaDescription,
      brandKeywords: seo.keywords ?? [],
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const brand = getBrandBySlug(slug);
  if (!brand) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
            { name: "Brands", url: "/products" },
            { name: brand.name, url: `/brands/${slug}` },
          ]),
        )}
      />
      <PageClient />
    </>
  );
}
