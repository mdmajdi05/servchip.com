"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { BLOG_POSTS } from "@/data/blog";

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

const CATEGORY_BADGE: Record<string, "green" | "cyan" | "purple" | "amber"> = {
  architecture: "purple",
  comparison: "cyan",
  deployment: "green",
  guides: "amber",
  "case-studies": "green",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category.slug === activeCategory);

  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <SectionHeading
          label="Blog"
          title="Technical Insights & Industry Analysis"
          subtitle="Expert articles on AI accelerators, architecture comparisons, and deployment guides"
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categorySlugs.map((slug) => (
            <button
              key={slug}
              onClick={() => setActiveCategory(slug)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border",
                activeCategory === slug
                  ? "bg-primary/15 border-primary text-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
                  : "bg-surface border-border text-text-muted hover:border-primary/30 hover:text-text",
              )}
            >
              {CATEGORY_LABELS[slug] || slug}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPosts.map((post) => (
              <motion.div key={post.id} variants={cardVariants} layout>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block h-full"
                >
                  <article className="h-full rounded-xl border border-border bg-surface p-6 transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_8%,transparent)] group-hover:-translate-y-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <Badge
                        variant={
                          CATEGORY_BADGE[post.category.slug] || "default"
                        }
                        size="sm"
                      >
                        {post.category.name}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-text mb-3 leading-snug transition-colors duration-300 group-hover:text-primary line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-sm text-text-muted leading-relaxed mb-5 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-2 border border-border flex items-center justify-center">
                          <User className="w-4 h-4 text-text-dim" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs text-text-muted">
                            {post.publishedAt}
                          </span>
                          <span className="text-xs text-text-dim flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} min read
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-text-dim transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" />
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredPosts.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-text-dim text-sm mt-16"
          >
            No articles found in this category yet. Check back soon.
          </motion.p>
        )}
      </div>
    </div>
  );
}
