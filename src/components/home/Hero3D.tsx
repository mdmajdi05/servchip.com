"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useTypewriter } from "@/hooks/useTypewriter";
import { HERO_PHRASES, HERO_STATS, HERO_METRICS_LOG } from "@/data/home";

// Rich Premium Tech CSS Configurations
const customStyles = `
  @keyframes scanlineMove {
    0% { transform: translateY(-100%); }
    100% { transform: translateY(100vh); }
  }
  @keyframes dataPulse {
    0%, 100% { stroke-dashoffset: 200; opacity: 0.4; }
    50% { stroke-dashoffset: 0; opacity: 1; }
  }
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes orbFloat1 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(120px, -80px); }
    50% { transform: translate(-60px, 140px); }
    75% { transform: translate(80px, 60px); }
  }
  @keyframes orbFloat2 {
    0%, 100% { transform: translate(0, 0); }
    25% { transform: translate(-100px, 100px); }
    50% { transform: translate(130px, -70px); }
    75% { transform: translate(-70px, -90px); }
  }
  @keyframes orbFloat3 {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(80px, 80px); }
    66% { transform: translate(-100px, -60px); }
  }
  @keyframes auroraWave {
    0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
    10% { opacity: 0.15; }
    90% { opacity: 0.15; }
    100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
  }
  @keyframes auroraWave2 {
    0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
    10% { opacity: 0.1; }
    90% { opacity: 0.1; }
    100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
  }
  @keyframes beamPulse {
    0%, 100% { opacity: 0.06; transform: scaleY(0.8); }
    50% { opacity: 0.15; transform: scaleY(1.2); }
  }
  @keyframes hexFloat1 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(60px, -70px) rotate(120deg); }
    66% { transform: translate(-40px, 40px) rotate(240deg); }
  }
  @keyframes hexFloat2 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-80px, 60px) rotate(180deg); }
  }
  @keyframes hexFloat3 {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    33% { transform: translate(-60px, -50px) rotate(-120deg); }
    66% { transform: translate(70px, 40px) rotate(-240deg); }
  }
  .tech-grid {
    background-image: 
      linear-gradient(color-mix(in srgb, var(--hero-primary) 8%, transparent) 1px, transparent 1px),
      linear-gradient(90deg, color-mix(in srgb, var(--hero-primary) 8%, transparent) 1px, transparent 1px);
    background-size: 32px 32px;
  }
`;

function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Pure Canvas Particle Engine: Simulated Data sucking into the Chip center
function InteractiveDataStream() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function getCSSVar(name: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    // Particles array
    const particles: Array<{
      x: number;
      y: number;
      targetX: number;
      targetY: number;
      speed: number;
      size: number;
      alpha: number;
      length: number;
    }> = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Target coordinates: Around where the 3D chip sits (Right side center)
    const getTargetPos = () => ({
      x: width * 0.75,
      y: height * 0.5
    });

    const spawnParticle = () => {
      const target = getTargetPos();
      // Spawn data from left or top/bottom margins heading towards the chip
      const fromLeft = Math.random() > 0.3;
      return {
        x: fromLeft ? -20 : Math.random() * width * 0.5,
        y: fromLeft ? Math.random() * height : (Math.random() > 0.5 ? -20 : height + 20),
        targetX: target.x + (Math.random() * 60 - 30),
        targetY: target.y + (Math.random() * 80 - 40),
        speed: 2 + Math.random() * 4,
        size: 1 + Math.random() * 2,
        alpha: 0.1 + Math.random() * 0.7,
        length: 10 + Math.random() * 30
      };
    };

    // Pre-populate particles
    for (let i = 0; i < 40; i++) particles.push(spawnParticle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw continuous streams/buses
      particles.forEach((p, idx) => {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
          // Respawn if data reaches the GPU chip
          particles[idx] = spawnParticle();
          return;
        }

        // Calculate steps
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * p.speed;
        p.y += Math.sin(angle) * p.speed;

        // Draw streaming lasers (Data Vectors)
        ctx.beginPath();
        const primaryHex = getCSSVar('--hero-primary') || '#76FF03';
        ctx.strokeStyle = hexToRgba(primaryHex, p.alpha * (distance / 400));
        ctx.lineWidth = p.size;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - Math.cos(angle) * p.length, p.y - Math.sin(angle) * p.length);
        ctx.stroke();

        // Binary packet tip node
        ctx.beginPath();
        const secondaryHex = getCSSVar('--hero-secondary') || '#00E5FF';
        ctx.fillStyle = hexToRgba(secondaryHex, p.alpha + 0.2);
        ctx.arc(p.x, p.y, p.size + 0.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Matrix scrolling hex blocks on the far left side
      ctx.font = "9px monospace";
      const hexPrimary = getCSSVar('--hero-primary') || '#76FF03';
      ctx.fillStyle = hexToRgba(hexPrimary, 0.15);
      for (let i = 0; i < 8; i++) {
        const hex = Math.random().toString(16).substr(2, 6).toUpperCase();
        ctx.fillText(`0x${hex}`, 20 + i * 45, (Date.now() * 0.05 + i * 120) % (height + 50));
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

// Internal Glowing Circuit Micro-bus of the GPU
function InternalCircuit() {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20 H50 L70 50 H130 L150 90 H190 M10 120 H60 L80 90 H120 L140 50 H190" stroke="var(--hero-primary)" strokeWidth="1.5" strokeDasharray="6 120" className="opacity-90" style={{ animation: "dataPulse 3s linear infinite" }} />
      <path d="M30 70 H170" stroke="var(--hero-secondary)" strokeWidth="1" strokeDasharray="4 8" opacity="0.3" />
      
      {/* Central Processing Core Node */}
      <rect x="82" y="52" width="36" height="36" rx="6" fill="#0B0F17" stroke="var(--hero-primary)" strokeWidth="2" />
      <text x="100" y="74" textAnchor="middle" fill="var(--hero-primary)" fontSize="7" fontFamily="monospace" fontWeight="black" letterSpacing="1">GH200</text>
    </svg>
  );
}

// Hardware-Accelerated 3D Matte Obsidian GPU Architecture
function Chip3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [15, -15]);
  const rotateY = useTransform(mouseX, [-300, 300], [-15, 15]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center cursor-pointer select-none perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
    >
      {/* Outer Halo Core Glow */}
      <div className="absolute w-[360px] h-[360px] blur-[60px] rounded-full animate-pulse pointer-events-none" style={{ backgroundColor: "color-mix(in srgb, var(--hero-primary) 6%, transparent)" }} />

      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d", borderColor: "color-mix(in srgb, var(--hero-primary) 30%, transparent)" }}
        className="relative w-[320px] h-[400px] rounded-2xl bg-gradient-to-b from-[#141A24] via-[#0E131B] to-[#070A0E] border shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.05)] flex items-center justify-center transition-all duration-300"
      >
        {/* Silicon Pattern Core */}
          <div className="absolute inset-4 rounded-xl border bg-[#090D14] overflow-hidden" style={{ borderColor: "color-mix(in srgb, var(--hero-primary) 20%, transparent)" }}>
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(var(--hero-primary) 1px, transparent 1px)", backgroundSize: "10px 10px" }} />
          
          <InternalCircuit />

          {/* Premium Branding Foil */}
          <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end z-10 pointer-events-none translate-z-30">
            <div>
              <h2 className="text-2xl font-black tracking-tighter text-white">NVIDIA</h2>
              <p className="text-[6px] font-mono tracking-[0.4em] font-bold uppercase" style={{ color: "var(--hero-primary)" }}>Grace Hopper Ecosystem</p>
            </div>
            <span className="text-[8px] font-mono text-slate-500 border border-slate-800 rounded px-1 py-0.5 bg-black/40">SECURE_HW</span>
          </div>
        </div>

        {/* Dynamic Telemetry log inside the hardware asset */}
        <div className="absolute top-6 left-6 right-6 flex justify-between text-[6px] font-mono" style={{ color: "color-mix(in srgb, var(--hero-primary) 50%, transparent)" }}>
          <span>MODULE_01 // OK</span>
          <span>LN2_COOLING: ACTIVE</span>
        </div>

        {/* Polished Gold Matrix Bus Pins */}
        <div className="absolute -bottom-1 left-12 right-12 flex justify-between">
          {[...Array(16)].map((_, i) => (
            <span key={i} className="w-[3px] h-3.5 bg-gradient-to-t from-amber-600 via-yellow-500 to-transparent rounded-t shadow-[0_0_8px_#D4A843]" />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

// Floating ambient aurora glow orbs
function GlowOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Left massive orb */}
      <div
        className="absolute -top-[20%] -left-[20%] w-[1200px] h-[1200px] rounded-full opacity-[0.18]"
        style={{
          background: "radial-gradient(circle at 30% 30%, var(--hero-primary) 0%, var(--hero-secondary) 25%, #7B2FBE 50%, transparent 70%)",
          filter: "blur(120px)",
          animation: "orbFloat1 22s ease-in-out infinite",
        }}
      />
      {/* Right massive orb */}
      <div
        className="absolute -bottom-[30%] -right-[20%] w-[1100px] h-[1100px] rounded-full opacity-[0.15]"
        style={{
          background: "radial-gradient(circle at 70% 70%, var(--hero-secondary) 0%, #D4A843 25%, var(--hero-primary) 50%, transparent 70%)",
          filter: "blur(120px)",
          animation: "orbFloat2 26s ease-in-out infinite",
        }}
      />
      {/* Center-bottom ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] opacity-[0.1]"
        style={{
          background: "radial-gradient(ellipse at center bottom, var(--hero-primary) 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "orbFloat3 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

// Animated aurora light waves sweeping across the background
function AuroraWave() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute top-[15%] left-0 w-[200%] h-[300px] opacity-[0.06]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--hero-primary), var(--hero-secondary), var(--hero-primary), transparent)",
          filter: "blur(60px)",
          animation: "auroraWave 12s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-[55%] left-0 w-[200%] h-[200px] opacity-[0.04]"
        style={{
          background: "linear-gradient(90deg, transparent, var(--hero-secondary), #7B2FBE, var(--hero-secondary), transparent)",
          filter: "blur(50px)",
          animation: "auroraWave2 16s ease-in-out infinite 3s",
        }}
      />
    </div>
  );
}

// Subtle light beams from edges
function LightBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div
        className="absolute top-0 left-[10%] w-[2px] h-full opacity-[0.05]"
        style={{
          background: "linear-gradient(180deg, transparent, var(--hero-primary), transparent)",
          animation: "beamPulse 4s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-0 right-[15%] w-[2px] h-full opacity-[0.05]"
        style={{
          background: "linear-gradient(180deg, transparent, var(--hero-secondary), transparent)",
          animation: "beamPulse 5s ease-in-out infinite 1s",
        }}
      />
      <div
        className="absolute top-0 left-[30%] w-[1px] h-full opacity-[0.03]"
        style={{
          background: "linear-gradient(180deg, transparent, var(--hero-primary), transparent)",
          animation: "beamPulse 6s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute top-0 right-[35%] w-[1px] h-full opacity-[0.03]"
        style={{
          background: "linear-gradient(180deg, transparent, var(--hero-secondary), transparent)",
          animation: "beamPulse 5.5s ease-in-out infinite 0.5s",
        }}
      />
    </div>
  );
}

// Background constellation particle network
function ConstellationField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function getCSSVar(name: string) {
      return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    }

    interface Node {
      x: number; y: number; vx: number; vy: number; size: number; alpha: number;
    }

    const nodes: Node[] = [];

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    for (let i = 0; i < 80; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: 0.8 + Math.random() * 2,
        alpha: 0.2 + Math.random() * 0.6,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const primaryHex = getCSSVar('--hero-primary') || '#76FF03';
      const secondaryHex = getCSSVar('--hero-secondary') || '#00E5FF';

      // Update positions
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw connections between nearby nodes
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.1;
            ctx.beginPath();
            ctx.strokeStyle = hexToRgba(primaryHex, alpha);
            ctx.lineWidth = 0.4;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw node dots
      for (const n of nodes) {
        // Outer glow
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(primaryHex, n.alpha * 0.08);
        ctx.arc(n.x, n.y, n.size * 3, 0, Math.PI * 2);
        ctx.fill();
        // Inner dot
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(secondaryHex, n.alpha * 0.35);
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();
        // Bright core
        ctx.beginPath();
        ctx.fillStyle = hexToRgba(primaryHex, n.alpha * 0.2);
        ctx.arc(n.x, n.y, n.size * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }} />;
}

// Floating tech geometric shapes
function FloatingTechShapes() {
  const shapes = [
    { id: 1, size: 80, top: "12%", left: "8%", color: "var(--hero-primary)", opacity: 0.1, anim: "hexFloat1", d: "M0-40L35-20L35 20L0 40L-35 20L-35-20Z" },
    { id: 2, size: 55, top: "72%", left: "88%", color: "var(--hero-secondary)", opacity: 0.08, anim: "hexFloat2", d: "M0-28L24-14L24 14L0 28L-24 14L-24-14Z" },
    { id: 3, size: 65, top: "65%", left: "2%", color: "var(--hero-primary)", opacity: 0.07, anim: "hexFloat3", d: "M0-32L28-16L28 16L0 32L-28 16L-28-16Z" },
    { id: 4, size: 45, top: "18%", left: "85%", color: "var(--hero-secondary)", opacity: 0.1, anim: "hexFloat1", d: "M0-22L19-11L19 11L0 22L-19 11L-19-11Z" },
    { id: 5, size: 35, top: "45%", left: "92%", color: "#7B2FBE", opacity: 0.07, anim: "hexFloat2", d: "M0-18L16-9L16 9L0 18L-16 9L-16-9Z" },
    { id: 6, size: 70, top: "85%", left: "45%", color: "var(--hero-primary)", opacity: 0.06, anim: "hexFloat3", d: "M0-35L30-18L30 18L0 35L-30 18L-30-18Z" },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {shapes.map((s) => (
        <svg
          key={s.id}
          className="absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animation: `${s.anim} 18s ease-in-out infinite`,
          }}
          viewBox="-30 -30 60 60"
          fill="none"
        >
          <path d={s.d} stroke={s.color} strokeWidth="1" opacity="0.6" />
          <path d={s.d} stroke={s.color} strokeWidth="0.5" opacity="0.3" transform="scale(1.5)" />
        </svg>
      ))}
    </div>
  );
}

export function Hero3D() {
  const displayText = useTypewriter(HERO_PHRASES, 40, 2500);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[length:200%_200%] animate-[gradientShift_18s_ease_infinite] pt-[72px] lg:pt-[104px]" style={{ backgroundImage: "linear-gradient(-45deg, #0B0F19 0%, #0F1430 20%, #1A0F2E 40%, #0B1530 60%, #0F1430 80%, #0B0F19 100%)" }}>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />

      {/* Ambient glow orbs */}
      <GlowOrbs />

      {/* Constellation particle network */}
      <ConstellationField />

      {/* Aurora light waves */}
      <AuroraWave />

      {/* Light beams from edges */}
      <LightBeams />

      {/* Floating tech shapes */}
      <FloatingTechShapes />

      {/* Structured Circuit Grid Base Layer */}
      <div className="absolute inset-0 pointer-events-none tech-grid opacity-[0.08]" />

      {/* Real-time Custom Canvas Streams */}
      <InteractiveDataStream />

      {/* Radar Scanline Laser Overlay */}
      <div 
        className="absolute left-0 right-0 h-[2px] opacity-[0.06] pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, var(--hero-primary), transparent)",
          animation: "scanlineMove 6s linear infinite"
        }}
      />

      {/* Cyber Shading Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_30%,rgba(5,7,11,0.7)_100%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Typography Panel */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded px-3 py-1 text-[11px] font-mono font-bold mb-6 tracking-wide uppercase" style={{ backgroundColor: "color-mix(in srgb, var(--hero-primary) 10%, transparent)", borderColor: "color-mix(in srgb, var(--hero-primary) 30%, transparent)", color: "var(--hero-primary)" }}>
                <span className="w-1.5 h-1.5 rounded-full inline-block animate-ping" style={{ backgroundColor: "var(--hero-secondary)" }} />
                SYSTEM_BUS: CONNECTED // LIVE FLOW
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-white leading-[1.05] mb-5 tracking-tight">
                Powering the Future of <span className="text-transparent bg-clip-text filter" style={{ backgroundImage: "linear-gradient(to right, var(--hero-primary), var(--hero-secondary))", filter: "drop-shadow(0 0 15px color-mix(in srgb, var(--hero-primary) 40%, transparent))" }}>AI Computing</span>
              </h1>

              <p className="text-slate-400 font-mono text-xs sm:text-sm leading-relaxed mb-8 min-h-[3.5rem] bg-black/20 p-3 rounded border border-slate-900/60 shadow-inner">
                <span className="text-slate-600 mr-1">&gt;</span> {displayText}
                <span className="inline-block w-[6px] h-[12px] ml-1 align-middle animate-pulse" style={{ backgroundColor: "var(--hero-primary)" }} />
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Link href="/products">
                  <Button variant="solid" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right" className="text-black font-bold transition-all" style={{ backgroundColor: "var(--hero-primary)", boxShadow: "0 0 20px color-mix(in srgb, var(--hero-primary) 30%, transparent)" }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "color-mix(in srgb, var(--hero-primary) 80%, black)" } } onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "var(--hero-primary)" } }>
                    Explore Chips
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button variant="outline" size="lg" className="border-slate-800 text-slate-300 bg-transparent hover:bg-slate-900 hover:text-white">
                    Request Quotation
                  </Button>
                </Link>
              </div>

              {/* Live Telemetry Metrics instead of just flat numbers */}
              <div className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-900">
                {HERO_STATS.map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">{value}</span>
                    <span className="text-[10px] font-mono mt-0.5 uppercase tracking-widest font-semibold" style={{ color: "var(--hero-primary)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Interactive Hardware Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="relative w-[450px] aspect-square">
              {/* Telemetry log boxes floating near the chip */}
              <div className="absolute top-4 left-0 bg-black/60 border border-slate-900 p-2 rounded font-mono text-[8px] text-slate-500 z-20 backdrop-blur-sm max-w-[110px] space-y-0.5">
                <div className="font-bold" style={{ color: "var(--hero-secondary)" }}>NODE_STATUS:</div>
                {HERO_METRICS_LOG.slice(0, 4).map(m => <div key={m}>{m}</div>)}
              </div>

              <Chip3D />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
