"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import {
  Truck,
  Banknote,
  Warehouse,
  Timer,
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";
import type { Country, CountryMarket } from "@/types";

export function CountryMarketStrip({
  country,
  market,
}: {
  country: Country;
  market: CountryMarket;
}) {
  return (
    <section
      className="py-12 bg-bg-body border-b border-border-subtle"
      aria-label={`Shipping and contact information for ${country.name}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Banknote className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text mb-1">
                {market.currency} Pricing
              </h3>
              <p className="text-xs text-text-dim leading-relaxed">
                Transparent pricing in {market.currency} (
                {market.currencySymbol}) for buyers in {country.name}.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text mb-1">
                {market.leadTime} Delivery
              </h3>
              <p className="text-xs text-text-dim leading-relaxed">
                {market.shippingNote}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-surface">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Warehouse className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-text mb-1">
                Ships from {market.warehouse}
              </h3>
              <p className="text-xs text-text-dim leading-relaxed">
                <span className="flex items-center gap-1.5 mt-1">
                  <Timer className="w-3.5 h-3.5 text-primary/70" />
                  {market.contact.hours}
                </span>
                <span className="flex items-center gap-1.5 mt-1">
                  <Mail className="w-3.5 h-3.5 text-primary/70" />
                  {market.contact.email}
                </span>
                <span className="flex items-center gap-1.5 mt-1">
                  <Phone className="w-3.5 h-3.5 text-primary/70" />
                  {market.contact.phoneDisplay}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <Link
            href={`/products`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Browse {country.name} catalog <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
