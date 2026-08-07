import type { Metadata } from "next";
import { Suspense } from "react";
import { createMetadata, createBreadcrumb, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("rfq");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(createBreadcrumb("rfq"))}
      />
      <Suspense fallback={null}>
        <PageClient />
      </Suspense>
    </>
  );
}
