"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Cpu, List, LayoutGrid } from "lucide-react";
import { ChipCard } from "./ChipCard";
import { ChipFilters, type ChipFiltersState } from "./ChipFilters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { ChipProduct } from "@/types";

const statusStyles: Record<
  ChipProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};

interface ChipGridProps {
  chips: ChipProduct[];
  loading?: boolean;
}

export function ChipGrid({ chips, loading = false }: ChipGridProps) {
  const [filters, setFilters] = useState<ChipFiltersState>({
    search: "",
    manufacturer: [],
    architecture: [],
    series: [],
    status: [],
    memory: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    return chips.filter((chip) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (
          !chip.name.toLowerCase().includes(q) &&
          !chip.series.toLowerCase().includes(q) &&
          !chip.architecture.toLowerCase().includes(q) &&
          !chip.manufacturer.toLowerCase().includes(q)
        )
          return false;
      }
      if (
        filters.manufacturer.length &&
        !filters.manufacturer.includes(chip.manufacturer)
      )
        return false;
      if (
        filters.architecture.length &&
        !filters.architecture.includes(chip.architecture)
      )
        return false;
      if (filters.series.length && !filters.series.includes(chip.series))
        return false;
      if (filters.status.length && !filters.status.includes(chip.status))
        return false;
      return true;
    });
  }, [chips, filters]);

  return (
    <div className="grid lg:grid-cols-[240px_1fr] gap-8">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <ChipFilters filters={filters} onChange={setFilters} />
      </aside>

      {/* Content */}
      <div>
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm text-text-muted">
            <Cpu className="w-4 h-4" />
            <span>
              {loading ? "Loading..." : `${filtered.length} chips`}
              {filters.search && ` matching "${filters.search}"`}
            </span>
          </div>
          <div className="flex gap-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-primary/10 text-primary" : "text-text-dim hover:text-text"}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded ${viewMode === "list" ? "bg-primary/10 text-primary" : "text-text-dim hover:text-text"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {filtered.map((chip) => (
              <ChipCard key={chip.id} chip={chip} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((chip) => (
              <motion.div
                key={chip.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border border-border bg-surface p-4 md:p-5 flex flex-col md:flex-row md:items-center gap-4 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-lg border border-primary/30 bg-surface flex items-center justify-center shrink-0">
                    <span className="text-xs font-mono font-bold text-primary">
                      {chip.series.slice(0, 4)}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <Link
                      href={`/products/${chip.slug}`}
                      className="text-sm font-bold text-text hover:text-primary transition-colors line-clamp-1"
                    >
                      {chip.name}
                    </Link>
                    <p className="text-xs text-text-dim mt-0.5 line-clamp-1">
                      {chip.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] font-mono text-text-muted">
                      <span className="text-primary text-[10px] font-bold uppercase tracking-wider">
                        {chip.manufacturer}
                      </span>
                      <span>·</span>
                      <span>{chip.architecture}</span>
                      <span>·</span>
                      <span>{chip.specifications.memory}</span>
                      <span>·</span>
                      <span>{chip.specifications.tdp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge variant={statusStyles[chip.status].variant} size="sm">
                    {statusStyles[chip.status].label}
                  </Badge>
                  <Link href={`/products/${chip.slug}`}>
                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </Link>
                  <Link href={`/rfq?chip=${chip.slug}`}>
                    <Button variant="solid" size="sm">
                      Get Quote
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-dim text-sm">
              No chips match your filters.
            </p>
          </div>
        )}
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-4 bg-bg-dark/90 backdrop-blur-md border-t border-border">
        <details className="group">
          <summary className="flex items-center justify-between text-sm text-primary font-semibold cursor-pointer">
            Filters
            {filters.search ||
            filters.manufacturer.length ||
            filters.architecture.length ||
            filters.series.length ||
            filters.status.length
              ? " (active)"
              : ""}
          </summary>
          <div className="mt-4 max-h-60 overflow-y-auto">
            <ChipFilters filters={filters} onChange={setFilters} />
          </div>
        </details>
      </div>
    </div>
  );
}
