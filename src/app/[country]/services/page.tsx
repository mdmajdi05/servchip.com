import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, serviceSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/services/page-client";

export async function generateStaticParams() {
  return Object.keys(COUNTRY_MARKETS).map((code) => ({ country: code }));
}

export async function generateMetadata(props: {
  params: Promise<{ country: string }>;
}): Promise<Metadata> {
  const { country } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  if (!countryObj || !market) return {};

  return createSeoMetadata({
    title: `Enterprise Chip Services in ${countryObj.name} — Semiconductor Procurement & Integration`,
    description: `End-to-end enterprise chip services in ${countryObj.name} — custom semiconductor procurement, hardware sourcing, system integration and AI infrastructure consulting. ISO 9001 certified distributor with ${market.currency} pricing and delivery from ${market.warehouse}.`,
    path: `/${country}/services`,
    keywords: [
      `enterprise chip services ${countryObj.name}`,
      `semiconductor procurement services ${countryObj.name}`,
      `AI infrastructure consulting ${countryObj.name}`,
      `hardware sourcing ${countryObj.name}`,
    ],
    openGraphTitle: `Enterprise Chip Services ${countryObj.name} | Servchip`,
    twitterTitle: `Enterprise Chip Services ${countryObj.name} | Servchip`,
    openGraphDescription: `Custom semiconductor procurement and AI infrastructure consulting in ${countryObj.name}.`,
    twitterDescription: `Custom semiconductor procurement and AI infrastructure consulting in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/services`,
        [market.locale]: `${SITE.url}/${country}/services`,
      },
    },
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: `/${country}` },
          { name: countryObj.name, url: `/${country}` },
          { name: "Services", url: `/${country}/services` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={serviceSchema(
          [
            "Enterprise Chip Sourcing",
            "System Integration",
            "AI Infrastructure Consulting",
            "Technical Support",
            "Warranty & RMA",
          ].map((name) => ({
            name,
            description: `Servchip ${name.toLowerCase()} service for enterprises in ${countryObj.name}.`,
            url: `/${country}/services`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
