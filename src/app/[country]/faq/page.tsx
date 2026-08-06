import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/faq/page-client";

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
    title: `FAQ — Enterprise Chip Distribution in ${countryObj.name} | Servchip`,
    description: `Answers about buying AI chips, enterprise chip purchasing and semiconductor procurement in ${countryObj.name}. Authenticity, bulk ordering, ${market.currency} pricing, shipping, warranty & support.`,
    path: `/${country}/faq`,
    keywords: [
      `buy AI chips ${countryObj.name}`,
      `enterprise chip purchasing ${countryObj.name}`,
      `semiconductor procurement ${countryObj.name}`,
      `NVIDIA H100 buying guide ${countryObj.name}`,
    ],
    openGraphTitle: `FAQ ${countryObj.name} | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `FAQ ${countryObj.name} | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: `Common questions about buying AI chips and enterprise hardware in ${countryObj.name}.`,
    twitterDescription: `Common questions about buying AI chips and enterprise hardware in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/faq`,
        [market.locale]: `${SITE.url}/${country}/faq`,
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
          { name: "FAQ", url: `/${country}/faq` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(countryObj.faqs)}
      />
      <PageClient
        faqs={countryObj.faqs.map((f) => ({ q: f.question, a: f.answer }))}
      />
    </>
  );
}
