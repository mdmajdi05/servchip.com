import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { getCountryByCode } from "@/data/countries";
import { SUPPORTED_COUNTRIES } from "@/lib/localized-path";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/seo";
import { getCategorySeo } from "@/lib/seo/content";
import { getCategoryArticle } from "@/data/category-content";
import CategoryDetailPage from "@/app/categories/[slug]/page-client";

export async function generateStaticParams() {
  const countries = SUPPORTED_COUNTRIES;
  return countries.flatMap((country) =>
    CATEGORIES.map((cat) => ({ country, slug: cat.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const category = CATEGORIES.find((c) => c.slug === slug);
  const seo = category ? getCategorySeo(category.id) : undefined;
  if (!countryObj || !market || !category || !seo) return {};

  const metadata =
    createEntityMetadata("category", country, {
      slug: category.slug,
      category: category.name,
      categoryLower: category.name.toLowerCase(),
      categoryDescription: category.description,
      categoryMetaTitle: seo.metaTitle,
      categoryMetaDescription: seo.metaDescription,
      categoryKeywords: seo.keywords ?? [],
    }) ?? {};

  // Per-country meta override (e.g. UAE/Dubai-specific title & description).
  const override = seo.countryMeta?.[country];
  if (override) {
    metadata.title = override.metaTitle;
    metadata.description = override.metaDescription;
  }

  return metadata;
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!countryObj || !category) notFound();

  const article = getCategoryArticle(category.slug, country);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Categories", url: "/categories" },
            {
              name: category.name,
              url: `/categories/${category.slug}`,
            },
          ]),
        )}
      />
      {article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={faqSchema(
            article.faqs.map((f) => ({ question: f.q, answer: f.a })),
          )}
        />
      )}
      <CategoryDetailPage content={article} />
    </>
  );
}
