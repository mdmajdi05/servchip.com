"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, User, ExternalLink, ChevronDown, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { SearchModal } from "@/components/interactive/SearchModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

const CHIP_COLUMNS = [
  {
    title: "Architecture",
    links: [
      { label: "Blackwell Series", href: "/products?arch=blackwell", description: "Next-gen AI & HPC", badge: "New" },
      { label: "Hopper Series", href: "/products?arch=hopper", description: "Enterprise AI training" },
      { label: "Ada Lovelace", href: "/products?arch=ada", description: "Professional graphics" },
      { label: "Ampere Series", href: "/products?arch=ampere", description: "Proven performance" },
    ],
  },
  {
    title: "Use Case",
    links: [
      { label: "AI Training GPUs", href: "/products?use=ai-training" },
      { label: "AI Inference GPUs", href: "/products?use=ai-inference" },
      { label: "HPC Accelerators", href: "/products?use=hpc" },
      { label: "Professional RTX", href: "/products?use=professional" },
    ],
  },
  {
    title: "Series",
    links: [
      { label: "B200 / B100", href: "/products?series=b200" },
      { label: "H200 / H100", href: "/products?series=h200" },
      { label: "RTX 6000 Ada", href: "/products?series=rtx6000" },
      { label: "GH200 Grace Hopper", href: "/products?series=gh200" },
    ],
  },
  {
    title: "More",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Comparison Tool", href: "/comparison" },
      { label: "Bulk Orders", href: "/rfq" },
    ],
  },
];

const CATEGORY_COLUMNS = [
  {
    title: "Computing",
    links: [
      { label: "Data Center GPUs", href: "/categories/data-center-gpus", description: "Enterprise AI & HPC" },
      { label: "AI Accelerators", href: "/categories/ai-accelerators", description: "Specialized AI processing" },
      { label: "HPC & Grace", href: "/categories/hpc-grace", description: "Supercomputing" },
    ],
  },
  {
    title: "Professional",
    links: [
      { label: "Professional RTX", href: "/categories/professional-rtx" },
      { label: "Cloud & Virtualization", href: "/categories/cloud-virtualization" },
      { label: "Edge AI & Embedded", href: "/categories/edge-ai-embedded" },
    ],
  },
  {
    title: "Vertical",
    links: [
      { label: "Automotive", href: "/categories/automotive" },
      { label: "Networking", href: "/categories/networking" },
      { label: "Healthcare & Life Sci", href: "/categories/healthcare-life-sci" },
    ],
  },
  {
    title: "Gaming",
    links: [
      { label: "Gaming & GeForce", href: "/categories/gaming-geforce" },
    ],
  },
];

const TECHNOLOGY_COLUMNS = [
  {
    title: "Architectures",
    links: [
      { label: "Hopper Architecture", href: "/products?arch=hopper", description: "AI training & HPC" },
      { label: "Blackwell Platform", href: "/products?arch=blackwell", description: "Next-gen AI scale", badge: "New" },
      { label: "Ada Lovelace", href: "/products?arch=ada", description: "Professional graphics" },
      { label: "Grace Hopper", href: "/products?series=gh200", description: "Supercomputing" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "Comparison Tool", href: "/comparison", description: "Side-by-side chip specs" },
    ],
  },
];

const SERVICES_COLUMNS = [
  {
    title: "Custom Sourcing",
    links: [
      { label: "Hardware Procurement", href: "/services/procurement", description: "Global sourcing for NVIDIA chips" },
      { label: "Bulk & Wholesale", href: "/services/bulk", description: "Volume pricing for enterprises" },
      { label: "Hard-to-Find Parts", href: "/services/hard-to-find", description: "Legacy &稀缺 chip sourcing" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Technical Support", href: "/support", description: "Expert setup & troubleshooting" },
      { label: "Warranty & RMA", href: "/support/warranty", description: "Hassle-free returns & replacements" },
      { label: "Integration Help", href: "/support/integration", description: "Deployment & infrastructure" },
    ],
  },
  {
    title: "Consulting",
    links: [
      { label: "AI Infrastructure", href: "/consulting/ai-infra", description: "End-to-end AI stack design" },
      { label: "Data Center Planning", href: "/consulting/datacenter", description: "Scalable GPU cluster architecture" },
      { label: "HPC Optimization", href: "/consulting/hpc", description: "Maximize workload performance" },
    ],
  },
];

const RESOURCE_COLUMNS = [
  {
    title: "Learn",
    links: [
      { label: "Blog & Insights", href: "/blog" },
      { label: "Technical Guides", href: "/blog?category=guides" },
      { label: "Case Studies", href: "/blog?category=case-studies" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Servchip", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
];

const NAV_MEGA = [
  { label: "Chips", columns: CHIP_COLUMNS },
  { label: "Categories", columns: CATEGORY_COLUMNS },
  { label: "Technology", columns: TECHNOLOGY_COLUMNS },
  { label: "Services", columns: SERVICES_COLUMNS },
  { label: "Resources", columns: RESOURCE_COLUMNS },
];

const NAV_SIMPLE = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
        isActive
          ? "text-primary"
          : "text-text-muted hover:text-text"
      )}
    >
      <span className="relative">
        {label}
        <span className={cn(
          "absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-transform duration-300 origin-left",
          isActive
            ? "bg-primary scale-x-100"
            : "bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100"
        )} />
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <header
        className={cn(
          "fixed top-0 lg:top-8 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-4 sm:px-6 transition-all duration-300",
          scrolled
            ? "bg-surface/95 backdrop-blur-xl border-b border-primary/10 shadow-xl shadow-black/5"
            : "bg-surface border-b border-border/50"
        )}
      >
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <AnimatedLogo size={36} showText />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <NavLink href="/" label="Home" isActive={isActive("/") && pathname === "/"} />
          {NAV_MEGA.map((item) => (
            <MegaMenu key={item.label} label={item.label} columns={item.columns} />
          ))}
          {NAV_SIMPLE.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} isActive={isActive(link.href)} />
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <ColorPicker />
          <ThemeToggle />
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="text-text-muted hover:text-text hover:bg-primary/[0.04] transition-all p-2 rounded-lg hidden sm:block"
            aria-label="Search"
          >
            <Search className="w-[18px] h-[18px]" />
          </button>
          <Link
            href="/contact"
            className="hidden lg:flex items-center gap-1.5 text-sm font-medium text-text-muted hover:text-text hover:bg-primary/[0.04] transition-all px-3 py-2 rounded-lg"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>
          <Link
            href="/rfq"
            className="relative hidden sm:inline-flex items-center gap-1.5 px-5 py-2 text-xs font-bold bg-gradient-to-r from-primary to-primary-dark text-bg-dark rounded-lg hover:from-primary-dark hover:to-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 group/quote overflow-hidden"
          >
            <Sparkles className="w-3 h-3 group-hover/quote:rotate-12 transition-transform duration-300" />
            Get Quote
            <span className="absolute inset-0 bg-white/10 translate-y-full group-hover/quote:translate-y-0 transition-transform duration-300" />
          </Link>
          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className={cn(
              "lg:hidden flex flex-col gap-[5px] p-2 rounded-lg transition-colors hover:bg-primary/[0.04]",
              mobileOpen && "active"
            )}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={cn("block w-6 h-[2px] bg-text rounded-sm transition-all duration-300", mobileOpen && "translate-y-[7px] rotate-45")} />
            <span className={cn("block w-6 h-[2px] bg-text rounded-sm transition-all duration-300", mobileOpen && "opacity-0")} />
            <span className={cn("block w-6 h-[2px] bg-text rounded-sm transition-all duration-300", mobileOpen && "-translate-y-[7px] -rotate-45")} />
          </button>
        </div>
      </header>

      <SearchModal open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed top-0 right-0 z-[60] w-full max-w-[400px] h-screen bg-surface border-l border-border overflow-y-auto transition-all duration-500 lg:hidden",
          mobileOpen ? "right-0" : "-right-full"
        )}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header with gradient */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-surface via-surface to-surface/95 backdrop-blur-xl border-b border-border/50 p-6">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 font-extrabold text-xl tracking-tight">
                <div className="w-[30px] h-[30px] relative">
                  <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    <defs>
                      <pattern id="mg" width="6" height="6" patternUnits="userSpaceOnUse">
                        <rect width="6" height="6" fill="#0D0D14" />
                        <rect x="0.5" y="0.5" width="5" height="5" rx="0.8" fill="none" stroke="#76FF03" strokeWidth="0.4" opacity="0.12" />
                      </pattern>
                    </defs>
                    <rect x="2" y="2" width="96" height="96" rx="16" fill="#0A0A0F" />
                    <rect x="20" y="20" width="60" height="60" rx="6" fill="#0D0D14" stroke="#76FF03" strokeWidth="3" />
                    <rect x="25" y="25" width="50" height="50" rx="4" fill="url(#mg)" />
                    <text x="50" y="65" textAnchor="middle" fill="#76FF03" fontFamily="sans-serif" fontWeight="900" fontSize="38" letterSpacing="-1.5">
                      <tspan fill="#76FF03">S</tspan>
                      <tspan fill="#00E5FF">C</tspan>
                    </text>
                    <text x="50" y="32" textAnchor="middle" fill="#76FF03" fontFamily="monospace" fontWeight="700" fontSize="7" opacity="0.35" letterSpacing="1.5">SERVCHIP</text>
                    <circle cx="26" cy="26" r="3" fill="#00E5FF" opacity="0.7" />
                    <circle cx="74" cy="26" r="3" fill="#00E5FF" opacity="0.7" />
                    <circle cx="26" cy="74" r="3" fill="#00E5FF" opacity="0.7" />
                    <circle cx="74" cy="74" r="3" fill="#00E5FF" opacity="0.7" />
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-black tracking-tight text-text">
                    SERV<span className="text-primary">CHIP</span>
                  </span>
                  <span className="text-[8px] font-mono text-text-dim tracking-widest">
                    NVIDIA COMPUTING
                  </span>
                </div>
              </Link>
              <button onClick={() => setMobileOpen(false)} className="text-text-muted hover:text-text hover:bg-primary/[0.04] p-2 rounded-lg transition-all" aria-label="Close menu">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 px-6 pb-6">
            {/* Home link */}
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-2 py-3.5 text-base font-medium border-b border-border/50 transition-colors group",
                pathname === "/" ? "text-primary" : "text-text-muted hover:text-text"
              )}
            >
              <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Home
            </Link>

            {/* Mega nav items with dropdown */}
            {[...NAV_MEGA, ...NAV_SIMPLE.map(l => ({ ...l, columns: [] }))].map((item) => (
              <div key={item.label}>
                {"columns" in item && item.columns.length > 0 ? (
                  <>
                    <button
                      onClick={() => setMobileDropdown(mobileDropdown === item.label ? null : item.label)}
                      className="flex items-center justify-between w-full py-3.5 text-base font-medium border-b border-border/50 text-text-muted hover:text-text transition-colors group"
                    >
                      <span className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                        {item.label}
                      </span>
                      <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", mobileDropdown === item.label && "rotate-180")} />
                    </button>
                    <AnimatePresence>
                      {mobileDropdown === item.label && (
                        <motion.div
                          key={`${item.label}-mobile`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-5 py-2 space-y-1 bg-primary/[0.02] rounded-lg my-1">
                            {(item as any).columns.map((col: any) => (
                              <div key={col.title} className="py-2">
                                <h4 className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 px-3 mb-2">
                                  {col.title}
                                </h4>
                                {col.links.map((link: any) => (
                                  <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 text-sm text-text-muted hover:text-text py-2 px-3 rounded-lg hover:bg-primary/[0.04] transition-all"
                                  >
                                    <span className="w-1 h-1 rounded-full bg-primary/20" />
                                    {link.label}
                                    {link.badge && (
                                      <span className="text-[8px] font-bold uppercase text-primary bg-primary/10 px-1 py-0.5 rounded">
                                        {link.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={("href" in item) ? (item as any).href : "#"}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2 py-3.5 text-base font-medium border-b border-border/50 transition-colors group",
                      ("href" in item) && isActive((item as any).href) ? "text-primary" : "text-text-muted hover:text-text"
                    )}
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile CTA */}
            <div className="mt-6 space-y-3">
              <Link
                href="/rfq"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold bg-gradient-to-r from-primary to-primary-dark text-bg-dark rounded-lg hover:shadow-lg hover:shadow-primary/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Get Quote <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3.5 text-sm font-medium text-text-muted border border-border rounded-lg hover:text-text hover:border-primary/30 transition-all"
              >
                <User className="w-4 h-4" />
                Sign In
              </Link>
            </div>

            {/* Contact info */}
            <div className="mt-6 pt-4 border-t border-border/50 text-sm text-text-muted space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-primary/60">📞</span> +91-XXXXXXXXXX
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary/60">✉️</span> sales@servchip.com
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
