import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolutionBySlug } from "@/data/solutions";
import { createSeoMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  if (!solution) return {};
  return createSeoMetadata({
    title: solution.seo.metaTitle,
    description: solution.seo.metaDescription,
    path: `/solutions/${slug}`,
    keywords: solution.seo.keywords,
    openGraphTitle: `${solution.name} | Servchip`,
    twitterTitle: `${solution.name} | Servchip`,
    openGraphDescription: solution.seo.metaDescription,
    twitterDescription: solution.seo.metaDescription,
  });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const solution = getSolutionBySlug(slug);
  if (!solution) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Solutions", url: "/solutions" },
          { name: solution.name, url: `/solutions/${slug}` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(solution.faqs)}
      />
      <PageClient />
    </>
  );
}
