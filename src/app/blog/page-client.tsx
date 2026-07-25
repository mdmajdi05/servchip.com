"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BLOG_POSTS } from "@/blog";
import { CategoryFilter } from "@/blog/components/CategoryFilter";
import { BlogCard } from "@/blog/components/BlogCard";
import { Search, X, Loader2, SlidersHorizontal, ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Relevance", value: "relevance" },
] as const;

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setDebouncedSearch(searchQuery), 200);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [searchQuery]);

  const isSearching = searchQuery !== debouncedSearch && searchQuery.length >= 1;

  const filteredPosts = useMemo(() => {
    let posts = BLOG_POSTS.filter((p) => {
      const catMatch = activeCategory === "All" || p.category.slug === activeCategory;
      if (!debouncedSearch) return catMatch;
      const q = debouncedSearch.toLowerCase();
      const searchMatch =
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.name.toLowerCase().includes(q)) ||
        p.seo.focusKeyword?.toLowerCase().includes(q) ||
        p.seo.metaTitle.toLowerCase().includes(q) ||
        p.category.name.toLowerCase().includes(q) ||
        (p.sections || []).some((s) =>
          s.heading.toLowerCase().includes(q) ||
          (s.content || []).some((c) => {
            if (c.type === "paragraph" || c.type === "heading") return c.text.toLowerCase().includes(q);
            if (c.type === "callout") return c.text.toLowerCase().includes(q);
            if (c.type === "bulletList" || c.type === "numberedList") return c.items.some((i) => i.toLowerCase().includes(q));
            if (c.type === "faq") return c.items.some((f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q));
            if (c.type === "code") return c.code.toLowerCase().includes(q);
            return false;
          })
        );
      return catMatch && searchMatch;
    });

    if (sortBy === "oldest") {
      posts = [...posts].sort((a, b) => a.publishedAt.localeCompare(b.publishedAt));
    } else if (sortBy === "newest") {
      posts = [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
    }

    return posts;
  }, [activeCategory, debouncedSearch, sortBy]);

  const resultCount = filteredPosts.length;
  const showNoResults = !isSearching && debouncedSearch.length >= 2 && resultCount === 0;

  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h1 className="sr-only">Technical Insights &amp; Industry Analysis</h1>
        <SectionHeading
          label="Blog"
          title="Technical Insights & Industry Analysis"
          subtitle="Expert articles on AI accelerators, architecture comparisons, and deployment guides"
          align="center"
        />

        <div className="max-w-2xl mx-auto mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by title, topic, keyword, or category..."
              aria-label="Search blog posts"
              className="w-full pl-12 pr-12 py-3.5 text-base bg-surface border border-border rounded-xl text-text placeholder-text-dim outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
            />
            {isSearching && (
              <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim animate-spin" />
            )}
            {searchQuery && !isSearching && (
              <button
                onClick={() => { setSearchQuery(""); setDebouncedSearch(""); inputRef.current?.focus(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-dim hover:text-text transition-colors p-1"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {debouncedSearch && !isSearching && (
            <p className="text-sm text-text-dim text-center">
              {resultCount > 0
                ? `Found ${resultCount} article${resultCount !== 1 ? "s" : ""} matching "${debouncedSearch}"`
                : `No articles found for "${debouncedSearch}"`}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <CategoryFilter
              active={activeCategory}
              onChange={setActiveCategory}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                  showFilters || sortBy !== "newest"
                    ? "border-primary/30 text-primary bg-primary/5"
                    : "border-border text-text-muted hover:text-text hover:border-border/60"
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Sort
                <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="flex flex-wrap items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl">
              <span className="text-xs text-text-dim font-medium mr-1">Sort by:</span>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setSortBy(opt.value)}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${
                    sortBy === opt.value
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-text-muted border border-border hover:text-text hover:border-border/60"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div
          key={`${activeCategory}-${debouncedSearch}-${sortBy}`}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post) => (
            <div key={post.id}>
              <BlogCard post={post} />
            </div>
          ))}
        </div>

        {showNoResults && (
          <div className="text-center mt-16">
            <Search className="w-12 h-12 text-text-dim mx-auto mb-4 opacity-40" />
            <p className="text-text-muted text-base mb-1">No articles found</p>
            <p className="text-text-dim text-sm">
              Try a different search term, remove filters, or browse all categories.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
