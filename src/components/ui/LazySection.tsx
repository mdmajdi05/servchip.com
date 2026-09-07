"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface LazySectionProps {
  children: React.ReactNode;
  /** Minimum height of the reserved space (px) to avoid layout shift before the section loads. */
  minHeight?: number;
  /** Extra px below the fold to preload *before* the section is fully visible. */
  rootMargin?: string;
  className?: string;
  placeholder?: React.ReactNode;
}

/**
 * Defers mounting (and therefore JS loading/hydration of) its children until
 * the section approaches the viewport. Keeps a reserved space so layout does
 * not shift below the fold.
 */
export function LazySection({
  children,
  minHeight,
  rootMargin = "600px",
  className,
  placeholder,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(
    () => typeof IntersectionObserver === "undefined",
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={!visible && minHeight ? { minHeight } : undefined}
    >
      {visible ? children : (placeholder ?? null)}
    </div>
  );
}
