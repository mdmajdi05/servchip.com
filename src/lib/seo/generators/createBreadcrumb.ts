import { getCountryByCode } from "@/data/countries";
import { getLocalizedPath, SUPPORTED_COUNTRIES } from "@/lib/localized-path";
import { STATIC_PAGE_TEMPLATES } from "../templates";
import type { StaticRoute } from "../templates/pages";

export function createBreadcrumb(
  page: StaticRoute,
  country?: string,
): { name: string; url: string }[] {
  const def = STATIC_PAGE_TEMPLATES[page];
  const crumbs: { name: string; url: string }[] = [{ name: "Home", url: "/" }];
  if (country) {
    const countryObj = getCountryByCode(country);
    if (countryObj) crumbs.push({ name: countryObj.name, url: `/${country}` });
  }
  if (page !== "home") {
    crumbs.push({
      name: def.label,
      url: country ? getLocalizedPath(country, def.path) : def.path,
    });
  }
  return crumbs;
}

export function createEntityBreadcrumb(
  country: string | undefined,
  items: { name: string; url: string }[],
): { name: string; url: string }[] {
  const crumbs: { name: string; url: string }[] = [{ name: "Home", url: "/" }];
  if (country) {
    const countryObj = getCountryByCode(country);
    if (countryObj) crumbs.push({ name: countryObj.name, url: `/${country}` });
  }
  crumbs.push(
    ...items.map((item) => ({
      ...item,
      url: country ? getLocalizedPath(country, item.url) : item.url,
    })),
  );
  return crumbs;
}

export function countryParams(): { country: string }[] {
  return SUPPORTED_COUNTRIES.map((country) => ({ country }));
}
