"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  ExternalLink,
  MessageCircle,
  Code2,
  Mail,
  Send,
  MapPin,
} from "lucide-react";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";
import { SITE } from "@/lib/constants";

const FOOTER_LINKS = [
  {
    title: "Products",
    links: [
      { label: "All Chips", href: "/products" },
      { label: "Data Center GPUs", href: "/categories/data-center-gpus" },
      { label: "AI Accelerators", href: "/categories/ai-accelerators" },
      { label: "Professional RTX", href: "/categories/professional-rtx" },
      { label: "Comparison Tool", href: "/comparison" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Developer Hub", href: "/developer-hub" },
      { label: "Technology", href: "/technology" },
      { label: "Solutions", href: "/solutions" },
      { label: "Configurator", href: "/configurator" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-bg-dark border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="mb-4 inline-block">
              <AnimatedLogo
                size={32}
                showText
                textClassName="text-text font-bold text-sm tracking-tight"
              />
            </Link>
            <p className="text-text-dim text-xs leading-relaxed mb-4">
              Authorized distributor of authentic NVIDIA chips and computing
              solutions for AI, HPC, and enterprise workloads worldwide.
            </p>
            <div className="flex gap-2">
              {[Globe, ExternalLink, MessageCircle, Code2].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/30 transition-colors"
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            {/* Addresses */}
            <div className="mt-4 space-y-2">
              <div className="flex items-start gap-1.5 text-xs text-text-dim">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-primary/60" />
                <span>
                  <strong className="text-text-muted">India:</strong>{" "}
                  {SITE.addresses.india}
                </span>
              </div>
              <div className="flex items-start gap-1.5 text-xs text-text-dim">
                <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-primary/60" />
                <span>
                  <strong className="text-text-muted">UAE:</strong>{" "}
                  {SITE.addresses.uae}
                </span>
              </div>
            </div>
            {/* Newsletter */}
            <div className="mt-5">
              <h5 className="text-[10px] font-semibold uppercase tracking-wider text-text-dim mb-2">
                Stay Updated
              </h5>
              <NewsletterForm />
            </div>
          </div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-muted hover:text-text transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-dim">
            &copy; {new Date().getFullYear()} Servchip Inc. All rights reserved.
            NVIDIA is a registered trademark of NVIDIA Corporation.
          </p>
          <div className="flex items-center gap-4 text-xs text-text-dim">
            <Link href="/privacy" className="hover:text-text transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-text transition-colors">
              Terms
            </Link>
            <a
              href="mailto:sales@servchip.com"
              className="hover:text-primary transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" /> Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function NewsletterForm() {
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
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
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

  if (status === "success") {
    return <p className="text-xs text-primary font-medium">{message}</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-1.5">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 min-w-0 px-2.5 py-1.5 text-xs bg-surface border border-border rounded-lg text-text placeholder:text-text-dim focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
        required
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="shrink-0 px-2.5 py-1.5 bg-primary text-bg-dark rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        <Send className="w-3.5 h-3.5" />
      </button>
      {status === "error" && (
        <p className="text-xs text-error mt-1 absolute bottom-0 left-0">
          {message}
        </p>
      )}
    </form>
  );
}
