import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import {
  createMetadata,
  createBreadcrumb,
  countryParams,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "@/app/return-policy/page-client";

export async function generateStaticParams() {
  return countryParams();
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  return createMetadata("return-policy", country) ?? {};
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
          createBreadcrumb("return-policy", country),
        )}
      />
      <PageClient />
    </>
  );
}
