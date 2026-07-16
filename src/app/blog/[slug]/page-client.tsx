"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft,
  Clock,
  Tag,
  User,
  ArrowRight,
  Lightbulb,
  Package,
} from "lucide-react";
import type {
  ChipProduct,
  ServerProduct,
  NetworkingProduct,
  MemoryProduct,
  StorageProduct,
} from "@/types";
import { BLOG_POSTS, getRelatedBlogPosts } from "@/data/blog";
import { getProductById } from "@/data/products";

function getProductSpec(
  product:
    | ChipProduct
    | ServerProduct
    | NetworkingProduct
    | MemoryProduct
    | StorageProduct,
): string {
  if ("specifications" in product && product.specifications)
    return product.specifications.memory || "";
  if ("specs" in product && product.specs) return product.specs.type || "";
  return "";
}

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
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  const relatedPosts = post ? getRelatedBlogPosts(post.id, 3) : [];
  const relatedProducts = post?.relatedProductIds
    ? post.relatedProductIds.map((id) => getProductById(id)).filter(Boolean)
    : [];

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-dark pt-[72px] lg:pt-[104px] flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-6xl font-black text-primary mb-4">404</h1>
            <p className="text-text-muted text-lg mb-8">
              Article not found. The page you are looking for does not exist or
              has been moved.
            </p>
            <Link href="/blog">
              <Button
                variant="outline"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                Back to Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px] lg:pt-[104px]">
      <motion.div
        className="max-w-4xl mx-auto px-4 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <Badge
            variant={CATEGORY_BADGE[post.category.slug] || "default"}
            size="md"
          >
            {post.category.name}
          </Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl lg:text-5xl font-black text-text leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-5 text-sm text-text-muted mb-10 pb-6 border-b border-border"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span>{post.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>
              {post.publishedAt} &middot; {post.readingTime} min read
            </span>
          </div>
        </motion.div>

        {post.sections && post.sections.length > 0 && (
          <div className="space-y-10">
            {post.sections.map((section, idx) => (
              <motion.div key={idx} variants={itemVariants}>
                <h3 className="text-xl lg:text-2xl font-bold text-text mb-4">
                  {section.heading}
                </h3>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-text-muted leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="space-y-2 mt-4">
                    {section.bullets.map((b, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-text-muted"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {post.sections && post.sections.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-10 p-5 rounded-xl border border-primary/30 bg-primary/5"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-text text-sm mb-1">
                  Key Takeaway
                </p>
                <p className="text-text-muted text-sm leading-relaxed">
                  Contact our engineering team for free technical consultation
                  and workload-specific benchmarking across all accelerator
                  platforms.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="mt-10 pt-6 border-t border-border"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            {post.tags.map((t) => (
              <span
                key={t.id}
                className="px-3 py-1 text-xs font-medium text-text-muted bg-surface rounded-full border border-border"
              >
                {t.name}
              </span>
            ))}
          </div>
        </motion.div>

        {relatedProducts.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16">
            <SectionHeading
              title="Related Products"
              subtitle="Browse chips and systems mentioned in this article"
              align="left"
            />
            <div className="grid md:grid-cols-3 gap-4 mt-8">
              {relatedProducts.slice(0, 6).map((product) => (
                <Link
                  key={product!.id}
                  href={`/products/${product!.slug}`}
                  className="group p-4 rounded-xl border border-border bg-surface hover:border-primary/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                    <Package className="w-5 h-5 text-primary" />
                  </div>
                  <h4 className="font-bold text-text text-sm leading-snug mb-1 group-hover:text-primary transition-colors duration-200">
                    {product!.name}
                  </h4>
                  <p className="text-text-muted text-xs line-clamp-2">
                    {getProductSpec(product!)}
                  </p>
                  <span className="text-xs text-primary font-medium mt-2 inline-block">
                    View Product →
                  </span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {relatedPosts.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16">
            <SectionHeading
              title="Related Articles"
              subtitle="Continue exploring our technical library"
              align="left"
            />
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.id} href={`/blog/${rp.slug}`}>
                  <div className="group p-5 rounded-xl border border-border bg-surface hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                    <Badge
                      variant={CATEGORY_BADGE[rp.category.slug] || "default"}
                      size="sm"
                      className="mb-3"
                    >
                      {rp.category.name}
                    </Badge>
                    <h4 className="font-bold text-text text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
                      {rp.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      {rp.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-3">
                      <Clock className="w-3 h-3" />
                      <span>{rp.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent text-center"
        >
          <h3 className="text-xl font-bold text-text mb-3">
            Need Help Choosing the Right Chip?
          </h3>
          <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">
            Our engineering team provides free technical consultations to help
            you select and deploy the optimal solution for your workload.
          </p>
          <Link href="/contact">
            <Button
              variant="solid"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Contact Our Team
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
