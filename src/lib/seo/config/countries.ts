import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { stripServchip } from "../helpers";
import type { Country, CountryMarket } from "@/types";

const SHORT_NAMES: Record<string, string> = {
  in: "India",
  ae: "UAE",
  us: "USA",
  uk: "UK",
  de: "Germany",
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
  return {
    country,
    name: countryObj.name,
    nameShort,
    countrySuffix: ` in ${nameShort}`,
    currency: market.currency,
    warehouse: market.warehouse,
    locale: market.locale,
    metaTitle: stripServchip(countryObj.seo.metaTitle),
    metaDescription: countryObj.seo.metaDescription,
    metaKeywords: countryObj.seo.keywords,
  };
}
