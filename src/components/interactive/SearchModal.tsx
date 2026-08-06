"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Command,
  Cpu,
  Server,
  Network,
  MemoryStick,
  HardDrive,
  Loader2,
  FileText,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { searchProducts, searchBlogPosts } from "@/data/search";
import { useCountryPrefix } from "@/lib/useCountryPrefix";
import type { ProductType } from "@/types";
const TYPE_ICON: Record<ProductType, typeof Cpu> = {
  chip: Cpu,
  server: Server,
  networking: Network,
  memory: MemoryStick,
  storage: HardDrive,
};
const TYPE_LABEL: Record<ProductType, string> = {
  chip: "Chip",
  server: "Server",
  networking: "Networking",
  memory: "Memory",
  storage: "Storage",
};
export interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const prefix = useCountryPrefix();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const { products, blogPosts } = useMemo(() => {
    if (query.length < 2) return { products: [], blogPosts: [] };
    return {
      products: searchProducts(query),
      blogPosts: searchBlogPosts(query),
    };
  }, [query]);

  const totalResults = products.length + blogPosts.length;

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedIndex(0);
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setLoading(false), 200);
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          onOpenChange(true);
          setSelectedIndex(0);
        } else {
          onOpenChange(!open);
        }
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);
  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  }
  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (totalResults === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % totalResults);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalResults) % totalResults);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const productCount = products.length;
      if (selectedIndex < productCount) {
        const { product } = products[selectedIndex];
        if (product) {
          window.location.href = `/products/${product.slug}`;
          onOpenChange(false);
        }
      } else {
        const blogIndex = selectedIndex - productCount;
        const post = blogPosts[blogIndex];
        if (post) {
          window.location.href = `/blog/${post.slug}`;
          onOpenChange(false);
        }
      }
    }
  }
  useEffect(() => {
    if (listRef.current && totalResults > 0) {
      const item = listRef.current.children[selectedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, totalResults]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] bg-bg-dark/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="w-full max-w-xl mx-4 bg-surface border border-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-text-dim flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search products, blog posts, guides..."
                aria-label="Search products and blog posts"
                className="flex-1 bg-transparent text-base text-text placeholder-text-dim outline-none"
              />
              {loading && query.length >= 2 && (
                <Loader2 className="w-4 h-4 text-text-dim animate-spin" />
              )}
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-text-dim bg-bg-dark rounded-md border border-border">
                <Command className="w-3 h-3" />K
              </kbd>
              {query && !loading && (
                <button
                  onClick={() => handleQueryChange("")}
                  aria-label="Clear search"
                  className="text-text-dim hover:text-text transition-transform p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div
              ref={listRef}
              className="max-h-[400px] overflow-y-auto overscroll-contain"
            >
              {query.length >= 2 && totalResults === 0 && !loading && (
                <div className="px-5 py-10 text-center">
                  <Package className="w-8 h-8 text-text-dim mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-text-muted">
                    No results found for &ldquo;
                    <span className="text-text font-medium">{query}</span>
                    &rdquo;
                  </p>
                  <p className="text-xs text-text-dim mt-1">
                    Try a different search term
                  </p>
                </div>
              )}
              {query.length < 2 && (
                <div className="px-5 py-10 text-center">
                  <Search className="w-8 h-8 text-text-dim mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-text-muted">
                    Type at least 2 characters to search
                  </p>
                  <p className="text-xs text-text-dim mt-1">
                    Search across all products, blog posts, and guides
                  </p>
                </div>
              )}
              {loading && query.length >= 2 && (
                <div className="px-5 py-10 text-center">
                  <Loader2 className="w-8 h-8 text-text-dim mx-auto mb-3 animate-spin" />
                  <p className="text-sm text-text-muted">Searching...</p>
                </div>
              )}
              {!loading && products.length > 0 && (
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim bg-bg-dark/50">
                  Products ({products.length})
                </div>
              )}
              {!loading &&
                products.map(({ product, type }, i) => {
                  const Icon = TYPE_ICON[type];
                  return (
                    <Link
                      key={`p-${product.id}`}
                      href={`${prefix}/products/${product.slug}`}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "flex items-center gap-4 px-5 py-3.5 transition-transform",
                        i === selectedIndex
                          ? "bg-primary/10 text-text"
                          : "text-text-muted hover:bg-bg-dark hover:text-text",
                      )}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">
                            {product.name}
                          </span>
                          <span
                            className={cn(
                              "shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded",
                              "bg-primary/15 text-primary",
                            )}
                          >
                            {TYPE_LABEL[type]}
                          </span>
                        </div>
                        <div className="text-xs text-text-dim mt-0.5">
                          {product.manufacturer} &middot; {product.series}
                        </div>
                      </div>
                      <span className="text-[11px] text-text-dim flex-shrink-0 hidden sm:inline">
                        &crarr;
                      </span>
                    </Link>
                  );
                })}
              {!loading && blogPosts.length > 0 && (
                <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim bg-bg-dark/50 border-t border-border">
                  Blog Posts ({blogPosts.length})
                </div>
              )}
              {!loading &&
                blogPosts.map((post, i) => {
                  const idx = products.length + i;
                  return (
                    <Link
                      key={`b-${post.slug}`}
                      href={`${prefix}/blog/${post.slug}`}
                      onClick={() => onOpenChange(false)}
                      className={cn(
                        "flex items-center gap-4 px-5 py-3.5 transition-transform",
                        idx === selectedIndex
                          ? "bg-primary/10 text-text"
                          : "text-text-muted hover:bg-bg-dark hover:text-text",
                      )}
                    >
                      <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium truncate">
                            {post.title}
                          </span>
                          <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                            Blog
                          </span>
                        </div>
                        <div className="text-xs text-text-dim mt-0.5 truncate">
                          {post.category}
                        </div>
                      </div>
                      <span className="text-[11px] text-text-dim flex-shrink-0 hidden sm:inline">
                        &crarr;
                      </span>
                    </Link>
                  );
                })}
            </div>
            {totalResults > 0 && (
              <div className="flex items-center gap-4 px-5 py-2.5 border-t border-border bg-bg-dark/50">
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">
                    &uarr;
                  </kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">
                    &darr;
                  </kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">
                    &crarr;
                  </kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim ml-auto">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">
                    esc
                  </kbd>
                  <span>close</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
