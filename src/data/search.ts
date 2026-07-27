import {
  ALL_CHIP_PRODUCTS,
  ALL_SERVERS,
  ALL_NETWORKING_PRODUCTS,
  ALL_MEMORY,
  ALL_STORAGE,
} from "./products/index";
import type { ProductType, AnyProduct } from "@/types";
import { BLOG_POSTS } from "@/blog";
import type { BlogPost } from "@/blog/types";

export interface SearchResult {
  product: AnyProduct;
  type: ProductType;
  score: number;
}

export interface BlogSearchResult {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  score: number;
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function levenshtein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b[i - 1] === a[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1,
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

function wordMatch(
  queryWords: string[],
  targetWords: string[],
): { match: boolean; score: number } {
  let totalScore = 0;
  let anyMatch = false;
  for (const qw of queryWords) {
    let best = 0;
    for (const tw of targetWords) {
      if (tw === qw) {
        best = 100;
        break;
      }
      if (tw.startsWith(qw)) {
        best = Math.max(best, 80);
      }
      if (tw.includes(qw)) {
        best = Math.max(best, 60);
      }
      if (qw.includes(tw) && tw.length >= 3) {
        best = Math.max(best, 40);
      }
      const dist = levenshtein(qw, tw);
      if (dist <= 1) best = Math.max(best, 70);
      else if (dist <= 2) best = Math.max(best, 50);
    }
    if (best > 0) anyMatch = true;
    totalScore += best;
  }
  return { match: anyMatch, score: totalScore / queryWords.length };
}

function searchFields(
  texts: string[],
  queryWords: string[],
): { match: boolean; score: number } {
  const allWords: string[] = [];
  for (const t of texts) allWords.push(...tokenize(t));
  return wordMatch(queryWords, allWords);
}

function getProductSearchFields(product: AnyProduct): string[] {
  const fields = [
    product.name,
    product.manufacturer,
    product.series,
    product.description,
  ];
  const rec = product as unknown as Record<string, unknown>;
  if (typeof rec.architecture === "string") fields.push(rec.architecture);
  if (typeof rec.categoryName === "string") fields.push(rec.categoryName);
  if (typeof rec.bestFor === "string") fields.push(rec.bestFor);
  if (Array.isArray(rec.keyFeatures))
    fields.push(...(rec.keyFeatures as string[]));
  if (Array.isArray(rec.useCases)) fields.push(...(rec.useCases as string[]));
  if (typeof rec.longDescription === "string") fields.push(rec.longDescription);
  return fields.filter(Boolean);
}

function getBlogSearchFields(post: BlogPost): string[] {
  const fields = [
    post.title,
    post.excerpt,
    post.seo.metaTitle,
    post.seo.focusKeyword || "",
    post.category.name,
    ...post.tags.map((t) => t.name),
  ];
  if (post.sections) {
    for (const s of post.sections) {
      fields.push(s.heading);
      if (s.content) {
        for (const c of s.content) {
          if (c.type === "paragraph" || c.type === "heading")
            fields.push(c.text);
          if (c.type === "bulletList" || c.type === "numberedList")
            fields.push(...c.items);
          if (c.type === "faq")
            for (const faq of c.items) fields.push(faq.question, faq.answer);
          if (c.type === "code") fields.push(c.code);
          if (c.type === "callout") fields.push(c.text);
        }
      }
    }
  }
  return fields.filter(Boolean);
}

export function searchProducts(query: string): SearchResult[] {
  if (query.length < 2) return [];
  const queryWords = tokenize(query);
  const results: SearchResult[] = [];

  function evaluate(product: AnyProduct, type: ProductType): void {
    const fields = getProductSearchFields(product);
    const { match, score } = searchFields(fields, queryWords);
    if (match) results.push({ product, type, score });
  }

  for (const p of ALL_CHIP_PRODUCTS) evaluate(p, "chip");
  for (const p of ALL_SERVERS) evaluate(p, "server");
  for (const p of ALL_NETWORKING_PRODUCTS) evaluate(p, "networking");
  for (const p of ALL_MEMORY) evaluate(p, "memory");
  for (const p of ALL_STORAGE) evaluate(p, "storage");

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function searchBlogPosts(query: string): BlogSearchResult[] {
  if (query.length < 2) return [];
  const queryWords = tokenize(query);
  const results: BlogSearchResult[] = [];

  for (const post of BLOG_POSTS) {
    const fields = getBlogSearchFields(post);
    const { match, score } = searchFields(fields, queryWords);
    if (match) {
      results.push({
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        category: post.category.name,
        score,
      });
    }
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

export function searchAll(query: string): {
  products: SearchResult[];
  blogPosts: BlogSearchResult[];
} {
  return {
    products: searchProducts(query),
    blogPosts: searchBlogPosts(query),
  };
}
