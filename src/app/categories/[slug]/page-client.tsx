"use client";

import { useState, useMemo, createElement } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Server,
  Cpu,
  Network,
  HardDrive,
  MemoryStick,
  Search,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/products/ProductCard";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import {
  isChipProduct,
  isServerProduct,
  isNetworkingProduct,
  isMemoryProduct,
  isStorageProduct,
} from "@/types";

function getCategoryIcon(iconName: string) {
  switch (iconName) {
    case "Server":
      return <Server className="w-5 h-5" />;
    case "Cpu":
      return <Cpu className="w-5 h-5" />;
    case "Network":
      return <Network className="w-5 h-5" />;
    case "HardDrive":
      return <HardDrive className="w-5 h-5" />;
    case "MemoryStick":
      return <MemoryStick className="w-5 h-5" />;
    default:
      return <Server className="w-5 h-5" />;
  }
}

const TYPE_CONFIG: Record<string, { icon: typeof Cpu; label: string }> = {
  chips: { icon: Cpu, label: "AI Accelerators" },
  servers: { icon: Server, label: "AI Servers" },
  networking: { icon: Network, label: "Networking" },
  memory: { icon: MemoryStick, label: "Memory" },
  storage: { icon: HardDrive, label: "Storage" },
};

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState<string | "all">("all");

  const category = CATEGORIES.find((c) => c.slug === slug);
  const categoryProducts = category
    ? ALL_PRODUCTS.filter(
        (p) => "parentCategoryId" in p && p.parentCategoryId === category.id,
      )
    : [];

  const grouped = useMemo(() => {
    const chips = categoryProducts.filter(isChipProduct);
    const servers = categoryProducts.filter(isServerProduct);
    const networking = categoryProducts.filter(isNetworkingProduct);
    const memory = categoryProducts.filter(isMemoryProduct);
    const storage = categoryProducts.filter(isStorageProduct);
    return { chips, servers, networking, memory, storage };
  }, [categoryProducts]);

  const filtered = useMemo(() => {
    const types =
      activeType === "all"
        ? Object.values(grouped).flat()
        : (grouped[activeType as keyof typeof grouped] ?? []);

    if (search.trim().length < 2) return types;
    const q = search.toLowerCase();
    return types.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.manufacturer.toLowerCase().includes(q) ||
        p.series.toLowerCase().includes(q),
    );
  }, [grouped, activeType, search]);

  if (!category) {
    return (
      <div className="min-h-screen bg-bg-dark pt-[72px] lg:pt-[104px]">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Server className="w-16 h-16 text-text-dim mb-6" />
            <h1 className="text-2xl font-bold text-text mb-2">
              Category Not Found
            </h1>
            <p className="text-text-muted text-sm mb-8 max-w-md">
              The product category you are looking for does not exist or may
              have been moved.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Categories
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-[72px] lg:pt-[104px]">
      <div className="max-w-7xl mx-auto px-4 pb-20">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-text-dim mb-6 pt-4"
        >
          <Link
            href="/categories"
            className="hover:text-primary transition-colors"
          >
            Categories
          </Link>
          <span>/</span>
          <span className="text-text">{category.name}</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-2">
            <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              {getCategoryIcon(category.icon)}
            </span>
            <div>
              <h1 className="text-2xl lg:text-3xl font-black text-text">
                {category.name}
              </h1>
              <p className="text-sm text-text-muted">{category.description}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge variant="green" size="md">
              {categoryProducts.length}{" "}
              {categoryProducts.length === 1 ? "Product" : "Products"}
            </Badge>
            {Object.entries(grouped)
              .filter(([, prods]) => prods.length > 0)
              .map(([type]) => (
                <Badge key={type} variant="cyan" size="sm">
                  {grouped[type as keyof typeof grouped].length}{" "}
                  {TYPE_CONFIG[type]?.label || type}
                </Badge>
              ))}
          </div>
        </motion.div>

        {/* Search + type filters */}
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter products..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-surface border border-border rounded-xl text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
          <button
            onClick={() => setActiveType("all")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${activeType === "all" ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-text-muted hover:text-text"}`}
          >
            All ({categoryProducts.length})
          </button>
          {Object.entries(grouped)
            .filter(([, prods]) => prods.length > 0)
            .map(([type]) => {
              const cfg = TYPE_CONFIG[type];
              if (!cfg) return null;
              const Icon = cfg.icon;
              return (
                <button
                  key={type}
                  onClick={() => setActiveType(type)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${activeType === type ? "bg-primary/15 border-primary/40 text-primary" : "border-border text-text-muted hover:text-text"}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cfg.label} ({grouped[type as keyof typeof grouped].length})
                </button>
              );
            })}
        </div>

        {/* Product grid */}
        {filtered.length > 0 ? (
          activeType === "all" ? (
            Object.entries(grouped)
              .filter(([, prods]) => prods.length > 0)
              .map(([type]) => {
                const cfg = TYPE_CONFIG[type];
                if (!cfg) return null;
                const Icon = cfg.icon;
                const prods = grouped[type as keyof typeof grouped];
                return (
                  <div key={type} className="mb-10">
                    <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-3.5 h-3.5 text-primary" />
                      </span>
                      {cfg.label} ({prods.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                      {prods.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} />
                      ))}
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <Cpu className="w-12 h-12 text-text-dim mx-auto mb-4 opacity-50" />
            <p className="text-text-muted text-sm">
              No products match your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
