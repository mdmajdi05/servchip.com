import type { Metadata } from "next";
import { BLOG_POSTS } from "@/blog";
import {
  createMetadata,
  createBreadcrumb,
  breadcrumbSchema,
  itemListSchema,
} from "@/lib/seo";
import PageClient from "./page-client";

export const metadata: Metadata = createMetadata("blog");

export default function Page() {
  const publishedPosts = BLOG_POSTS.filter((p) => p.isPublished);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(createBreadcrumb("blog"))}
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
