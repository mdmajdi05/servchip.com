import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createSeoMetadata,
  contactPageSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/contact/page-client";

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
    title: `Contact Us in ${countryObj.name} — Enterprise Chip Pricing & AI Accelerator Quotes`,
    description: `Contact Servchip in ${countryObj.name} for enterprise chip pricing, AI accelerator availability and semiconductor procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon & more. ${market.currency} pricing, 24-hour response time.`,
    path: `/${country}/contact`,
    keywords: [
      `contact Servchip ${countryObj.name}`,
      `buy enterprise chips ${countryObj.name}`,
      `AI accelerator pricing ${countryObj.name}`,
      `semiconductor procurement ${countryObj.name}`,
    ],
    openGraphTitle: `Contact Servchip ${countryObj.name} | Buy AI Chips & Get Pricing`,
    twitterTitle: `Contact Servchip ${countryObj.name} | Buy AI Chips & Get Pricing`,
    openGraphDescription: `Get enterprise chip pricing & quotes in ${countryObj.name}. 24-hour response time.`,
    twitterDescription: `Get enterprise chip pricing & quotes in ${countryObj.name}. 24-hour response time.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/contact`,
        [market.locale]: `${SITE.url}/${country}/contact`,
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
          { name: "Contact", url: `/${country}/contact` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={contactPageSchema()}
      />
      <PageClient />
    </>
  );
}
