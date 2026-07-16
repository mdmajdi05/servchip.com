"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  User,
  ExternalLink,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { MANUFACTURERS } from "@/data/manufacturers";
import { MegaMenu } from "./MegaMenu";
import { TopBar } from "./TopBar";
import { SearchModal } from "@/components/interactive/SearchModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { ChipToggle } from "@/components/ui/ChipToggle";
import { AnimatedLogo } from "@/components/ui/AnimatedLogo";

interface NavLink {
  label: string;
  href: string;
  description?: string;
  badge?: string;
}

interface NavColumn {
  title: string;
  href?: string;
  links: NavLink[];
}

interface MegaNavItem {
  label: string;
  columns: NavColumn[];
  href?: string;
}

interface SimpleNavItem {
  label: string;
  href: string;
  columns?: never;
}

type NavItem = MegaNavItem | SimpleNavItem;

const PRODUCT_COLUMNS: NavColumn[] = [
  {
    title: "AI Accelerators",
    href: "/categories/ai-gpus-accelerators",
    links: [
      {
        label: "NVIDIA",
        href: "/manufacturers/nvidia",
        description: "H100, H200, B200, GB200",
      },
      {
        label: "AMD",
        href: "/manufacturers/amd",
        description: "Instinct MI300X, MI325X, MI350X",
      },
      {
        label: "Intel",
        href: "/manufacturers/intel",
        description: "Gaudi 2, Gaudi 3",
      },
      {
        label: "Google",
        href: "/manufacturers/google",
        description: "TPU v6, TPU v7",
      },
      {
        label: "Amazon",
        href: "/manufacturers/amazon",
        description: "Trainium 2, Inferentia 2",
      },
    ],
  },
  {
    title: "Server CPUs",
    href: "/categories/server-cpus",
    links: [
      {
        label: "AMD EPYC",
        href: "/manufacturers/amd",
        description: "EPYC 9005 Turin",
      },
      {
        label: "Intel Xeon",
        href: "/manufacturers/intel",
        description: "Xeon 6 Granite Rapids",
      },
      {
        label: "Ampere",
        href: "/manufacturers/ampere",
        description: "AmpereOne ARM",
      },
      {
        label: "Qualcomm",
        href: "/manufacturers/qualcomm",
        description: "DC server CPUs",
      },
      {
        label: "NVIDIA Grace",
        href: "/manufacturers/nvidia",
        description: "ARM superchip",
      },
    ],
  },
  {
    title: "AI Servers",
    href: "/categories/ai-servers-platforms",
    links: [
      {
        label: "Dell",
        href: "/manufacturers/dell-technologies",
        description: "PowerEdge XE9680",
      },
      {
        label: "HPE",
        href: "/manufacturers/hewlett-packard-enterprise",
        description: "Cray XD670",
      },
      {
        label: "Supermicro",
        href: "/manufacturers/supermicro",
        description: "AS-8125GS",
      },
      {
        label: "Lenovo",
        href: "/manufacturers/lenovo",
        description: "ThinkSystem SR780A",
      },
      {
        label: "Gigabyte",
        href: "/manufacturers/gigabyte",
        description: "G593",
      },
      { label: "ASUS", href: "/manufacturers/asus", description: "ESC N8" },
      { label: "Inspur", href: "/manufacturers/inspur", description: "NF5688" },
      { label: "Quanta", href: "/manufacturers/quanta" },
      { label: "Foxconn", href: "/manufacturers/foxconn" },
      { label: "Wiwynn", href: "/manufacturers/wiwynn" },
    ],
  },
  {
    title: "Networking",
    href: "/categories/networking-interconnects",
    links: [
      {
        label: "Broadcom",
        href: "/manufacturers/broadcom",
        description: "Tomahawk 6",
      },
      {
        label: "Marvell",
        href: "/manufacturers/marvell",
        description: "Teralynx 10",
      },
      {
        label: "Cisco",
        href: "/manufacturers/cisco",
        description: "Silicon One",
      },
    ],
  },
  {
    title: "Memory & Storage",
    href: "/categories/ai-memory-hbm",
    links: [
      {
        label: "SK hynix",
        href: "/manufacturers/sk-hynix",
        description: "HBM3E",
      },
      {
        label: "Samsung",
        href: "/manufacturers/samsung",
        description: "HBM3E, DDR5, SSD",
      },
      {
        label: "Micron",
        href: "/manufacturers/micron",
        description: "HBM3E, DDR5, SSD",
      },
      {
        label: "Solidigm",
        href: "/manufacturers/solidigm",
        description: "D7-P5810",
      },
      { label: "Kioxia", href: "/manufacturers/kioxia", description: "CM7-V3" },
      {
        label: "Western Digital",
        href: "/manufacturers/western-digital",
        description: "Ultrastar SSD",
      },
      {
        label: "Seagate",
        href: "/manufacturers/seagate",
        description: "Nytro 3530",
      },
    ],
  },
];

const CATEGORY_COLUMNS = [
  {
    title: "Computing",
    links: [
      {
        label: "NVIDIA Data Center GPUs",
        href: "/categories/nvidia-data-center-gpus",
        description: "H100, H200, B200, GB200, L40S",
      },
      {
        label: "AMD Instinct Accelerators",
        href: "/categories/amd-instinct-accelerators",
        description: "MI300X, MI325X, MI350X",
      },
      {
        label: "Intel Gaudi AI",
        href: "/categories/intel-gaudi-ai-accelerators",
        description: "Gaudi 2, Gaudi 3",
      },
      {
        label: "Google TPU",
        href: "/categories/google-tpu-accelerators",
        description: "TPU v6, TPU v7",
      },
      {
        label: "Amazon AI Chips",
        href: "/categories/amazon-ai-chips",
        description: "Trainium 2, Inferentia 2",
      },
    ],
  },
  {
    title: "Infrastructure",
    links: [
      {
        label: "Server CPUs",
        href: "/categories/server-cpus",
        description: "AMD EPYC, Intel Xeon, Ampere",
      },
      {
        label: "AI Servers & Platforms",
        href: "/categories/ai-servers-platforms",
        description: "Dell, HPE, Supermicro, Lenovo",
      },
      {
        label: "Networking",
        href: "/categories/networking-interconnects",
        description: "Broadcom, Marvell, Cisco",
      },
    ],
  },
  {
    title: "Components",
    links: [
      {
        label: "AI Memory & HBM",
        href: "/categories/ai-memory-hbm",
        description: "HBM3E, DDR5, MRDIMM, CXL",
      },
      {
        label: "Enterprise Storage",
        href: "/categories/enterprise-storage",
        description: "NVMe SSDs for data centers",
      },
    ],
  },
  {
    title: "Brands",
    links: [
      ...MANUFACTURERS.map((m) => ({
        label: m.name,
        href: `/manufacturers/${m.slug}`,
        description: m.description,
      })),
    ],
  },
];

const SERVICES_COLUMNS = [
  {
    title: "Custom Sourcing",
    links: [
      {
        label: "Hardware Procurement",
        href: "/services/procurement",
        description: "Global sourcing for enterprise chips",
      },
      {
        label: "Bulk & Wholesale",
        href: "/services/bulk",
        description: "Volume pricing for enterprises",
      },
      {
        label: "Hard-to-Find Parts",
        href: "/services/hard-to-find",
        description: "Legacy & scarce chip sourcing",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Technical Support",
        href: "/support",
        description: "Expert setup & troubleshooting",
      },
      {
        label: "Warranty & RMA",
        href: "/support/warranty",
        description: "Hassle-free returns & replacements",
      },
      {
        label: "Integration Help",
        href: "/support/integration",
        description: "Deployment & infrastructure",
      },
    ],
  },
  {
    title: "Consulting",
    links: [
      {
        label: "AI Infrastructure",
        href: "/consulting/ai-infra",
        description: "End-to-end AI stack design",
      },
      {
        label: "Data Center Planning",
        href: "/consulting/datacenter",
        description: "Scalable cluster architecture",
      },
      {
        label: "HPC Optimization",
        href: "/consulting/hpc",
        description: "Maximize workload performance",
      },
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

const NAV_MEGA: MegaNavItem[] = [
  { label: "Products", columns: PRODUCT_COLUMNS, href: "/products" },
  { label: "Categories", columns: CATEGORY_COLUMNS, href: "/categories" },
  { label: "Technology", columns: RESOURCE_COLUMNS, href: "/technology" },
  { label: "Services", columns: SERVICES_COLUMNS, href: "/services" },
  { label: "Resources", columns: RESOURCE_COLUMNS, href: "/resources" },
];

const NAV_SIMPLE: SimpleNavItem[] = [
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function NavLink({
  href,
  label,
  isActive,
}: {
  href: string;
  label: string;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
        isActive ? "text-primary" : "text-text-muted hover:text-text",
      )}
    >
      <span className="relative">
        {label}
        <span
          className={cn(
            "absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-transform duration-300 origin-left",
            isActive
              ? "bg-primary scale-x-100"
              : "bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100",
          )}
        />
      </span>
    </Link>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const prevScroll = useRef(0);
  const menuCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      if (currentY > 100) {
        setHidden(currentY > prevScroll.current);
      } else {
        setHidden(false);
      }
      prevScroll.current = currentY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const id = setTimeout(() => setMobileOpen(false), 0);
    return () => clearTimeout(id);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && activeMenu) {
        setActiveMenu(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeMenu]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-transform duration-300",
          hidden ? "-translate-y-full" : "translate-y-0",
        )}
      >
        <TopBar />
        <header
          className={cn(
            "h-[72px] flex items-center justify-between px-6 sm:px-8 lg:px-12 bg-white dark:bg-surface border-b border-gray-200/80 dark:border-border/80",
            scrolled && "shadow-md shadow-black/5",
          )}
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <AnimatedLogo size={36} showText />
          </Link>

          {/* Desktop Nav */}
          <div
            className="hidden lg:block flex-1 relative"
            onMouseLeave={() => {
              menuCloseTimer.current = setTimeout(
                () => setActiveMenu(null),
                100,
              );
            }}
          >
            <nav className="flex items-center justify-center gap-0.5">
              <NavLink
                href="/"
                label="Home"
                isActive={isActive("/") && pathname === "/"}
              />
              {NAV_MEGA.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (menuCloseTimer.current)
                      clearTimeout(menuCloseTimer.current);
                    setActiveMenu(item.label);
                  }}
                >
                  <button
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 group",
                      activeMenu === item.label
                        ? "text-primary"
                        : "text-text-muted hover:text-text",
                    )}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 right-0 h-[2px] rounded-full transition-transform duration-300 origin-left",
                          activeMenu === item.label
                            ? "bg-primary scale-x-100"
                            : "bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100",
                        )}
                      />
                    </span>
                    <ChevronDown
                      className={cn(
                        "w-3.5 h-3.5 transition-all duration-200",
                        activeMenu === item.label && "rotate-180",
                      )}
                    />
                  </button>
                </div>
              ))}
              {NAV_SIMPLE.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  isActive={isActive(link.href)}
                />
              ))}
            </nav>

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {activeMenu && NAV_MEGA.find((m) => m.label === activeMenu) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 top-full mt-0 flex justify-center"
                  onClick={() => setActiveMenu(null)}
                  onMouseEnter={() => {
                    if (menuCloseTimer.current)
                      clearTimeout(menuCloseTimer.current);
                  }}
                >
                  <div
                    className="w-[min(1100px,calc(100vw-2rem))]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {(() => {
                      const item = NAV_MEGA.find(
                        (m) => m.label === activeMenu,
                      )!;
                      return (
                        <MegaMenu
                          label={item.label}
                          columns={item.columns}
                          href={item.href}
                        />
                      );
                    })()}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            <ColorPicker />
            <ChipToggle />
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
                mobileOpen && "active",
              )}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <span
                className={cn(
                  "block w-6 h-[2px] bg-text rounded-sm transition-all duration-300",
                  mobileOpen && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block w-6 h-[2px] bg-text rounded-sm transition-all duration-300",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block w-6 h-[2px] bg-text rounded-sm transition-all duration-300",
                  mobileOpen && "-translate-y-[7px] -rotate-45",
                )}
              />
            </button>
          </div>
        </header>
      </div>

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
          mobileOpen ? "right-0" : "-right-full",
        )}
      >
        <div className="flex flex-col min-h-screen">
          {/* Header with gradient */}
          <div className="sticky top-0 z-10 bg-gradient-to-b from-surface via-surface to-surface/95 backdrop-blur-xl border-b border-border/50 p-6">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 font-extrabold text-xl tracking-tight"
              >
                <div className="w-[30px] h-[30px] relative">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <pattern
                        id="mg"
                        width="6"
                        height="6"
                        patternUnits="userSpaceOnUse"
                      >
                        <rect width="6" height="6" fill="#0D0D14" />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="5"
                          height="5"
                          rx="0.8"
                          fill="none"
                          stroke="#00BCD4"
                          strokeWidth="0.4"
                          opacity="0.12"
                        />
                      </pattern>
                    </defs>
                    <rect
                      x="2"
                      y="2"
                      width="96"
                      height="96"
                      rx="16"
                      fill="#0A0A0F"
                    />
                    <rect
                      x="20"
                      y="20"
                      width="60"
                      height="60"
                      rx="6"
                      fill="#0D0D14"
                      stroke="#00BCD4"
                      strokeWidth="3"
                    />
                    <rect
                      x="25"
                      y="25"
                      width="50"
                      height="50"
                      rx="4"
                      fill="url(#mg)"
                    />
                    <text
                      x="50"
                      y="65"
                      textAnchor="middle"
                      fill="#00BCD4"
                      fontFamily="sans-serif"
                      fontWeight="900"
                      fontSize="38"
                      letterSpacing="-1.5"
                    >
                      <tspan fill="#00BCD4">S</tspan>
                      <tspan fill="#00E5FF">C</tspan>
                    </text>
                    <text
                      x="50"
                      y="32"
                      textAnchor="middle"
                      fill="#00BCD4"
                      fontFamily="monospace"
                      fontWeight="700"
                      fontSize="7"
                      opacity="0.35"
                      letterSpacing="1.5"
                    >
                      SERVCHIP
                    </text>
                    <circle
                      cx="26"
                      cy="26"
                      r="3"
                      fill="#00E5FF"
                      opacity="0.7"
                    />
                    <circle
                      cx="74"
                      cy="26"
                      r="3"
                      fill="#00E5FF"
                      opacity="0.7"
                    />
                    <circle
                      cx="26"
                      cy="74"
                      r="3"
                      fill="#00E5FF"
                      opacity="0.7"
                    />
                    <circle
                      cx="74"
                      cy="74"
                      r="3"
                      fill="#00E5FF"
                      opacity="0.7"
                    />
                  </svg>
                </div>
                <div className="flex flex-col leading-none">
                  <span className="font-black tracking-tight text-text">
                    SERV<span className="text-primary">CHIP</span>
                  </span>
                  <span className="text-[8px] font-mono text-text-dim tracking-widest">
                    ENTERPRISE CHIPS
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-text-muted hover:text-text hover:bg-primary/[0.04] p-2 rounded-lg transition-all"
                aria-label="Close menu"
              >
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
                pathname === "/"
                  ? "text-primary"
                  : "text-text-muted hover:text-text",
              )}
            >
              <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              Home
            </Link>

            {/* Mega nav items with dropdown */}
            {(
              [
                ...NAV_MEGA,
                ...NAV_SIMPLE.map((l) => ({
                  ...l,
                  columns: [] as NavColumn[],
                })),
              ] as NavItem[]
            ).map((item) => {
              const mega = item as MegaNavItem;
              const simple = item as SimpleNavItem;
              return (
                <div key={item.label}>
                  {mega.columns && mega.columns.length > 0 ? (
                    <>
                      <button
                        onClick={() =>
                          setMobileDropdown(
                            mobileDropdown === item.label ? null : item.label,
                          )
                        }
                        className="flex items-center justify-between w-full py-3.5 text-base font-medium border-b border-border/50 text-text-muted hover:text-text transition-colors group"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                          {item.label}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-4 h-4 transition-transform duration-300",
                            mobileDropdown === item.label && "rotate-180",
                          )}
                        />
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
                              {mega.columns.map((col) => (
                                <div key={col.title} className="py-2">
                                  <h4 className="text-[10px] font-semibold uppercase tracking-wider text-primary/60 px-3 mb-2">
                                    {col.href ? (
                                      <Link
                                        href={col.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="hover:text-primary transition-colors"
                                      >
                                        {col.title}
                                      </Link>
                                    ) : (
                                      col.title
                                    )}
                                  </h4>
                                  {col.links.slice(0, 5).map((link) => (
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
                                  {col.links.length > 5 && (
                                    <Link
                                      href={col.href ?? "/products"}
                                      onClick={() => setMobileOpen(false)}
                                      className="block text-[11px] font-medium text-primary/70 hover:text-primary px-3 py-1.5 transition-colors"
                                    >
                                      +{col.links.length - 5} more →
                                    </Link>
                                  )}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={simple.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-center gap-2 py-3.5 text-base font-medium border-b border-border/50 transition-colors group",
                        simple.href && isActive(simple.href)
                          ? "text-primary"
                          : "text-text-muted hover:text-text",
                      )}
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                      {item.label}
                    </Link>
                  )}
                </div>
              );
            })}

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
                <span className="text-primary/60">📞</span>{" "}
                <a
                  href="tel:+917982498712"
                  className="hover:text-primary transition-colors"
                >
                  +91 7982498712
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary/60">✉️</span>{" "}
                <a
                  href="mailto:sales@servchip.com"
                  className="hover:text-primary transition-colors"
                >
                  sales@servchip.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-primary/60 mt-0.5">📍</span>
                <span>
                  <strong className="text-text-muted">India:</strong>{" "}
                  {SITE.addresses.india}
                </span>
              </div>
              <div className="flex items-start gap-2 text-xs">
                <span className="text-primary/60 mt-0.5">📍</span>
                <span>
                  <strong className="text-text-muted">UAE:</strong>{" "}
                  {SITE.addresses.uae}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
