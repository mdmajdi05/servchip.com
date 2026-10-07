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
  // Initial state must be identical on server and client or hydration fails.
  // Server always renders the placeholder (IntersectionObserver exists only in
  // the browser), so start hidden and let the effect below promote to visible.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      // No IO support - mount children right away. The promotion is deferred
      // to a callback instead of being called synchronously in the effect
      // body: React (react-hooks/set-state-in-effect) rejects that because a
      // synchronous setState during commit cascades into extra renders.
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }
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
