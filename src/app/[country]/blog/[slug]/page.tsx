import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/blog";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import {
  createEntityMetadata,
  createEntityBreadcrumb,
  breadcrumbSchema,
} from "@/lib/seo";
import BlogPostPage from "@/app/blog/[slug]/page-client";

export async function generateStaticParams() {
  const countries = Object.keys(COUNTRY_MARKETS);
  return countries.flatMap((country) =>
    BLOG_POSTS.filter((p) => p.isPublished).map((post) => ({
      country,
      slug: post.slug,
    })),
  );
}

export async function generateMetadata(props: {
  params: Promise<{ country: string; slug: string }>;
}): Promise<Metadata> {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const market = COUNTRY_MARKETS[country];
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!countryObj || !market || !post) return {};

  return (
    createEntityMetadata(
      "blog",
      country,
      {
        slug: post.slug,
        blogTitle: post.seo.metaTitle,
        blogDescription: post.seo.metaDescription,
        tags: post.tags.map((t) => t.name),
        postTitle: post.title,
      },
      post.featuredImage
        ? {
            image: {
              url: post.featuredImage,
              alt: post.title,
              width: 1200,
              height: 630,
            },
          }
        : {},
    ) ?? {}
  );
}

export default async function Page(props: {
  params: Promise<{ country: string; slug: string }>;
}) {
  const { country, slug } = await props.params;
  const countryObj = getCountryByCode(country);
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!countryObj) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(
          createEntityBreadcrumb(country, [
            { name: "Blog", url: "/blog" },
            {
              name: post?.title ?? "Article",
              url: `/blog/${slug}`,
            },
          ]),
        )}
      />
      <BlogPostPage />
    </>
  );
}
