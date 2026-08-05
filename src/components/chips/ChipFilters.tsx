"use client";

import { useMemo } from "react";
import { Search, X, Check } from "lucide-react";
import type { ChipProduct } from "@/types";
import { CHIPS } from "@/data/chips";
import { getBrandColor } from "@/data/brand-colors";

export interface ChipFiltersState {
  search: string;
  manufacturer: string[];
  architecture: string[];
  series: string[];
  status: string[];
  memory: string[];
}

interface ChipFiltersProps {
  filters: ChipFiltersState;
  onChange: (filters: ChipFiltersState) => void;
}

const STATUSES = ["in_stock", "on_order", "limited", "pre_order"];

function getUniqueValues(key: keyof ChipProduct): string[] {
  const values = new Set<string>();
  CHIPS.forEach((chip) => {
    const val = chip[key];
    if (typeof val === "string" && val) values.add(val);
  });
  return Array.from(values).sort();
}

function getUniqueSpecValues(
  key: keyof ChipProduct["specifications"],
): string[] {
  const values = new Set<string>();
  CHIPS.forEach((chip) => {
    const val = chip.specifications[key];
    if (val && val !== "—") values.add(val);
  });
  return Array.from(values).sort();
}

export function ChipFilters({ filters, onChange }: ChipFiltersProps) {
  const BRANDS = useMemo(() => getUniqueValues("manufacturer"), []);
  const ARCHITECTURES = useMemo(() => getUniqueValues("architecture"), []);
  const SERIES = useMemo(() => getUniqueValues("series"), []);

  const activeCount = useMemo(
    () =>
      filters.manufacturer.length +
      filters.architecture.length +
      filters.series.length +
      filters.status.length +
      filters.memory.length +
      (filters.search ? 1 : 0),
    [filters],
  );

  const update = (key: keyof ChipFiltersState, values: string[]) =>
    onChange({ ...filters, [key]: values });

  const toggle = (
    key: "manufacturer" | "architecture" | "series" | "status" | "memory",
    val: string,
  ) => {
    const arr = filters[key];
    update(
      key,
      arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val],
    );
  };

  const clearAll = () =>
    onChange({
      search: "",
      manufacturer: [],
      architecture: [],
      series: [],
      status: [],
      memory: [],
    });

  const Checkbox = ({
    label,
    checked,
    onToggle,
    color,
  }: {
    label: string;
    checked: boolean;
    onToggle: () => void;
    color?: string;
  }) => (
    <label
      className="flex items-center gap-2 cursor-pointer py-1"
      onClick={onToggle}
    >
      <div
        className={`w-4 h-4 rounded border ${
          checked ? "bg-primary border-primary" : "border-border"
        } flex items-center justify-center transition-transform`}
      >
        {checked && <Check className="w-3 h-3 text-bg-dark" />}
      </div>
      {color && (
        <span
          className="w-2.5 h-2.5 rounded-full shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      <span className="text-sm text-text-muted">{label}</span>
    </label>
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => update("search", [e.target.value])}
          placeholder="Search chips..."
          aria-label="Search chips"
          className="w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-transform"
        />
        {filters.search && (
          <button
            onClick={() => update("search", [])}
            aria-label="Clear search"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Brand
        </h4>
        <div className="space-y-0.5 max-h-40 overflow-y-auto">
          {BRANDS.map((m) => (
            <Checkbox
              key={m}
              label={m}
              color={getBrandColor(m)}
              checked={filters.manufacturer.includes(m)}
              onToggle={() => toggle("manufacturer", m)}
            />
          ))}
        </div>
      </div>

      {/* Architecture */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Architecture
        </h4>
        <div className="space-y-0.5 max-h-40 overflow-y-auto">
          {ARCHITECTURES.map((arch) => (
            <Checkbox
              key={arch}
              label={arch}
              checked={filters.architecture.includes(arch)}
              onToggle={() => toggle("architecture", arch)}
            />
          ))}
        </div>
      </div>

      {/* Series */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Series
        </h4>
        <div className="space-y-0.5 max-h-40 overflow-y-auto">
          {SERIES.map((s) => (
            <Checkbox
              key={s}
              label={s}
              checked={filters.series.includes(s)}
              onToggle={() => toggle("series", s)}
            />
          ))}
        </div>
      </div>

      {/* Status */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Availability
        </h4>
        <div className="space-y-0.5">
          {STATUSES.map((s) => (
            <Checkbox
              key={s}
              label={s
                .replace("_", " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              checked={filters.status.includes(s)}
              onToggle={() => toggle("status", s)}
            />
          ))}
        </div>
      </div>

      {activeCount > 0 && (
        <button
          onClick={clearAll}
          className="text-xs text-primary hover:underline"
        >
          Clear all filters ({activeCount})
        </button>
      )}
    </div>
  );
}
