"use client";

import { ChipCard } from "@/components/chips/ChipCard";
import { ServerCard } from "./ServerCard";
import { NetworkingCard } from "./NetworkingCard";
import { MemoryCard } from "./MemoryCard";
import { StorageCard } from "./StorageCard";
import {
  isChipProduct,
  isServerProduct,
  isNetworkingProduct,
  isMemoryProduct,
  isStorageProduct,
} from "@/types";
import type { AnyProduct } from "@/types";

interface Props {
  product: AnyProduct;
  index?: number;
}

export function ProductCard({ product, index = 0 }: Props) {
  if (isChipProduct(product)) return <ChipCard chip={product} index={index} />;
  if (isServerProduct(product))
    return <ServerCard server={product} index={index} />;
  if (isNetworkingProduct(product))
    return <NetworkingCard net={product} index={index} />;
  if (isMemoryProduct(product))
    return <MemoryCard mem={product} index={index} />;
  if (isStorageProduct(product))
    return <StorageCard st={product} index={index} />;
  return null;
}
