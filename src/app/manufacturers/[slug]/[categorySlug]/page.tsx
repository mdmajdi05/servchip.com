import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MANUFACTURERS } from "@/data/manufacturers";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  const params: { slug: string; categorySlug: string }[] = [];
  for (const m of MANUFACTURERS) {
    for (const c of m.categories) {
      params.push({ slug: m.slug, categorySlug: c.slug });
    }
  }
  return params;
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { slug, categorySlug } = await props.params;
  const manufacturer = MANUFACTURERS.find((m) => m.slug === slug);
  if (!manufacturer) return {};
  const category = manufacturer.categories.find((c) => c.slug === categorySlug);
  if (!category) return {};
  return {
    title: `${manufacturer.name} ${category.name} | Buy Enterprise Chips & AI Accelerators`,
    description: `Buy ${manufacturer.name} ${category.name}. ${category.description} Enterprise chip distributor with semiconductor procurement expertise.`,
    keywords: [
      `buy ${manufacturer.name} ${category.name}`,
      `${manufacturer.name} ${category.name} supplier`,
      "enterprise chip distributor",
      "semiconductor procurement",
      "AI accelerator supplier",
    ],
    alternates: {
      canonical: `${SITE.url}/manufacturers/${slug}/${categorySlug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${manufacturer.name} ${category.name} | Servchip`,
      description: `Buy ${manufacturer.name} ${category.name} from an ISO 9001 certified distributor.`,
      images: [
        {
          url: OG_IMAGE,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: `${manufacturer.name} ${category.name} — Servchip`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${manufacturer.name} ${category.name} | Servchip`,
      description: `Buy ${manufacturer.name} ${category.name} from an ISO 9001 certified distributor.`,
      images: [OG_IMAGE],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string; categorySlug: string }>;
}) {
  const { slug, categorySlug } = await props.params;
  const manufacturer = MANUFACTURERS.find((m) => m.slug === slug);
  if (!manufacturer) notFound();
  const category = manufacturer.categories.find((c) => c.slug === categorySlug);
  if (!category) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Manufacturers", url: "/products" },
          { name: manufacturer.name, url: `/manufacturers/${slug}` },
          {
            name: category.name,
            url: `/manufacturers/${slug}/${categorySlug}`,
          },
        ])}
      />
      <PageClient />
    </>
  );
}
