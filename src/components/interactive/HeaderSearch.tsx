"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import {
  Search,
  X,
  Cpu,
  Server,
  Network,
  MemoryStick,
  HardDrive,
  Loader2,
  FileText,
  Send,
  CheckCircle,
  PackageSearch,
  User,
  Mail,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { searchProducts, searchBlogPosts } from "@/data/search";
import type { ProductType } from "@/types";
const TYPE_ICON: Record<ProductType, typeof Cpu> = {
  chip: Cpu,
  server: Server,
  networking: Network,
  memory: MemoryStick,
  storage: HardDrive,
};
const TYPE_LABEL: Record<ProductType, string> = {
  chip: "Chip",
  server: "Server",
  networking: "Networking",
  memory: "Memory",
  storage: "Storage",
};
interface HeaderSearchProps {
  onOpenModal?: (query?: string) => void;
  className?: string;
}
export function HeaderSearch({ onOpenModal, className }: HeaderSearchProps) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [contactState, setContactState] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const { products, blogPosts } = useMemo(() => {
    if (query.trim().length < 2) return { products: [], blogPosts: [] };
    const q = query.trim();
    return {
      products: searchProducts(q).slice(0, 6),
      blogPosts: searchBlogPosts(q).slice(0, 3),
    };
  }, [query]);
  const totalResults = products.length + blogPosts.length;
  const hasQuery = query.trim().length >= 2;

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function handleQueryChange(value: string) {
    setQuery(value);
    setShowContact(false);
    setContactState("idle");
    setLoading(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setLoading(false), 250);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (totalResults > 0) {
      const first = products[0];
      if (first) {
        window.location.href = `/products/${first.product.slug}`;
        return;
      }
    }
    if (hasQuery && onOpenModal) {
      onOpenModal(query);
    }
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactState("submitting");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...contactForm,
          topic: "Product Request / Search Not Found",
          company: "",
          phone: "",
          quantity: `Searching for: ${query}`,
          message: contactForm.message || query,
        }),
      });
    } catch {
      /* continue */
    }
    const subject = encodeURIComponent(
      `[Servchip] Product Request - ${query} - ${contactForm.name}`,
    );
    const lines = [
      "Hi Servchip Team,",
      "",
      `I couldn't find "${query}" in your catalog and would like to request it.`,
      "",
      `Name: ${contactForm.name}`,
      `Email: ${contactForm.email}`,
      "",
      "Message:",
      contactForm.message || "Please let me know pricing and availability.",
      "",
      "Looking forward to your response.",
    ];
    const body = encodeURIComponent(lines.join("\n"));
    const link = document.createElement("a");
    link.href = `mailto:sales@servchip.com?subject=${subject}&body=${body}`;
    link.click();
    setContactState("success");
  }

  return (
    <div
      ref={wrapRef}
      className={cn("relative flex-1 w-full min-w-0", className)}
    >
      <form onSubmit={handleSubmit} role="search" aria-label="Site search">
        <div className="flex items-center h-9 rounded-full border border-border bg-bg-dark">
          {/* Left search icon */}
          <div className="pl-4 pr-1 flex items-center justify-center pointer-events-none">
            <Search className="w-[15px] h-[15px] text-text-dim" />
          </div>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setFocused(false);
                inputRef.current?.blur();
              }
            }}
            placeholder="Search GPUs, CPUs, Servers & more..."
            aria-label="Search products"
            className="flex-1 min-w-0 bg-transparent px-2 text-sm text-text focus:outline-none placeholder:text-text-dim/70"
          />
          {loading && query.trim().length >= 2 ? (
            <Loader2 className="mr-2 w-4 h-4 text-text-dim animate-spin" />
          ) : query ? (
            <button
              type="button"
              onClick={() => handleQueryChange("")}
              aria-label="Clear search"
              className="mr-2 text-text-dim hover:text-text transition-transform p-1"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            type="submit"
            aria-label="Search"
            className="mr-1.5 shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary text-white hover:bg-primary-dark transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>

      {focused && hasQuery && totalResults === 0 && !loading && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-surface border border-border rounded-2xl overflow-hidden z-50">
          <div className="px-5 py-10 text-center">
            <PackageSearch className="w-9 h-9 text-text-dim mx-auto mb-3 opacity-50" />
            <p className="text-sm text-text-muted">
              No results found for &ldquo;
              <span className="text-text font-medium">{query}</span>
              &rdquo;
            </p>
            {contactState === "success" ? (
              <>
                <CheckCircle className="w-6 h-6 text-primary mx-auto mt-6 mb-2" />
                <p className="text-sm font-semibold text-text">
                  Your Email Client Has Opened!
                </p>
                <p className="text-xs text-text-dim mt-1">
                  Your request has been pre-filled. Just hit{" "}
                  <strong>Send</strong> and our team will reach out.
                </p>
                <button
                  type="button"
                  onClick={() => setContactState("idle")}
                  className="mt-4 text-xs font-medium text-primary hover:underline"
                >
                  Submit another request
                </button>
              </>
            ) : showContact ? (
              <form onSubmit={handleContactSubmit} className="mt-6 text-left">
                <p className="text-xs font-semibold text-text mb-1">
                  Need this part? Request it. We&rsquo;ll source it for you.
                </p>
                <div className="space-y-3">
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={contactForm.name}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, name: e.target.value }))
                      }
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-bg-dark border border-border rounded-lg text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-dim pointer-events-none" />
                    <input
                      type="email"
                      required
                      placeholder="Work email"
                      value={contactForm.email}
                      onChange={(e) =>
                        setContactForm((f) => ({ ...f, email: e.target.value }))
                      }
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-bg-dark border border-border rounded-lg text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-text-dim pointer-events-none" />
                    <textarea
                      rows={3}
                      placeholder="Quantity, specs, timeline (optional)"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm((f) => ({
                          ...f,
                          message: e.target.value,
                        }))
                      }
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-bg-dark border border-border rounded-lg text-text placeholder-text-dim outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactState === "submitting"}
                    className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-primary rounded-lg py-2.5 hover:bg-primary-dark transition-colors disabled:opacity-50"
                  >
                    {contactState === "submitting" ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    Submit &amp; Connect via Email
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setShowContact(true)}
                className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white bg-primary rounded-lg px-5 py-3 hover:bg-primary-dark transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Request this part - we&rsquo;ll connect via email
              </button>
            )}
          </div>
        </div>
      )}

      {focused && !loading && totalResults > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-surface border border-border rounded-2xl overflow-hidden z-50">
          {products.length > 0 && (
            <>
              <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim bg-bg-dark/50">
                Products ({products.length})
              </div>
              {products.map(({ product, type }) => {
                const Icon = TYPE_ICON[type];
                return (
                  <Link
                    key={`p-${product.id}`}
                    href={`/products/${product.slug}`}
                    onClick={() => {
                      setFocused(false);
                      setQuery("");
                    }}
                    className="flex items-center gap-4 px-5 py-3 text-text-muted hover:bg-bg-dark hover:text-text transition-colors"
                  >
                    <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium truncate">
                          {product.name}
                        </span>
                        <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                          {TYPE_LABEL[type]}
                        </span>
                      </div>
                      <div className="text-xs text-text-dim mt-0.5">
                        {product.manufacturer} &middot; {product.series}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-dim flex-shrink-0" />
                  </Link>
                );
              })}
            </>
          )}
          {blogPosts.length > 0 && (
            <>
              <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-dim bg-bg-dark/50 border-t border-border">
                Blog Posts ({blogPosts.length})
              </div>
              {blogPosts.map((post) => (
                <Link
                  key={`b-${post.slug}`}
                  href={`/blog/${post.slug}`}
                  onClick={() => {
                    setFocused(false);
                    setQuery("");
                  }}
                  className="flex items-center gap-4 px-5 py-3 text-text-muted hover:bg-bg-dark hover:text-text transition-colors"
                >
                  <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">
                        {post.title}
                      </span>
                      <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-primary/15 text-primary">
                        Blog
                      </span>
                    </div>
                    <div className="text-xs text-text-dim mt-0.5 truncate">
                      {post.category}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-text-dim flex-shrink-0" />
                </Link>
              ))}
            </>
          )}
          <Link
            href="/products"
            onClick={() => {
              setFocused(false);
              setQuery("");
            }}
            className="flex items-center justify-center gap-1.5 px-5 py-3 text-xs font-semibold text-primary bg-gradient-to-b from-primary/[0.04] to-primary/[0.08] border-t border-border hover:from-primary/10 hover:to-primary/15 transition-colors"
          >
            View all products <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
