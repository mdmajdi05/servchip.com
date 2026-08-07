import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};
  return (
    createEntityMetadata("industry", undefined, {
      slug: industry.slug,
      industry: industry.name,
      industryMetaTitle: industry.seo.metaTitle,
      industryMetaDescription: industry.seo.metaDescription,
      industryKeywords: industry.seo.keywords,
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
