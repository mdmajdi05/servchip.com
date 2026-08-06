"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Cpu,
  Server,
  Network,
  MemoryStick,
  HardDrive,
  SlidersHorizontal,
  X,
  ArrowRight,
  Scale,
} from "lucide-react";
import {
  ALL_PRODUCTS,
  ALL_CHIP_PRODUCTS,
  ALL_SERVERS,
  ALL_NETWORKING_PRODUCTS,
  ALL_MEMORY,
  ALL_STORAGE,
} from "@/data/products";
import { BRANDS } from "@/data/brands";
import { CATEGORIES } from "@/data/categories";
import { ProductCard } from "@/components/products/ProductCard";
import { ConfiguratorPromo } from "@/components/shared/ConfiguratorPromo";
import { useCountryPrefix } from "@/lib/useCountryPrefix";
import type { ProductType } from "@/types";
type FilterType = ProductType | "all";
const TYPE_TABS: { type: FilterType; label: string; icon: typeof Cpu }[] = [
  { type: "all", label: "All", icon: Cpu },
  { type: "chip", label: "Chips", icon: Cpu },
  { type: "server", label: "Servers", icon: Server },
  { type: "networking", label: "Networking", icon: Network },
  { type: "memory", label: "Memory", icon: MemoryStick },
  { type: "storage", label: "Storage", icon: HardDrive },
];
export default function ProductsPage() {
  const prefix = useCountryPrefix();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");
  const [manufacturerFilter, setManufacturerFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"name" | "manufacturer" | "status">(
    "name",
  );
  const filtered = useMemo(() => {
    let products =
      typeFilter === "all"
        ? ALL_PRODUCTS
        : typeFilter === "chip"
          ? ALL_CHIP_PRODUCTS
          : typeFilter === "server"
            ? ALL_SERVERS
            : typeFilter === "networking"
              ? ALL_NETWORKING_PRODUCTS
              : typeFilter === "memory"
                ? ALL_MEMORY
                : ALL_STORAGE;
    if (manufacturerFilter !== "all") {
      products = products.filter(
        (p) => p.manufacturerId === manufacturerFilter,
      );
    }
    if (search.trim().length >= 2) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.manufacturer.toLowerCase().includes(q) ||
          p.series.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      );
    }
    return [...products].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "manufacturer")
        return a.manufacturer.localeCompare(b.manufacturer);
      return a.status.localeCompare(b.status);
    });
  }, [typeFilter, manufacturerFilter, search, sortBy]);
  const [showFilters, setShowFilters] = useState(false);
  return (
    <div className="min-h-screen bg-bg-dark pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-3xl lg:text-4xl font-black text-text mb-2">
            All Products
          </h1>
          <p className="text-text-muted text-sm">
            Browse {ALL_PRODUCTS.length} products across all categories and
            brands
          </p>
        </div>
        {/* Search + Filters toggle */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, brand, series..."
              aria-label="Search products"
              className="w-full pl-9 pr-4 py-2.5 text-sm bg-surface border border-border rounded-xl text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 transition-transform"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2.5 text-sm rounded-xl border transition-transform ${
              showFilters
                ? "border-primary/50 text-primary bg-primary/5"
                : "border-border text-text-muted hover:text-text hover:border-primary/30"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
        {/* Type tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {TYPE_TABS.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setTypeFilter(tab.type)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-transform ${
                typeFilter === tab.type
                  ? "bg-primary/15 border-primary/40 text-primary"
                  : "border-border text-text-muted hover:text-text hover:border-primary/30"
              }`}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          ))}
        </div>
        {/* Category chips + toolbar CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-text-dim uppercase tracking-wider mr-1">
              View by Category:
            </span>
            <Link
              href={`${prefix}/categories`}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-transform"
            >
              All Categories
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`${prefix}/categories/${cat.slug}`}
                className="px-3 py-1.5 text-xs font-medium rounded-lg border border-border text-text-muted hover:text-text hover:border-primary/30 transition-transform"
              >
                {cat.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`${prefix}/comparison`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-primary/40 text-primary hover:bg-primary/10 transition-transform"
            >
              <Scale className="w-3.5 h-3.5" />
              Compare Products
            </Link>
            <Link
              href={`${prefix}/rfq`}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-gradient-to-r from-primary to-primary-dark text-bg-dark hover:shadow-lg hover:shadow-primary/30 transition-transform"
            >
              Request Bulk Pricing
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        {/* Filter panel */}
        <div className="overflow-hidden mb-6">
          <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-border bg-surface">
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text-dim block mb-1.5">
                Brand
              </label>
              <select
                value={manufacturerFilter}
                onChange={(e) => setManufacturerFilter(e.target.value)}
                className="px-3 py-1.5 text-sm bg-bg-dark border border-border rounded-lg text-text focus:outline-none focus:border-primary/50"
              >
                <option value="all">All Brands</option>
                {BRANDS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-text-dim block mb-1.5">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-1.5 text-sm bg-bg-dark border border-border rounded-lg text-text focus:outline-none focus:border-primary/50"
              >
                <option value="name">Name</option>
                <option value="manufacturer">Brand</option>
                <option value="status">Status</option>
              </select>
            </div>
            <Link
              href={`${prefix}/brands`}
              className="ml-auto text-xs font-medium text-primary hover:underline flex items-center gap-1"
            >
              Browse All Brands <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
        {/* Count */}
        <p className="text-xs text-text-dim mb-4">
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          {search && <> for &ldquo;{search}&rdquo;</>}
          {manufacturerFilter !== "all" && (
            <> - {BRANDS.find((m) => m.id === manufacturerFilter)?.name}</>
          )}
          {typeFilter !== "all" && <> - {typeFilter}</>}
        </p>
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <Cpu className="w-12 h-12 text-text-dim mx-auto mb-4 opacity-50" />
            <p className="text-text-muted text-sm">
              No products match your filters.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setTypeFilter("all");
                setManufacturerFilter("all");
              }}
              className="text-primary text-sm hover:underline mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
      <ConfiguratorPromo />
    </div>
  );
}
