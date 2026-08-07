import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BRANDS, getBrandBySlug } from "@/data/brands";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  stripServchip,
  breadcrumbSchema,
} from "@/lib/seo";
import BrandPage from "@/app/brands/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    BRANDS.map((brand) => ({ country, slug: brand.slug })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const brand = getBrandBySlug(slug);
  if (!countryObj || !market || !brand) return {};

  return (
    createEntityMetadata("brand", country, {
      slug: brand.slug,
      brand: brand.name,
      brandMetaTitle: stripServchip(brand.seo.metaTitle),
      brandMetaDescription: brand.seo.metaDescription,
    }) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const brand = getBrandBySlug(slug);
  if (!countryObj || !brand) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Brands", url: "/brands" },
            { name: brand.name, url: `/brands/${brand.slug}` },
          ]),
        )}
      />
      <BrandPage />
    </>
  );
}
