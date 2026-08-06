"use client";

import { usePathname } from "next/navigation";
import { COUNTRY_MARKETS } from "@/data/country-markets";

const COUNTRY_CODE_PATTERN = /^\/([a-z]{2})(\/|$)/;

export function useCountryPrefix(): string {
  const pathname = usePathname();
  const match = pathname?.match(COUNTRY_CODE_PATTERN);
  if (match && COUNTRY_MARKETS[match[1]]) {
    return `/${match[1]}`;
  }
  return "";
}
