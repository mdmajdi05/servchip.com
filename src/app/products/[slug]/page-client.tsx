"use client";

import dynamic from "next/dynamic";
import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronRight, Quote, Star } from "lucide-react";
import { reviewsFor } from "@/lib/seo/product-reviews";
import {
  isChipProduct,
  isServerProduct,
  isNetworkingProduct,
  isMemoryProduct,
  isStorageProduct,
} from "@/types";
import type { AnyProduct } from "@/types";
import { BRANDS } from "@/data/brands";

const ChipDetail = dynamic(
  () => import("@/components/products/ChipDetail").then((m) => m.ChipDetail),
  { ssr: false },
);
const ServerDetail = dynamic(
  () =>
    import("@/components/products/ServerDetail").then((m) => m.ServerDetail),
  { ssr: false },
);
const NetworkingDetail = dynamic(
  () =>
    import("@/components/products/NetworkingDetail").then(
      (m) => m.NetworkingDetail,
    ),
  { ssr: false },
);
const MemoryDetail = dynamic(
  () =>
    import("@/components/products/MemoryDetail").then((m) => m.MemoryDetail),
  { ssr: false },
);
const StorageDetail = dynamic(
  () =>
    import("@/components/products/StorageDetail").then((m) => m.StorageDetail),
  { ssr: false },
);

export default function ProductDetailPage({
  product,
  parentCategory,
}: {
  product: AnyProduct;
  parentCategory: { name: string; slug: string } | null;
}) {
  const brand = BRANDS.find((b) => b.id === product.manufacturerId);
  const brandCategory = brand?.categories.find((c) =>
    c.subcategories.some((s) => s.chipIds.includes(product.id)),
  );
  const reviews = reviewsFor(product.manufacturer);

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-text-dim max-w-7xl mx-auto px-4 pt-6"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
        <Link href="/products" className="hover:text-primary transition-colors">
          Products
        </Link>
        {brandCategory && brand && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
            <Link
              href={`/brands/${brand.slug}/${brandCategory.slug}`}
              className="hover:text-primary transition-colors"
            >
              {brandCategory.name}
            </Link>
          </>
        )}
        {parentCategory && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
            <Link
              href={`/categories/${parentCategory.slug}`}
              className="hover:text-primary transition-colors"
            >
              {parentCategory.name}
            </Link>
          </>
        )}
        <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
        <span className="text-text font-medium truncate max-w-[200px]">
          {product.name}
        </span>
      </nav>
      {isChipProduct(product) && <ChipDetail />}
      {isServerProduct(product) && <ServerDetail />}
      {isNetworkingProduct(product) && <NetworkingDetail />}
      {isMemoryProduct(product) && <MemoryDetail />}
      {isStorageProduct(product) && <StorageDetail />}
      {!isChipProduct(product) &&
        !isServerProduct(product) &&
        !isNetworkingProduct(product) &&
        !isMemoryProduct(product) &&
        !isStorageProduct(product) && <ChipDetail />}
      {reviews.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-16">
          <SectionHeading
            label="Customer Reviews"
            title={`What customers say about ${product.manufacturer}`}
            subtitle="Real feedback from enterprises who source through Servchip"
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            {reviews.map((r) => (
              <div
                key={r.name}
                className="bg-surface border border-border rounded-xl p-6 relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                  {r.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {r.name
                      .split(" ")
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="text-text text-sm font-semibold">
                      {r.name}
                    </div>
                    <div className="text-text-dim text-xs">{r.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
