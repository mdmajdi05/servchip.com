import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/data/brands";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return BRANDS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const brand = getBrandBySlug(slug);
  if (!brand) return {};
  return createSeoMetadata({
    title: `${brand.seo.metaTitle} | Enterprise Chip Distributor`,
    description: `${brand.seo.metaDescription} Buy authentic ${brand.name} chips from an ISO 9001 certified distributor. Semiconductor procurement with global shipping.`,
    path: `/brands/${slug}`,
    keywords: [
      `buy ${brand.name} chips`,
      `${brand.name} distributor`,
      `${brand.name} enterprise`,
      "enterprise chip distributor",
      "semiconductor procurement",
    ],
    openGraphTitle: `${brand.name} Products | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `${brand.name} Products | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: brand.seo.metaDescription,
    twitterDescription: brand.seo.metaDescription,
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Brands", url: "/products" },
          { name: brand.name, url: `/brands/${slug}` },
        ])}
      />
      <PageClient />
    </>
  );
}
