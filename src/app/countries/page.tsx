import type { Metadata } from "next";
import { COUNTRIES } from "@/data/countries";
import {
  createMetadata,
  createBreadcrumb,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("countries");

export default async function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createBreadcrumb("countries"),
        )}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={itemListSchema(
          COUNTRIES.map((c) => ({
            name: c.name,
            url: `/countries/${c.slug}`,
          })),
        )}
      />
      <PageClient />
    </>
  );
}
