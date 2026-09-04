import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { stripServchip } from "../helpers";
import { getCountrySeo } from "../content";
import type { Country, CountryMarket } from "@/types";

const SHORT_NAMES: Record<string, string> = {
  ae: "UAE",
  us: "USA",
  uk: "UK",
  de: "Germany",
};

const COUNTRY_SUFFIX: Record<string, string> = {
  ae: " in UAE and Dubai",
  us: " in USA",
  uk: " in UK",
  de: " in Germany",
  sg: " in Singapore",
  my: " in Malaysia",
  cn: " in China",
  ph: " in Philippines",
  sa: " in Saudi Arabia",
  qa: " in Qatar",
  om: " in Oman",
};

export interface CountryVars {
  country: string;
  name: string;
  nameShort: string;
  countrySuffix: string;
  currency: string;
  warehouse: string;
  locale: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
}

export function countryContext(country: string): {
  countryObj: Country;
  market: CountryMarket;
} | null {
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  if (!countryObj || !market) return null;
  return { countryObj, market };
}

export function countryVars(country: string): CountryVars | null {
  const ctx = countryContext(country);
  if (!ctx) return null;
  const { countryObj, market } = ctx;
  const nameShort = SHORT_NAMES[country] ?? countryObj.name;
  const seo = getCountrySeo(countryObj.id);
  return {
    country,
    name: countryObj.name,
    nameShort,
    countrySuffix: COUNTRY_SUFFIX[country] ?? ` in ${nameShort}`,
    currency: market.currency,
    warehouse: market.warehouse,
    locale: market.locale,
    metaTitle: seo ? stripServchip(seo.metaTitle) : "",
    metaDescription: seo?.metaDescription ?? "",
    metaKeywords: seo?.keywords ?? [],
  };
}
