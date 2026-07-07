"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { INSIGHT_POSTS } from "@/data/home";

export function LatestInsights() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Latest Insights"
          title="Technical Resources & Industry Analysis"
          subtitle="Stay ahead with expert articles on NVIDIA technology and computing trends"
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-6">
          {INSIGHT_POSTS.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug}`}
                className="block bg-surface border border-border rounded-xl p-6 h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <Badge variant="cyan" size="sm" className="mb-3">
                  <Tag className="w-3 h-3 mr-1" />
                  {post.category}
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
                    {post.date}
                  </span>
                  <span className="text-primary flex items-center gap-0.5 hover:underline">
                    Read <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.div>
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
