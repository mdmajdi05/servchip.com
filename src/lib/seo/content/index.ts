import { BRAND_SEO } from "./brands";
import { CATEGORY_SEO } from "./categories";
import { COUNTRY_SEO } from "./countries";
import { INDUSTRY_SEO } from "./industries";
import { SOLUTION_SEO } from "./solutions";
import type { SeoEntry } from "./types";

export type { SeoEntry };

export function getBrandSeo(key: string): SeoEntry | undefined {
  return BRAND_SEO[key];
}

export function getCategorySeo(key: string): SeoEntry | undefined {
  return CATEGORY_SEO[key];
}

export function getCountrySeo(key: string): SeoEntry | undefined {
  return COUNTRY_SEO[key];
}

export function getIndustrySeo(key: string): SeoEntry | undefined {
  return INDUSTRY_SEO[key];
}

export function getSolutionSeo(key: string): SeoEntry | undefined {
  return SOLUTION_SEO[key];
}
