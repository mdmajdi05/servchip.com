import { COUNTRY_MARKETS } from "@/data/country-markets";

export const SUPPORTED_COUNTRIES = Object.keys(COUNTRY_MARKETS).sort();

export function getLocalizedPath(country: string, path = "/"): string {
  const code = SUPPORTED_COUNTRIES.includes(country) ? country : "";
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return code ? `/${code}${cleanPath}` : cleanPath;
}

export function isCountryPath(path: string): boolean {
  const firstSegment = path.split("/")[1] || "";
  return SUPPORTED_COUNTRIES.includes(firstSegment);
}
