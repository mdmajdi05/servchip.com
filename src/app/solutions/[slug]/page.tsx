import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SOLUTIONS, getSolutionBySlug } from "@/data/solutions";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
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
  return (
    createEntityMetadata("solution", undefined, {
      slug: solution.slug,
      solution: solution.name,
      solutionMetaTitle: solution.seo.metaTitle,
      solutionMetaDescription: solution.seo.metaDescription,
      solutionKeywords: solution.seo.keywords,
    }) ?? {}
  );
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
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
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
