"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url =
      pathname +
      (searchParams?.toString() ? "?" + searchParams.toString() : "");

    const tryGtag = (retries = 50) => {
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-W9W5CX2KPN", { page_path: url });
      } else if (retries > 0) {
        setTimeout(() => tryGtag(retries - 1), 100);
      }
    };
    tryGtag();
  }, [pathname, searchParams]);

  return null;
}

export function GAClient() {
  return <GATracker />;
}
