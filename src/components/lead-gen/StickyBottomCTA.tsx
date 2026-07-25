"use client";
import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import Link from "next/link";
const DISMISS_KEY = "servchip-sticky-cta-closed";
export function StickyBottomCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(DISMISS_KEY);
  });
  useEffect(() => {
    if (dismissed) return;
    const onScroll = () => {
      if (window.scrollY > 500) setVisible(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);
  const close = () => {
    localStorage.setItem(DISMISS_KEY, "1");
    setVisible(false);
  };
  if (dismissed) return null;
  return (
    <>
      {visible && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9998] md:hidden"
        >
          <div className="bg-primary/95 backdrop-blur-lg border-t border-primary-dark/30 px-4 py-3 flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-bg-dark leading-tight">
              Need GPU Pricing? Get a Free Quote
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/rfq"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-bg-dark text-primary font-semibold text-sm rounded-lg hover:bg-surface transition-transform duration-200 hover:scale-[1.02]"
              >
                Get Quote
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={close}
                className="w-7 h-7 rounded-lg bg-bg-dark/50 flex items-center justify-center text-bg-dark/70 hover:text-bg-dark hover:bg-bg-dark/70 transition-transform duration-200"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
