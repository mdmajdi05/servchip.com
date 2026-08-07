import type { Metadata } from "next";
import {
  createMetadata,
  createBreadcrumb,
  contactPageSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("contact");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(createBreadcrumb("contact"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={contactPageSchema()}
      />
      <PageClient />
    </>
  );
}
