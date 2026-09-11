"use client";

import { useState } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ArrowRight,
  Ship,
  Globe,
  Rocket,
  Euro,
  MapPin,
  Satellite,
  RadioTower,
  PackageCheck,
  FileCheck2,
  Timer,
} from "lucide-react";

const styles = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes pulse-ring {
    0% { transform: scale(0.6); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
`;

const REGIONS = [
  {
    icon: Ship,
    title: "Middle East & GCC",
    hubSlug: "uae",
    tagline: "Fast DDP delivery from our Sharjah free zone",
    featured: true,
    highlights: [
      { icon: Timer, label: "Same-week GCC delivery" },
      { icon: PackageCheck, label: "DDP — customs cleared" },
    ],
    desc: (
      <>
        As an <strong className="text-text">AI chip distributor in UAE</strong>,
        Servchip supplies{" "}
        <strong className="text-text">NVIDIA H100, H200 and B200 GPUs</strong>{" "}
        from our <strong className="text-text">Sharjah free zone</strong> with
        fast DDP delivery across{" "}
        <strong className="text-text">
          Dubai, Abu Dhabi, Saudi Arabia, Qatar and Oman
        </strong>
        . Trusted as a{" "}
        <Link href="/brands/nvidia" className="text-primary hover:underline">
          NVIDIA supplier in Dubai
        </Link>{" "}
        and{" "}
        <Link href="/brands/amd" className="text-primary hover:underline">
          AMD authorized distributor in UAE
        </Link>
        , we support{" "}
        <strong className="text-text">
          Saudi Arabia Vision 2030 sovereign AI programs
        </strong>{" "}
        in Riyadh, Jeddah and Dammam — with full GCC customs clearance, 400GbE
        networking and rack-scale integration.
      </>
    ),
    countries: [
      { name: "United Arab Emirates", flag: "🇦🇪", slug: "uae" },
      { name: "Saudi Arabia", flag: "🇸🇦", slug: "saudi-arabia" },
      { name: "Qatar", flag: "🇶🇦", slug: "qatar" },
      { name: "Oman", flag: "🇴🇲", slug: "oman" },
    ],
  },
  {
    icon: Globe,
    title: "North America",
    hubSlug: "usa",
    tagline: "Full US export compliance support",
    featured: false,
    highlights: [
      { icon: FileCheck2, label: "US export compliant" },
      { icon: Satellite, label: "ISO 9001 certified" },
    ],
    desc: (
      <>
        Servchip is a certified{" "}
        <strong className="text-text">
          semiconductor distributor in the USA
        </strong>
        , supplying{" "}
        <strong className="text-text">
          AI accelerators and data center GPUs
        </strong>{" "}
        to American enterprises, cloud providers and research labs. As an{" "}
        <Link href="/brands/amd" className="text-primary hover:underline">
          AMD authorized distributor in USA
        </Link>{" "}
        and{" "}
        <Link href="/brands/nvidia" className="text-primary hover:underline">
          NVIDIA GPU distributor
        </Link>
        , we support full{" "}
        <strong className="text-text">US export compliance</strong> and fast
        domestic shipping for H100, MI300X, Xeon and HBM memory orders.
      </>
    ),
    countries: [{ name: "United States", flag: "🇺🇸", slug: "usa" }],
  },
  {
    icon: Rocket,
    title: "Asia Pacific",
    hubSlug: "singapore",
    tagline: "Data center hubs & cloud provider supply",
    featured: false,
    highlights: [
      { icon: RadioTower, label: "3 regional hubs" },
      { icon: PackageCheck, label: "Secure customs handling" },
    ],
    desc: (
      <>
        Across Southeast and East Asia, Servchip delivers enterprise AI hardware
        to{" "}
        <strong className="text-text">
          Singapore, Malaysia, the Philippines and China
        </strong>{" "}
        — from AI training clusters to HPC systems. We serve Singapore&apos;s
        data center hub, Malaysia&apos;s smart-city programs, Philippine cloud
        providers and Chinese enterprises with authentic NVIDIA, AMD and Intel
        chips, secure logistics and full customs support.
      </>
    ),
    countries: [
      { name: "Singapore", flag: "🇸🇬", slug: "singapore" },
      { name: "Malaysia", flag: "🇲🇾", slug: "malaysia" },
      { name: "China", flag: "🇨🇳", slug: "china" },
      { name: "Philippines", flag: "🇵🇭", slug: "philippines" },
    ],
  },
  {
    icon: Euro,
    title: "Europe",
    hubSlug: "united-kingdom",
    tagline: "EU-compliant documentation & delivery",
    featured: false,
    highlights: [
      { icon: FileCheck2, label: "EU documentation" },
      { icon: Timer, label: "Fast domestic delivery" },
    ],
    desc: (
      <>
        In <strong className="text-text">Europe</strong>, Servchip supplies{" "}
        <strong className="text-text">
          NVIDIA, AMD and Intel accelerators
        </strong>{" "}
        to enterprises across the{" "}
        <strong className="text-text">United Kingdom and Germany</strong>. From
        London data centers to{" "}
        <strong className="text-text">Frankfurt HPC and automotive AI</strong>{" "}
        hubs, we deliver Xeon and{" "}
        <Link href="/brands/intel" className="text-primary hover:underline">
          Intel Gaudi 3
        </Link>{" "}
        infrastructure, HBM memory and networking with EU-compliant
        documentation.
      </>
    ),
    countries: [
      { name: "United Kingdom", flag: "🇬🇧", slug: "united-kingdom" },
      { name: "Germany", flag: "🇩🇪", slug: "germany" },
    ],
  },
];

function RadarBackground() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      aria-hidden
    >
      <div className="relative w-[620px] h-[620px] opacity-50">
        <div className="absolute inset-0 rounded-full border border-primary/10" />
        <div className="absolute inset-14 rounded-full border border-primary/10" />
        <div className="absolute inset-28 rounded-full border border-primary/10" />
        <div className="absolute inset-42 rounded-full border border-primary/10" />
        {/* Sweeping radar line */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, rgba(0,188,212,0.08) 55deg, transparent 120deg)",
            animation: "spin-slow 9s linear infinite",
          }}
        />
        {/* Center pulse */}
        <div className="absolute top-1/2 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute inset-0 rounded-full bg-primary/40"
            style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
          />
          <span className="absolute inset-0 rounded-full bg-primary" />
        </div>
        <div className="absolute top-1/4 left-1/2 w-1.5 h-1.5 rounded-full bg-primary/70 animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-secondary/70 animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-primary/50 animate-pulse" />
      </div>
    </div>
  );
}

export function RegionalDistribution() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-20 bg-surface overflow-hidden">
      <style>{styles}</style>
      <div className="absolute inset-0 bg-dot-grid opacity-[0.05]" />
      <RadarBackground />

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <SectionHeading
          label="Regional Distribution"
          title="Enterprise Chip Distribution in the Gulf, Americas, Asia & Europe"
          subtitle="Authorized NVIDIA, AMD & Intel distribution across the UAE, USA, Singapore, Malaysia, UK, Germany and 150+ countries — with regional hubs and global delivery"
          align="center"
        />

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          {/* Region tabs */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {REGIONS.map((r, i) => {
              const isActive = active === i;
              return (
                <button
                  key={r.hubSlug}
                  onClick={() => setActive(i)}
                  aria-pressed={isActive}
                  className={`group relative flex-shrink-0 lg:w-full text-left flex items-center gap-3 rounded-xl px-4 py-3.5 border transition-all duration-300 ${
                    isActive
                      ? "border-primary/40 bg-gradient-to-r from-primary/[0.12] to-secondary/[0.06] shadow-lg shadow-primary/10"
                      : "border-border/70 bg-bg-dark/40 hover:border-primary/30 hover:bg-bg-dark/70"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-black ${
                      isActive ? "text-primary" : "text-text-dim/50"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 border transition-colors ${
                      isActive
                        ? "bg-primary/20 border-primary/30"
                        : "bg-primary/10 border-primary/20 group-hover:bg-primary/15"
                    }`}
                  >
                    <r.icon
                      className={`w-5 h-5 ${
                        isActive ? "text-primary" : "text-primary/70"
                      }`}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text truncate">
                      {r.title}
                    </p>
                    <p className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                      {r.countries.length} markets ·{" "}
                      {r.featured ? "Flagship" : "Served"}
                    </p>
                  </div>
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  )}
                </button>
              );
            })}

            <Link
              href="/countries"
              className="hidden lg:inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border/80 bg-transparent px-4 py-3 text-primary text-xs font-semibold hover:border-primary/40 transition-colors"
            >
              View All Countries
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Detail panel — all regions stay in DOM, revealed via CSS */}
          <div className="lg:col-span-8 grid">
            {REGIONS.map((r, i) => (
              <div
                key={r.hubSlug}
                className={`col-start-1 row-start-1 transition-all duration-500 ease-in-out ${
                  active === i
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2 pointer-events-none"
                }`}
                aria-hidden={active !== i}
              >
                <div
                  className={`relative rounded-2xl border p-6 sm:p-8 overflow-hidden ${
                    r.featured
                      ? "border-primary/30 bg-gradient-to-br from-primary/[0.09] to-bg-dark/60"
                      : "border-border/60 bg-bg-dark/60"
                  }`}
                >
                  <div className="absolute top-0 right-0 h-px w-2/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center">
                        <r.icon className="w-7 h-7 text-primary" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-xl sm:text-2xl font-black text-text">
                            {r.title}
                          </h3>
                          {r.featured && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5">
                              <MapPin className="w-3 h-3 text-primary" />
                              <span className="text-[9px] font-mono font-bold text-primary uppercase tracking-wider">
                                Flagship Hub
                              </span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-mono text-text-dim uppercase tracking-wider mt-0.5">
                          {r.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Region highlights */}
                    <div className="flex flex-wrap gap-2">
                      {r.highlights.map((h) => (
                        <span
                          key={h.label}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-surface/70 px-3 py-1 text-[10px] font-medium text-text-dim"
                        >
                          <h.icon className="w-3 h-3 text-primary" />
                          {h.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-text-muted text-sm leading-relaxed mb-6">
                    {r.desc}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border/50 pt-5">
                    <ul className="flex flex-wrap gap-2">
                      {r.countries.map((c) => (
                        <li key={c.slug}>
                          <Link
                            href={`/countries/${c.slug}`}
                            className="group/country inline-flex items-center rounded-full border border-border/70 bg-surface px-3 py-1.5 text-[11px] font-medium text-text-dim hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            <span className="mr-1.5">{c.flag}</span>
                            {c.name}
                            <ArrowRight className="w-3 h-3 ml-1.5 opacity-0 group-hover/country:opacity-100 -translate-x-1 group-hover/country:translate-x-0 transition-all" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/countries/${r.hubSlug}`}
                      aria-label={`Browse enterprise chip distribution in ${r.title}`}
                      className="inline-flex items-center gap-1.5 text-primary text-xs font-semibold group/link whitespace-nowrap"
                    >
                      Explore Region
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-only footer link */}
        <div className="text-center mt-8 lg:hidden">
          <Link
            href="/countries"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            View All Countries <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
