"use client";

import Link from "next/link";
import { ArrowRight, Server } from "lucide-react";
import { INDUSTRIES } from "@/data/industries";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

const ICON_MAP: Record<string, typeof Server> = {
  Server,
  Brain: Server,
  HeartPulse: Server,
  Landmark: Server,
  Shield: Server,
  GraduationCap: Server,
  Network: Server,
  Factory: Server,
};

export default function IndustriesPage() {
  const prefix = useCountryPrefix();
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Industries"
        title="Enterprise AI Solutions by Industry"
        subtitle="Industry-specific AI and data center hardware solutions across healthcare, finance, government, research, telecom and more."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Industries" }]}
      />

      <section className="py-16 bg-bg-body">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Industries"
            title="Explore Our Industry Solutions"
            subtitle="Every industry has unique compute, compliance and scale requirements. Explore how we architect enterprise AI hardware for yours."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES.map((industry) => {
              const Icon = ICON_MAP[industry.icon] || Server;
              return (
                <Link
                  key={industry.id}
                  href={`${prefix}/industries/${industry.slug}`}
                  className="group rounded-2xl border border-border bg-surface p-6 card-hover h-full"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-transform">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2 group-hover:text-primary transition-transform">
                    {industry.name}
                  </h3>
                  <p className="text-sm text-text-muted mb-4">
                    {industry.description}
                  </p>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary">
                    Explore solutions <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
