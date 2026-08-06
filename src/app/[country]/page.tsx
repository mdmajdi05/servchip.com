import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeSections } from "@/components/home/HomeSections";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";

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

  const cleanTitle = countryObj.seo.metaTitle.replace(
    /\s*\|\s*Servchip\s*$/i,
    "",
  );

  return createSeoMetadata({
    title: cleanTitle,
    description: countryObj.seo.metaDescription,
    path: `/${country}`,
    keywords: countryObj.seo.keywords,
    openGraphTitle: `${countryObj.name} | Servchip — Enterprise Chip Distributor`,
    twitterTitle: `${countryObj.name} | Servchip — Enterprise Chip Distributor`,
    openGraphDescription: countryObj.seo.metaDescription,
    twitterDescription: countryObj.seo.metaDescription,
    alternates: {
      languages: {
        "x-default": SITE.url,
        [market.locale]: `${SITE.url}/${country}`,
      },
    },
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
        ])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(countryObj.faqs)}
      />
      <HomeSections country={countryObj} market={market} />
    </>
  );
}
