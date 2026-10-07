"use client";

import { useState } from "react";
import { Mail, Download } from "lucide-react";

export function LeadMagnetBanner() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "lead-magnet-guide" }),
      });
      const data = await res.json();
      if (res.ok) {
        console.log("[LeadGen] Buyer's guide download requested:", email);
        setStatus("success");
        setMessage(data.message || "Check your inbox for the download link!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error?.message || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-surface p-6">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Download className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text leading-snug">
            Download: 2026 AI Chip Buyer&apos;s Guide (PDF)
          </h4>
          <p className="text-xs text-text-muted mt-1 leading-relaxed">
            50-page guide covering NVIDIA, AMD, Intel accelerators with pricing,
            benchmarks, and deployment recommendations.
          </p>
        </div>
      </div>

      {status === "success" ? (
        <div className="bg-primary/10 border border-primary/20 rounded-xl p-3 text-center">
          <p className="text-xs text-primary font-medium">{message}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="Enter your work email"
            required
            className="w-full px-3 py-2.5 bg-bg-dark border border-border rounded-lg text-sm text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-transform duration-200"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full px-4 py-2.5 bg-primary text-bg-dark font-semibold text-sm rounded-lg hover:bg-primary-dark transition-transform duration-200 hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <span className="w-4 h-4 border-2 border-bg-dark/30 border-t-bg-dark rounded-full animate-spin" />
            ) : (
              <>
                <Mail className="w-4 h-4" />
                Download Free Guide
              </>
            )}
          </button>
          {status === "error" && (
            <p className="text-xs text-error">{message}</p>
          )}
          <p className="text-[11px] text-text-dim text-center">
            Free PDF | No credit card required | Instant access
          </p>
        </form>
      )}
    </div>
  );
}
