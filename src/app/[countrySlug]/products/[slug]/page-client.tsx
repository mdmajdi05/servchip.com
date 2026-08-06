"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Banknote,
  Warehouse,
  Clock,
  Truck,
  Check,
  ChevronDown,
} from "lucide-react";
import type { Country, CountryMarket } from "@/types";
import type { AnyProduct } from "@/types";
import { isChipProduct } from "@/types";

export default function CountryProductDetailPage({
  country,
  market,
  product,
}: {
  country: Country;
  market: CountryMarket;
  product: AnyProduct;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const chip = isChipProduct(product) ? product : null;
  const image = product.images?.[0];
  const specs = chip?.specifications ?? {};
  const specEntries = Object.entries(specs).slice(0, 6);

  const faqs = [
    {
      question: `How fast is delivery in ${country.name}?`,
      answer: `${market.shippingNote} Typical lead time is ${market.leadTime}.`,
    },
    {
      question: `Is ${product.name} authentic and under warranty?`,
      answer:
        "Yes. Every product is sourced from manufacturers or authorized distribution partners with full chain-of-custody documentation and manufacturer warranty.",
    },
    {
      question: `Can I get pricing in ${market.currency}?`,
      answer: `Yes. Quotes are provided in ${market.currency} with delivery from our ${market.warehouse} warehouse. Request a quote for current pricing and availability.`,
    },
  ];

  return (
    <div className="min-h-screen bg-bg-dark">
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-sm text-text-dim max-w-7xl mx-auto px-4 pt-6"
      >
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-text-dim/60" />
        <Link
          href={`/${country.code}`}
          className="hover:text-primary transition-colors"
        >
          {country.name}
        </Link>
        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-text-dim/60" />
        <Link
          href={`/${country.code}/products`}
          className="hover:text-primary transition-colors"
        >
          Products
        </Link>
        <ChevronDown className="w-3.5 h-3.5 -rotate-90 text-text-dim/60" />
        <span className="text-text font-medium truncate max-w-[220px]">
          {product.name}
        </span>
      </nav>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="relative h-72 lg:h-[420px] bg-gradient-to-br from-surface-2 to-bg-dark rounded-2xl border border-border overflow-hidden">
              {image ? (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  unoptimized
                  className="object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-6xl font-black text-primary/20">
                  {product.manufacturer}
                </div>
              )}
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                {product.manufacturer} · {product.series}
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-text mb-4">
                {product.name}
              </h1>
              <p className="text-sm text-text-muted leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="rounded-2xl border border-primary/20 bg-surface/60 p-5 mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-text-dim mb-3">
                  Availability in {country.name}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <Banknote className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-text-muted">
                      Quoted in {market.currency} ({market.currencySymbol})
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Warehouse className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-text-muted">
                      Ships from {market.warehouse}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-text-muted">
                      {market.leadTime} lead time
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm text-text-muted">
                      {country.name} delivery
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/rfq"
                  className="inline-flex items-center gap-2 bg-primary text-bg-dark px-5 py-3 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25"
                >
                  Request Quote in {market.currency}{" "}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-border bg-surface text-text px-5 py-3 rounded-xl font-semibold text-sm hover:border-primary/30 hover:text-primary transition-transform"
                >
                  <MapPin className="w-4 h-4" />
                  Talk to Sales
                </Link>
                <Link
                  href={`/products/${product.slug}`}
                  className="inline-flex items-center gap-2 text-text-muted hover:text-primary text-sm px-2 py-3 font-medium transition-colors"
                >
                  View global listing →
                </Link>
              </div>

              {product.keyFeatures.length > 0 && (
                <div className="mt-8">
                  <h2 className="text-sm font-bold text-text mb-3">
                    Key Features
                  </h2>
                  <ul className="space-y-2">
                    {product.keyFeatures.slice(0, 6).map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-text-muted"
                      >
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {specEntries.length > 0 && (
            <div className="mt-12">
              <h2 className="text-lg font-bold text-text mb-4">
                Specifications
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {specEntries.map(([key, value]) => (
                  <div
                    key={key}
                    className="rounded-xl border border-border bg-surface p-4"
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-text-dim mb-1">
                      {key.replace(/([A-Z])/g, " $1")}
                    </div>
                    <div className="text-sm font-semibold text-text">
                      {typeof value === "string" || typeof value === "number"
                        ? value
                        : JSON.stringify(value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <section className="mt-12">
            <h2 className="text-lg font-bold text-text mb-4">
              Frequently Asked Questions — {country.name}
            </h2>
            <div className="space-y-3 max-w-3xl">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={faq.question}
                    className={`rounded-xl border overflow-hidden ${
                      isOpen
                        ? "border-primary/40 bg-surface"
                        : "border-border bg-surface hover:border-primary/20"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-sm font-semibold text-text">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-text-dim transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5">
                        <p className="text-sm text-text-muted leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-12 mb-16">
            <div className="rounded-2xl border border-primary/20 bg-surface/50 p-8 text-center max-w-3xl mx-auto">
              <h3 className="text-lg font-bold text-text mb-2">
                Get {product.name} in {country.name}
              </h3>
              <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
                Request a quote in {market.currency} with delivery from{" "}
                {market.warehouse}. Authentic, warrantied hardware with full
                documentation.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href={`/rfq?product=${product.slug}`}
                  className="inline-flex items-center gap-2 bg-primary text-bg-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25"
                >
                  Request a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-border bg-surface text-text px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-primary/30 hover:text-primary transition-transform"
                >
                  <MapPin className="w-4 h-4" />
                  Contact Sales
                </Link>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
