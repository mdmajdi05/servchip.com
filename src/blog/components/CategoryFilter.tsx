"use client";

import { cn } from "@/lib/utils";
import { BLOG_POSTS } from "@/blog";

const categorySlugs = [
  "All",
  ...new Set(BLOG_POSTS.map((p) => p.category.slug)),
];

const CATEGORY_LABELS: Record<string, string> = {
  All: "All",
  architecture: "Architecture",
  comparison: "Comparison",
  deployment: "Deployment",
  guides: "Guides",
  "case-studies": "Case Studies",
};

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-12">
      {categorySlugs.map((slug) => (
        <button
          key={slug}
          onClick={() => onChange(slug)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-semibold transition-transform duration-300 border",
            active === slug
              ? "bg-primary/15 border-primary text-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
              : "bg-surface border-border text-text-muted hover:border-primary/30 hover:text-text",
          )}
        >
          {CATEGORY_LABELS[slug] || slug}
        </button>
      ))}
    </div>
  );
}
