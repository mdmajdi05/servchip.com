"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { COUNTRIES, getCountryPath } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";

const STORAGE_KEY = "servchip-country";

function readStoredCountry(): string {
  if (typeof window === "undefined") return "global";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return stored && COUNTRIES.some((c) => c.code === stored) ? stored : "global";
}

export function CountrySelector() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stored, setStored] = useState<string>(() => readStoredCountry());
  const ref = useRef<HTMLDivElement>(null);

  const pathMatch = pathname.match(/^\/([a-z]{2})(?:\/|$)/);
  const selected =
    pathMatch && COUNTRIES.some((c) => c.code === pathMatch[1])
      ? pathMatch[1]
      : stored;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const current = COUNTRIES.find((c) => c.code === selected);

  function handleSelect(code: string | "global") {
    setStored(code);
    setOpen(false);
    window.localStorage.setItem(STORAGE_KEY, code);
  }

  const enabledCountries = COUNTRIES.filter((c) => COUNTRY_MARKETS[c.code]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="flex items-center gap-1.5 hover:text-text cursor-pointer transition-transform"
      >
        <Globe className="w-3 h-3 text-primary/60" />
        <span>
          {selected === "global"
            ? "Global"
            : `${current?.flag ?? ""} ${current?.name ?? "Global"}`}
        </span>
        <ChevronDown
          className={cn(
            "w-3 h-3 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-border bg-surface shadow-lg shadow-black/10 p-2 z-50">
          <p className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-dim">
            Select Location
          </p>
          <Link
            href="/"
            onClick={() => handleSelect("global")}
            className={cn(
              "flex items-center justify-between gap-2 px-2 py-2 rounded-lg text-sm transition-transform",
              selected === "global"
                ? "bg-primary/10 text-primary font-semibold"
                : "text-text-muted hover:bg-primary/[0.04] hover:text-text",
            )}
          >
            <span className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-primary/60" />
              Global
            </span>
            {selected === "global" && <Check className="w-3.5 h-3.5" />}
          </Link>
          <div className="my-1 h-px bg-border/60" />
          {enabledCountries.map((country) => (
            <Link
              key={country.slug}
              href={getCountryPath(country)}
              onClick={() => handleSelect(country.code)}
              className={cn(
                "flex items-center justify-between gap-2 px-2 py-2 rounded-lg text-sm transition-transform",
                selected === country.code
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-text-muted hover:bg-primary/[0.04] hover:text-text",
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-sm leading-none">{country.flag}</span>
                {country.name}
              </span>
              {selected === country.code && <Check className="w-3.5 h-3.5" />}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
