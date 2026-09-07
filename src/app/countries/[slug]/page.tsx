import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  COUNTRIES,
  getCountryBySlug,
  getCountryByCode,
} from "@/data/countries";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getCountrySeo } from "@/lib/seo/content";
import { SITE } from "@/lib/constants";
import PageClient from "./page-client";

export async function generateStaticParams() {
  const bySlug = COUNTRIES.map((c) => ({ slug: c.slug }));
  const byCode = COUNTRIES.map((c) => ({ slug: c.code }));
  return [...bySlug, ...byCode];
}

function resolveCountry(slug: string) {
  return getCountryBySlug(slug) ?? getCountryByCode(slug);
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const country = resolveCountry(slug);
  const seo = country ? getCountrySeo(country.id) : undefined;
  if (!country || !seo) return {};
  const hreflangMap: Record<string, string> = {
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
        countryMetaTitle: seo.metaTitle,
        countryMetaDescription: seo.metaDescription,
        countryMetaKeywords: seo.keywords ?? [],
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
  const country = resolveCountry(slug);
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
