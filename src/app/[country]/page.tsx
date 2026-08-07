import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeSections } from "@/components/home/HomeSections";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createMetadata,
  createBreadcrumb,
  countryParams,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export async function generateStaticParams() {
  return countryParams();
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  return createMetadata("home", country) ?? {};
}

export default async function Page(props: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  if (!countryObj) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createBreadcrumb("home", country),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(countryObj.faqs)}
      />
      <HomeSections country={countryObj} market={market} />
    </>
  );
}
