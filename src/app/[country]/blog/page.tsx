import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import BlogPage from "@/app/blog/page-client";

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
    title: `AI Hardware Blog — ${countryObj.name} Edition | Servchip`,
    description: `Enterprise AI hardware guides, chip architecture insights and semiconductor procurement tips for buyers in ${countryObj.name}.`,
    path: `/${country}/blog`,
    keywords: [
      `AI hardware guides ${countryObj.name}`,
      `enterprise chip blog ${countryObj.name}`,
      `semiconductor procurement ${countryObj.name}`,
      `data center infrastructure ${countryObj.name}`,
    ],
    openGraphTitle: `AI Hardware Blog — ${countryObj.name} | Servchip`,
    twitterTitle: `AI Hardware Blog — ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/blog`,
        [market.locale]: `${SITE.url}/${country}/blog`,
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
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Blog", url: `/${country}/blog` },
        ])}
      />
      <BlogPage />
    </>
  );
}
