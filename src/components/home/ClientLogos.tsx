"use client";

import React from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import { BRANDS } from "@/data/brands";
import { BRAND_COLORS } from "@/data/brand-colors";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BrandLogo } from "@/components/ui/BrandLogo";

const DISPLAY_BRANDS = BRANDS.filter(
  (m) => m.id !== "google-cloud" && m.id !== "amazon-web-services",
);

const colorVarName = (name: string) => {
  const color = BRAND_COLORS[name] || "#6B7280";
  return color;
};

const LogoItem = React.memo(function LogoItem({
  name,
  slug,
}: {
  name: string;
  slug: string;
}) {
  const color = colorVarName(name);

  return (
    <Link
      href={`/brands/${slug}`}
      className="flex-shrink-0 w-[150px] h-[80px] mx-3 rounded-xl bg-surface border border-border flex items-center justify-center hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-transform duration-300 group"
    >
      <div className="flex items-center gap-3 px-3">
        <BrandLogo name={name} className="w-8 h-8 shrink-0" />
        <span className="text-[11px] font-bold text-text-muted group-hover:text-text transition-transform leading-tight">
          {name}
        </span>
      </div>
    </Link>
  );
});

export function ClientLogos() {
  const manufacturers = DISPLAY_BRANDS;

  const row1 = manufacturers.slice(0, Math.ceil(manufacturers.length / 2));
  const row2 = manufacturers.slice(Math.ceil(manufacturers.length / 2));

  return (
    <section className="py-20 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <SectionHeading
          label="Brand Partners"
          title="Trusted by Leading Brands Worldwide"
          subtitle="Authorized partnerships with NVIDIA, AMD, Intel, and the world's top semiconductor and server hardware manufacturers"
          align="center"
        />
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />

        <div className="flex mb-4 animate-scroll-left hover:[animation-play-state:paused]">
          {[...row1, ...row1].map((m, i) => (
            <LogoItem key={`${m.id}-${i}`} name={m.name} slug={m.slug} />
          ))}
        </div>

        <div className="flex animate-scroll-right hover:[animation-play-state:paused]">
          {[...row2, ...row2].map((m, i) => (
            <LogoItem key={`${m.id}-${i}`} name={m.name} slug={m.slug} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left {
          animation: scroll-left 50s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 50s linear infinite;
        }
      `}</style>
    </section>
  );
}
