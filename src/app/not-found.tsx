import type { Metadata } from "next";
import { SITE } from "@/lib/constants";
import { NotFoundContent } from "@/components/ui/NotFoundContent";
import { createSeoMetadata, breadcrumbSchema } from "@/lib/seo";
import { ALL_PRODUCTS } from "@/data/products";
import { BRANDS } from "@/data/brands";
import { CATEGORIES } from "@/data/categories";

export const metadata: Metadata = createSeoMetadata({
  title: `404 - Page Not Found | ${SITE.name}`,
  description:
    "The page you are looking for does not exist or has been moved. Browse enterprise chips, AI accelerators, and semiconductor procurement solutions at Servchip.",
  path: "/404",
  noindex: true,
  openGraphTitle: `404 - Page Not Found | ${SITE.name}`,
  openGraphDescription:
    "The page you are looking for does not exist or has been moved. Browse enterprise chips, AI accelerators, and semiconductor procurement at Servchip.",
  twitterTitle: `404 - Page Not Found | ${SITE.name}`,
  twitterDescription:
    "The page you are looking for does not exist or has been moved.",
});

export default function NotFound() {
  // Keep the payload small: only the fields the 404 page actually renders.
  const featuredProducts = ALL_PRODUCTS.filter(
    (p) => p.isFeatured || p.isPopular,
  )
    .slice(0, 6)
    .map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      manufacturer: p.manufacturer,
      series: p.series,
      categoryName: p.categoryName,
      image: p.images?.[0],
    }));

  const brands = BRANDS.slice(0, 8).map((b) => ({
    slug: b.slug,
    name: b.name,
  }));

  const categories = CATEGORIES.filter((c) => c.isActive)
    .slice(0, 6)
    .map((c) => ({
      slug: c.slug,
      name: c.name,
      description: c.description,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "404 - Page Not Found", url: "/404" },
        ])}
      />
      <NotFoundContent
        featuredProducts={featuredProducts}
        brands={brands}
        categories={categories}
      />
    </>
  );
}
