import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolutionBySlug } from "@/data/solutions";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema, faqSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/solutions/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    SOLUTIONS.map((s) => ({ country, slug: s.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const solution = getSolutionBySlug(slug);
  if (!countryObj || !market || !solution) return {};

  return createSeoMetadata({
    title: `${solution.name} in ${countryObj.name} | Servchip`,
    description: `${solution.seo.metaDescription} Available in ${countryObj.name} with ${market.currency} pricing, shipped from ${market.warehouse}.`,
    path: `/${country}/solutions/${slug}`,
    keywords: [...solution.seo.keywords, `${solution.name} ${countryObj.name}`],
    openGraphTitle: `${solution.name} in ${countryObj.name} | Servchip`,
    twitterTitle: `${solution.name} in ${countryObj.name} | Servchip`,
    openGraphDescription: `${solution.seo.metaDescription} Available in ${countryObj.name}.`,
    twitterDescription: `${solution.seo.metaDescription}`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/solutions/${slug}`,
        [market.locale]: `${SITE.url}/${country}/solutions/${slug}`,
      },
    },
  });
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const solution = getSolutionBySlug(slug);
  if (!countryObj || !solution) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: `/${country}` },
          { name: countryObj.name, url: `/${country}` },
          { name: "Solutions", url: `/${country}/solutions` },
          { name: solution.name, url: `/${country}/solutions/${slug}` },
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
