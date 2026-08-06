"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
    </>
  );
}
