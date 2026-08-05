import type { Metadata } from "next";
import { BLOG_POSTS } from "@/blog";
import { createSeoMetadata, breadcrumbSchema, itemListSchema } from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createSeoMetadata({
  title:
    "Blog — Enterprise AI Hardware Guides, Chip Architecture Insights & Semiconductor Procurement",
  description:
    "Expert guides on NVIDIA Blackwell, AMD CDNA 3, Intel Granite Rapids & more. Enterprise AI chip comparisons, deployment best practices, semiconductor procurement tips & data center infrastructure insights.",
  path: "/blog",
  keywords: [
    "AI hardware guides",
    "enterprise chip blog",
    "NVIDIA Blackwell architecture",
    "AMD CDNA 3 guide",
    "semiconductor procurement",
    "data center infrastructure",
    "AI chip comparison",
    "enterprise GPU guide",
  ],
  openGraphTitle: "Blog | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
  twitterTitle: "Blog | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
});

export default function Page() {
  const publishedPosts = BLOG_POSTS.filter((p) => p.isPublished);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Blog", url: "/blog" },
        ])}
      />
      {publishedPosts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={itemListSchema(
            publishedPosts.map((p) => ({
              name: p.title,
              url: `/blog/${p.slug}`,
              description: p.excerpt || p.seo.metaDescription,
              ...(p.featuredImage ? { image: p.featuredImage } : {}),
            })),
          )}
        />
      )}
      <PageClient />
    </>
  );
}
