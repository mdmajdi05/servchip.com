"use client";

import { useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock, Tag, ImageIcon } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { BLOG_POSTS } from "@/blog";

const LATEST_POSTS = [...BLOG_POSTS]
  .sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  )
  .slice(0, 3);

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function LatestInsights() {
  const [failedImgs, setFailedImgs] = useState<Set<string>>(new Set());

  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Latest Insights"
          title="Technical Resources & Industry Analysis"
          subtitle="Stay ahead with expert articles on chip technology and computing trends"
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {LATEST_POSTS.map((post) => (
            <div key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-surface border border-border rounded-xl h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-transform duration-300 overflow-hidden"
              >
                {post.featuredImage && !failedImgs.has(post.slug) ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      unoptimized
                      onError={() =>
                        setFailedImgs((prev) => new Set(prev).add(post.slug))
                      }
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-bg-dark to-surface-2 flex items-center justify-center">
                    <ImageIcon className="w-10 h-10 text-primary/20" />
                  </div>
                )}
                <div className="p-6">
                  <Badge variant="cyan" size="sm" className="mb-3">
                    <Tag className="w-3 h-3 mr-1" />
                    {post.category.name}
                  </Badge>
                  <h3 className="text-base font-bold text-text mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-text-dim">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="text-primary flex items-center gap-0.5 hover:underline">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            View All Articles <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
