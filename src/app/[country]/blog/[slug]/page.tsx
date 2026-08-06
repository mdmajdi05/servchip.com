import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BLOG_POSTS } from "@/blog";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/constants";
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

  return createSeoMetadata({
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    path: `/${country}/blog/${post.slug}`,
    keywords: post.tags.map((t) => t.name),
    ...(post.featuredImage
      ? {
          image: {
            url: post.featuredImage,
            alt: post.title,
            width: 1200,
            height: 630,
          },
        }
      : {}),
    openGraphTitle: `${post.title} — ${countryObj.name} | Servchip`,
    twitterTitle: `${post.title} — ${countryObj.name} | Servchip`,
    alternates: {
      languages: {
        "x-default": `${SITE.url}/blog/${post.slug}`,
        [market.locale]: `${SITE.url}/${country}/blog/${post.slug}`,
      },
    },
  });
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
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: countryObj.name, url: `/${country}` },
          { name: "Blog", url: `/${country}/blog` },
          {
            name: post?.title ?? "Article",
            url: `/${country}/blog/${slug}`,
          },
        ])}
      />
      <BlogPostPage />
    </>
  );
}
