import type { BlogPost } from "./types";
import { BLOG_POSTS } from "./posts";

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category.slug === categorySlug);
}

export function getBlogPostsByTag(tagSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.tags.some((t) => t.slug === tagSlug));
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.isPublished).slice(0, 3);
}

export function getRelatedBlogPosts(postId: string, count = 3): BlogPost[] {
  const post = BLOG_POSTS.find((p) => p.id === postId);
  if (!post) return [];
  const related = post.relatedPostIds
    ? post.relatedPostIds
        .map((id) => BLOG_POSTS.find((p) => p.id === id))
        .filter(Boolean)
    : BLOG_POSTS.filter((p) => p.id !== postId).slice(0, count);
  return related as BlogPost[];
}
