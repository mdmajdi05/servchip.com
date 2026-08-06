"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRANDS } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import { getBrandColor } from "@/data/brand-colors";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

export default function BrandsPage() {
  const brands = [...BRANDS].sort((a, b) => a.name.localeCompare(b.name));
  const prefix = useCountryPrefix();

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Brand Directory"
        title="Every Manufacturer We Stock"
        subtitle="Browse authentic enterprise hardware from 28 manufacturers — AI accelerators, server CPUs, networking, memory and storage."
        breadcrumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Brands" },
        ]}
      />

      <section className="py-16 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Manufacturers"
            title="Shop by Brand"
            subtitle="Find the complete product portfolio for each manufacturer we carry"
            align="center"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {brands.map((brand) => {
              const color = getBrandColor(brand.name);
              const productCount = getProductsByBrand(brand.id).length;
              const categoryCount = brand.categories.length;
              return (
                <Link
                  key={brand.id}
                  href={`${prefix}/brands/${brand.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-6 card-hover h-full flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <h3 className="text-lg font-bold text-text group-hover:text-primary transition-transform">
                      {brand.name}
                    </h3>
                  </div>
                  <p className="text-sm text-text-muted mb-4 flex-1">
                    {brand.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-text-dim">
                      {productCount} product
                      {productCount !== 1 ? "s" : ""} · {categoryCount} line
                      {categoryCount !== 1 ? "s" : ""}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-medium text-primary">
                      {brand.name} products{" "}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
