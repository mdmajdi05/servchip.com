import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import { createSeoMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return COUNTRIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const country = getCountryBySlug(slug);
  if (!country) return {};
  return createSeoMetadata({
    title: country.seo.metaTitle,
    description: country.seo.metaDescription,
    path: `/countries/${slug}`,
    keywords: country.seo.keywords,
    openGraphTitle: `${country.name} | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `${country.name} | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: country.seo.metaDescription,
    twitterDescription: country.seo.metaDescription,
  });
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const country = getCountryBySlug(slug);
  if (!country) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Countries", url: "/countries" },
          { name: country.name, url: `/countries/${slug}` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(country.faqs)}
      />
      <PageClient />
    </>
  );
}
