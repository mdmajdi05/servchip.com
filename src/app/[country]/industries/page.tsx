import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES } from "@/data/industries";
import { getCountryByCode } from "@/data/countries";
import {
  createMetadata,
  createBreadcrumb,
  countryParams,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/seo";
import PageClient from "@/app/industries/page-client";

export async function generateStaticParams() {
  return countryParams();
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  return createMetadata("industries", country) ?? {};
}

export default async function Page(props: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await props.params;
  const countryObj = getCountryByCode(country);
  if (!countryObj) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createBreadcrumb("industries", country),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          INDUSTRIES.map((i) => ({
            name: i.name,
            url: `/${country}/industries/${i.slug}`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
