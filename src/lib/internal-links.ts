/**
 * Internal link integrity checker (build-time).
 *
 * WHY THIS EXISTS
 * ----------------
 * Broken internal links (renamed/removed slugs) used to ship silently and then
 * show up as 404 / soft-404 errors in Google Search Console. This module walks
 * every blog post's content and validates every internal link against the LIVE
 * route registry (blog posts, products, categories, brands, solutions,
 * industries, countries, static pages, images). It runs as a vitest spec wired
 * into `npm run prebuild`, so the build FAILS and prints exactly which link is
 * broken, where it lives, and what to do — before anything is ever deployed.
 *
 * RULE: when a URL is renamed or removed, update every link to the current real
 * URL (no redirects). If a post/page truly no longer exists, remove the link.
 */

import { existsSync, readFileSync, readdirSync } from "fs";
import path from "path";
import { BLOG_POSTS } from "@/blog";
import { ALL_PRODUCTS, getProductById } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { SOLUTIONS } from "@/data/solutions";
import { INDUSTRIES } from "@/data/industries";
import { COUNTRIES } from "@/data/countries";
import { SUPPORTED_COUNTRIES } from "@/lib/localized-path";
import type { BlogPost } from "@/blog/types";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

export interface LinkIssue {
  /** Human-readable post title (with "(draft)" marker if unpublished). */
  postTitle: string;
  /** Blog post slug. */
  postSlug: string;
  /** Source file relative to frontend/, e.g. src/blog/posts/foo.ts */
  file: string;
  /** Where the link lives: section heading or "SEO / metadata". */
  section: string;
  /** Narrower block pointer, e.g. `block #3 (linkList)`. */
  block?: string;
  /** The exact href / path that is broken. */
  link: string;
  /** Optional visible anchor text of the link (for markdown links). */
  linkText?: string;
  /** Why it is broken. */
  reason: string;
  /** Concrete fix suggestion (candidates). */
  suggestion: string;
}

interface RouteRegistry {
  blogSlugs: Set<string>;
  allPostSlugs: Set<string>;
  productSlugs: Set<string>;
  categorySlugs: Set<string>;
  brandSlugs: Set<string>;
  brandSecondSegments: Map<string, Set<string>>;
  solutionSlugs: Set<string>;
  industrySlugs: Set<string>;
  countrySlugs: Set<string>;
  countryCodes: Set<string>;
}

/* ------------------------------------------------------------------ */
/* Route registry (source of truth for valid URLs)                    */
/* ------------------------------------------------------------------ */

const STATIC_PAGES = new Set([
  "/",
  "/about",
  "/blog",
  "/brands",
  "/categories",
  "/comparison",
  "/configurator",
  "/contact",
  "/countries",
  "/developer-hub",
  "/faq",
  "/privacy",
  "/products",
  "/resources",
  "/rfq",
  "/search",
  "/services",
  "/solutions",
  "/technology",
  "/terms",
]);

export function buildRouteRegistry(): RouteRegistry {
  const brandSecondSegments = new Map<string, Set<string>>();
  for (const brand of BRANDS) {
    const segments = new Set<string>();
    for (const category of brand.categories ?? []) {
      segments.add(category.slug);
      for (const sub of category.subcategories ?? []) {
        segments.add(sub.slug);
      }
    }
    brandSecondSegments.set(brand.slug, segments);
  }

  return {
    blogSlugs: new Set(
      BLOG_POSTS.filter((p) => p.isPublished).map((p) => p.slug),
    ),
    allPostSlugs: new Set(BLOG_POSTS.map((p) => p.slug)),
    productSlugs: new Set(ALL_PRODUCTS.map((p) => p.slug)),
    categorySlugs: new Set(CATEGORIES.map((c) => c.slug)),
    brandSlugs: new Set(BRANDS.map((b) => b.slug)),
    brandSecondSegments,
    solutionSlugs: new Set(SOLUTIONS.map((s) => s.slug)),
    industrySlugs: new Set(INDUSTRIES.map((i) => i.slug)),
    countrySlugs: new Set(COUNTRIES.map((c) => c.slug)),
    countryCodes: new Set(SUPPORTED_COUNTRIES),
  };
}

/* ------------------------------------------------------------------ */
/* URL helpers                                                         */
/* ------------------------------------------------------------------ */

const MD_LINK_RE = /\[([^\]]*)\]\(([^)\s]+)\)/g;
const MD_IMAGE_RE = /!\[[^\]]*\]\(([^)\s]+)\)/g;
const HTML_ATTR_RE = /\b(?:href|src)\s*=\s*["']([^"']+)["']/g;

function findMarkdownLinks(text: string): {
  text: string;
  href: string;
  isImage: boolean;
}[] {
  const out: { text: string; href: string; isImage: boolean }[] = [];
  for (const m of text.matchAll(MD_LINK_RE)) {
    out.push({ text: m[1], href: m[2], isImage: false });
  }
  for (const m of text.matchAll(MD_IMAGE_RE)) {
    out.push({ text: "", href: m[1], isImage: true });
  }
  return out;
}

function findHtmlAttributes(html: string): string[] {
  const out: string[] = [];
  for (const m of html.matchAll(HTML_ATTR_RE)) out.push(m[1]);
  return out;
}

/** Only true for site-internal, absolute paths ("/..." or "/<code>/..."). */
function isInternalUrl(url: string): boolean {
  const clean = (url ?? "").trim();
  if (!clean || clean.startsWith("#")) return false;
  if (/^(mailto:|tel:|data:|javascript:)/i.test(clean)) return false;
  if (/^https?:\/\//i.test(clean)) return false;
  if (clean.startsWith("//")) return false;
  return (
    clean.startsWith("/") &&
    !clean.startsWith("/api/") &&
    !clean.startsWith("/_next/")
  );
}

type ValidationResult = { ok: true } | { ok: false; reason: string };

export function validateInternalPath(
  url: string,
  registry: RouteRegistry,
): ValidationResult {
  const clean = url.split(/[?#]/)[0].replace(/\/+$/, "");
  if (clean === "") return { ok: true };

  const segments = clean.split("/").filter(Boolean);

  // Single country-code prefix, e.g. /ae, /us, /uk, /de …
  if (segments.length === 1 && registry.countryCodes.has(segments[0])) {
    return { ok: true };
  }
  // Country-prefixed subroutes, e.g. /ae/blog/xyz → validate blog/xyz
  if (segments.length >= 2 && registry.countryCodes.has(segments[0])) {
    return validateInternalPath("/" + segments.slice(1).join("/"), registry);
  }

  if (STATIC_PAGES.has(clean)) return { ok: true };

  const [first, ...rest] = segments;

  switch (first) {
    case "blog": {
      if (rest.length === 0) return { ok: true };
      const slug = rest[0];
      if (registry.blogSlugs.has(slug)) return { ok: true };
      if (registry.allPostSlugs.has(slug)) {
        return {
          ok: false,
          reason: `Blog post "${slug}" exists but is unpublished (draft) — this link would 404 for visitors. Publish the post, update the link to another live post, or remove it.`,
        };
      }
      return {
        ok: false,
        reason: `No blog post with slug "${slug}" exists. The post was renamed or removed.`,
      };
    }
    case "products": {
      if (rest.length === 0) return { ok: true };
      return registry.productSlugs.has(rest[0])
        ? { ok: true }
        : { ok: false, reason: `No product with slug "${rest[0]}" exists.` };
    }
    case "categories": {
      if (rest.length === 0) return { ok: true };
      return registry.categorySlugs.has(rest[0])
        ? { ok: true }
        : { ok: false, reason: `No category with slug "${rest[0]}" exists.` };
    }
    case "brands": {
      if (rest.length === 0) return { ok: true };
      const brandSlug = rest[0];
      if (!registry.brandSlugs.has(brandSlug)) {
        return {
          ok: false,
          reason: `No brand with slug "${brandSlug}" exists.`,
        };
      }
      if (rest.length === 1) return { ok: true };
      const second = rest[1];
      const allowed = registry.brandSecondSegments.get(brandSlug);
      if (allowed?.has(second)) return { ok: true };
      return {
        ok: false,
        reason: `"${second}" is not a valid category / subcategory of brand "${brandSlug}".`,
      };
    }
    case "solutions": {
      if (rest.length === 0) return { ok: true };
      return registry.solutionSlugs.has(rest[0])
        ? { ok: true }
        : { ok: false, reason: `No solution with slug "${rest[0]}" exists.` };
    }
    case "industries": {
      if (rest.length === 0) return { ok: true };
      return registry.industrySlugs.has(rest[0])
        ? { ok: true }
        : { ok: false, reason: `No industry with slug "${rest[0]}" exists.` };
    }
    case "countries": {
      if (rest.length === 0) return { ok: true };
      return registry.countrySlugs.has(rest[0])
        ? { ok: true }
        : {
            ok: false,
            reason: `No country page with slug "${rest[0]}" exists.`,
          };
    }
    case "images": {
      return existsSync(path.join(process.cwd(), "public", clean))
        ? { ok: true }
        : {
            ok: false,
            reason: `Image file is missing at public${clean}. Add it or the build fails.`,
          };
    }
    default:
      return {
        ok: false,
        reason: `"${clean}" is not a known Servchip page.`,
      };
  }
}

/* ------------------------------------------------------------------ */
/* Fix suggestions (closest live candidates)                          */
/* ------------------------------------------------------------------ */

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, (_, i) => [i]);
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[m][n];
}

function bestMatches(
  target: string,
  candidates: string[],
  limit = 3,
): string[] {
  const token = (s: string) =>
    s
      .toLowerCase()
      .split(/[-_ ]+/)
      .filter(Boolean)
      .join(" ");
  const targetTokens = new Set(token(target).split(" "));
  return candidates
    .map((c) => {
      const cTokens = token(c).split(" ");
      const overlap = cTokens.filter((t) => targetTokens.has(t)).length;
      const distance = levenshtein(target.toLowerCase(), c.toLowerCase());
      // Prefer candidates sharing meaningful keyword tokens; then closer edit distance.
      return { c, score: overlap * 2 - distance };
    })
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.c);
}

function buildSuggestion(pathName: string, registry: RouteRegistry): string {
  const segments = pathName.split("/").filter(Boolean);
  const family = segments[0];
  const wanted = segments[segments.length - 1] ?? "";
  let candidates: string[] = [];

  switch (family) {
    case "blog":
      candidates = [...registry.blogSlugs];
      break;
    case "products":
      candidates = [...registry.productSlugs];
      break;
    case "categories":
      candidates = [...registry.categorySlugs];
      break;
    case "brands":
      candidates = [...registry.brandSecondSegments.keys()];
      break;
    case "solutions":
      candidates = [...registry.solutionSlugs];
      break;
    case "industries":
      candidates = [...registry.industrySlugs];
      break;
    case "countries":
      candidates = [...registry.countrySlugs];
      break;
    default:
      candidates = [];
  }

  if (family === "brands") {
    const brandSlug = segments[1];
    const extra = brandSlug
      ? registry.brandSecondSegments.get(brandSlug)
      : undefined;
    const best = bestMatches(wanted, [...(extra ?? [])], 3);
    if (best.length) {
      return `Replace with one of: ${best.map((c) => `/brands/${brandSlug}/${c}`).join(", ")}.`;
    }
  }

  const best = bestMatches(wanted, candidates, 3);
  if (best.length) {
    return `Replace with one of: ${best.map((c) => `/${family}/${c}`).join(", ")}.`;
  }
  return "Update this link to a current live URL (or remove it).";
}

/* ------------------------------------------------------------------ */
/* Slug → source file map (for precise "where" reporting)             */
/* ------------------------------------------------------------------ */

function buildSlugToFileMap(): Map<string, string> {
  const dir = path.join(process.cwd(), "src", "blog", "posts");
  const map = new Map<string, string>();
  for (const file of readdirSync(dir)) {
    if (!/\.(ts|tsx)$/.test(file)) continue;
    const content = readFileSync(path.join(dir, file), "utf8");
    const m = content.match(/slug\s*:\s*"([^"]+)"/);
    if (m) map.set(m[1], `src/blog/posts/${file}`);
  }
  return map;
}

/* ------------------------------------------------------------------ */
/* Issue collection                                                    */
/* ------------------------------------------------------------------ */

function collectPostIssues(
  post: BlogPost,
  registry: RouteRegistry,
  fileBySlug: Map<string, string>,
): LinkIssue[] {
  const issues: LinkIssue[] = [];
  const file = fileBySlug.get(post.slug) ?? "src/blog/posts/?";
  const title = `${post.title}${post.isPublished ? "" : "  (DRAFT — not live yet)"}`;

  const addIssue = (
    section: string,
    block: string | undefined,
    link: string,
    reason: string,
    linkText?: string,
    suggestion?: string,
  ) => {
    issues.push({
      postTitle: title,
      postSlug: post.slug,
      file,
      section,
      block,
      link,
      linkText,
      reason,
      suggestion:
        suggestion ?? buildSuggestion(link.split(/[?#]/)[0], registry),
    });
  };

  const checkUrl = (
    url: string,
    section: string,
    block: string | undefined,
    linkText?: string,
  ) => {
    if (!isInternalUrl(url)) return;
    const result = validateInternalPath(url, registry);
    if (!result.ok) addIssue(section, block, url, result.reason, linkText);
  };

  const checkMarkdown = (
    text: string,
    section: string,
    block: string | undefined,
  ) => {
    for (const { text: anchor, href, isImage } of findMarkdownLinks(text)) {
      checkUrl(href, section, block, isImage ? undefined : anchor);
    }
  };

  const checkBlock = (block: unknown, section: string, blockLabel: string) => {
    if (!block || typeof block !== "object") return;
    const b = block as Record<string, unknown>;

    switch (b.type) {
      case "paragraph":
      case "heading":
      case "callout":
        checkMarkdown(String(b.text ?? ""), section, blockLabel);
        break;
      case "bulletList":
      case "numberedList":
        for (const item of (b.items as string[] | undefined) ?? []) {
          checkMarkdown(item, section, blockLabel);
        }
        break;
      case "table": {
        const rows: string[][] = [
          ...((b.headers as string[] | undefined) ?? []).map(
            (h) => [h] as string[],
          ),
          ...((b.rows as string[][] | undefined) ?? []),
        ];
        for (const row of rows) {
          for (const cell of row) checkMarkdown(cell, section, blockLabel);
        }
        break;
      }
      case "faq":
        for (const item of (b.items as
          { question?: string; answer?: string }[] | undefined) ?? []) {
          checkMarkdown(item.question ?? "", section, blockLabel);
          checkMarkdown(item.answer ?? "", section, blockLabel);
        }
        break;
      case "linkList":
        for (const link of (b.links as
          { text?: string; href?: string }[] | undefined) ?? []) {
          if (link.href) checkUrl(link.href, section, blockLabel, link.text);
        }
        break;
      case "image":
        if (typeof b.src === "string") checkUrl(b.src, section, blockLabel);
        break;
      case "html":
        for (const attr of findHtmlAttributes(String(b.html ?? ""))) {
          checkUrl(attr, section, blockLabel);
        }
        break;
      default:
        break;
    }
  };

  /* ---- SEO / metadata -------------------------------------------- */
  if (post.seo?.canonicalUrl) {
    const expected = `https://servchip.com/blog/${post.slug}`;
    if (
      post.seo.canonicalUrl !== expected &&
      post.seo.canonicalUrl !== `${expected}/`
    ) {
      addIssue(
        "SEO metadata",
        "canonicalUrl",
        post.seo.canonicalUrl,
        `Canonical URL should be exactly ${expected} (this post's own URL).`,
        undefined,
        `Change seo.canonicalUrl to ${expected}.`,
      );
    }
  }

  if (post.featuredImage) {
    if (!post.featuredImage.startsWith("/")) {
      addIssue(
        "SEO metadata",
        "featuredImage",
        post.featuredImage,
        "featuredImage must be a site-relative path starting with '/'. Move the image into public/.",
      );
    } else if (
      !existsSync(path.join(process.cwd(), "public", post.featuredImage))
    ) {
      addIssue(
        "SEO metadata",
        "featuredImage",
        post.featuredImage,
        `Image file is missing at public${post.featuredImage}.`,
      );
    }
  }

  for (const productId of post.relatedProductIds ?? []) {
    const product = getProductById(productId);
    if (!product) {
      addIssue(
        "SEO metadata",
        "relatedProductIds",
        productId,
        `relatedProductId "${productId}" does not match any product in src/data/products.`,
        undefined,
        "Fix the id, or remove it from relatedProductIds.",
      );
    }
  }

  for (const postId of post.relatedPostIds ?? []) {
    const related = BLOG_POSTS.find((p) => p.id === postId);
    if (!related) {
      addIssue(
        "SEO metadata",
        "relatedPostIds",
        postId,
        `relatedPostId "${postId}" does not match any blog post.`,
        undefined,
        "Fix the id, or remove it from relatedPostIds.",
      );
    } else if (!related.isPublished) {
      addIssue(
        "SEO metadata",
        "relatedPostIds",
        postId,
        `related post "${related.slug}" is a draft — visitors cannot see it.`,
      );
    }
  }

  /* ---- Intro / excerpt content ----------------------------------- */
  checkMarkdown(post.content ?? "", "Intro content", undefined);

  /* ---- Sections --------------------------------------------------- */
  for (const [sectionIndex, section] of (post.sections ?? []).entries()) {
    const sectionLabel = section.heading || `Section #${sectionIndex + 1}`;

    for (const paragraph of section.paragraphs ?? []) {
      checkMarkdown(paragraph, sectionLabel, "paragraphs[]");
    }
    for (const bullet of section.bullets ?? []) {
      checkMarkdown(bullet, sectionLabel, "bullets[]");
    }
    for (const [blockIndex, blockContent] of (
      section.content ?? []
    ).entries()) {
      checkBlock(
        blockContent,
        sectionLabel,
        `block #${blockIndex + 1} (${blockLabel(blockContent)})`,
      );
    }
  }

  return issues;
}

function blockLabel(block: unknown): string {
  if (
    block &&
    typeof block === "object" &&
    "type" in (block as Record<string, unknown>)
  ) {
    return String((block as Record<string, unknown>).type);
  }
  return "unknown";
}

/* ------------------------------------------------------------------ */
/* Public entry point                                                 */
/* ------------------------------------------------------------------ */

export function checkInternalLinks(): LinkIssue[] {
  const registry = buildRouteRegistry();
  const fileBySlug = buildSlugToFileMap();
  const issues: LinkIssue[] = [];
  for (const post of BLOG_POSTS) {
    issues.push(...collectPostIssues(post, registry, fileBySlug));
  }
  return issues;
}

export function formatIssue(issue: LinkIssue): string {
  return [
    `❌ ${issue.postTitle}  [${issue.file}]`,
    `   Where : ${issue.section}${issue.block ? `  ›  ${issue.block}` : ""}`,
    `   Link  : ${issue.linkText ? `"${issue.linkText}" → ` : ""}${issue.link}`,
    `   Why   : ${issue.reason}`,
    `   Fix   : ${issue.suggestion}`,
  ].join("\n");
}
