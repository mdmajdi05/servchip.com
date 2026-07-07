"use client";

import { useMemo } from "react";
import { Search, X } from "lucide-react";

export interface ChipFiltersState {
  search: string;
  architecture: string[];
  series: string[];
  status: string[];
  memory: string[];
}

interface ChipFiltersProps {
  filters: ChipFiltersState;
  onChange: (filters: ChipFiltersState) => void;
}

const ARCHITECTURES = [
  "Blackwell", "Hopper", "Ada Lovelace", "Ampere", "Turing", "Volta",
];
const SERIES = ["B200", "H200", "H100", "RTX 6000", "GH200", "A100", "L40S"];
const STATUSES = ["in_stock", "on_order", "limited", "pre_order"];
const MEMORY_OPTIONS = ["80GB", "141GB", "384GB", "48GB", "96GB"];

export function ChipFilters({ filters, onChange }: ChipFiltersProps) {
  const activeCount = useMemo(
    () =>
      filters.architecture.length +
      filters.series.length +
      filters.status.length +
      filters.memory.length +
      (filters.search ? 1 : 0),
    [filters]
  );

  const update = (key: keyof ChipFiltersState, values: string[]) =>
    onChange({ ...filters, [key]: values });

  const toggle = (
    key: "architecture" | "series" | "status" | "memory",
    val: string
  ) => {
    const arr = filters[key];
    update(key, arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);
  };

  const clearAll = () =>
    onChange({ search: "", architecture: [], series: [], status: [], memory: [] });

  const Checkbox = ({
    label,
    checked,
    onToggle,
  }: {
    label: string;
    checked: boolean;
    onToggle: () => void;
  }) => (
    <label className="flex items-center gap-2 cursor-pointer py-1" onClick={onToggle}>
      <div
        className={`w-4 h-4 rounded border ${
          checked ? "bg-primary border-primary" : "border-border"
        } flex items-center justify-center transition-colors`}
      >
        {checked && <span className="text-bg-dark text-[10px] font-bold">✓</span>}
      </div>
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
          className="w-full bg-surface border border-border rounded-lg pl-9 pr-3 py-2 text-sm text-text placeholder-text-dim outline-none focus:border-primary/50 transition-colors"
        />
        {filters.search && (
          <button
            onClick={() => update("search", [])}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-dim hover:text-text"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Architecture */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Architecture
        </h4>
        <div className="space-y-0.5">
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
        <div className="space-y-0.5">
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
              label={s.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              checked={filters.status.includes(s)}
              onToggle={() => toggle("status", s)}
            />
          ))}
        </div>
      </div>

      {/* Memory */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
          Memory
        </h4>
        <div className="space-y-0.5">
          {MEMORY_OPTIONS.map((mem) => (
            <Checkbox
              key={mem}
              label={mem}
              checked={filters.memory.includes(mem)}
              onToggle={() => toggle("memory", mem)}
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
