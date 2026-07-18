"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { HERO_PHRASES, HERO_STATS } from "@/data/home";

const styles = `
  @keyframes scan-line {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes mesh-shift {
    0% { transform: translate(0, 0); }
    25% { transform: translate(10px, -5px); }
    50% { transform: translate(-5px, 10px); }
    75% { transform: translate(8px, 8px); }
    100% { transform: translate(0, 0); }
  }
  @keyframes float-particle {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.8; }
    90% { opacity: 0.5; }
    100% { transform: translateY(-150px) translateX(var(--dx, 20px)); opacity: 0; }
  }
  @keyframes logo-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
`;

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

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
    DC_IMAGES.slice(1).forEach((url) => {
      const img = new Image();
      img.src = url;
    });
    const interval = setInterval(
      () => setCurrent((p) => (p + 1) % DC_IMAGES.length),
      5000,
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0">
      {DC_IMAGES.map((url, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${url})`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}
    </div>
  );
}

function FloatingOrbs() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-primary/3 blur-[150px] pointer-events-none" />
    </>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      s: number;
      a: number;
    }[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        s: 0.5 + Math.random() * 1.5,
        a: 0.1 + Math.random() * 0.3,
      });
    }

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.fillStyle = hexToRgba("#00BCD4", p.a);
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = hexToRgba("#00BCD4", (1 - dist / 120) * 0.08);
            ctx.lineWidth = 0.3;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const LOGOS = [
  { src: "/images/logos/nvidia.svg", label: "NVIDIA" },
  { src: "/images/logos/amd.svg", label: "AMD" },
  { src: "/images/logos/intel.svg", label: "Intel" },
  { src: "/images/logos/broadcom.svg", label: "Broadcom" },
  { src: "/images/logos/qualcomm.svg", label: "Qualcomm" },
  { src: "/images/logos/marvell.svg", label: "Marvell" },
  { src: "/images/logos/samsung.svg", label: "Samsung" },
  { src: "/images/logos/micron.svg", label: "Micron" },
  { src: "/images/logos/sk-hynix.svg", label: "SK hynix" },
  { src: "/images/logos/kioxia.svg", label: "Kioxia" },
  { src: "/images/logos/wdc.svg", label: "Western Digital" },
  { src: "/images/logos/seagate.svg", label: "Seagate" },
  { src: "/images/logos/dell.svg", label: "Dell" },
  { src: "/images/logos/hpe.svg", label: "HPE" },
  { src: "/images/logos/supermicro.svg", label: "Supermicro" },
  { src: "/images/logos/lenovo.svg", label: "Lenovo" },
];

export function Hero3D() {
  const displayText = useTypewriter(HERO_PHRASES, 40, 2500);
  const isDesktop = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(hover: hover) and (pointer: fine)").matches,
    () => false,
  );

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px] lg:pt-[104px]"
      style={{ backgroundColor: "#070B15" }}
    >
      <style>{styles}</style>

      <HeroBgSlider />

      <div className="absolute inset-0 bg-gradient-to-r from-[#070B15]/30 via-transparent to-[#070B15]/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B15]/40 via-transparent to-transparent" />

      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,188,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,188,212,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "mesh-shift 20s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(0,188,212,0.02), transparent)",
          animation: "scan-line 6s linear infinite",
        }}
      />

      <FloatingOrbs />
      {isDesktop && <ParticleField />}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(5,7,11,0.35)_100%)] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full z-10">
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            initial={{ y: -10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-mono font-bold mb-8 tracking-wide uppercase border bg-black/40 backdrop-blur-md"
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
            AUTHORIZED DISTRIBUTOR — 50+ BRANDS
          </motion.div>

          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-[4rem] font-black text-white leading-[1.05] mb-6 tracking-tight"
          >
            Enterprise AI Chips &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BCD4] to-[#00E5FF]">
              Accelerators for HPC
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35 }}
            className="text-slate-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto min-h-[3.5rem]"
          >
            <span className="text-primary/60 mr-2 font-mono text-sm">&gt;</span>
            {displayText}
            <span
              className="inline-block w-[6px] h-[14px] ml-1 align-middle animate-pulse"
              style={{ backgroundColor: "var(--hero-primary)" }}
            />
          </motion.p>

          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm text-black transition-transform"
                style={{
                  backgroundColor: "var(--hero-primary)",
                  boxShadow:
                    "0 0 40px rgba(0,188,212,0.3), 0 0 80px rgba(0,188,212,0.1)",
                }}
              >
                Explore Products <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
            <Link href="/rfq">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm border bg-white/[0.05] backdrop-blur-sm"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--hero-primary) 50%, transparent)",
                  color: "color-mix(in srgb, var(--hero-primary) 90%, white)",
                }}
              >
                Request Quotation
              </motion.button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ y: 15 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.65 }}
            className="grid grid-cols-3 gap-8 max-w-lg mx-auto py-6 border-t"
            style={{
              borderColor:
                "color-mix(in srgb, var(--hero-primary) 20%, transparent)",
            }}
          >
            {HERO_STATS.map(({ value, label }, i) => (
              <motion.div
                key={label}
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
              >
                <span
                  className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight block"
                  style={{ textShadow: "0 0 30px rgba(0,188,212,0.2)" }}
                >
                  {value}
                </span>
                <span
                  className="text-[10px] font-mono mt-0.5 uppercase tracking-widest font-semibold block"
                  style={{ color: "var(--hero-primary)" }}
                >
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-0 left-0 right-0 overflow-hidden py-6"
      >
        <div className="relative overflow-hidden">
          <div
            className="flex gap-12 items-center"
            style={{
              animation: "logo-scroll 40s linear infinite",
              width: "fit-content",
            }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-8 w-24 flex items-center justify-center opacity-30 hover:opacity-60 transition-opacity duration-300"
              >
                <NextImage
                  src={logo.src}
                  alt={`${logo.label} logo`}
                  width={96}
                  height={32}
                  unoptimized
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
