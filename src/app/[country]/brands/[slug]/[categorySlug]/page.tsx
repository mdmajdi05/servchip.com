import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/data/brands";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
} from "@/lib/seo";
import BrandCategoryPage from "@/app/brands/[slug]/[categorySlug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    BRANDS.flatMap((brand) =>
      brand.categories.map((cat) => ({
        country,
        slug: brand.slug,
        categorySlug: cat.slug,
      })),
    ),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string; categorySlug: string }>;
}): Promise<Metadata> {
  const { country, slug, categorySlug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const brand = getBrandBySlug(slug);
  const category = brand?.categories.find((c) => c.slug === categorySlug);
  if (!countryObj || !market || !brand || !category) return {};

  return (
    createEntityMetadata("brandCategory", country, {
      brandSlug: brand.slug,
      categorySlug: category.slug,
      brand: brand.name,
      category: category.name,
      categoryDescription: category.description,
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string; categorySlug: string }>;
}) {
  const { country, slug, categorySlug } = await props.params;
  const countryObj = getCountryByCode(country);
  const brand = getBrandBySlug(slug);
  const category = brand?.categories.find((c) => c.slug === categorySlug);
  if (!countryObj || !brand || !category) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Brands", url: "/brands" },
            { name: brand.name, url: `/brands/${brand.slug}` },
            {
              name: category.name,
              url: `/brands/${brand.slug}/${category.slug}`,
            },
          ]),
        )}
      />
      <BrandCategoryPage />
    </>
  );
}
