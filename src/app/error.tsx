"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error: _error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-dark px-4">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6 text-primary font-black">500</div>
        <h1 className="text-2xl font-bold text-white mb-3">
          Something went wrong
        </h1>
        <p className="text-text-dim mb-8 text-sm leading-relaxed">
          An unexpected error occurred. Our team has been notified. Please try
          again or contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-black font-semibold rounded-xl hover:opacity-90 transition-transform text-sm"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-border text-text font-semibold rounded-xl hover:bg-surface transition-transform text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
