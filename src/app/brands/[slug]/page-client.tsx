"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Cpu,
  Globe,
  Calendar,
  MapPin,
  Server,
  Network,
  MemoryStick,
  HardDrive,
} from "lucide-react";
import { getBrandBySlug } from "@/data/brands";
import { getProductsByBrand } from "@/data/products";
import { getBrandColor } from "@/data/brand-colors";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PageHero } from "@/components/shared/PageHero";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

const TYPE_ICON: Record<string, typeof Cpu> = {
  chip: Cpu,
  server: Server,
  networking: Network,
  memory: MemoryStick,
  storage: HardDrive,
};

export default function BrandPage() {
  const params = useParams();
  const slug = params.slug as string;
  const brand = getBrandBySlug(slug);
  const products = getProductsByBrand(brand?.id ?? "");
  const color = brand ? getBrandColor(brand.name) : undefined;

  const grouped = products.reduce<Record<string, typeof products>>((acc, p) => {
    const type =
      "specifications" in p
        ? "chip"
        : "gpuSupport" in p
          ? "server"
          : "specs" in p && "ports" in p
            ? "networking"
            : "specs" in p && "capacity" in p
              ? "memory"
              : "storage";
    if (!acc[type]) acc[type] = [];
    acc[type].push(p);
    return acc;
  }, {});

  if (!brand) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">Brand Not Found</h1>
          <Link href="/products" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label={brand.name}
        title={`${brand.name} — Enterprise Hardware Solutions`}
        subtitle={brand.longDescription}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: brand.name },
        ]}
      />

      {/* Info Section */}
      <section className="py-16 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-text-dim">Founded</div>
                <div className="text-sm font-semibold text-text">
                  {brand.founded}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
              <MapPin className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-text-dim">Headquarters</div>
                <div className="text-sm font-semibold text-text">
                  {brand.headquarters}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
              <Globe className="w-5 h-5 text-primary" />
              <div>
                <div className="text-xs text-text-dim">Website</div>
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {brand.website}
                </a>
              </div>
            </div>
          </div>

          <SectionHeading
            label="Categories"
            title={`${brand.name} Product Lines`}
            subtitle={`Browse our complete ${brand.name} portfolio by category`}
            align="center"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {brand.categories.map((cat, i) => (
              <div key={cat.id}>
                <Link
                  href={`/brands/${brand.slug}/${cat.slug}`}
                  className="block group rounded-2xl border border-border bg-surface p-6 card-hover h-full"
                >
                  <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-transform">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    {cat.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cat.subcategories.slice(0, 4).map((sub) => (
                      <span
                        key={sub.id}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-primary">
                    View Products <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products by type */}
      {Object.entries(grouped).map(([type, typeProducts]) => {
        const Icon = TYPE_ICON[type] || Cpu;
        const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
        return (
          <section key={type} className="py-16 even:bg-bg-body odd:bg-bg-dark">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center gap-3 mb-8">
                <span className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </span>
                <div>
                  <h2 className="text-xl font-bold text-text">{typeLabel}s</h2>
                  <p className="text-sm text-text-muted">
                    {typeProducts.length} product
                    {typeProducts.length !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {typeProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {products.length === 0 && (
        <section className="py-20 bg-bg-dark">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <Cpu className="w-12 h-12 text-text-dim mx-auto mb-4" />
            <p className="text-text-muted">
              No products currently listed. Contact us for availability.
            </p>
            <Link href="/contact">
              <Button variant="solid" size="sm" className="mt-4">
                Contact Sales
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
