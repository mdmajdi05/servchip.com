import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getIndustrySeo } from "@/lib/seo/content";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getIndustryBySlug(slug);
  const seo = industry ? getIndustrySeo(industry.slug) : undefined;
  if (!industry || !seo) return {};
  return (
    createEntityMetadata("industry", undefined, {
      slug: industry.slug,
      industry: industry.name,
      industryMetaTitle: seo.metaTitle,
      industryMetaDescription: seo.metaDescription,
      industryKeywords: seo.keywords ?? [],
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
            { name: "Industries", url: "/solutions" },
            { name: industry.name, url: `/industries/${slug}` },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(industry.faqs)}
      />
      <PageClient />
    </>
  );
}
