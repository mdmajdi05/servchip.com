import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolutionBySlug } from "@/data/solutions";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getSolutionSeo } from "@/lib/seo/content";
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
  const seo = solution ? getSolutionSeo(solution.slug) : undefined;
  if (!countryObj || !market || !solution || !seo) return {};

  return (
    createEntityMetadata("solution", country, {
      slug: solution.slug,
      solution: solution.name,
      solutionMetaTitle: seo.metaTitle,
      solutionMetaDescription: seo.metaDescription,
      solutionKeywords: seo.keywords ?? [],
    }) ?? {}
  );
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
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Solutions", url: "/solutions" },
            { name: solution.name, url: `/solutions/${slug}` },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(solution.faqs)}
      />
      <PageClient />
    </>
  );
}
