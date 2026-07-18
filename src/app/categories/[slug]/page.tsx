import type { Metadata } from "next";
import { CATEGORIES } from "@/data/categories";
import { SITE } from "@/lib/constants";
import { breadcrumbSchema, OG_IMAGE, OG_WIDTH, OG_HEIGHT } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
  if (!cat) return {};
  const catName = cat.name;
  return {
    title: `${cat.name} — Buy Enterprise ${cat.name} | Servchip Semiconductor Procurement`,
    description: `${cat.description} Buy authentic ${cat.name} from an ISO 9001 certified enterprise chip distributor. AI accelerator & semiconductor procurement with global shipping.`,
    keywords: [
      `buy ${cat.name.toLowerCase()}`,
      `${cat.name.toLowerCase()} supplier`,
      "enterprise chip distributor",
      "semiconductor procurement",
      "AI accelerator distributor",
    ],
    alternates: { canonical: `${SITE.url}/categories/${slug}` },
    openGraph: {
      title: `${cat.name} | Servchip — Enterprise Chip Distributor`,
      description: `Buy ${cat.name} from an ISO 9001 certified distributor.`,
      images: [
        {
          url: OG_IMAGE,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: `${cat.name} — Servchip`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} | Servchip — Enterprise Chip Distributor`,
      description: `Buy ${cat.name} from an ISO 9001 certified distributor.`,
      images: [OG_IMAGE],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const cat = CATEGORIES.find((c) => c.slug === slug);
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
      <PageClient />
    </>
  );
}
