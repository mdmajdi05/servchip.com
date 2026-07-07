"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const categories = ["All", "Architecture", "Comparison", "Deployment", "Guides", "Case Studies"] as const;

const posts = [
  {
    slug: "blackwell-architecture-deep-dive",
    title: "Blackwell Architecture Deep Dive",
    category: "Architecture",
    excerpt:
      "An in-depth exploration of NVIDIA's next-generation Blackwell GPU architecture, covering the new tensor cores,第二代 Transformer Engine, and advancements in FP8 and FP4 precision for AI workloads.",
    date: "Jun 15, 2026",
    readTime: "8 min read",
  },
  {
    slug: "h100-vs-h200-vs-b200-choosing-the-right-ai-accelerator",
    title: "H100 vs H200 vs B200: Choosing the Right AI Accelerator",
    category: "Comparison",
    excerpt:
      "A comprehensive comparison of NVIDIA's flagship AI accelerators across performance metrics, memory bandwidth, price-to-performance ratios, and ideal use cases for each generation.",
    date: "Jun 10, 2026",
    readTime: "12 min read",
  },
  {
    slug: "the-role-of-mig-in-multi-tenant-gpu-deployments",
    title: "The Role of MIG in Multi-Tenant GPU Deployments",
    category: "Deployment",
    excerpt:
      "How Multi-Instance GPU partitioning enables efficient resource sharing, isolation, and cost optimization for cloud GPU providers and enterprise data centers running diverse AI workloads.",
    date: "Jun 5, 2026",
    readTime: "6 min read",
  },
  {
    slug: "cuda-optimization-guide-for-hopper-gpus",
    title: "CUDA Optimization Guide for Hopper GPUs",
    category: "Guides",
    excerpt:
      "Practical optimization techniques for Hopper H100 and H200 GPUs including warp matrix multiply-accumulate, async copy, thread block clusters, and DPX instruction set integration.",
    date: "May 28, 2026",
    readTime: "15 min read",
  },
  {
    slug: "nvidia-grace-cpu-superchip-architecture-overview",
    title: "NVIDIA Grace CPU Superchip: Architecture Overview",
    category: "Architecture",
    excerpt:
      "A detailed look at the Grace ARM-based CPU superchip, its NVLink-C2C interconnect, memory subsystem, and how it pairs with Hopper GPUs in the Grace Hopper superchip platform.",
    date: "May 20, 2026",
    readTime: "10 min read",
  },
  {
    slug: "building-a-production-ai-inference-pipeline",
    title: "Building a Production AI Inference Pipeline",
    category: "Case Studies",
    excerpt:
      "A real-world case study on deploying large language models at scale using NVIDIA Triton Inference Server, TensorRT-LLM, and multi-GPU configurations for sub-10ms latency.",
    date: "May 15, 2026",
    readTime: "7 min read",
  },
  {
    slug: "nvlink-50-whats-new-and-why-it-matters",
    title: "NVLink 5.0: What's New and Why It Matters",
    category: "Architecture",
    excerpt:
      "NVLink 5.0 brings 1.8 TB/s bidirectional bandwidth per GPU, shared memory coherence across 576 GPUs, and new topology flexibility that redefines multi-GPU system design.",
    date: "May 8, 2026",
    readTime: "5 min read",
  },
  {
    slug: "energy-efficiency-in-data-center-gpu-deployments",
    title: "Energy Efficiency in Data Center GPU Deployments",
    category: "Deployment",
    excerpt:
      "Strategies for optimizing power efficiency in GPU clusters including liquid cooling, dynamic voltage scaling, workload scheduling, and NVIDIA's power management SDK tools.",
    date: "May 1, 2026",
    readTime: "9 min read",
  },
];

function getBadgeVariant(category: string) {
  switch (category) {
    case "Architecture":
      return "green";
    case "Comparison":
      return "cyan";
    case "Deployment":
      return "purple";
    case "Guides":
      return "amber";
    case "Case Studies":
      return "green";
    default:
      return "default";
  }
}

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
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <SectionHeading
          label="Blog"
          title="Technical Insights & Industry Analysis"
          subtitle="Expert articles on NVIDIA technology, architecture comparisons, and deployment guides"
          align="center"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border",
                activeCategory === category
                  ? "bg-primary/15 border-primary text-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
                  : "bg-surface border-border text-text-muted hover:border-primary/30 hover:text-text"
              )}
            >
              {category}
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
              <motion.div key={post.slug} variants={cardVariants} layout>
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full rounded-xl border border-border bg-surface p-6 transition-all duration-300 group-hover:border-primary/25 group-hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_8%,transparent)] group-hover:-translate-y-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <Badge variant={getBadgeVariant(post.category)} size="sm">
                        {post.category}
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
                          <span className="text-xs text-text-muted">{post.date}</span>
                          <span className="text-xs text-text-dim flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
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
