"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { useCountryPrefix } from "@/lib/useCountryPrefix";
import { isCountryPath } from "@/lib/localized-path";

type AppLinkProps = React.ComponentProps<typeof Link> & {
  global?: boolean;
};

function isExternal(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("//")
  );
}

export const AppLink = forwardRef<HTMLAnchorElement, AppLinkProps>(
  function AppLink({ href, global, ...rest }, ref) {
    const prefix = useCountryPrefix();
    let finalHref = href;
    if (
      !global &&
      prefix &&
      typeof href === "string" &&
      href.startsWith("/") &&
      !isExternal(href) &&
      !isCountryPath(href) &&
      !href.startsWith("/countries/")
    ) {
      finalHref = `${prefix}${href}`;
    }
    return <Link ref={ref} href={finalHref} {...rest} />;
  },
);
