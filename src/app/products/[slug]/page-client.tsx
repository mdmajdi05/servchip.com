"use client";

import { useParams } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { ChipDetail } from "@/components/products/ChipDetail";
import { ServerDetail } from "@/components/products/ServerDetail";
import { NetworkingDetail } from "@/components/products/NetworkingDetail";
import { MemoryDetail } from "@/components/products/MemoryDetail";
import { StorageDetail } from "@/components/products/StorageDetail";
import {
  isChipProduct,
  isServerProduct,
  isNetworkingProduct,
  isMemoryProduct,
  isStorageProduct,
} from "@/types";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = ALL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return <ChipDetail />;

  if (isChipProduct(product)) return <ChipDetail />;
  if (isServerProduct(product)) return <ServerDetail />;
  if (isNetworkingProduct(product)) return <NetworkingDetail />;
  if (isMemoryProduct(product)) return <MemoryDetail />;
  if (isStorageProduct(product)) return <StorageDetail />;

  return <ChipDetail />;
}
