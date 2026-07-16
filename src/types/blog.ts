export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: BlogCategory;
  tags: BlogTag[];
  author: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  readingTime: number;
  publishedAt: string;
  updatedAt?: string;
  isPublished: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    focusKeyword?: string;
    canonicalUrl?: string;
    robots?: "index, follow" | "noindex, nofollow";
  };
  sections?: BlogSection[];
  relatedProductIds?: string[];
  relatedPostIds?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface BlogTag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogFilters {
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "newest" | "oldest" | "popular";
}
