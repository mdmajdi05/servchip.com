"use client";

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { PageHero } from "@/components/shared/PageHero";
import { CountryProductCard } from "@/components/products/CountryProductCard";

export default function CountryProductsPage() {
  const params = useParams();
  const countrySlug = params.countrySlug as string;
  const country = getCountryByCode(countrySlug);
  const market = COUNTRY_MARKETS[countrySlug];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return ALL_PRODUCTS.filter((p) => {
      if (category && p.parentCategoryId !== category) return false;
      if (!term) return true;
      return [p.name, p.manufacturer, p.series, p.description]
        .join(" ")
        .toLowerCase()
        .includes(term);
    });
  }, [search, category]);

  if (!country) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <p className="text-text-muted">Location not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label={`${country.flag} ${country.name}`}
        title={`Available AI Hardware in ${country.name}`}
        subtitle={
          market
            ? `Enterprise NVIDIA, AMD & Intel hardware available in ${country.name}. Priced in ${market.currency}, shipped from ${market.warehouse} within ${market.leadTime}.`
            : `Enterprise NVIDIA, AMD & Intel hardware available in ${country.name}.`
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: country.name, href: `/${countrySlug}` },
          { label: "Products" },
        ]}
      />

      <section className="py-12 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={`Search hardware available in ${country.name}...`}
                className="w-full rounded-xl border border-border bg-bg-dark pl-10 pr-4 py-2.5 text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            <button
              onClick={() => setCategory(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                category === null
                  ? "bg-primary text-bg-dark border-primary"
                  : "border-border bg-bg-dark text-text-muted hover:border-primary/40"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(category === c.id ? null : c.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  category === c.id
                    ? "bg-primary text-bg-dark border-primary"
                    : "border-border bg-bg-dark text-text-muted hover:border-primary/40"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <CountryProductCard
                key={product.id}
                product={product}
                countryCode={countrySlug}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-text-muted py-12">
              No products match your search. Contact us for availability.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
