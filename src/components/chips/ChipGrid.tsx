"use client";

import { useState } from "react";
import { Cpu, List, LayoutGrid } from "lucide-react";
import { ChipCard } from "./ChipCard";
import { ChipFilters, type ChipFiltersState } from "./ChipFilters";
import type { ChipProduct } from "@/types";

interface ChipGridProps {
  chips: ChipProduct[];
  loading?: boolean;
}

export function ChipGrid({ chips, loading = false }: ChipGridProps) {
  const [filters, setFilters] = useState<ChipFiltersState>({
    search: "",
    architecture: [],
    series: [],
    status: [],
    memory: [],
  });
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = chips.filter((chip) => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !chip.name.toLowerCase().includes(q) &&
        !chip.series.toLowerCase().includes(q) &&
        !chip.architecture.toLowerCase().includes(q)
      )
        return false;
    }
    if (filters.architecture.length && !filters.architecture.includes(chip.architecture))
      return false;
    if (filters.series.length && !filters.series.includes(chip.series))
      return false;
    if (filters.status.length && !filters.status.includes(chip.status))
      return false;
    return true;
  });

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
            {filtered.map((chip, i) => (
              <ChipCard key={chip.id} chip={chip} index={i} />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((chip, i) => (
              <ChipCard key={chip.id} chip={chip} index={i} />
            ))}
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-text-dim text-sm">No chips match your filters.</p>
          </div>
        )}
      </div>

      {/* Mobile filters */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 p-4 bg-bg-dark/90 backdrop-blur-md border-t border-border">
        <details className="group">
          <summary className="flex items-center justify-between text-sm text-primary font-semibold cursor-pointer">
            Filters
            {filters.search ||
            filters.architecture.length ||
            filters.series.length ||
            filters.status.length ||
            filters.memory.length
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
