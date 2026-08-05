"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COUNTRIES } from "@/data/countries";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CountriesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Countries"
        title="Enterprise AI Hardware, Delivered Globally"
        subtitle="Authentic NVIDIA, AMD and Intel hardware delivered across India, the UAE, USA, Saudi Arabia, Qatar and Oman with full customs handling."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Countries" }]}
      />

      <section className="py-16 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Countries"
            title="Regions We Serve"
            subtitle="Enterprise chip distribution and AI infrastructure supply across our key markets."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNTRIES.map((country) => (
              <Link
                key={country.id}
                href={`/countries/${country.slug}`}
                className="group rounded-2xl border border-border bg-surface p-6 card-hover h-full"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-transform text-2xl">
                  {country.flag}
                </div>
                <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-transform">
                  {country.name}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {country.description}
                </p>
                <div className="flex items-center gap-1 text-xs font-medium text-primary">
                  Explore {country.name} <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
