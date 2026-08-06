"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  HelpCircle,
  Rocket,
  Truck,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { getSolutionBySlug } from "@/data/solutions";
import { getBrand } from "@/data/brands";
import {
  getProductsByBrand,
  getProductsByParentCategory,
  getProductsByUseCases,
} from "@/data/products";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

export default function SolutionPage() {
  const prefix = useCountryPrefix();
  const params = useParams();
  const slug = params.slug as string;
  const solution = getSolutionBySlug(slug);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!solution) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text mb-2">
            Solution Not Found
          </h1>
          <Link
            href={`${prefix}/solutions`}
            className="text-primary hover:underline"
          >
            Browse solutions
          </Link>
        </div>
      </div>
    );
  }

  const brandIds = solution.related?.brandIds ?? [];
  const categoryIds = solution.related?.categoryIds ?? [];
  const useCases = solution.related?.useCases ?? [];
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
  ).slice(0, 12);

  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label={solution.name}
        title={solution.hero.title}
        subtitle={solution.hero.subtitle}
        breadcrumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Solutions", href: `${prefix}/solutions` },
          { label: solution.name },
        ]}
      />

      <section className="py-16 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {solution.stats?.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-4 rounded-xl border border-border bg-bg-dark"
              >
                <Zap className="w-5 h-5 text-primary" />
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
            label={solution.name}
            title={`${solution.name} — Enterprise Deployment`}
            subtitle={solution.longDescription}
            align="center"
          />

          {relatedBrands.length > 0 && (
            <div className="mt-10">
              <SectionHeading
                label="Brands"
                title="Platforms We Deliver"
                subtitle="The hardware partners powering this solution"
                align="center"
              />
              <div className="flex flex-wrap justify-center gap-4">
                {relatedBrands.map((brand) => (
                  <Link
                    key={brand.id}
                    href={`${prefix}/brands/${brand.slug}`}
                    className="flex items-center gap-3 p-4 rounded-xl border border-border bg-surface card-hover hover:border-primary/30"
                  >
                    <BrandLogo name={brand.name} className="w-6 h-6" />
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
            title={`Hardware for ${solution.name}`}
            subtitle="Recommended accelerators, servers and networking for this workload"
            align="center"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {relatedProducts.length === 0 && (
            <p className="text-center text-text-muted">
              No products currently listed. Contact us for availability.
            </p>
          )}
          <div className="text-center mt-10">
            <Link
              href={`${prefix}/products`}
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
            title={`Frequently Asked Questions — ${solution.name}`}
            align="center"
          />
          <div className="space-y-3">
            {solution.faqs.map((faq, index) => {
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
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">
              Ready to deploy {solution.name}?
            </h3>
            <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
              Get a tailored quote and reference architecture from our
              engineers.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href={`${prefix}/rfq`}
                className="inline-flex items-center gap-2 bg-primary text-bg-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`${prefix}/contact`}
                className="inline-flex items-center gap-2 border border-border bg-surface text-text px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-primary/30 hover:text-primary transition-transform"
              >
                <Truck className="w-4 h-4" />
                Talk to Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
