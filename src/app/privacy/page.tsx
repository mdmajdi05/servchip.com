import type { Metadata } from "next";
import { createMetadata, createBreadcrumb, breadcrumbSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("privacy");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(createBreadcrumb("privacy"))}
      />
      <PageClient />
    </>
  );
}
