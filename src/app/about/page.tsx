import type { Metadata } from "next";
import {
  createMetadata,
  createBreadcrumb,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/seo";
import { SITE } from "@/lib/constants";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("about");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(createBreadcrumb("about"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd({
          "@type": "AboutPage",
          name: "About Servchip — Enterprise Chip Distributor",
          url: `${SITE.url}/about`,
          mainEntity: {
            "@type": "Organization",
            name: "Servchip Inc.",
            url: SITE.url,
            foundingDate: "2018",
            description:
              "ISO 9001 certified enterprise chip distributor supplying NVIDIA, AMD, Intel, and 27+ manufacturers. Semiconductor procurement partner for 500+ enterprises across 150+ countries.",
          },
        })}
      />
      <PageClient />
    </>
  );
}
