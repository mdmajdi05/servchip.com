"use client";

import { useState, useEffect } from "react";
import type { AnyProduct, ProductType } from "@/types";

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

interface UseSiteSearchResult {
  products: SearchResult[];
  blogPosts: BlogSearchResult[];
}

interface CacheEntry {
  result: UseSiteSearchResult;
  query: string;
}

const EMPTY: UseSiteSearchResult = { products: [], blogPosts: [] };

/**
 * Lazily imports the (large) search data module only when a real query is
 * typed, so the full product catalog is not downloaded on first paint.
 * Results are cached for repeat queries.
 */
export function useSiteSearch(query: string): UseSiteSearchResult {
  const trimmed = query.trim();
  const [cache, setCache] = useState<CacheEntry | null>(null);

  useEffect(() => {
    if (trimmed.length < 2 || cache?.query === trimmed) return;
    let cancelled = false;
    const debounce = setTimeout(() => {
      import("@/data/search").then(
        ({ searchProducts, searchBlogPosts }) => {
          if (cancelled) return;
          setCache({
            result: {
              products: searchProducts(trimmed),
              blogPosts: searchBlogPosts(trimmed),
            },
            query: trimmed,
          });
        },
        () => {
          /* ignore load errors */
        },
      );
    }, 200);
    return () => {
      cancelled = true;
      clearTimeout(debounce);
    };
  }, [trimmed, cache]);

  if (trimmed.length < 2) return EMPTY;
  return cache?.query === trimmed ? cache.result : EMPTY;
}
