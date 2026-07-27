import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MANUFACTURERS, getManufacturerBySlug } from "@/data/manufacturers";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return MANUFACTURERS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const manufacturer = getManufacturerBySlug(slug);
  if (!manufacturer) return {};
  return {
    title: `${manufacturer.seo.metaTitle} | Enterprise Chip Distributor`,
    description: `${manufacturer.seo.metaDescription} Buy authentic ${manufacturer.name} chips from an ISO 9001 certified distributor. Semiconductor procurement with global shipping.`,
    keywords: [
      `buy ${manufacturer.name} chips`,
      `${manufacturer.name} distributor`,
      `${manufacturer.name} enterprise`,
      "enterprise chip distributor",
      "semiconductor procurement",
    ],
    alternates: { canonical: `${SITE.url}/manufacturers/${slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${manufacturer.name} Products | Servchip — Enterprise Chip Distributor`,
      description: manufacturer.seo.metaDescription,
      images: [
        {
          url: OG_IMAGE,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: `${manufacturer.name} Enterprise Chips — Servchip`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${manufacturer.name} Products | Servchip — Enterprise Chip Distributor`,
      description: manufacturer.seo.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const manufacturer = getManufacturerBySlug(slug);
  if (!manufacturer) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Manufacturers", url: "/products" },
          { name: manufacturer.name, url: `/manufacturers/${slug}` },
        ])}
      />
      <PageClient />
    </>
  );
}
