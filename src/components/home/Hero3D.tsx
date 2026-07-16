"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import { useTypewriter } from "@/hooks/useTypewriter";
import { HERO_PHRASES, HERO_STATS } from "@/data/home";

const styles = `
  @keyframes scan-line {
    0% { transform: translateY(-100%); opacity: 0; }
    10% { opacity: 0.5; }
    90% { opacity: 0.5; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes orbit-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  @keyframes orbit-rotate-reverse {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  @keyframes chip-glow {
    0%, 100% { filter: drop-shadow(0 0 30px rgba(118,255,3,0.3)) drop-shadow(0 0 60px rgba(118,255,3,0.1)); }
    50% { filter: drop-shadow(0 0 50px rgba(118,255,3,0.5)) drop-shadow(0 0 100px rgba(118,255,3,0.2)); }
  }
  @keyframes badge-float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes dash-move {
    to { stroke-dashoffset: -24; }
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
`;

const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const DC_IMAGES = [
  "/images/server-room-1.jpg",
  "/images/server-room-2.jpg",
  "/images/server-room-3.jpg",
  "/images/server-room-4.png",
  "/images/server-room-5.jpg",
];

function HeroBgSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    DC_IMAGES.forEach((url) => {
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

function ChipVisual() {
  const particles = useMemo(
    () =>
      [...Array(12)].map((_, i) => ({
        id: i,
        left: 15 + ((i * 37 + 13) % 70),
        top: 15 + ((i * 53 + 7) % 70),
        duration: 3 + ((i * 23 + 11) % 4),
        delay: (i * 19 + 5) % 5,
        dx: ((i * 41 + 3) % 40) - 20,
      })),
    [],
  );
  return (
    <div className="relative w-full max-w-[500px] aspect-square mx-auto">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[350px] h-[350px] rounded-full bg-primary/5 blur-[80px] animate-pulse" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[250px] h-[250px] rounded-full bg-primary/10 blur-[60px]" />
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "orbit-rotate 20s linear infinite" }}
      >
        <div className="w-[420px] h-[420px] rounded-full border border-primary/20 relative">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(118,255,3,0.8)]"
            style={{ animation: "badge-float 3s ease-in-out infinite" }}
          />
          <div
            className="absolute bottom-[15%] right-0 translate-x-1/2 w-2 h-2 rounded-full bg-secondary shadow-[0_0_10px_#00E5FF]"
            style={{ animation: "badge-float 3.5s ease-in-out infinite 0.5s" }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "orbit-rotate-reverse 15s linear infinite" }}
      >
        <div className="w-[320px] h-[320px] rounded-full border border-primary/10 relative">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_#A855F7]"
            style={{ animation: "badge-float 2.8s ease-in-out infinite 0.3s" }}
          />
        </div>
      </div>

      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ animation: "chip-glow 4s ease-in-out infinite" }}
      >
        <div className="relative w-[200px] h-[200px] bg-gradient-to-b from-[#141A24] via-[#0E131B] to-[#0a0e16] rounded-2xl border border-primary/30 shadow-[0_0_60px_rgba(118,255,3,0.15),inset_0_0_30px_rgba(118,255,3,0.05)]">
          <div className="absolute inset-3 rounded-xl bg-[#0a0e16] border border-primary/20 overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle, var(--primary) 0.5px, transparent 0.5px)",
                backgroundSize: "6px 6px",
              }}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary/10 rounded-lg border border-primary/30 flex items-center justify-center">
              <div className="w-10 h-10 bg-primary/20 rounded-md border border-primary/40 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
            </div>
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 160 160"
            >
              <line
                x1="20"
                y1="20"
                x2="60"
                y2="20"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite" }}
              />
              <line
                x1="20"
                y1="20"
                x2="20"
                y2="60"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.3s" }}
              />
              <line
                x1="140"
                y1="20"
                x2="100"
                y2="20"
                stroke="var(--secondary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.5s" }}
              />
              <line
                x1="140"
                y1="20"
                x2="140"
                y2="60"
                stroke="var(--secondary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.2s" }}
              />
              <line
                x1="20"
                y1="140"
                x2="60"
                y2="140"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.7s" }}
              />
              <line
                x1="20"
                y1="140"
                x2="20"
                y2="100"
                stroke="var(--primary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.4s" }}
              />
              <line
                x1="140"
                y1="140"
                x2="100"
                y2="140"
                stroke="var(--secondary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.6s" }}
              />
              <line
                x1="140"
                y1="140"
                x2="140"
                y2="100"
                stroke="var(--secondary)"
                strokeWidth="1"
                strokeDasharray="4 3"
                opacity="0.5"
                style={{ animation: "dash-move 1s linear infinite 0.1s" }}
              />
            </svg>
          </div>

          <div className="absolute -top-2 left-8 right-8 flex justify-between">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] h-2 bg-gradient-to-b from-primary/60 to-transparent rounded-t"
              />
            ))}
          </div>
          <div className="absolute -bottom-2 left-8 right-8 flex justify-between">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="w-[3px] h-2 bg-gradient-to-t from-primary/60 to-transparent rounded-b"
              />
            ))}
          </div>
          <div className="absolute -left-2 top-8 bottom-8 flex flex-col justify-between">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[3px] w-2 bg-gradient-to-r from-primary/60 to-transparent rounded-l"
              />
            ))}
          </div>
          <div className="absolute -right-2 top-8 bottom-8 flex flex-col justify-between">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[3px] w-2 bg-gradient-to-l from-primary/60 to-transparent rounded-r"
              />
            ))}
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <span className="text-[10px] font-mono tracking-[0.25em] text-primary/80 font-bold">
              SERVCHIP
            </span>
          </div>
        </div>
      </div>

      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={
            {
              backgroundColor:
                p.id % 2 === 0 ? "var(--primary)" : "var(--secondary)",
              left: `${p.left}%`,
              top: `${p.top}%`,
              opacity: 0,
              animation: `float-particle ${p.duration}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
              "--dx": `${p.dx}px`,
            } as React.CSSProperties
          }
        />
      ))}

      <div
        className="absolute top-[5%] left-[5%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-primary/20 text-[10px] font-mono text-primary font-bold"
        style={{ animation: "badge-float 4s ease-in-out infinite" }}
      >
        NVIDIA
      </div>
      <div
        className="absolute top-[15%] right-[5%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-secondary/20 text-[10px] font-mono text-secondary font-bold"
        style={{ animation: "badge-float 3.5s ease-in-out infinite 0.8s" }}
      >
        AMD
      </div>
      <div
        className="absolute bottom-[20%] left-[2%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-purple-500/20 text-[10px] font-mono text-purple-400 font-bold"
        style={{ animation: "badge-float 4.5s ease-in-out infinite 1.5s" }}
      >
        Intel
      </div>
      <div
        className="absolute bottom-[10%] right-[3%] px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm border border-sky-400/20 text-[10px] font-mono text-sky-400 font-bold"
        style={{ animation: "badge-float 3.8s ease-in-out infinite 2s" }}
      >
        Broadcom
      </div>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-secondary/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-500/3 blur-[150px] pointer-events-none" />
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
        ctx.fillStyle = hexToRgba("#76FF03", p.a);
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
            ctx.strokeStyle = hexToRgba("#76FF03", (1 - dist / 120) * 0.08);
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

const BRANDS = [
  "NVIDIA",
  "AMD",
  "Intel",
  "Broadcom",
  "Qualcomm",
  "Marvell",
  "Samsung",
  "Micron",
];

export function Hero3D() {
  const displayText = useTypewriter(HERO_PHRASES, 40, 2500);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover) and (pointer: fine)").matches
      : false,
  );
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const chipRotateX = useTransform(mouseY, [-300, 300], [8, -8]);
  const chipRotateY = useTransform(mouseX, [-300, 300], [-8, 8]);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-[72px] lg:pt-[104px]"
      style={{ backgroundColor: "#070B15" }}
    >
      <style>{styles}</style>

      <HeroBgSlider />

      <div className="absolute inset-0 bg-gradient-to-r from-[#070B15]/60 via-[#070B15]/30 to-[#070B15]/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#070B15]/50 via-transparent to-[#070B15]/10" />

      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(118,255,3,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(118,255,3,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          animation: "mesh-shift 20s ease-in-out infinite",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(118,255,3,0.02), transparent)",
          animation: "scan-line 6s linear infinite",
        }}
      />

      <FloatingOrbs />
      {isDesktop && <ParticleField />}

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,7,11,0.6)_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-mono font-bold mb-6 tracking-wide uppercase border bg-white/[0.03] backdrop-blur-sm"
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
                AUTHORIZED DISTRIBUTOR
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-[3.75rem] font-black text-white leading-[1.05] mb-5 tracking-tight"
              >
                Enterprise Components for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#76FF03] to-[#00E5FF]">
                  AI, HPC & Beyond
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8 min-h-[3rem]"
              >
                <span className="text-primary/60 mr-2 font-mono text-xs">
                  &gt;
                </span>
                {displayText}
                <span
                  className="inline-block w-[6px] h-[14px] ml-1 align-middle animate-pulse"
                  style={{ backgroundColor: "var(--hero-primary)" }}
                />
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Link href="/products">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-black transition-all"
                    style={{
                      backgroundColor: "var(--hero-primary)",
                      boxShadow:
                        "0 0 40px rgba(118,255,3,0.3), 0 0 80px rgba(118,255,3,0.1)",
                    }}
                  >
                    Explore Products <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </Link>
                <Link href="/rfq">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border bg-white/[0.05] backdrop-blur-sm"
                    style={{
                      borderColor:
                        "color-mix(in srgb, var(--hero-primary) 50%, transparent)",
                      color:
                        "color-mix(in srgb, var(--hero-primary) 90%, white)",
                    }}
                  >
                    Request Quotation
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="grid grid-cols-3 gap-6 py-6 border-t"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--hero-primary) 20%, transparent)",
                }}
              >
                {HERO_STATS.map(({ value, label }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    <span
                      className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight block"
                      style={{ textShadow: "0 0 30px rgba(118,255,3,0.2)" }}
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap items-center gap-2 mt-6"
              >
                {BRANDS.map((brand, i) => (
                  <motion.span
                    key={brand}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.1 + i * 0.06 }}
                    className="text-[10px] font-mono tracking-wider text-slate-400 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03]"
                  >
                    {brand}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
              mouseX.set(0);
              mouseY.set(0);
            }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="hidden lg:flex items-center justify-center perspective-1000"
          >
            <motion.div
              style={{
                rotateX: chipRotateX,
                rotateY: chipRotateY,
                transformStyle: "preserve-3d",
              }}
              className="w-full"
            >
              <ChipVisual />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
