"use client";

import {
  ArrowRight,
  BadgeCheck,
  Boxes,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  FileText,
  Gauge,
  Handshake,
  Headphones,
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
import { renderRichText } from "@/components/ui/rich-text";
import { useEffect, useState } from "react";
import type {
  CategoryArticle,
  CategoryArticleSection,
} from "@/data/category-content";

function toAnchor(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const FEATURE_ICONS = [Zap, Gauge, Layers];

const ADVANTAGE_ICONS = [ShieldCheck, CheckCircle2, Truck];

const SECTION_ICONS = [Handshake, Boxes, ShieldCheck, ClipboardList];

const GRID_ICONS = [BadgeCheck, ClipboardCheck, Headphones, FileText];

function LeadParagraphs({ paragraphs }: { paragraphs?: string[] }) {
  if (!paragraphs || paragraphs.length === 0) return null;
  return (
    <>
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={
            i === 0
              ? "text-base md:text-lg text-text-muted leading-relaxed mb-4 max-w-3xl"
              : "text-sm md:text-base text-text-muted leading-relaxed mb-4 max-w-3xl"
          }
        >
          {renderRichText(p)}
        </p>
      ))}
    </>
  );
}

function SectionCta({
  section,
  centered,
}: {
  section: CategoryArticleSection;
  centered?: boolean;
}) {
  if (!section.ctaLabel || !section.ctaHref) return null;
  return (
    <div className={centered ? "mt-8 flex justify-center" : "mt-7"}>
      <Link href={section.ctaHref}>
        <Button
          variant="solid"
          size="lg"
          icon={<ArrowRight className="w-4 h-4" />}
          iconPosition="right"
        >
          {section.ctaLabel}
        </Button>
      </Link>
    </div>
  );
}

function SectionOutro({ section }: { section: CategoryArticleSection }) {
  if (!section.outro || section.outro.length === 0) return null;
  return (
    <>
      {section.outro.map((p, i) => (
        <p
          key={i}
          className="text-sm md:text-base text-text-muted leading-relaxed mb-4 max-w-3xl"
        >
          {renderRichText(p)}
        </p>
      ))}
    </>
  );
}

/** Per-layout chapter body. Each layout gives its chapter a distinct look. */
function SectionBody({ section: s }: { section: CategoryArticleSection }) {
  /* ---- split: editorial text + checklist side card ---- */
  if (s.layout === "split") {
    const [first, ...rest] = s.intro ?? [];
    return (
      <div>
        {first && <LeadParagraphs paragraphs={[first]} />}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] items-start mt-2">
          <div>
            <LeadParagraphs paragraphs={rest} />
            <SectionOutro section={s} />
            <SectionCta section={s} />
          </div>
          <aside className="relative overflow-hidden rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/[0.12] to-surface/60 p-6">
            <div className="absolute inset-0 bg-dot-grid opacity-[0.05]" />
            <div className="relative">
              {s.sideTitle && (
                <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-4">
                  {s.sideTitle}
                </p>
              )}
              {s.sideItems && s.sideItems.length > 0 && (
                <ul className="space-y-3">
                  {s.sideItems.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-3 text-sm font-medium text-text"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {s.sideFooter && (
                <>
                  <div className="my-4 h-px bg-gradient-to-r from-primary/30 to-transparent" />
                  <p className="text-xs text-text-muted leading-relaxed italic">
                    &ldquo;{s.sideFooter}&rdquo;
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  /* ---- cards: 3 numbered config cards ---- */
  if (s.layout === "cards") {
    return (
      <div>
        <LeadParagraphs paragraphs={s.intro} />
        {s.bullets && s.bullets.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 my-7">
            {s.bullets.map((b, i) => (
              <div
                key={b.slice(0, 48)}
                className="group relative overflow-hidden rounded-2xl border border-border/70 bg-surface/60 p-6 transition-all duration-300 hover:border-primary/30 hover:bg-surface hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-4xl font-black tracking-tight text-primary/25 group-hover:text-primary/60 transition-colors">
                  0{i + 1}
                </span>
                <p className="mt-4 text-sm text-text-muted leading-relaxed">
                  {renderRichText(b)}
                </p>
              </div>
            ))}
          </div>
        )}
        <SectionOutro section={s} />
        <SectionCta section={s} />
      </div>
    );
  }

  /* ---- grid: 2x2 icon cards ---- */
  if (s.layout === "grid") {
    return (
      <div>
        <LeadParagraphs paragraphs={s.intro} />
        {s.bullets && s.bullets.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4 my-7">
            {s.bullets.map((b, i) => {
              const GIcon = GRID_ICONS[i % GRID_ICONS.length] ?? BadgeCheck;
              return (
                <div
                  key={b.slice(0, 48)}
                  className="group flex items-start gap-4 rounded-2xl border border-border/70 bg-surface/60 p-5 transition-all duration-300 hover:border-primary/30 hover:bg-surface hover:shadow-lg hover:shadow-primary/5"
                >
                  <span className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center shrink-0 group-hover:bg-primary/20 group-hover:scale-105 transition-all">
                    <GIcon className="w-5 h-5 text-primary" />
                  </span>
                  <span className="text-sm text-text-muted leading-relaxed pt-1.5">
                    {renderRichText(b)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
        <SectionOutro section={s} />
        <SectionCta section={s} />
      </div>
    );
  }

  /* ---- steps: horizontal process cards with connectors ---- */
  if (s.layout === "steps") {
    return (
      <div>
        <LeadParagraphs paragraphs={s.intro} />
        {s.numbered && s.numbered.length > 0 && (
          <ol className="my-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {s.numbered.map((step, ni) => (
              <li
                key={step.slice(0, 48)}
                className="group relative rounded-2xl border border-border/70 bg-surface/60 p-5 transition-all duration-300 hover:border-primary/40 hover:bg-surface hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
              >
                <span className="inline-flex items-center rounded-lg bg-primary px-2.5 py-1 text-[11px] font-mono font-black tracking-wider text-bg-dark mb-4">
                  STEP {ni + 1}
                </span>
                <p className="text-sm text-text-muted leading-relaxed">
                  {renderRichText(step)}
                </p>
                {ni < s.numbered!.length - 1 && (
                  <ChevronRight
                    aria-hidden
                    className="hidden xl:block absolute top-1/2 -translate-y-1/2 -right-[23px] z-10 w-6 h-6 text-primary rounded-full bg-bg-dark border border-primary/30"
                  />
                )}
              </li>
            ))}
          </ol>
        )}
        <SectionOutro section={s} />
        <SectionCta section={s} centered />
      </div>
    );
  }

  /* ---- default: simple checklist ---- */
  return (
    <div>
      <LeadParagraphs paragraphs={s.intro} />
      {s.bullets && s.bullets.length > 0 && (
        <ul className="my-6 space-y-3">
          {s.bullets.map((b) => (
            <li
              key={b.slice(0, 48)}
              className="flex items-start gap-3 text-sm md:text-base text-text-muted leading-relaxed"
            >
              <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span>{renderRichText(b)}</span>
            </li>
          ))}
        </ul>
      )}
      {s.numbered && s.numbered.length > 0 && (
        <ol className="my-6 space-y-3">
          {s.numbered.map((step, ni) => (
            <li
              key={step.slice(0, 48)}
              className="flex items-start gap-3 text-sm md:text-base text-text-muted leading-relaxed"
            >
              <span className="font-mono font-bold text-primary shrink-0">
                {String(ni + 1).padStart(2, "0")}
              </span>
              <span>{renderRichText(step)}</span>
            </li>
          ))}
        </ol>
      )}
      <SectionOutro section={s} />
      <SectionCta section={s} />
    </div>
  );
}

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
  const [activeChapter, setActiveChapter] = useState<string | null>(null);

  useEffect(() => {
    const sections = article?.sections;
    if (!sections || sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        }
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    const observed: Element[] = [];
    for (const s of sections) {
      const el = document.getElementById(toAnchor(s.heading));
      if (el) {
        observer.observe(el);
        observed.push(el);
      }
    }
    return () => observer.disconnect();
  }, [article]);

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
                    {renderRichText(p)}
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
          {article.features.length > 0 && (
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
                        {renderRichText(f.desc)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= Editorial guide sections ================= */}
      {article.sections && article.sections.length > 0 && (
        <section className="relative py-16 md:py-24 bg-bg-dark overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[720px] h-[300px] bg-primary/10 blur-[130px] rounded-full" />
          </div>
          <div className="absolute inset-0 bg-dot-grid opacity-[0.04]" />

          <div className="relative max-w-7xl mx-auto px-4">
            {/* ---- Mobile chapter chips ---- */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 mb-10 -mx-4 px-4">
              {article.sections.map((s, si) => (
                <a
                  key={s.heading}
                  href={`#${toAnchor(s.heading)}`}
                  className="flex items-center gap-2 shrink-0 rounded-full border border-border bg-surface px-4 py-2 text-xs font-medium text-text-muted hover:border-primary/40 hover:text-text transition-colors"
                >
                  <span className="font-mono font-bold text-primary">
                    {String(si + 1).padStart(2, "0")}
                  </span>
                  <span className="max-w-[220px] truncate">{s.heading}</span>
                </a>
              ))}
            </div>

            <div className="grid lg:grid-cols-[240px_minmax(0,1fr)] gap-10 xl:gap-16 items-start">
              {/* ---- Sticky chapter nav ---- */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-[10px] font-mono font-bold text-primary uppercase tracking-widest mb-4">
                    On this page
                  </p>
                  <nav className="space-y-1 border-l border-border/60 pl-1">
                    {article.sections.map((s, si) => {
                      const anchor = toAnchor(s.heading);
                      const isActive = activeChapter === anchor;
                      return (
                        <a
                          key={s.heading}
                          href={`#${anchor}`}
                          className={`group flex items-start gap-3 rounded-r-xl border-l-2 px-3 py-2.5 -ml-[9px] transition-all ${
                            isActive
                              ? "border-primary bg-surface"
                              : "border-transparent hover:border-primary/60 hover:bg-surface"
                          }`}
                        >
                          <span className="text-[10px] font-mono font-bold text-primary mt-0.5 shrink-0">
                            {String(si + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`text-xs font-medium leading-snug transition-colors ${
                              isActive
                                ? "text-text"
                                : "text-text-muted group-hover:text-text"
                            }`}
                          >
                            {s.heading}
                          </span>
                        </a>
                      );
                    })}
                  </nav>
                  <div className="mt-6 rounded-2xl border border-primary/25 bg-gradient-to-b from-primary/10 to-transparent p-5">
                    <p className="text-sm font-bold text-text mb-1">
                      Need a price?
                    </p>
                    <p className="text-xs text-text-muted leading-relaxed mb-4">
                      Itemised quote in 24–48 hours.
                    </p>
                    <Link href="/rfq">
                      <Button
                        variant="solid"
                        size="sm"
                        fullWidth
                        icon={<ArrowRight className="w-4 h-4" />}
                        iconPosition="right"
                      >
                        Request a Quote
                      </Button>
                    </Link>
                  </div>
                </div>
              </aside>

              {/* ---- Chapters ---- */}
              <div className="min-w-0">
                {article.sections.map((s, si) => {
                  const Icon =
                    SECTION_ICONS[si % SECTION_ICONS.length] ?? Boxes;
                  return (
                    <div
                      key={s.heading}
                      id={toAnchor(s.heading)}
                      className={
                        si > 0 ? "mt-16 md:mt-24 scroll-mt-28" : "scroll-mt-28"
                      }
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 border border-primary/25 flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-black text-text leading-tight tracking-tight pt-1">
                          {s.heading}
                        </h2>
                      </div>
                      <div className="h-[3px] w-20 rounded-full bg-gradient-to-r from-primary to-primary/0 mt-5 mb-7 ml-[60px]" />
                      <SectionBody section={s} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ================= Key Advantages ================= */}
      {article.advantages.length > 0 && (
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
                        {renderRichText(adv.desc)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

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
                        {renderRichText(f.a)}
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
