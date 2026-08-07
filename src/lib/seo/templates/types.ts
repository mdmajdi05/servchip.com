import type { Metadata } from "next";
import type { CountryVars } from "../config/countries";

export interface SeoFields {
  title: string;
  description: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  robots?: Metadata["robots"];
  noindex?: boolean;
}

export interface SeoPageTemplate extends SeoFields {
  path: string;
  label: string;
  country?: SeoFields | ((vars: CountryVars) => SeoFields);
}

export interface SeoEntityTemplate {
  globalPath: string;
  global: SeoFields;
  country: SeoFields;
}
