"use client";

import { useRef, useEffect, useState } from "react";
import { AppLink as Link } from "@/components/ui/AppLink";
import NextImage from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_PHRASES, HERO_STATS } from "@/data/home";
import type { Country, CountryMarket } from "@/types";

const styles = `
  @keyframes logo-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const DC_IMAGES = [
  "/images/server-room-1.webp",
  "/images/server-room-2.webp",
  "/images/server-room-3.webp",
  "/images/server-room-4.webp",
  "/images/server-room-5.webp",
];

function HeroBgSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setTimeout(
      () => setCurrent((p) => (p + 1) % DC_IMAGES.length),
      5000,
    );
    return () => clearTimeout(timer);
  }, [current]);

  const prev = (current - 1 + DC_IMAGES.length) % DC_IMAGES.length;
  const slides = current === 0 ? [0] : [prev, current];

  return (
    <div className="absolute inset-0">
      {slides.map((i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <NextImage
            src={DC_IMAGES[i]}
            alt=""
            fill
            sizes="100vw"
            priority={i === 0}
            fetchPriority={i === 0 ? "high" : "auto"}
            quality={70}
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function TypewriterText() {
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = HERO_PHRASES[phraseIndex];
      if (!phrase) return;
      if (!isDeleting && charIndex < phrase.length) {
        charIndex += 1;
        if (textRef.current)
          textRef.current.textContent = phrase.slice(0, charIndex);
        timer = setTimeout(tick, 40);
      } else if (!isDeleting && charIndex === phrase.length) {
        timer = setTimeout(() => {
          isDeleting = true;
          tick();
        }, 2500);
      } else if (isDeleting && charIndex > 0) {
        charIndex -= 1;
        if (textRef.current)
          textRef.current.textContent = phrase.slice(0, charIndex);
        timer = setTimeout(tick, 20);
      } else {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % HERO_PHRASES.length;
        timer = setTimeout(tick, 60);
      }
    };

    timer = setTimeout(tick, 60);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <span className="text-primary/60 mr-2 font-mono text-sm">&gt;</span>
      <span ref={textRef} />
    </>
  );
}

const LOGOS = [
  {
    src: "/images/logos/nvidia.svg",
    label: "NVIDIA",
    alt: "Servchip NVIDIA Authorized AI Chip Partner Logo",
    title: "NVIDIA Data Center GPUs & AI Hardware Distributor - Servchip",
  },
  {
    src: "/images/logos/amd.svg",
    label: "AMD",
    alt: "Servchip AMD Enterprise Instinct & EPYC Partner Logo",
    title: "AMD Instinct Accelerators & EPYC Processors - Servchip",
  },
  {
    src: "/images/logos/intel.svg",
    label: "Intel",
    alt: "Servchip Intel Enterprise AI Accelerators Partner Logo",
    title: "Intel Gaudi AI Hardware & Xeon Processors - Servchip",
  },
  {
    src: "/images/logos/broadcom.svg",
    label: "Broadcom",
    alt: "Servchip Broadcom Networking & PCIe Switches Partner Logo",
    title: "Broadcom Enterprise Connectivity Hardware - Servchip",
  },
  {
    src: "/images/logos/qualcomm.svg",
    label: "Qualcomm",
    alt: "Servchip Qualcomm Enterprise AI & Compute Partner Logo",
    title: "Qualcomm Enterprise AI Accelerators - Servchip",
  },
  {
    src: "/images/logos/marvell.svg",
    label: "Marvell",
    alt: "Servchip Marvell Semiconductor Infrastructure Partner Logo",
    title: "Marvell Data Center Infrastructure Solutions - Servchip",
  },
  {
    src: "/images/logos/samsung.svg",
    label: "Samsung",
    alt: "Servchip Samsung Enterprise Memory & HBM Partner Logo",
    title: "Samsung High Bandwidth Memory & Enterprise SSDs - Servchip",
  },
  {
    src: "/images/logos/micron.svg",
    label: "Micron",
    alt: "Servchip Micron Enterprise HBM3e Memory Partner Logo",
    title: "Micron High Performance Memory Solutions - Servchip",
  },
  {
    src: "/images/logos/sk-hynix.svg",
    label: "SK hynix",
    alt: "Servchip SK hynix HBM3e AI Memory Partner Logo",
    title: "SK hynix Advanced AI Memory Hardware - Servchip",
  },
  {
    src: "/images/logos/kioxia.svg",
    label: "Kioxia",
    alt: "Servchip Kioxia Enterprise Data Center Storage Partner Logo",
    title: "Kioxia Flash Storage Solutions - Servchip",
  },
  {
    src: "/images/logos/wdc.svg",
    label: "Western Digital",
    alt: "Servchip Western Digital Enterprise Storage Partner Logo",
    title: "Western Digital Data Center Drives - Servchip",
  },
  {
    src: "/images/logos/seagate.svg",
    label: "Seagate",
    alt: "Servchip Seagate Enterprise Data Storage Partner Logo",
    title: "Seagate High Capacity Enterprise Storage - Servchip",
  },
  {
    src: "/images/logos/dell.svg",
    label: "Dell",
    alt: "Servchip Dell Technologies Enterprise Servers Partner Logo",
    title: "Dell PowerEdge GPU Server Hardware - Servchip",
  },
  {
    src: "/images/logos/hpe.svg",
    label: "HPE",
    alt: "Servchip HPE ProLiant & Cray Supercomputing Partner Logo",
    title: "HPE Enterprise AI Server Infrastructure - Servchip",
  },
  {
    src: "/images/logos/supermicro.svg",
    label: "Supermicro",
    alt: "Servchip Supermicro GPU Server Solutions Partner Logo",
    title: "Supermicro Enterprise AI & Rackmount Servers - Servchip",
  },
  {
    src: "/images/logos/lenovo.svg",
    label: "Lenovo",
    alt: "Servchip Lenovo ThinkSystem AI Infrastructure Partner Logo",
    title: "Lenovo Enterprise AI Servers & Workstations - Servchip",
  },
];

export function Hero3D({
  country,
  market,
}: {
  country?: Country;
  market?: CountryMarket;
}) {
  const heroTitle = (
    <>
      AI Chip Distributor —{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BCD4] to-[#00E5FF]">
        Data Center GPUs
      </span>{" "}
      for HPC &amp; AI
      {country ? ` in ${country.hero.label}` : null}
    </>
  );

  const heroSubtitle =
    country && market
      ? `${market.shippingNote} ${market.leadTime} delivery. ${market.currency} (${market.currencySymbol}) pricing.`
      : null;
  const heroBadge = country
    ? `AUTHORIZED NVIDIA DISTRIBUTOR — ${country.name.toUpperCase()}`
    : "AUTHORIZED NVIDIA DISTRIBUTOR — DATA CENTER GPUs & AI CHIPS";
  const heroStats = country?.stats ?? HERO_STATS;

  return (
    <section
      className="relative min-h-[70vh] flex items-center overflow-hidden"
      style={{ backgroundColor: "#070B15" }}
    >
      <style>{styles}</style>

      <HeroBgSlider />

      <div className="absolute inset-0 bg-gradient-to-r from-[#070B15]/30 via-transparent to-[#070B15]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B15]/40 via-transparent to-transparent" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,11,0.35)_100%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full z-10">
        <div className="text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-mono font-bold mb-8 tracking-wide uppercase border bg-black/40"
            style={{
              borderColor:
                "color-mix(in srgb, var(--hero-primary) 35%, transparent)",
              color: "var(--hero-primary)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full inline-block animate-ping"
              style={{ backgroundColor: "var(--hero-secondary)" }}
            />
            {heroBadge}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-white leading-[1.05] mb-6 tracking-tight">
            {heroTitle}
          </h1>

          <p
            className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-2xl mx-auto min-h-[3.5rem] sm:min-h-[5rem]"
            aria-live="polite"
          >
            {heroSubtitle ?? <TypewriterText />}
            {!country && (
              <span
                className="inline-block w-[6px] h-[14px] ml-1 align-middle animate-pulse"
                style={{ backgroundColor: "var(--hero-primary)" }}
              />
            )}
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href={`/products`}>
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-black"
                style={{
                  backgroundColor: "var(--hero-primary)",
                  boxShadow:
                    "0 0 40px rgba(0,188,212,0.3), 0 0 80px rgba(0,188,212,0.1)",
                }}
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
            <Link href={`/rfq`}>
              <button
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border bg-gradient-to-b from-white/[0.22] to-white/[0.08] hover:from-white/[0.30] hover:to-white/[0.14] transition-all duration-300"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--hero-primary) 50%, transparent)",
                  color: "color-mix(in srgb, var(--hero-primary) 90%, white)",
                }}
              >
                Request Quotation
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-5 max-w-xl mx-auto py-5">
            {heroStats.map(({ value, label }, i) => (
              <div
                key={label}
                className="group relative text-center px-3 py-4 rounded-xl border bg-gradient-to-b from-white/[0.18] to-white/[0.06] hover:from-white/[0.26] hover:to-white/[0.10] sm:hover:-translate-y-1 transition-all duration-300"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--hero-primary) 25%, transparent)",
                }}
              >
                {/* Corner brackets */}
                <span
                  className="absolute top-1.5 left-1.5 w-2.5 h-2.5 border-t border-l"
                  style={{ borderColor: "var(--hero-secondary)" }}
                />
                <span
                  className="absolute bottom-1.5 right-1.5 w-2.5 h-2.5 border-b border-r"
                  style={{ borderColor: "var(--hero-secondary)" }}
                />

                {/* Scan line */}
                <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <span
                  className="text-xl sm:text-2xl lg:text-[1.75rem] font-black text-white font-mono tracking-tight block"
                  style={{
                    textShadow: `0 0 24px color-mix(in srgb, var(--hero-primary) 60%, transparent)`,
                  }}
                >
                  {value}
                </span>
                <span
                  className="block text-[9px] font-mono mt-2 uppercase tracking-[0.18em] font-semibold leading-snug"
                  style={{ color: "var(--hero-secondary)" }}
                >
                  {label}
                </span>

                {/* Progress glow bar */}
                <span className="relative block mt-3 mx-auto h-[3px] w-full max-w-[90px] overflow-hidden rounded-full bg-white/10">
                  <span
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: i === 0 ? "100%" : i === 1 ? "80%" : "96%",
                      background:
                        "linear-gradient(90deg, var(--hero-primary), var(--hero-secondary))",
                      boxShadow: `0 0 12px color-mix(in srgb, var(--hero-primary) 70%, transparent)`,
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-6">
        <div className="relative overflow-hidden">
          <div
            className="flex gap-12 items-center"
            style={{
              animation: "logo-scroll 40s linear infinite",
              width: "fit-content",
              willChange: "transform",
            }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-8 w-24 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-300"
              >
                <NextImage
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  width={96}
                  height={32}
                  unoptimized
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
