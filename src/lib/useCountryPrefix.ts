"use client";

import { usePathname } from "next/navigation";
import { isCountryPath } from "@/lib/localized-path";

export function useCountryPrefix(): string {
  const pathname = usePathname();
  if (pathname && isCountryPath(pathname)) {
    return `/${pathname.split("/")[1]}`;
  }
  return "";
}
