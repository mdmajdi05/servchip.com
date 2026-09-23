import { TESTIMONIALS_DATA } from "@/data/testimonials";

export interface ProductReview {
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
}

/**
 * Real customer testimonials that mention the product's brand.
 * Only matching testimonials are surfaced on the product page and marked up in
 * the Product schema — so reviews and ratings are honest and visible on-page
 * (Google policy: ratings must reflect the product on the same page).
 * Products whose brand has no matching testimonials simply get no rating block.
 */
export function reviewsFor(manufacturer: string): ProductReview[] {
  const key = manufacturer.trim().toLowerCase();
  if (!key) return [];
  return TESTIMONIALS_DATA.filter((t) =>
    t.content.toLowerCase().includes(key),
  ).map((t) => ({
    name: t.author.name,
    role: t.author.role,
    company: t.company,
    rating: t.rating,
    content: t.content,
  }));
}
