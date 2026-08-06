"use client";

import Link from "next/link";
import Image from "next/image";
import type { AnyProduct } from "@/types";
import { isChipProduct, isServerProduct } from "@/types";

interface Props {
  product: AnyProduct;
  countryCode: string;
}

export function CountryProductCard({ product, countryCode }: Props) {
  const chip = isChipProduct(product) ? product : null;
  const server = isServerProduct(product) ? product : null;
  const image = chip?.images?.[0] ?? server?.images?.[0];

  return (
    <Link
      href={`/${countryCode}/products/${product.slug}`}
      className="group rounded-xl border border-border bg-surface p-5 card-hover h-full flex flex-col"
    >
      <div className="relative w-full h-32 bg-gradient-to-br from-surface-2 to-bg-dark rounded-lg border border-border mb-4 flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            unoptimized
            className="object-cover"
          />
        ) : (
          <span className="text-3xl">{product.manufacturer}</span>
        )}
      </div>
      <div className="text-[10px] font-semibold uppercase tracking-wider text-primary mb-1">
        {product.manufacturer} · {product.series}
      </div>
      <h3 className="text-sm font-bold text-text mb-2 group-hover:text-primary transition-colors line-clamp-2">
        {product.name}
      </h3>
      <p className="text-xs text-text-muted line-clamp-2 mb-3">
        {product.description}
      </p>
      <div className="mt-auto">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary">
          View in {countryCode.toUpperCase()}{" "}
          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
