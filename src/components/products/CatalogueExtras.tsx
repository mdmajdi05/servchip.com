"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  Cpu,
  Server,
  Network,
  MemoryStick,
  HardDrive,
  Brain,
  Cloud,
  ShieldCheck,
  Truck,
  BadgeCheck,
  MessageSquare,
} from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { BRANDS } from "@/data/brands";
import { ALL_PRODUCTS } from "@/data/products";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { getBrandTextColor } from "@/data/brand-colors";
import { HOW_IT_WORKS_STEPS } from "@/data/home";
import type { Country, CountryMarket } from "@/types";

const CATEGORY_ICONS: Record<string, typeof Cpu> = {
  Server,
  Cpu,
  Network,
  MemoryStick,
  HardDrive,
  Brain,
  Cloud,
};

function categoryCount(categoryId: string) {
  return ALL_PRODUCTS.filter(
    (p) => "parentCategoryId" in p && p.parentCategoryId === categoryId,
  ).length;
}

export function CatalogueExtras({
  country,
  market,
}: {
  country?: Country;
  market?: CountryMarket;
}) {
  const countryLabel = country?.hero.label ?? "";
  const categories = CATEGORIES.filter(
    (c) => c.isActive && categoryCount(c.id) > 0,
  );

  return (
    <>
      {/* ---------- Browse by Category ---------- */}
      <section className="py-16 md:py-24 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Product Categories"
            title={`Browse the Enterprise Catalogue${
              country ? ` in ${countryLabel}` : ""
            }`}
            subtitle="Every family we distribute - AI accelerators, server CPUs, GPU platforms, networking, memory and storage - all authentic and warrantied."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mt-12">
            {categories.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.icon] ?? Server;
              const count = categoryCount(cat.id);
              return (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="group relative rounded-2xl border border-border bg-surface p-5 card-hover overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-transform">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-bold text-text leading-snug mb-1.5">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-text-muted leading-relaxed line-clamp-2 mb-4">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 border border-primary/20 rounded-full px-2.5 py-1">
                      {count} SKU{count !== 1 ? "s" : ""}
                    </span>
                    <ArrowRight className="w-4 h-4 text-text-dim group-hover:text-primary group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link href="/categories">
              <Button
                variant="outline"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Shop by Manufacturer ---------- */}
      <section className="py-14 md:py-16 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Manufacturers"
            title="Shop by Manufacturer"
            subtitle="Authentic hardware from the world's leading silicon and server vendors."
            align="center"
          />
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {BRANDS.map((brand) => {
              const color = getBrandTextColor(brand.name);
              return (
                <Link
                  key={brand.id}
                  href={`/brands/${brand.slug}`}
                  className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-border bg-surface hover:border-primary/40 transition-transform"
                >
                  <BrandLogo
                    name={brand.name}
                    className="w-5 h-5 shrink-0"
                    compact
                  />
                  <span
                    className="text-sm font-bold whitespace-nowrap"
                    style={{ color }}
                  >
                    {brand.name}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-text-dim group-hover:text-primary transition-transform" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------- How Procurement Works ---------- */}
      <section className="relative py-16 md:py-24 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <SectionHeading
            label="Procurement"
            title="From Requirement to Delivery in 3 Steps"
            subtitle="Enterprise-grade sourcing without the friction - real people, real quotes, real hardware."
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative mt-12">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={step.number} className="text-center relative">
                <div className="w-20 h-20 mx-auto rounded-full bg-bg-dark border-2 border-primary/20 flex items-center justify-center mb-5 relative z-10">
                  <span className="text-2xl font-black text-primary">
                    {step.number}
                  </span>
                </div>
                <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-text mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <ArrowRight className="hidden md:block absolute top-12 -right-6 w-4 h-4 text-primary/40 rotate-180" />
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/rfq">
              <Button
                variant="solid"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Start Your Order
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-20 md:py-24 bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[360px] bg-primary/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          <div className="relative rounded-3xl border border-primary/25 bg-surface overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <div className="relative px-6 md:px-14 py-12 md:py-16 text-center">
              <h2 className="text-2xl md:text-4xl font-bold text-text mb-4">
                Looking for{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Volume or Custom Pricing
                </span>
                {country ? ` in ${countryLabel}?` : "?"}
              </h2>
              <p className="text-text-muted text-sm md:text-base mb-8 max-w-2xl mx-auto">
                {country && market
                  ? `Get ${market.currency} (${market.currencySymbol}) quotes with ${market.leadTime} delivery from ${market.warehouse} - authentic hardware, full warranty and chain-of-custody documentation on every order.`
                  : "Whether you need a single NVIDIA H100 or a full rack of AMD MI300Xs - no minimums, real quotes within 24 hours, and delivery to 150+ countries."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
                <Link href="/rfq">
                  <Button
                    variant="solid"
                    size="lg"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Request a Quote
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="lg"
                    icon={<MessageSquare className="w-4 h-4" />}
                  >
                    Talk to an Expert
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-xs text-text-dim">
                <span className="flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                  100% Authentic Products
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                  ISO 9001:2015 Certified
                </span>
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-primary" />
                  Ships to 150+ Countries
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
