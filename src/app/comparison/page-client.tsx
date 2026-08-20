"use client";
import { useState, useMemo, useEffect } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import {
  X,
  ArrowRight,
  Cpu,
  Check,
  Search,
  Trash2,
  Info,
  Columns3,
  LayoutGrid,
  Link2,
  Trophy,
  ArrowDown,
} from "lucide-react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CHIPS, getChipBySlug } from "@/data/chips";
import { getBrandColor } from "@/data/brand-colors";
import { ConfiguratorPromo } from "@/components/shared/ConfiguratorPromo";
import type { ChipProduct } from "@/types";
const DEFAULT_SERIES = ["H100", "H200", "B200"];
const MAX_SELECTED = 8;
const STATUS_STYLES: Record<
  ChipProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};
const SPEC_GROUPS: {
  label: string;
  keys: (keyof ChipProduct["specifications"])[];
}[] = [
  {
    label: "Memory",
    keys: ["memory", "memoryBandwidth"],
  },
  {
    label: "Compute",
    keys: [
      "tensorCores",
      "cudaCores",
      "fp8TFLOPS",
      "fp16TFLOPS",
      "tf32TFLOPS",
      "fp64TFLOPS",
    ],
  },
  {
    label: "Connectivity",
    keys: ["interconnect"],
  },
  {
    label: "Physical",
    keys: [
      "tdp",
      "formFactor",
      "cooling",
      "launchDate",
      "manufacturingProcess",
    ],
  },
];
const SPEC_LABELS: Record<string, string> = {
  memory: "Memory",
  memoryBandwidth: "Memory Bandwidth",
  tensorCores: "Tensor Cores",
  cudaCores: "CUDA Cores",
  fp8TFLOPS: "FP8 TFLOPS",
  fp16TFLOPS: "FP16 TFLOPS",
  tf32TFLOPS: "TF32 TFLOPS",
  fp64TFLOPS: "FP64 TFLOPS",
  interconnect: "Interconnect",
  tdp: "TDP",
  formFactor: "Form Factor",
  cooling: "Cooling",
  launchDate: "Launch Date",
  manufacturingProcess: "Manufacturing Process",
};
const NUMERIC_KEYS = new Set([
  "memory",
  "memoryBandwidth",
  "tensorCores",
  "cudaCores",
  "fp8TFLOPS",
  "fp16TFLOPS",
  "tf32TFLOPS",
  "fp64TFLOPS",
  "tdp",
]);

function parseNumericValue(value: string): number | null {
  const match = value.replace(/,/g, "").match(/(\d+(?:\.\d+)?)/);
  if (!match) return null;
  const num = parseFloat(match[1]);
  return Number.isFinite(num) ? num : null;
}

export default function ComparisonPage() {
  const getInitialSelection = () => {
    const defaults = CHIPS.filter((c) => DEFAULT_SERIES.includes(c.series)).map(
      (c) => c.id,
    );
    if (typeof window === "undefined") return defaults;
    const params = new URLSearchParams(window.location.search);
    const addIds = params
      .getAll("add")
      .map((slug) => getChipBySlug(slug)?.id)
      .filter((id): id is string => Boolean(id));
    return Array.from(new Set([...defaults, ...addIds])).slice(0, MAX_SELECTED);
  };
  const [selectedIds, setSelectedIds] = useState<string[]>(getInitialSelection);
  const [search, setSearch] = useState("");
  const [brandFilter, setBrandFilter] = useState<string>("all");
  const [showAllChips, setShowAllChips] = useState(false);
  const [view, setView] = useState<"table" | "cards">("table");
  const [copied, setCopied] = useState(false);
  const manufacturers = useMemo(() => {
    const map = new Map<string, string>();
    CHIPS.forEach((c) => {
      if (!map.has(c.manufacturerId)) map.set(c.manufacturerId, c.manufacturer);
    });
    return Array.from(map.entries());
  }, []);
  const selectedChips = useMemo(
    () => CHIPS.filter((c) => selectedIds.includes(c.id)),
    [selectedIds],
  );
  const filteredChips = useMemo(() => {
    const q = search.trim().toLowerCase();
    return CHIPS.filter((c) => {
      if (brandFilter !== "all" && c.manufacturerId !== brandFilter)
        return false;
      if (!q) return true;
      return (
        c.name.toLowerCase().includes(q) ||
        c.series.toLowerCase().includes(q) ||
        c.manufacturer.toLowerCase().includes(q) ||
        c.architecture.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.manufacturer.localeCompare(b.manufacturer));
  }, [search, brandFilter]);
  useEffect(() => {
    const applyUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const addIds = params
        .getAll("add")
        .map((slug) => getChipBySlug(slug)?.id)
        .filter((id): id is string => Boolean(id));
      if (addIds.length) {
        setSelectedIds((prev) =>
          Array.from(new Set([...prev, ...addIds])).slice(0, MAX_SELECTED),
        );
      }
    };
    window.addEventListener("popstate", applyUrlParams);
    return () => window.removeEventListener("popstate", applyUrlParams);
  }, []);
  useEffect(() => {
    const slugs = selectedIds
      .map((id) => CHIPS.find((c) => c.id === id)?.slug)
      .filter((s): s is string => Boolean(s));
    const url = new URL(window.location.href);
    url.search = slugs.length ? slugs.map((s) => `add=${s}`).join("&") : "";
    window.history.replaceState(null, "", url.pathname + url.search);
  }, [selectedIds]);
  function toggleChip(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= MAX_SELECTED) return prev;
      return [...prev, id];
    });
  }
  async function copyShareLink() {
    const slugs = selectedIds
      .map((id) => CHIPS.find((c) => c.id === id)?.slug)
      .filter((s): s is string => Boolean(s));
    const url = `${window.location.origin}/comparison?${slugs
      .map((s) => `add=${s}`)
      .join("&")}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this comparison link:", url);
    }
  }
  const visibleChips = showAllChips
    ? filteredChips
    : filteredChips.slice(0, 24);
  const gridCols = `170px repeat(${selectedChips.length}, 210px)`;
  const atLimit = selectedIds.length >= MAX_SELECTED;
  const bestValues = useMemo(() => {
    const map = new Map<string, string[]>();
    SPEC_GROUPS.forEach((group) =>
      group.keys.forEach((key) => {
        if (!NUMERIC_KEYS.has(key)) return;
        const nums = selectedChips
          .map((chip) => parseNumericValue(chip.specifications[key] || ""))
          .filter((n): n is number => n !== null);
        if (!nums.length) return;
        const max = Math.max(...nums);
        map.set(
          key,
          selectedChips
            .filter((chip) => {
              const v = parseNumericValue(chip.specifications[key] || "");
              return v !== null && Math.abs(v - max) < 1e-6;
            })
            .map((c) => c.id),
        );
      }),
    );
    return map;
  }, [selectedChips]);

  const groupWinners = useMemo(() => {
    const leaders: { group: string; chips: ChipProduct[]; metric: string }[] =
      [];
    SPEC_GROUPS.forEach((group) => {
      const numericKey = group.keys.find((k) => NUMERIC_KEYS.has(k));
      if (!numericKey) return;
      const winners = bestValues.get(numericKey) || [];
      if (!winners.length) return;
      const leadChips = selectedChips.filter((c) => winners.includes(c.id));
      if (!leadChips.length) return;
      leaders.push({
        group: group.label,
        chips: leadChips,
        metric: SPEC_LABELS[numericKey] || numericKey,
      });
    });
    return leaders;
  }, [bestValues, selectedChips]);
  return (
    <div className="min-h-screen bg-bg-dark pb-20 relative overflow-x-hidden">
      {/* Ambient glow background */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-primary/[0.07] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-40 -right-32 w-96 h-96 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative">
        <SectionHeading
          level="h1"
          label="Compare"
          title="Compare Enterprise Chips"
          subtitle="Search and compare NVIDIA, AMD, and Intel server chips side-by-side - pick up to 8 chips at a time and the smart table auto-highlights the best value in every row"
          align="center"
        />

        {/* Selector panel */}
        <div className="rounded-2xl border border-border bg-surface overflow-hidden mb-6 shadow-xl shadow-black/20">
          <div className="p-4 md:p-5 flex flex-col lg:flex-row lg:items-center gap-4 border-b border-border bg-gradient-to-r from-surface-2/60 to-surface">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search ${CHIPS.length} chips by name, series, brand...`}
                aria-label="Search chips"
                className="w-full pl-9 pr-9 py-3 text-sm bg-bg-dark border border-border rounded-xl text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all"
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
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-1 lg:pb-0 -mx-1 px-1">
              <button
                onClick={() => setBrandFilter("all")}
                className={`shrink-0 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                  brandFilter === "all"
                    ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_20%,transparent)]"
                    : "border-border text-text-muted hover:text-text hover:border-primary/30"
                }`}
              >
                All
              </button>
              {manufacturers.map(([id, name]) => {
                const active = brandFilter === id;
                const color = getBrandColor(name);
                return (
                  <button
                    key={id}
                    onClick={() => setBrandFilter(id)}
                    style={
                      active
                        ? {
                            color,
                            borderColor: `${color}66`,
                            background: `${color}14`,
                          }
                        : undefined
                    }
                    className={`shrink-0 px-3 py-2 text-xs font-semibold rounded-lg border transition-all ${
                      active
                        ? ""
                        : "border-border text-text-muted hover:text-text hover:border-primary/30"
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="max-h-56 overflow-y-auto scrollbar-thin p-3">
            {visibleChips.length === 0 ? (
              <p className="text-sm text-text-muted px-3 py-6 text-center">
                No chips match your search.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {visibleChips.map((chip) => {
                  const selected = selectedIds.includes(chip.id);
                  const color = getBrandColor(chip.manufacturer);
                  return (
                    <button
                      key={chip.id}
                      onClick={() => toggleChip(chip.id)}
                      disabled={!selected && atLimit}
                      className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                        selected
                          ? "bg-primary/10 border-primary text-primary shadow-[0_0_12px_color-mix(in_srgb,var(--primary)_15%,transparent)]"
                          : "bg-bg-dark border-border text-text-muted hover:border-primary/30 hover:text-text hover:-translate-y-0.5"
                      }`}
                    >
                      <span
                        className={`w-4 h-4 shrink-0 rounded border flex items-center justify-center transition-all ${
                          selected
                            ? "bg-primary border-primary"
                            : "border-border"
                        }`}
                      >
                        {selected && <Check className="w-3 h-3 text-bg-dark" />}
                      </span>
                      <span className="w-8 h-8 shrink-0 rounded-md overflow-hidden bg-surface-2 border border-border/60 flex items-center justify-center">
                        {chip.images && chip.images[0] ? (
                          <Image
                            src={chip.images[0]}
                            alt=""
                            width={32}
                            height={32}
                            unoptimized
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Cpu className="w-4 h-4" style={{ color }} />
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-bold text-xs truncate">
                          {chip.name}
                        </span>
                        <span className="block text-[10px] text-text-dim truncate">
                          {chip.manufacturer} · {chip.architecture}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          <div className="px-4 py-3 border-t border-border flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-text-muted">
              {filteredChips.length} chips {search && "match your search"}
              {!showAllChips &&
                filteredChips.length > 24 &&
                ` - showing 24 of ${filteredChips.length}`}
            </span>
            {filteredChips.length > 24 && (
              <button
                onClick={() => setShowAllChips((v) => !v)}
                className="text-xs font-semibold text-primary hover:underline"
              >
                {showAllChips ? "Show fewer" : "Show all"}
              </button>
            )}
          </div>
        </div>

        {/* Selected chips toolbar */}
        <div className="mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm font-bold text-text">
                Comparing{" "}
                <span className="text-primary">{selectedChips.length}</span>/
                {MAX_SELECTED} chips
              </h2>
              <div className="w-24 h-1.5 rounded-full bg-surface-2 overflow-hidden border border-border/60">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                  style={{
                    width: `${(selectedChips.length / MAX_SELECTED) * 100}%`,
                  }}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedChips.length > 1 && (
                <div className="flex rounded-lg border border-border overflow-hidden">
                  <button
                    onClick={() => setView("table")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors ${
                      view === "table"
                        ? "bg-primary text-bg-dark"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    <Columns3 className="w-3.5 h-3.5" />
                    Table
                  </button>
                  <button
                    onClick={() => setView("cards")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold transition-colors ${
                      view === "cards"
                        ? "bg-primary text-bg-dark"
                        : "text-text-muted hover:text-text"
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    Cards
                  </button>
                </div>
              )}
              {selectedChips.length > 0 && (
                <button
                  onClick={copyShareLink}
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-border text-text-muted hover:text-primary hover:border-primary/40 transition-colors"
                >
                  <Link2 className="w-3.5 h-3.5" />
                  {copied ? "Copied!" : "Share link"}
                </button>
              )}
              {selectedChips.length > 0 && (
                <button
                  onClick={() => setSelectedIds([])}
                  className="inline-flex items-center gap-1.5 text-xs text-text-dim hover:text-error transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear all
                </button>
              )}
            </div>
          </div>
          {atLimit && (
            <div className="flex items-center gap-2 text-xs text-amber px-3 py-2 rounded-lg bg-amber/10 border border-amber/20 mb-2">
              <Info className="w-3.5 h-3.5 shrink-0" />
              You&apos;ve reached the {MAX_SELECTED}-chip limit. Remove one to
              add another.
            </div>
          )}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-2">
            {selectedChips.map((chip) => {
              const color = getBrandColor(chip.manufacturer);
              return (
                <span
                  key={chip.id}
                  className="inline-flex items-center gap-2 shrink-0 pl-1 pr-2 py-1 rounded-xl border border-primary/30 bg-primary/5 text-xs font-semibold text-primary"
                >
                  <span
                    className="w-7 h-7 rounded-lg overflow-hidden bg-surface-2 border border-border/60 flex items-center justify-center"
                    style={{ boxShadow: `0 0 0 1px ${color}22` }}
                  >
                    {chip.images && chip.images[0] ? (
                      <Image
                        src={chip.images[0]}
                        alt=""
                        width={28}
                        height={28}
                        unoptimized
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Cpu className="w-3.5 h-3.5" style={{ color }} />
                    )}
                  </span>
                  {chip.name}
                  <button
                    onClick={() => toggleChip(chip.id)}
                    aria-label={`Remove ${chip.name}`}
                    className="text-primary/60 hover:text-error transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Category winners strip */}
        {selectedChips.length > 1 && groupWinners.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Trophy className="w-4 h-4 text-amber" />
              <h2 className="text-sm font-bold text-text">Category Leaders</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {groupWinners.map(({ group, chips, metric }) => (
                <div
                  key={group}
                  className="rounded-xl border border-amber/25 bg-gradient-to-br from-amber/[0.06] to-surface p-4 flex items-start gap-3"
                >
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-amber/10 border border-amber/25 flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-amber" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-amber">
                      {group}
                    </div>
                    <div className="text-sm font-bold text-text leading-tight mt-0.5 truncate">
                      {chips.map((c) => c.name).join(" · ")}
                    </div>
                    <div className="text-[11px] text-text-dim mt-0.5">
                      Leads on {metric}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {selectedChips.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-surface border border-border flex items-center justify-center shadow-lg shadow-black/20">
              <Cpu className="w-9 h-9 text-text-dim" />
            </div>
            <h3 className="text-lg font-bold text-text mb-1">
              No Chips Selected
            </h3>
            <p className="text-sm text-text-muted max-w-md mx-auto">
              Search and pick chips above to add them to the comparison and view
              specifications side by side.
            </p>
            <Button
              variant="solid"
              size="lg"
              className="mt-6"
              onClick={() => setSelectedIds(CHIPS.slice(0, 3).map((c) => c.id))}
            >
              Try popular chips <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        ) : view === "table" ? (
          <div className="overflow-auto max-h-[640px] rounded-2xl border border-border scrollbar-thin shadow-2xl shadow-black/30 bg-surface">
            <div
              className="min-w-full"
              style={{ minWidth: 170 + selectedChips.length * 210 }}
            >
              {/* Header Row */}
              <div
                className="grid sticky top-0 z-20 border-b-2 border-border bg-bg-dark"
                style={{ gridTemplateColumns: gridCols }}
              >
                <div className="sticky left-0 z-30 bg-bg-dark px-4 py-3 flex items-center">
                  <span className="text-xs font-bold text-text uppercase tracking-wider">
                    Specification
                  </span>
                </div>
                {selectedChips.map((chip) => {
                  const color = getBrandColor(chip.manufacturer);
                  return (
                    <div
                      key={chip.id}
                      className="bg-bg-dark px-3 py-3 text-center border-l border-border"
                    >
                      <div className="flex justify-center mb-2">
                        <span
                          className="w-10 h-10 rounded-xl overflow-hidden bg-surface-2 border border-border/60 flex items-center justify-center"
                          style={{
                            boxShadow: `0 0 0 1px ${color}33, 0 4px 12px ${color}22`,
                          }}
                        >
                          {chip.images && chip.images[0] ? (
                            <Image
                              src={chip.images[0]}
                              alt={chip.name}
                              width={40}
                              height={40}
                              unoptimized
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <Cpu className="w-5 h-5" style={{ color }} />
                          )}
                        </span>
                      </div>
                      <Badge size="sm" className="mb-1">
                        {STATUS_STYLES[chip.status].label}
                      </Badge>
                      <h3 className="text-sm font-bold text-text leading-tight">
                        {chip.name}
                      </h3>
                      <p className="text-[10px] text-text-dim mt-0.5 leading-tight line-clamp-1">
                        {chip.architecture}
                      </p>
                      <button
                        onClick={() => toggleChip(chip.id)}
                        className="mt-2 text-text-dim hover:text-error transition-colors"
                        aria-label={`Remove ${chip.name}`}
                      >
                        <X className="w-3.5 h-3.5 mx-auto" />
                      </button>
                    </div>
                  );
                })}
              </div>
              {/* Spec Rows */}
              {SPEC_GROUPS.map((group) => (
                <div key={group.label}>
                  <div
                    className="grid bg-surface-2 border-b border-border"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    <div className="sticky left-0 z-10 bg-surface-2 px-4 py-2">
                      <span className="text-xs font-bold text-primary uppercase tracking-wider">
                        {group.label}
                      </span>
                    </div>
                    {selectedChips.map((chip) => (
                      <div
                        key={chip.id}
                        className="bg-surface-2 px-4 py-2 border-l border-border"
                      />
                    ))}
                  </div>
                  {group.keys.map((key) => {
                    const winners = bestValues.get(key) || [];
                    return (
                      <div
                        key={key}
                        className="grid bg-surface border-b border-border/60 group/row hover:bg-surface-2/60 transition-colors"
                        style={{ gridTemplateColumns: gridCols }}
                      >
                        <div className="sticky left-0 z-10 bg-surface px-4 py-3 flex items-center justify-between border-r border-border/60 group-hover/row:bg-surface-2/60 transition-colors">
                          <span className="text-xs text-text-dim">
                            {SPEC_LABELS[key] || key}
                          </span>
                          {winners.length > 1 && (
                            <span className="ml-1 text-[9px] font-bold text-secondary uppercase tracking-wider">
                              tie
                            </span>
                          )}
                        </div>
                        {selectedChips.map((chip) => {
                          const isWinner = winners.includes(chip.id);
                          const color = getBrandColor(chip.manufacturer);
                          return (
                            <div
                              key={chip.id}
                              className={`px-4 py-3 flex items-center gap-1.5 border-l border-border/60 transition-colors ${
                                isWinner
                                  ? "bg-primary/5"
                                  : "bg-surface group-hover/row:bg-surface-2/60"
                              }`}
                            >
                              {isWinner && (
                                <Trophy
                                  className="w-3.5 h-3.5 shrink-0"
                                  style={{ color }}
                                />
                              )}
                              <span
                                className={`text-xs font-mono ${
                                  isWinner
                                    ? "font-bold text-text"
                                    : "text-text-muted"
                                }`}
                              >
                                {chip.specifications[key] || "-"}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              ))}
              {/* Quote Row */}
              <div
                className="grid bg-bg-dark"
                style={{ gridTemplateColumns: gridCols }}
              >
                <div className="sticky left-0 z-10 bg-bg-dark px-4 py-3" />
                {selectedChips.map((chip) => (
                  <div
                    key={chip.id}
                    className="px-3 py-3 border-l border-border"
                  >
                    <Link href={`/rfq?chip=${chip.slug}`}>
                      <Button variant="solid" size="sm" fullWidth>
                        Get Quote <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Card view */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedChips.map((chip) => {
              const color = getBrandColor(chip.manufacturer);
              const winCount = groupWinners.filter((w) =>
                w.chips.some((c) => c.id === chip.id),
              ).length;
              return (
                <div
                  key={chip.id}
                  className="rounded-2xl border border-border bg-surface overflow-hidden shadow-lg shadow-black/20 hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{ boxShadow: `0 4px 24px -12px ${color}33` }}
                >
                  <div className="relative h-32 bg-gradient-to-br from-surface-2 to-bg-dark flex items-center justify-center overflow-hidden border-b border-border/60">
                    {chip.images && chip.images[0] ? (
                      <Image
                        src={chip.images[0]}
                        alt={chip.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        unoptimized
                        className="object-cover"
                      />
                    ) : (
                      <Cpu className="w-10 h-10" style={{ color }} />
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge size="sm">
                        {STATUS_STYLES[chip.status].label}
                      </Badge>
                    </div>
                    <div
                      className="absolute inset-x-0 bottom-0 h-1"
                      style={{ backgroundColor: color }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-dim">
                          {chip.manufacturer}
                        </span>
                      </div>
                      {winCount > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber uppercase tracking-wider">
                          <Trophy className="w-3 h-3" />
                          {winCount} win{winCount > 1 ? "s" : ""}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-text mb-3 leading-tight">
                      {chip.name}
                    </h3>
                    <dl className="space-y-1.5">
                      {SPEC_GROUPS.flatMap((group) =>
                        group.keys.map((key) => {
                          const isWinner =
                            bestValues.get(key)?.includes(chip.id) || false;
                          return (
                            <div
                              key={key}
                              className={`flex items-start justify-between gap-3 px-2 py-1 rounded-md ${
                                isWinner ? "bg-primary/5" : ""
                              }`}
                            >
                              <dt className="text-[10px] text-text-dim uppercase tracking-wider shrink-0 pt-0.5">
                                {SPEC_LABELS[key] || key}
                              </dt>
                              <dd
                                className={`text-xs font-mono text-right ${
                                  isWinner
                                    ? "font-bold text-primary"
                                    : "text-text-muted"
                                }`}
                              >
                                {isWinner && (
                                  <Trophy
                                    className="w-3 h-3 inline mr-1 align-[-1px]"
                                    style={{ color }}
                                  />
                                )}
                                {chip.specifications[key] || "-"}
                              </dd>
                            </div>
                          );
                        }),
                      )}
                    </dl>
                    <Link
                      href={`/rfq?chip=${chip.slug}`}
                      className="block mt-4"
                    >
                      <Button variant="solid" size="sm" fullWidth>
                        Get Quote <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Scroll hint */}
        {view === "table" && selectedChips.length > 3 && (
          <p className="flex items-center justify-center gap-2 text-xs text-text-dim mt-3">
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            Scroll sideways to compare all {selectedChips.length} chips
          </p>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Browse All Categories <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Browse All Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <ConfiguratorPromo />
      </div>

      {/* Mobile sticky action bar */}
      {selectedChips.length > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-bg-dark/90 backdrop-blur-xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 -space-x-2">
            {selectedChips.slice(0, 4).map((chip) => {
              const color = getBrandColor(chip.manufacturer);
              return (
                <span
                  key={chip.id}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-bg-dark bg-surface-2 flex items-center justify-center"
                  title={chip.name}
                >
                  {chip.images && chip.images[0] ? (
                    <Image
                      src={chip.images[0]}
                      alt=""
                      width={32}
                      height={32}
                      unoptimized
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Cpu className="w-3.5 h-3.5" style={{ color }} />
                  )}
                </span>
              );
            })}
            {selectedChips.length > 4 && (
              <span className="w-8 h-8 rounded-full border-2 border-bg-dark bg-surface-2 flex items-center justify-center text-[10px] font-bold text-text-dim">
                +{selectedChips.length - 4}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView(view === "table" ? "cards" : "table")}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-border text-text-muted hover:text-text transition-colors"
            >
              {view === "table" ? (
                <LayoutGrid className="w-3.5 h-3.5" />
              ) : (
                <Columns3 className="w-3.5 h-3.5" />
              )}
              {view === "table" ? "Cards" : "Table"}
            </button>
            <Button
              variant="solid"
              size="sm"
              onClick={copyShareLink}
              icon={<Link2 className="w-3.5 h-3.5" />}
            >
              {copied ? "Copied!" : "Share"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
