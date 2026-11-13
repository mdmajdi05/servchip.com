"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Home,
  Search,
  Cpu,
  Layers,
  Loader2,
  Package,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useSiteSearch } from "@/components/interactive/useSiteSearch";

export interface NotFoundProduct {
  id: string;
  name: string;
  slug: string;
  manufacturer: string;
  series: string;
  categoryName: string;
  image?: string;
}

export interface NotFoundBrand {
  slug: string;
  name: string;
}

export interface NotFoundCategory {
  slug: string;
  name: string;
  description?: string;
}

export function NotFoundContent({
  featuredProducts,
  brands,
  categories,
}: {
  featuredProducts: NotFoundProduct[];
  brands: NotFoundBrand[];
  categories: NotFoundCategory[];
}) {
  const [query, setQuery] = useState("");
  const { products, blogPosts } = useSiteSearch(query);
  const isSearching = query.trim().length >= 2;
  const totalResults = products.length + blogPosts.length;

  return (
    <div className="min-h-screen bg-bg-dark px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-10">
          <div className="text-7xl font-black text-primary mb-4 font-mono">
            404
          </div>
          <h1 className="text-3xl font-bold text-text mb-3">Page Not Found</h1>
          <p className="text-text-muted text-base mb-8 max-w-xl mx-auto">
            The page you are looking for does not exist or has been moved.
            Search our products below or jump straight to a brand or category.
          </p>

          {/* Search box */}
          <div className="max-w-2xl mx-auto mb-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-dim" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search GPUs, CPUs, servers, memory, storage..."
                aria-label="Search products"
                className="w-full pl-12 pr-4 py-3.5 text-base bg-surface border border-border rounded-xl text-text placeholder-text-dim outline-none focus:border-primary/40 focus:ring-2 focus:ring-primary/10 transition-all"
              />
              {isSearching && totalResults === 0 && (
                <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim animate-spin" />
              )}
            </div>
            <p className="text-xs text-text-dim mt-2">
              Type at least 2 characters to search across all products and
              guides.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/">
              <Button variant="solid" icon={<Home className="w-4 h-4" />}>
                Go to Home
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outline" icon={<Search className="w-4 h-4" />}>
                Browse All Products
              </Button>
            </Link>
          </div>
        </div>

        {/* Live search results */}
        {isSearching && totalResults > 0 && (
          <div className="mb-12">
            <div className="rounded-2xl border border-border bg-surface overflow-hidden">
              {products.length > 0 && (
                <>
                  <div className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim bg-bg-dark/50">
                    Products ({products.length})
                  </div>
                  <div className="divide-y divide-border/50">
                    {products.slice(0, 8).map(({ product }) => (
                      <Link
                        key={`p-${product.id}`}
                        href={`/products/${product.slug}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Cpu className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-text truncate">
                            {product.name}
                          </div>
                          <div className="text-xs text-text-dim mt-0.5 truncate">
                            {product.manufacturer} &middot; {product.series}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
              {blogPosts.length > 0 && (
                <>
                  <div className="px-5 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim bg-bg-dark/50 border-t border-border">
                    Guides ({blogPosts.length})
                  </div>
                  <div className="divide-y divide-border/50">
                    {blogPosts.slice(0, 5).map((post) => (
                      <Link
                        key={`b-${post.slug}`}
                        href={`/blog/${post.slug}`}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-text truncate">
                            {post.title}
                          </div>
                          <div className="text-xs text-text-dim mt-0.5 truncate">
                            {post.category}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {isSearching && totalResults === 0 && (
          <div className="mb-12 text-center py-8">
            <Package className="w-10 h-10 text-text-dim mx-auto mb-3 opacity-50" />
            <p className="text-sm text-text-muted">
              No results for &ldquo;{query}&rdquo;. Try a brand or category
              below.
            </p>
          </div>
        )}

        {/* Featured products (shown when not searching) */}
        {!isSearching && featuredProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Package className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-text">
                Popular Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.slug}`}
                  className="group rounded-xl bg-surface border border-border hover:border-primary/40 hover:bg-primary/5 transition-all overflow-hidden"
                >
                  {product.image && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-32 object-cover bg-bg-dark"
                    />
                  )}
                  <div className="p-4">
                    <div className="text-sm font-medium text-text group-hover:text-primary transition-colors line-clamp-1">
                      {product.name}
                    </div>
                    <div className="text-xs text-text-dim mt-1">
                      {product.manufacturer} &middot; {product.categoryName}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Brand quick links */}
        {brands.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-5">
              <Cpu className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-text">
                Browse by Brand
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="group p-3 rounded-xl bg-surface border border-border hover:border-primary/40 hover:bg-primary/5 transition-all text-center"
                >
                  <span className="block text-sm font-medium text-text group-hover:text-primary transition-colors">
                    {brand.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Category quick links */}
        {categories.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-5">
              <Layers className="w-5 h-5 text-primary" />
              <h2 className="text-lg font-semibold text-text">
                Browse by Category
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/categories/${category.slug}`}
                  className="group p-4 rounded-xl bg-surface border border-border hover:border-primary/40 hover:bg-primary/5 transition-all"
                >
                  <span className="block text-sm font-medium text-text group-hover:text-primary transition-colors mb-1">
                    {category.name}
                  </span>
                  {category.description && (
                    <span className="block text-xs text-text-dim line-clamp-2">
                      {category.description}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Helpful links */}
        <div className="flex flex-wrap gap-4 justify-center text-sm pt-8 border-t border-border">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <Link href="/products" className="text-primary hover:underline">
            Products
          </Link>
          <Link href="/brands" className="text-primary hover:underline">
            Brands
          </Link>
          <Link href="/categories" className="text-primary hover:underline">
            Categories
          </Link>
          <Link href="/blog" className="text-primary hover:underline">
            Blog
          </Link>
          <Link href="/comparison" className="text-primary hover:underline">
            Compare GPUs
          </Link>
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}
