import type { Metadata } from "next";
import { INDUSTRIES } from "@/data/industries";
import {
  createMetadata,
  createBreadcrumb,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("industries");

export default async function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createBreadcrumb("industries"),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          INDUSTRIES.map((i) => ({
            name: i.name,
            url: `/industries/${i.slug}`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
