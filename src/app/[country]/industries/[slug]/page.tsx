import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, getIndustryBySlug } from "@/data/industries";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
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
  if (!countryObj || !market || !industry) return {};

  return createSeoMetadata({
    title: `${industry.name} Solutions in ${countryObj.name} | Servchip`,
    description: `${industry.seo.metaDescription} Available in ${countryObj.name} with ${market.currency} pricing, shipped from ${market.warehouse}.`,
    path: `/${country}/industries/${slug}`,
    keywords: [
      ...industry.seo.keywords,
      `${industry.name} solutions ${countryObj.name}`,
    ],
    openGraphTitle: `${industry.name} Solutions in ${countryObj.name} | Servchip`,
    twitterTitle: `${industry.name} Solutions in ${countryObj.name} | Servchip`,
    openGraphDescription: `${industry.seo.metaDescription} Available in ${countryObj.name}.`,
    twitterDescription: `${industry.seo.metaDescription}`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/industries/${slug}`,
        [market.locale]: `${SITE.url}/${country}/industries/${slug}`,
      },
    },
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: `/${country}` },
          { name: countryObj.name, url: `/${country}` },
          { name: "Industries", url: `/${country}/industries` },
          { name: industry.name, url: `/${country}/industries/${slug}` },
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
