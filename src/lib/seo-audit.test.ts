import { describe, expect, it } from "vitest";
import { existsSync, statSync } from "fs";
import path from "path";
import { BLOG_POSTS } from "@/blog";
import { OG_IMAGE } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import sitemap from "@/app/sitemap";

/**
 * Build-time SEO sanity guard (runs via `npm run prebuild`).
 * Fails the build when metadata is incomplete, too long, duplicated,
 * canonical is wrong, the Open Graph fallback image is missing/broken,
 * or the sitemap contains entries that should not be public.
 */

interface AuditIssue {
  post?: string;
  field: string;
  value: string;
  message: string;
}

const MAX_TITLE_LENGTH = 65; // Google soft-truncates beyond ~60–70 chars
const MAX_DESCRIPTION_LENGTH = 165; // Google soft-truncates around 155–160 chars

describe("SEO integrity", () => {
  const issues: AuditIssue[] = [];

  const seenTitles = new Map<string, string>();
  const seenDescriptions = new Map<string, string>();
  const seenSlugs = new Map<string, string>();

  for (const post of BLOG_POSTS) {
    const tag = post.isPublished ? "" : " [DRAFT]";
    const seo = post.seo ?? {};

    if (seenSlugs.has(post.slug)) {
      issues.push({
        post: post.title,
        field: "slug",
        value: post.slug,
        message: `Duplicate slug "${post.slug}" also used by "${seenSlugs.get(post.slug)}".`,
      });
    } else {
      seenSlugs.set(post.slug, post.title);
    }

    // Drafts are exempt from meta checks entirely — title, description and
    // length polish happens at publication time. Published posts are checked.
    if (post.isPublished) {
      if (!seo.metaTitle) {
        issues.push({
          post: post.title,
          field: "metaTitle",
          value: "",
          message: "missing metaTitle",
        });
      } else if (seo.metaTitle.length > MAX_TITLE_LENGTH) {
        issues.push({
          post: post.title,
          field: "metaTitle",
          value: seo.metaTitle,
          message: `metaTitle is ${seo.metaTitle.length} chars (max recommended ${MAX_TITLE_LENGTH}).`,
        });
      } else {
        const previous = seenTitles.get(seo.metaTitle);
        if (previous) {
          issues.push({
            post: post.title,
            field: "metaTitle",
            value: seo.metaTitle,
            message: `metaTitle is identical to post "${previous}" — duplicate title hurts SERP click-through.`,
          });
        } else {
          seenTitles.set(seo.metaTitle, post.title);
        }
      }

      if (!seo.metaDescription) {
        issues.push({
          post: post.title,
          field: "metaDescription",
          value: "",
          message: "missing metaDescription",
        });
      } else if (seo.metaDescription.length > MAX_DESCRIPTION_LENGTH) {
        issues.push({
          post: post.title,
          field: "metaDescription",
          value: seo.metaDescription,
          message: `metaDescription is ${seo.metaDescription.length} chars (max recommended ${MAX_DESCRIPTION_LENGTH}).`,
        });
      } else {
        const previous = seenDescriptions.get(seo.metaDescription);
        if (previous) {
          issues.push({
            post: post.title,
            field: "metaDescription",
            value: seo.metaDescription,
            message: `metaDescription is identical to post "${previous}".`,
          });
        } else {
          seenDescriptions.set(seo.metaDescription, post.title);
        }
      }

      if (!seo.canonicalUrl) {
        issues.push({
          post: post.title,
          field: "canonicalUrl",
          value: "",
          message: "published post is missing canonicalUrl.",
        });
      } else {
        const expected = `${SITE.url}/blog/${post.slug}`;
        if (
          seo.canonicalUrl !== expected &&
          seo.canonicalUrl !== `${expected}/`
        ) {
          issues.push({
            post: post.title,
            field: "canonicalUrl",
            value: seo.canonicalUrl,
            message: `should be ${expected} (this post's own URL).`,
          });
        }
      }

      if (seo.robots === "noindex, nofollow") {
        issues.push({
          post: post.title,
          field: "robots",
          value: seo.robots,
          message: "published post is noindex — Google will not index it.",
        });
      }

      if (post.featuredImage) {
        const publicPath = path.join(
          process.cwd(),
          "public",
          post.featuredImage,
        );
        if (!existsSync(publicPath)) {
          issues.push({
            post: post.title,
            field: "featuredImage",
            value: post.featuredImage,
            message: `featured image missing at public${post.featuredImage}.`,
          });
        }
      }
    }
  }

  /* ---- Open Graph fallback image -------------------------------- */
  const ogPath = path.join(
    process.cwd(),
    "public",
    OG_IMAGE.replace(`${SITE.url}/`, ""),
  );
  if (!existsSync(ogPath)) {
    issues.push({
      field: "og:image",
      value: OG_IMAGE,
      message: `OG fallback image missing at ${ogPath}.`,
    });
  } else if (statSync(ogPath).size < 10_000) {
    issues.push({
      field: "og:image",
      value: OG_IMAGE,
      message: `OG fallback image looks broken/empty (${statSync(ogPath).size} bytes). Re-export a real 1200×630 PNG.`,
    });
  }

  /* ---- Sitemap integrity ----------------------------------------- */
  const sitemapUrls = sitemap().map((entry) => entry.url);
  const seenSitemap = new Set<string>();
  const duplicatedSitemap: string[] = [];
  for (const url of sitemapUrls) {
    if (seenSitemap.has(url)) duplicatedSitemap.push(url);
    seenSitemap.add(url);
  }
  if (duplicatedSitemap.length) {
    issues.push({
      field: "sitemap",
      value: duplicatedSitemap[0],
      message: `${duplicatedSitemap.length} duplicate URL(s) in sitemap, e.g. ${duplicatedSitemap[0]}.`,
    });
  }

  const blogUrls = sitemapUrls.filter((u) => u.includes("/blog/"));
  const publishedSlugs = BLOG_POSTS.filter((p) => p.isPublished).map(
    (p) => p.slug,
  );
  const draftSlugs = BLOG_POSTS.filter((p) => !p.isPublished).map(
    (p) => p.slug,
  );

  for (const slug of publishedSlugs) {
    if (!blogUrls.some((u) => u.endsWith(`/blog/${slug}`))) {
      issues.push({
        field: "sitemap",
        value: `/blog/${slug}`,
        message: `published post is missing from sitemap.`,
      });
    }
  }
  for (const slug of draftSlugs) {
    if (blogUrls.some((u) => u.endsWith(`/blog/${slug}`))) {
      issues.push({
        field: "sitemap",
        value: `/blog/${slug}`,
        message:
          "draft/unpublished post appears in sitemap — must be excluded.",
      });
    }
  }

  it("blog SEO metadata, OG image and sitemap are clean", () => {
    const summary = issues.length
      ? `\n${issues.map((issue, i) => `${i + 1}. ${issue.post ? `[${issue.post}] ` : ""}${issue.field}: ${issue.message}\n      value: ${issue.value}`).join("\n\n")}\n`
      : "";

    expect(summary, `SEO issues found — fix them before deploying.`).toEqual(
      "",
    );
  });
});
