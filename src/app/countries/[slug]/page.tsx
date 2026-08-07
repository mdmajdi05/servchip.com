import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountryBySlug } from "@/data/countries";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { SITE } from "@/lib/constants";
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
  const hreflangMap: Record<string, string> = {
    india: "en-IN",
    uae: "en-AE",
    usa: "en-US",
    "saudi-arabia": "en-SA",
    qatar: "en-QA",
    oman: "en-OM",
    singapore: "en-SG",
    malaysia: "en-MY",
    china: "zh-CN",
    philippines: "en-PH",
  };
  const lang = hreflangMap[country.slug] ?? "en";
  return (
    createEntityMetadata(
      "country",
      undefined,
      {
        slug: country.slug,
        name: country.name,
        countryMetaTitle: country.seo.metaTitle,
        countryMetaDescription: country.seo.metaDescription,
        countryMetaKeywords: country.seo.keywords,
      },
      {
        alternates: {
          languages: {
            "x-default": `${SITE.url}/countries/${country.slug}`,
            [lang]: `${SITE.url}/countries/${country.slug}`,
          },
        },
      },
    ) ?? {}
  );
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
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(undefined, [
            { name: "Countries", url: "/countries" },
            { name: country.name, url: `/countries/${slug}` },
          ]),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(country.faqs)}
      />
      <PageClient />
    </>
  );
}
