import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { createSeoMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
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
  return createSeoMetadata({
    title: industry.seo.metaTitle,
    description: industry.seo.metaDescription,
    path: `/industries/${slug}`,
    keywords: industry.seo.keywords,
    openGraphTitle: `${industry.name} Solutions | Servchip`,
    twitterTitle: `${industry.name} Solutions | Servchip`,
    openGraphDescription: industry.seo.metaDescription,
    twitterDescription: industry.seo.metaDescription,
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Industries", url: "/solutions" },
          { name: industry.name, url: `/industries/${slug}` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(industry.faqs)}
      />
      <PageClient />
    </>
  );
}
