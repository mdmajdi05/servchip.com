"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SERVICES } from "@/data/home";
import type { ServiceItem } from "@/data/home";

function ServiceCard({
  service,
  index,
}: {
  service: ServiceItem;
  index: number;
}) {
  const Icon = service.icon;
  return (
    <div className="group relative">
      <div className="relative h-full rounded-2xl border border-border bg-surface p-6 card-hover overflow-hidden">
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 blur-2xl group-hover:bg-primary/10 transition-all" />

        <div className="relative">
          <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <Icon className="w-6 h-6 text-primary" />
          </div>

          <h3 className="text-lg font-bold text-text mb-2">{service.title}</h3>
          <p className="text-sm text-text-muted leading-relaxed mb-4">
            {service.desc}
          </p>

          <ul className="space-y-1.5 mb-4">
            {service.features.map((f) => (
              <li
                key={f}
                className="flex items-center gap-2 text-xs text-text-dim"
              >
                <span className="w-1 h-1 rounded-full bg-primary/60 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1 text-primary text-xs font-semibold group/link"
          >
            Learn More{" "}
            <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export function ServicesShowcase() {
  return (
    <section className="py-20 bg-bg-body relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-20" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <SectionHeading
          label="Our Services"
          title="Enterprise Chip Sourcing & Semiconductor Procurement Services"
          subtitle="From AI accelerator sourcing to data center deployment — comprehensive services backed by multi-vendor expertise"
          align="center"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
