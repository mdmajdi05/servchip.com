"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function GATracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url =
      pathname +
      (searchParams?.toString() ? "?" + searchParams.toString() : "");
    window.gtag("config", "G-W9W5CX2KPN", { page_path: url });
  }, [pathname, searchParams]);

  return null;
}

export function GAClient() {
  return (
    <Suspense>
      <GATracker />
    </Suspense>
  );
}
