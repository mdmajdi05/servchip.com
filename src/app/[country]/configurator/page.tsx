import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "@/app/configurator/page-client";

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
    title: `Chip Configurator in ${countryObj.name} — Find the Right AI Accelerator`,
    description: `Configure your ideal chip setup in ${countryObj.name} from NVIDIA, AMD, Intel and more. Get matched with the right AI accelerator for training, inference, HPC or professional graphics.`,
    path: `/${country}/configurator`,
    keywords: [
      `chip configurator ${countryObj.name}`,
      `AI accelerator finder ${countryObj.name}`,
      `GPU selector tool ${countryObj.name}`,
      `workload-based chip recommendation ${countryObj.name}`,
    ],
    robots: { index: false, follow: true },
    openGraphTitle: `Chip Configurator ${countryObj.name} | Servchip`,
    twitterTitle: `Chip Configurator ${countryObj.name} | Servchip`,
    openGraphDescription: `Configure your ideal AI chip setup in ${countryObj.name}.`,
    twitterDescription: `Configure your ideal AI chip setup in ${countryObj.name}.`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/configurator`,
        [market.locale]: `${SITE.url}/${country}/configurator`,
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
          { name: "Configurator", url: `/${country}/configurator` },
        ])}
      />
      <PageClient />
    </>
  );
}
