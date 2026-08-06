"use client";
import Link from "next/link";
import { getBrand } from "@/data/brands";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

export function ManufacturerLink({
  manufacturer,
  manufacturerId,
  className,
}: {
  manufacturer: string;
  manufacturerId: string;
  className?: string;
}) {
  const brand = getBrand(manufacturerId);
  const prefix = useCountryPrefix();
  if (!brand) {
    return <span className={className}>{manufacturer}</span>;
  }
  return (
    <Link
      href={`${prefix}/brands/${brand.slug}`}
      className={`hover:text-primary transition-colors ${className ?? ""}`}
    >
      {manufacturer}
    </Link>
  );
}
