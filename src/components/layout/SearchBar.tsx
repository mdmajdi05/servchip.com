"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  X,
  Loader2,
  Cpu,
  Server,
  Network,
  MemoryStick,
  HardDrive,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { searchProducts, searchBlogPosts } from "@/data/search";
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
export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debounced, setDebounced] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(query), 300);
    return () => clearTimeout(timer);
  }, [query]);
  const loading = query.length >= 2 && query !== debounced;
  const products = searchProducts(debounced).slice(0, 6);
  const blogPosts = searchBlogPosts(debounced).slice(0, 3);
  const hasResults = products.length > 0 || blogPosts.length > 0;
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        open
      )
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);
  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "p-2 rounded-lg transition-transform",
          open
            ? "text-primary bg-primary/10"
            : "text-text-muted hover:text-text hover:bg-surface",
        )}
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </button>
        {open && (
          <div
            className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-text-dim" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products & blog..."
                aria-label="Search products and blog"
                className="flex-1 bg-transparent text-sm text-text placeholder-text-dim outline-none"
              />
              {loading && query.length >= 2 && (
                <Loader2 className="w-3.5 h-3.5 text-text-dim animate-spin" />
              )}
              {query && !loading && (
                <button
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-text-dim hover:text-text"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {loading && query.length >= 2 && (
                <p className="px-4 py-6 text-center text-text-dim text-xs">Searching...</p>
              )}
              {!loading && debounced.length >= 2 && !hasResults && (
                <p className="px-4 py-6 text-center text-text-dim text-xs">
                  No results found
                </p>
              )}
              {!loading && products.length > 0 && (
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
                  Products ({products.length})
                </div>
              )}
              {!loading && products.map(({ product, type }) => {
                const Icon = TYPE_ICON[type];
                return (
                  <Link
                    key={`p-${product.id}`}
                    href={`/products/${product.slug}`}
                    onClick={() => {
                      setOpen(false);
                      setQuery("");
                      setDebounced("");
                    }}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-bg-dark transition-transform"
                  >
                    <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm text-text font-medium truncate">
                          {product.name}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 text-[8px] font-bold uppercase tracking-wider px-1 py-0.5 rounded",
                            "bg-primary/15 text-primary",
                          )}
                        >
                          {TYPE_LABEL[type]}
                        </span>
                      </div>
                      <div className="text-xs text-text-dim mt-0.5 truncate">
                        {product.manufacturer}
                      </div>
                    </div>
                  </Link>
                );
              })}
              {!loading && blogPosts.length > 0 && (
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-text-dim border-t border-border">
                  Blog Posts ({blogPosts.length})
                </div>
              )}
              {!loading && blogPosts.map((post) => (
                <Link
                  key={`b-${post.slug}`}
                  href={`/blog/${post.slug}`}
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    setDebounced("");
                  }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-bg-dark transition-transform"
                >
                  <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5 text-primary" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm text-text font-medium truncate block">
                      {post.title}
                    </span>
                    <span className="text-xs text-text-dim truncate block">
                      {post.category}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
    </div>
  );
}
