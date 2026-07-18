"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { WHY_FEATURES } from "@/data/home";

export function WhyServchip() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Why Servchip"
          title="Why Enterprises Choose Servchip for Semiconductor Procurement"
          align="center"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_FEATURES.map((feature, index) => (
            <div key={feature.title}>
              <Card variant="elevated" className="h-full">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-text mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
