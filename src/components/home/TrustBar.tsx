"use client";

import { Zap, CheckCircle, Building2, Star } from "lucide-react";
import { TRUST_BAR_ITEMS } from "@/data/home";
import { getManufacturerTextColor } from "@/data/manufacturer-colors";
import { BrandLogo } from "@/components/ui/BrandLogo";

const ICON_MAP: Record<string, typeof Zap> = {
  Zap,
  CheckCircle,
  Building2,
};

const BADGE_ICON_MAP: Record<string, typeof Star> = {
  Star,
};

const MANUFACTURER_NAMES = new Set([
  "NVIDIA",
  "Intel",
  "AMD",
  "Broadcom",
  "Marvell",
  "Cisco",
  "Qualcomm",
  "Samsung",
  "Micron",
  "SK hynix",
  "Seagate",
  "Dell",
  "HPE",
  "Supermicro",
  "Lenovo",
]);

export function TrustBar() {
  return (
    <section
      className="py-4 bg-surface border-y border-border-subtle"
      aria-label="Trusted partners and certifications"
    >
      <div className="overflow-hidden mask-image-gradient">
        <div
          className="flex items-center gap-10 animate-scroll"
          style={{ width: "max-content" }}
        >
          {[...TRUST_BAR_ITEMS, ...TRUST_BAR_ITEMS].map((item, i) => {
            const isMfr = MANUFACTURER_NAMES.has(item.text);
            const color = getManufacturerTextColor(item.text);
            return (
              <div
                key={`trust-${i}`}
                className="flex-shrink-0 flex items-center gap-3"
              >
                {isMfr ? (
                  <BrandLogo
                    name={item.text}
                    className="w-6 h-6 shrink-0"
                    compact
                  />
                ) : (
                  <span aria-hidden="true">
                    {(() => {
                      const Icon = ICON_MAP[item.icon];
                      return Icon ? (
                        <Icon className="w-5 h-5 text-primary/80" />
                      ) : null;
                    })()}
                  </span>
                )}
                <span
                  className="text-sm font-bold whitespace-nowrap tracking-wide uppercase"
                  style={{ color: isMfr ? color : undefined }}
                >
                  {item.text}
                </span>
                {item.badge && (
                  <span className="badge-trust">
                    {(() => {
                      const BadgeIcon = BADGE_ICON_MAP[item.badge];
                      return BadgeIcon ? (
                        <BadgeIcon className="w-2.5 h-2.5" />
                      ) : (
                        item.badge
                      );
                    })()}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 5%,
            black 95%,
            transparent 100%
          );
        }
        .badge-trust {
          background: var(--primary-subtle);
          color: var(--primary);
          padding: 0.15rem 0.6rem;
          border-radius: 100px;
          font-size: 0.6rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
      `}</style>
    </section>
  );
}
