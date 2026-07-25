import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
} from "@/lib/seo";
import { BLOG_POSTS } from "@/blog";
import PageClient from "./page-client";

export async function generateStaticParams() {
  return BLOG_POSTS.filter((p) => p.isPublished).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return { title: "Article Not Found | Servchip" };

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.tags.map((t) => t.name),
    alternates: {
      canonical: post.seo.canonicalUrl || `${SITE.url}/blog/${post.slug}`,
    },
    robots: post.seo.robots || "index, follow",
    openGraph: {
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags.map((t) => t.name),
      url: `${SITE.url}/blog/${post.slug}`,
      images: [
        {
          url: post.featuredImage || OG_IMAGE,
          width: OG_WIDTH,
          height: OG_HEIGHT,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seo.metaTitle,
      description: post.seo.metaDescription,
      images: [post.featuredImage || OG_IMAGE],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return <PageClient />;
  }

  const faqSection = post.sections?.find((s) =>
    s.heading.toLowerCase().includes("frequently asked"),
  );

  const schemas = [];

  schemas.push(
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ]),
  );

  schemas.push(
    articleSchema({
      title: post.title,
      description: post.seo.metaDescription,
      slug: post.slug,
      publishedAt: post.publishedAt,
      author: { name: post.author.name },
      image: post.featuredImage || OG_IMAGE,
    }),
  );

  if (faqSection) {
    let faqItems: { question: string; answer: string }[] = [];

    if (faqSection.content) {
      const faqBlock = faqSection.content.find((b) => b.type === "faq");
      if (faqBlock && faqBlock.type === "faq") {
        faqItems = faqBlock.items;
      }
    } else {
      faqItems = (faqSection.paragraphs || []).map((p) => {
        const sep = p.indexOf("? ");
        return {
          question: sep !== -1 ? p.substring(0, sep + 1) : p,
          answer: sep !== -1 ? p.substring(sep + 2) : "",
        };
      });
    }

    schemas.push(faqSchema(faqItems));
  }

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schema }}
        />
      ))}
      <PageClient />
    </>
  );
}
