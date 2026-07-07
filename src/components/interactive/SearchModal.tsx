"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Search, X, Command, Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { CHIPS } from "@/data/chips";

export interface SearchModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchModal({ open, onOpenChange }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = query.length >= 2
    ? CHIPS.filter(
        (chip) =>
          chip.name.toLowerCase().includes(query.toLowerCase()) ||
          chip.series.toLowerCase().includes(query.toLowerCase()) ||
          chip.architecture.toLowerCase().includes(query.toLowerCase()) ||
          chip.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  function handleQueryChange(value: string) {
    setQuery(value);
    setSelectedIndex(0);
  }

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!open) {
          setQuery("");
          setSelectedIndex(0);
        }
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        onOpenChange(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      onOpenChange(false);
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const chip = results[selectedIndex];
      if (chip) {
        window.location.href = `/products/${chip.slug}`;
        onOpenChange(false);
      }
    }
  }

  useEffect(() => {
    if (listRef.current && results.length > 0) {
      const item = listRef.current.children[selectedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, results.length]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-start justify-center pt-[12vh] bg-bg-dark/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-xl mx-4 bg-surface border border-border rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-text-dim flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search chips by name, series, architecture..."
                className="flex-1 bg-transparent text-base text-text placeholder-text-dim outline-none"
              />
              <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-[11px] font-medium text-text-dim bg-bg-dark rounded-md border border-border">
                <Command className="w-3 h-3" />
                K
              </kbd>
              {query && (
                <button
                  onClick={() => handleQueryChange("")}
                  className="text-text-dim hover:text-text transition-colors p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div
              ref={listRef}
              className="max-h-[400px] overflow-y-auto overscroll-contain"
            >
              {query.length >= 2 && results.length === 0 && (
                <div className="px-5 py-10 text-center">
                  <Cpu className="w-8 h-8 text-text-dim mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-text-muted">
                    No chips found for &ldquo;<span className="text-text font-medium">{query}</span>&rdquo;
                  </p>
                  <p className="text-xs text-text-dim mt-1">Try a different search term</p>
                </div>
              )}

              {query.length < 2 && (
                <div className="px-5 py-10 text-center">
                  <Search className="w-8 h-8 text-text-dim mx-auto mb-3 opacity-50" />
                  <p className="text-sm text-text-muted">Type at least 2 characters to search</p>
                  <p className="text-xs text-text-dim mt-1">Search by name, series, architecture, or description</p>
                </div>
              )}

              {results.map((chip, i) => (
                <Link
                  key={chip.id}
                  href={`/products/${chip.slug}`}
                  onClick={() => onOpenChange(false)}
                  className={cn(
                    "flex items-center gap-4 px-5 py-3.5 transition-colors",
                    i === selectedIndex
                      ? "bg-primary/10 text-text"
                      : "text-text-muted hover:bg-bg-dark hover:text-text"
                  )}
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{chip.name}</div>
                    <div className="text-xs text-text-dim mt-0.5">
                      {chip.series} &middot; {chip.architecture}
                    </div>
                  </div>
                  <span className="text-[11px] text-text-dim flex-shrink-0 hidden sm:inline">
                    &crarr;
                  </span>
                </Link>
              ))}
            </div>

            {results.length > 0 && (
              <div className="flex items-center gap-4 px-5 py-2.5 border-t border-border bg-bg-dark/50">
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">&uarr;</kbd>
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">&darr;</kbd>
                  <span>navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">&crarr;</kbd>
                  <span>select</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-text-dim ml-auto">
                  <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-surface border border-border rounded">esc</kbd>
                  <span>close</span>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
