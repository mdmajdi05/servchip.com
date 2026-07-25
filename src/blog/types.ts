export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string; level?: 2 | 3 }
  | { type: "bulletList"; items: string[] }
  | { type: "numberedList"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "code"; language: string; code: string }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "callout"; variant: "tip" | "warning" | "info"; text: string }
  | { type: "faq"; items: { question: string; answer: string }[] }
  | { type: "linkList"; title: string; links: { text: string; href: string }[] }
  | { type: "html"; html: string }
  | { type: "calculator" };

export interface BlogSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  content?: ContentBlock[];
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
