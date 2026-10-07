"use client";

import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  CheckCircle2,
  Clock,
  Gauge,
  MessageCircle,
  Layers,
  MessageSquare,
  Rocket,
  ShieldCheck,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import type { CategoryArticle } from "@/data/category-content";

const FEATURE_ICONS = [Zap, Gauge, Layers];

const ADVANTAGE_ICONS = [ShieldCheck, CheckCircle2, Truck];

const STATS = [
  { icon: Boxes, value: "27+", label: "OEM Manufacturers" },
  { icon: Rocket, value: "150+", label: "Countries Served" },
  { icon: Clock, value: "24h", label: "Quote Turnaround" },
];

const TRUST_CHIPS = [
  { icon: BadgeCheck, label: "100% Authentic Products" },
  { icon: ShieldCheck, label: "Full Manufacturer Warranty" },
  { icon: Truck, label: "Ships to 150+ Countries" },
];

export function CategorySeoArticle({
  article,
}: {
  article?: CategoryArticle | null;
}) {
  if (!article) return null;

  return (
    <div className="border-t border-border-subtle">
      {/* ================= Intro + Platform Highlights ================= */}
      <section className="relative py-16 md:py-24 bg-bg-body overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-[0.06]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* ---- Left: editorial copy ---- */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 mb-6">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                  Enterprise AI Infrastructure
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-black text-text leading-tight tracking-tight mb-5">
                {article.introTitle}
              </h2>

              <div className="space-y-4">
                {article.intro.map((p, i) => (
                  <p
                    key={i}
                    className="text-text-muted text-base leading-relaxed max-w-xl"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* ---- Right: stat panel ---- */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-border/60 bg-surface/40 overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid opacity-[0.05]" />
                <div className="relative p-6 sm:p-7">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 border border-primary/20 bg-primary/5 mb-6">
                    <BadgeCheck className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                      Why Buy Through Servchip
                    </span>
                  </div>

                  <div className="space-y-3">
                    {STATS.map((stat) => (
                      <div
                        key={stat.label}
                        className="flex items-center gap-4 rounded-xl border border-border/70 bg-bg-dark/60 p-4"
                      >
                        <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                          <stat.icon className="w-5 h-5 text-primary/90" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xl font-black text-text leading-none tracking-tight">
                            {stat.value}
                          </p>
                          <p className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-wider mt-1.5">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-5 border-t border-border/50 flex flex-wrap justify-center gap-2">
                    {[
                      "ISO 9001:2015",
                      "Chain of Custody",
                      "Zero Counterfeit",
                    ].map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center rounded-full border border-border/60 bg-bg-dark/80 px-3 py-1 text-[10px] font-mono font-bold text-text-dim uppercase tracking-wider"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ---- Platform highlights ---- */}
          <div className="mt-16 md:mt-20">
            <div className="flex items-center gap-4 mb-9">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/25 flex items-center justify-center shrink-0">
                <Boxes className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-1">
                  Platform Highlights
                </p>
                <h3 className="text-xl md:text-2xl font-bold text-text leading-tight">
                  {article.featuresTitle}
                </h3>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {article.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length] ?? Zap;
                return (
                  <div
                    key={f.title}
                    className="group relative rounded-2xl border border-border bg-surface p-6 card-hover overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/15 border border-primary/25 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-text mb-2">
                      {f.title}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ================= Key Advantages ================= */}
      <section className="relative py-16 md:py-24 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[300px] bg-primary/10 blur-[130px] rounded-full" />
        </div>
        <div className="absolute inset-0 bg-dot-grid opacity-[0.04]" />

        <div className="relative max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Why Servchip"
            title={article.advantagesTitle}
            subtitle={
              article.advantagesIntro ?? "Built for reliability and uptime."
            }
            align="center"
          />

          <div className="grid md:grid-cols-3 gap-5">
            {article.advantages.map((adv, i) => {
              const Icon =
                ADVANTAGE_ICONS[i % ADVANTAGE_ICONS.length] ?? CheckCircle2;
              return (
                <div
                  key={adv.title}
                  className="group relative rounded-2xl p-px bg-gradient-to-b from-primary/40 via-border/50 to-border/40 hover:from-primary/60 hover:via-primary/30 hover:to-border/60 transition-all duration-300"
                >
                  <div className="relative rounded-[15px] bg-surface p-6 h-full overflow-hidden">
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-text mb-2">
                      {adv.title}
                    </h4>
                    <p className="text-xs text-text-muted leading-relaxed">
                      {adv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="relative py-16 md:py-24 bg-bg-body overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/15 to-primary/0" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-12 lg:gap-16 items-start">
            {/* ---- Left: heading + help card ---- */}
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                align="left"
                label={article.faqTitle}
                title={article.faqSubtitle ?? "Frequently Asked Questions"}
                subtitle="Straight answers from our engineering and procurement teams on enterprise AI infrastructure, lead times and warranty coverage."
              />

              <div className="rounded-2xl border border-border bg-surface p-6 -mt-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h4 className="text-sm font-bold text-text mb-1.5">
                  Still have questions?
                </h4>
                <p className="text-xs text-text-muted leading-relaxed mb-5">
                  Talk to our procurement engineers directly for a fast,
                  workload-matched answer.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<ArrowRight className="w-4 h-4" />}
                    iconPosition="right"
                  >
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>

            {/* ---- Right: FAQ cards ---- */}
            <div className="space-y-4">
              {article.faqs.map((f, i) => (
                <div
                  key={f.q}
                  className="group rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-sm md:text-base font-bold text-text leading-snug">
                          {f.q}
                        </h3>
                        <span className="text-[10px] font-mono font-bold text-text-dim uppercase tracking-widest shrink-0 mt-0.5">
                          Q{String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed">
                        {f.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-20 md:py-24 bg-bg-dark relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[380px] bg-primary/10 blur-[130px] rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4">
          <div className="relative rounded-3xl p-px bg-gradient-to-r from-primary/50 via-secondary/40 to-primary/50">
            <div className="relative rounded-[calc(1.5rem-1px)] bg-surface overflow-hidden">
              <div className="absolute inset-0 bg-dot-grid opacity-[0.05]" />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

              <div className="relative px-6 md:px-14 py-12 md:py-16 text-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 mb-6">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                    Request a Quote
                  </span>
                </div>

                <h2 className="text-2xl md:text-4xl font-black text-text leading-tight tracking-tight mb-5">
                  {article.ctaTitle}
                </h2>
                <p className="text-text-muted text-sm md:text-base leading-relaxed mb-9 max-w-2xl mx-auto">
                  {article.ctaText}
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
                  {TRUST_CHIPS.map((chip) => (
                    <span
                      key={chip.label}
                      className="flex items-center gap-1.5"
                    >
                      <chip.icon className="w-3.5 h-3.5 text-primary" />
                      {chip.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
