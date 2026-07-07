"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchResult {
  title: string;
  slug: string;
  type: "chip" | "category" | "blog";
  subtitle?: string;
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (query.length >= 2) return;
    const t = setTimeout(() => {
      setResults([]);
      setLoading(false);
    }, 0);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    if (query.length < 2) return;
    const t1 = setTimeout(() => setLoading(true), 0);
    const timer = setTimeout(() => {
      setResults([
        { title: "NVIDIA H100 Tensor Core GPU", slug: "nvidia-h100-tensor-core-gpu", type: "chip", subtitle: "80GB HBM3, 3.35 TB/s" },
        { title: "NVIDIA H200 Tensor Core GPU", slug: "nvidia-h200-tensor-core-gpu", type: "chip", subtitle: "141GB HBM3e, 4.8 TB/s" },
        { title: "NVIDIA B200 Tensor Core GPU", slug: "nvidia-b200-tensor-core-gpu", type: "chip", subtitle: "384GB HBM3e, 10 TB/s" },
      ]);
      setLoading(false);
    }, 300);
    return () => { clearTimeout(t1); clearTimeout(timer); };
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) && open) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "p-2 rounded-lg transition-colors",
          open ? "text-primary bg-primary/10" : "text-text-muted hover:text-text hover:bg-surface"
        )}
        aria-label="Search"
      >
        <Search className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-2 w-80 bg-surface border border-border rounded-xl shadow-2xl overflow-hidden z-50"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-text-dim" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search chips, categories..."
                className="flex-1 bg-transparent text-sm text-text placeholder-text-dim outline-none"
              />
              {loading && <Loader2 className="w-3.5 h-3.5 text-text-dim animate-spin" />}
              {query && !loading && (
                <button onClick={() => setQuery("")} className="text-text-dim hover:text-text">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="max-h-72 overflow-y-auto">
              {results.length === 0 && query.length >= 2 && !loading && (
                <p className="px-4 py-6 text-center text-text-dim text-xs">No results found</p>
              )}
              {results.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${r.type === "blog" ? "blog" : r.type === "category" ? "categories" : "products"}/${r.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="block px-4 py-3 hover:bg-bg-dark transition-colors"
                >
                  <div className="text-sm text-text font-medium">{r.title}</div>
                  {r.subtitle && <div className="text-xs text-text-dim mt-0.5">{r.subtitle}</div>}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
