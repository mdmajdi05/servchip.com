import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getIndustrySeo } from "@/lib/seo/content";
import PageClient from "@/app/industries/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    INDUSTRIES.map((i) => ({ country, slug: i.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const industry = getIndustryBySlug(slug);
  const seo = industry ? getIndustrySeo(industry.slug) : undefined;
  if (!countryObj || !market || !industry || !seo) return {};

  return (
    createEntityMetadata("industry", country, {
      slug: industry.slug,
      industry: industry.name,
      industryMetaTitle: seo.metaTitle,
      industryMetaDescription: seo.metaDescription,
      industryKeywords: seo.keywords ?? [],
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const industry = getIndustryBySlug(slug);
  if (!countryObj || !industry) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Industries", url: "/industries" },
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
