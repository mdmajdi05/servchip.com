import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import {
  createMetadata,
  createBreadcrumb,
  countryParams,
  serviceSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "@/app/solutions/page-client";

export async function generateStaticParams() {
  return countryParams();
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  return createMetadata("solutions", country) ?? {};
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
          createBreadcrumb("solutions", country),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceSchema(
          [
            "AI Training Solutions",
            "HPC Infrastructure",
            "Data Center Acceleration",
          ].map((name) => ({
            name,
            description: `Servchip ${name.toLowerCase()} for enterprises in ${countryObj.name}.`,
            url: `/${country}/solutions`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
