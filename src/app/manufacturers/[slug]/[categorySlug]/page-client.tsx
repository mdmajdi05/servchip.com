"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { MANUFACTURERS } from "@/data/manufacturers";
import { getProductsByManufacturer } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";

export default function ManufacturerCategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const categorySlug = params.categorySlug as string;

  const manufacturer = MANUFACTURERS.find((m) => m.slug === slug);
  const category = manufacturer?.categories.find(
    (c) => c.slug === categorySlug,
  );

  if (!manufacturer || !category) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">
            Category Not Found
          </h1>
          <Link href="/products" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const allProducts = getProductsByManufacturer(manufacturer.id);
  const allChipIds = category.subcategories.flatMap((s) => s.chipIds);
  const categoryProducts = allProducts.filter((p) =>
    allChipIds.length > 0
      ? allChipIds.includes(p.id)
      : p.categoryId === category.id,
  );

  return (
    <div className="min-h-screen bg-bg-dark pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 text-sm text-text-dim mb-4"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
            <Link
              href="/products"
              className="hover:text-primary transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
            <Link
              href={`/manufacturers/${manufacturer.slug}`}
              className="hover:text-primary transition-colors"
            >
              {manufacturer.name}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-text-dim/60" />
            <span className="text-text">{category.name}</span>
          </nav>
          <SectionHeading
            label={`${manufacturer.name} • ${category.name}`}
            title={`${manufacturer.name} ${category.name}`}
            subtitle={category.description}
            align="left"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {category.subcategories.map((sub) => (
            <div
              key={sub.id}
              className="p-4 rounded-xl border border-border bg-surface"
            >
              <h4 className="text-sm font-bold text-text mb-1">{sub.name}</h4>
              <p className="text-xs text-text-muted">{sub.description}</p>
              <span className="text-xs text-primary mt-2 inline-block">
                {sub.chipIds.length} products
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
