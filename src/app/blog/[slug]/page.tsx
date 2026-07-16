import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/data/blog";
import PageClient from "./page-client";

export function generateStaticParams() {
  return BLOG_POSTS.filter((p) => p.isPublished).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  const title = post.seo?.metaTitle || `${post.title} — Servchip Blog`;
  const description = post.seo?.metaDescription || post.excerpt;
  return {
    title,
    description,
    alternates: { canonical: `https://servchip.com/blog/${slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
    },
  };
}

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await props.params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  return <PageClient />;
}
