"use client";

import Link from "next/link";
import { MapPin, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useCountryPrefix } from "@/lib/useCountryPrefix";

interface LocationLink {
  label: string;
  href: string;
}

const REGION_GROUPS: {
  title: string;
  tagline: string;
  links: LocationLink[];
}[] = [
  {
    title: "NVIDIA Distribution",
    tagline: "H100, H200, B200 & AI chips",
    links: [
      { label: "NVIDIA distributor in India", href: "/countries/india" },
      { label: "NVIDIA distributor in UAE", href: "/countries/uae" },
      { label: "NVIDIA distributor in Dubai", href: "/countries/uae" },
      {
        label: "NVIDIA distributor in Singapore",
        href: "/countries/singapore",
      },
      { label: "NVIDIA distributor in Malaysia", href: "/countries/malaysia" },
      { label: "NVIDIA distributor in China", href: "/countries/china" },
      {
        label: "NVIDIA distributor in Philippines",
        href: "/countries/philippines",
      },
      { label: "NVIDIA authorized dealer", href: "/products" },
    ],
  },
  {
    title: "AMD Distribution",
    tagline: "Instinct MI300X & EPYC",
    links: [
      { label: "AMD authorized distributor in USA", href: "/countries/usa" },
      { label: "AMD distributor in UAE", href: "/countries/uae" },
      { label: "AMD authorized distributors", href: "/products" },
    ],
  },
  {
    title: "Intel Distribution",
    tagline: "Xeon & Gaudi accelerators",
    links: [
      { label: "Intel distributor in Dubai", href: "/countries/uae" },
      { label: "Intel supplier in UAE", href: "/countries/uae" },
      { label: "Intel supplier in Malaysia", href: "/countries/malaysia" },
      { label: "Intel authorized distributors", href: "/products" },
    ],
  },
  {
    title: "Global Coverage",
    tagline: "Worldwide enterprise chip shipping",
    links: [
      { label: "GPU suppliers in India", href: "/countries/india" },
      { label: "NVIDIA supplier in UAE", href: "/countries/uae" },
      { label: "Xilinx authorized distributors", href: "/products" },
    ],
  },
];

export function LocationsStrip() {
  const prefix = useCountryPrefix();
  return (
    <section className="py-20 bg-bg-body">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Locations We Serve"
          title="Enterprise Chip & GPU Distribution Across Regions"
          subtitle="Authorized NVIDIA, AMD & Intel distribution with enterprise chip sourcing delivered to India, UAE, USA, Singapore, Malaysia & beyond"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {REGION_GROUPS.map((group) => (
            <div
              key={group.title}
              className="rounded-2xl border border-white/10 bg-bg-card p-6 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <h3 className="font-semibold text-white">{group.title}</h3>
              </div>
              <p className="text-sm text-text-muted mb-5">{group.tagline}</p>
              <ul className="space-y-3 flex-1">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={
                        link.href.startsWith("/countries/")
                          ? link.href
                          : `${prefix}${link.href}`
                      }
                      className="group inline-flex items-start gap-1.5 text-sm text-text-muted hover:text-primary transition-colors"
                    >
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-primary/50 group-hover:text-primary shrink-0" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
