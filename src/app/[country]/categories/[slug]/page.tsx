import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
  stripServchip,
} from "@/lib/seo";
import CategoryDetailPage from "@/app/categories/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
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
  if (!countryObj || !market || !category) return {};

  return (
    createEntityMetadata("category", country, {
      slug: category.slug,
      category: category.name,
      categoryLower: category.name.toLowerCase(),
      categoryDescription: category.description,
      categoryMetaTitle: stripServchip(category.seo.metaTitle),
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!countryObj || !category) notFound();

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
      <CategoryDetailPage />
    </>
  );
}
