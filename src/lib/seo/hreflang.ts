import { SITE } from "@/lib/constants";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { getCountryByCode } from "@/data/countries";
import { getLocalizedPath } from "@/lib/localized-path";
import type { StaticRoute } from "./templates/pages";
import type { EntityRoute } from "./templates/entities";

/**
 * Google requires every member of a regional page group to list ALL of the
 * group's URLs via identical hreflang `alternate` links, otherwise the group
 * is ignored and the variants fight each other (duplicate content →
 * "not indexed" in Search Console). This helper builds that exact, complete
 * group for a route — the main (x-default) URL plus every supported-country
 * variant — so every page, main or country, emits the same 5-entry map.
 */
export function countryLanguageAlternates(
  mainPath: string,
): Record<string, string> {
  const languages: Record<string, string> = {
    "x-default": `${SITE.url}${mainPath}`,
  };
  for (const code of Object.keys(COUNTRY_MARKETS).sort()) {
    if (!getCountryByCode(code)) continue; // no localized page for this code
    languages[COUNTRY_MARKETS[code].locale] =
      `${SITE.url}${getLocalizedPath(code, mainPath)}`;
  }
  return languages;
}

/** Static pages that have a real `/{country}` variant. */
const STATIC_ROUTES_WITH_COUNTRY_VARIANT: ReadonlySet<StaticRoute> = new Set([
  "about",
  "blog",
  "brands",
  "categories",
  "comparison",
  "configurator",
  "contact",
  "countries",
  "developer-hub",
  "faq",
  "home",
  "industries",
  "privacy",
  "products",
  "resources",
  "rfq",
  "services",
  "solutions",
  "technology",
  "terms",
]);

/** Entity routes that have a real `/{country}` variant. */
const ENTITY_ROUTES_WITH_COUNTRY_VARIANT: ReadonlySet<EntityRoute> = new Set([
  "blog",
  "product",
  "brand",
  "brandCategory",
  "category",
  "industry",
  "solution",
]);

export function staticRouteHasCountryVariant(route: StaticRoute): boolean {
  return STATIC_ROUTES_WITH_COUNTRY_VARIANT.has(route);
}

export function entityRouteHasCountryVariant(route: EntityRoute): boolean {
  return ENTITY_ROUTES_WITH_COUNTRY_VARIANT.has(route);
}
