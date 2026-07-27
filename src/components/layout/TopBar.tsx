"use client";
import { Phone, Mail, ShieldCheck, Globe } from "lucide-react";
import { SITE } from "@/lib/constants";
export function TopBar() {
  return (
    <div className="hidden lg:flex h-8 items-center justify-between px-6 sm:px-8 lg:px-12 bg-white dark:bg-surface border-b border-gray-200/60 dark:border-border/60 text-[11px] text-text-dim relative z-10">
      <div className="flex items-center gap-4">
        <a
          href={`tel:${SITE.phoneLink}`}
          className="flex items-center gap-1.5 hover:text-text"
        >
          <Phone className="w-3 h-3 text-primary/60" /> {SITE.phone}
        </a>
        <span className="w-px h-3 bg-gradient-to-b from-transparent via-border to-transparent" />
        <a
          href={`mailto:${SITE.email}`}
          className="flex items-center gap-1.5 hover:text-text"
        >
          <Mail className="w-3 h-3 text-primary/60" /> {SITE.email}
        </a>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="relative flex w-[6px] h-[6px]">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative rounded-full bg-primary w-[6px] h-[6px]" />
          </span>
          <span className="font-semibold text-primary/90">
            Enterprise Chip Distributor
          </span>
        </span>
        <span className="w-px h-3 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="flex items-center gap-1 hover:text-text cursor-pointer">
          <Globe className="w-3 h-3 text-primary/60" /> Global Shipping
        </span>
        <span className="w-px h-3 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="flex items-center gap-1 hover:text-text cursor-pointer">
          <ShieldCheck className="w-3 h-3 text-primary/60" /> ISO 9001 Certified
        </span>
      </div>
    </div>
  );
}
