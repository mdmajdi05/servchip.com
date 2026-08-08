import type { BlogCategory, BlogTag } from "./types";

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "architecture",
    name: "Architecture",
    slug: "architecture",
    description: "Deep dives into chip architectures",
    postCount: 4,
  },
  {
    id: "comparison",
    name: "Comparison",
    slug: "comparison",
    description: "Side-by-side chip comparisons",
    postCount: 4,
  },
  {
    id: "deployment",
    name: "Deployment",
    slug: "deployment",
    description: "Deployment guides and best practices",
    postCount: 3,
  },
  {
    id: "guides",
    name: "Guides",
    slug: "guides",
    description: "Technical guides and tutorials",
    postCount: 6,
  },
  {
    id: "case-studies",
    name: "Case Studies",
    slug: "case-studies",
    description: "Real-world deployment stories",
    postCount: 2,
  },
];

export const BLOG_TAGS: BlogTag[] = [
  { id: "ai-training", name: "AI Training", slug: "ai-training" },
  { id: "inference", name: "Inference", slug: "inference" },
  { id: "hpc", name: "HPC", slug: "hpc" },
  { id: "data-center", name: "Data Center", slug: "data-center" },
  { id: "deployment", name: "Deployment", slug: "deployment" },
  { id: "edge", name: "Edge Computing", slug: "edge" },
  { id: "nvidia", name: "NVIDIA", slug: "nvidia" },
  { id: "amd", name: "AMD", slug: "amd" },
  { id: "intel", name: "Intel", slug: "intel" },
  { id: "networking", name: "Networking", slug: "networking" },
  { id: "storage", name: "Storage", slug: "storage" },
  { id: "memory", name: "Memory", slug: "memory" },
];

export function cat(slug: string): BlogCategory {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)!;
}

export function tag(slug: string): BlogTag {
  return BLOG_TAGS.find((t) => t.slug === slug)!;
}
