import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COUNTRIES, getCountryPath, getCountryByCode } from "@/data/countries";
import {
  createMetadata,
  createBreadcrumb,
  countryParams,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/seo";
import PageClient from "@/app/countries/page-client";

export async function generateStaticParams() {
  return countryParams();
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  return createMetadata("countries", country) ?? {};
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
          createBreadcrumb("countries", country),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          COUNTRIES.map((c) => ({
            name: c.name,
            url: getCountryPath(c),
          })),
        )}
      />
      <PageClient />
    </>
  );
}
