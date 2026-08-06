"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Cpu,
  MapPin,
  Truck,
  Warehouse,
  Clock,
  Banknote,
} from "lucide-react";
import { useState } from "react";
import { getCountryByCode } from "@/data/countries";
import { COUNTRY_MARKETS } from "@/data/country-markets";
import { getBrand } from "@/data/brands";
import {
  getProductsByBrand,
  getProductsByParentCategory,
  getProductsByUseCases,
} from "@/data/products";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CountryProductCard } from "@/components/products/CountryProductCard";

export default function CountryHomePage() {
  const params = useParams();
  const countrySlug = params.countrySlug as string;
  const country = getCountryByCode(countrySlug);
  const market = COUNTRY_MARKETS[countrySlug];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!country) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">
            Location Not Found
          </h1>
          <Link href="/products" className="text-primary hover:underline">
            Browse all products
          </Link>
        </div>
      </div>
    );
  }

  const brandIds = country.related?.brandIds ?? [];
  const categoryIds = country.related?.categoryIds ?? [];
  const useCases = country.related?.useCases ?? [];
  const relatedBrands = brandIds
    .map((id) => getBrand(id))
    .filter((b): b is NonNullable<typeof b> => Boolean(b));

  const productsByCategory = categoryIds.flatMap((cid) =>
    getProductsByParentCategory(cid),
  );
  const productsByBrand = brandIds.flatMap((bid) => getProductsByBrand(bid));
  const productsByUseCase = getProductsByUseCases(useCases);

  const relatedProducts = Array.from(
    new Map(
      [...productsByCategory, ...productsByBrand, ...productsByUseCase].map(
        (p) => [p.id, p],
      ),
    ).values(),
  ).slice(0, 8);

  const faqs = market
    ? [
        {
          question: `Do you deliver AI hardware across ${country.name}?`,
          answer: market.shippingNote,
        },
        ...country.faqs,
      ]
    : country.faqs;

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label={`${country.flag} ${country.region}`}
        title={country.hero.title}
        subtitle={country.hero.subtitle}
        breadcrumbs={[{ label: "Home", href: "/" }, { label: country.name }]}
      />

      {market && (
        <section className="py-10 bg-bg-body">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
                <Banknote className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-dim">Pricing in</div>
                  <div className="text-sm font-bold text-text">
                    {market.currency} ({market.currencySymbol})
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
                <Warehouse className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-dim">Warehouse</div>
                  <div className="text-sm font-bold text-text">
                    {market.warehouse}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
                <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-dim">Lead time</div>
                  <div className="text-sm font-bold text-text">
                    {market.leadTime}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark">
                <Truck className="w-5 h-5 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-text-dim">Shipping</div>
                  <div className="text-sm font-semibold text-text leading-tight">
                    Nationwide delivery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {country.stats?.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark"
              >
                <Cpu className="w-5 h-5 text-primary" />
                <div>
                  <div className="text-lg font-black text-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-dim">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          <SectionHeading
            label={country.name}
            title={`Enterprise AI Hardware for ${country.name}`}
            subtitle={country.longDescription}
            align="center"
          />

          {relatedBrands.length > 0 && (
            <div className="mt-10">
              <SectionHeading
                label="Brands"
                title="Available Brands"
                subtitle={`Leading enterprise brands we distribute across ${country.name}`}
                align="center"
              />
              <div className="flex flex-wrap justify-center gap-4">
                {relatedBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`/${countrySlug}/products`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface card-hover hover:border-primary/30"
                  >
                    <span className="text-sm font-semibold text-text">
                      {brand.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Products"
            title={`Available Hardware in ${country.name}`}
            subtitle={`Featured AI accelerators, servers, networking and storage available in ${country.name}`}
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <CountryProductCard
                key={product.id}
                product={product}
                countryCode={countrySlug}
              />
            ))}
          </div>
          {relatedProducts.length === 0 && (
            <p className="text-center text-text-muted">
              No products currently listed. Contact us for availability.
            </p>
          )}
          <div className="text-center mt-10">
            <Link
              href={`/${countrySlug}/products`}
              className="inline-flex items-center gap-2 bg-primary text-bg-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25"
            >
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-body">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading
            label="FAQ"
            title={`Frequently Asked Questions — ${country.name}`}
            align="center"
          />
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.question}
                  className={`rounded-xl border overflow-hidden transition-transform duration-200 ${
                    isOpen
                      ? "border-primary/40 bg-surface shadow-lg shadow-primary/5"
                      : "border-border bg-surface hover:border-primary/20"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="text-sm font-semibold text-text flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <HelpCircle className="w-3.5 h-3.5 text-primary" />
                      </span>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-text-dim transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pl-12">
                      <p className="text-sm text-text-muted leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-dark">
        <div className="max-w-4xl mx-auto px-4">
          <div className="rounded-2xl border border-primary/20 bg-surface/50 p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">
              Need Hardware in {country.name}?
            </h3>
            <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
              {market
                ? `Get a quote in ${market.currency} for authentic, warrantied enterprise hardware delivered across ${country.name} within ${market.leadTime}.`
                : `Get a quote for authentic, warrantied enterprise hardware delivered to ${country.name}.`}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/rfq"
                className="inline-flex items-center gap-2 bg-primary text-bg-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border bg-surface text-text px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-primary/30 hover:text-primary transition-transform"
              >
                <MapPin className="w-4 h-4" />
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
