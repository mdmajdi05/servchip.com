"use client";

import { TRUST_BAR_ITEMS } from "@/data/home";

export function TrustBar() {
  return (
    <section className="py-4 bg-surface border-y border-border-subtle" aria-label="Trusted partners and certifications">
      <div className="overflow-hidden mask-image-gradient">
        <div className="flex items-center gap-8 animate-scroll" style={{ width: "max-content" }}>
          {[...TRUST_BAR_ITEMS, ...TRUST_BAR_ITEMS].map((item, i) => (
            <div
              key={`trust-${i}`}
              className="flex-shrink-0 flex items-center gap-3"
            >
              <span className="text-lg" aria-hidden="true">{item.icon}</span>
              <span className="text-text-muted text-sm font-medium whitespace-nowrap tracking-wide">
                {item.text}
              </span>
              {item.badge && (
                <span className="badge-trust">{item.badge}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
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
