"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import {
  ArrowRight,
  Server,
  Brain,
  HeartPulse,
  BarChart3,
  Landmark,
  FlaskConical,
  Radio,
  Factory,
  Building2,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { INDUSTRIES } from "@/data/industries";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";

const ICON_MAP: Record<string, typeof Server> = {
  Server,
  Brain,
  HeartPulse,
  BarChart3,
  Landmark,
  FlaskConical,
  Radio,
  Factory,
};

const INDUSTRY_BENEFITS = [
  {
    icon: ShieldCheck,
    title: "Compliance-Ready Hardware",
    description:
      "Authentic enterprise chips with full documentation for regulated industries.",
  },
  {
    icon: Zap,
    title: "Workload-Optimized Architectures",
    description:
      "GPU and CPU configurations tuned for your specific industry workloads.",
  },
  {
    icon: Building2,
    title: "Global Delivery & Support",
    description: "150+ countries served with local expertise in key markets.",
  },
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Industries"
        title="Enterprise AI Solutions by Industry"
        subtitle="Industry-specific AI and data center hardware solutions across healthcare, finance, government, research, telecom, manufacturing and more."
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
                  href={`/industries/${industry.slug}`}
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
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {industry.stats?.slice(0, 3).map((stat) => (
                      <Badge key={stat.label} variant="default" size="sm">
                        {stat.value} {stat.label}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-medium text-primary">
                    Explore solutions <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-dark">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Why Servchip"
            title="Industry-Focused Procurement Advantages"
            subtitle="Our deep industry expertise translates into tangible procurement benefits for your organization."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {INDUSTRY_BENEFITS.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-2xl border border-border bg-surface p-6 card-hover text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-text-muted leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-bg-body">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
            Don&apos;t See Your Industry Listed?
          </h2>
          <p className="text-text-muted text-sm mb-8 max-w-xl mx-auto">
            We work with organizations across emerging sectors including
            automotive, energy, media, retail, and more. Our engineering team
            can design custom reference architectures for any GPU-accelerated
            workload.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <button className="bg-primary text-bg-dark px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary-dark transition-transform">
                Discuss Your Industry Needs
              </button>
            </Link>
            <Link href="/rfq">
              <button className="border border-primary/40 text-primary px-6 py-3 rounded-lg font-semibold text-sm hover:bg-primary/10 transition-transform">
                Submit Custom RFQ
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
