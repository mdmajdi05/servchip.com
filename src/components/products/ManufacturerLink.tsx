import Link from "next/link";
import { getBrand } from "@/data/brands";

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
  if (!brand) {
    return <span className={className}>{manufacturer}</span>;
  }
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={`hover:text-primary transition-colors ${className ?? ""}`}
    >
      {manufacturer}
    </Link>
  );
}
