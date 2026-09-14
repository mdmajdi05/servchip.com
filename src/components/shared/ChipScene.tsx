"use client";

import { Cpu, Eye, ZoomIn } from "lucide-react";

interface ChipSceneProps {
  autoRotate?: boolean;
  className?: string;
}

export function ChipScene({ autoRotate = true, className }: ChipSceneProps) {
  return (
    <div
      className={`w-full h-full relative overflow-hidden bg-gradient-to-br from-surface to-bg-dark ${className ?? ""}`}
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />

      {/* Animated chip */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          animation: autoRotate ? "chip-float 6s ease-in-out infinite" : "none",
        }}
      >
        <div
          className="relative"
          style={{
            transform: "translate(-50%, -50%)",
            animation: autoRotate ? "chip-spin 20s linear infinite" : "none",
          }}
        >
          {/* Chip body */}
          <div className="w-28 h-20 rounded-xl bg-gradient-to-br from-surface-2 to-surface border-2 border-primary/30 relative overflow-hidden shadow-lg shadow-primary/10">
            {/* Die pattern */}
            <div
              className="absolute inset-2 rounded-md border border-primary/20"
              style={{
                background: `
                  linear-gradient(rgba(118,255,3,0.06) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(118,255,3,0.06) 1px, transparent 1px)
                `,
                backgroundSize: "6px 6px",
              }}
            />
            {/* Center glow */}
            <div
              className="absolute animate-ping"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                opacity: 0.3,
                animationDuration: "2s",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 20,
                height: 20,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(118,255,3,0.12) 0%, transparent 70%)",
              }}
            />
            {/* Label */}
            <span
              className="absolute text-[6px] font-bold tracking-widest text-primary/60"
              style={{ left: 6, top: 4 }}
            >
              SERV
            </span>
            <span
              className="absolute text-[6px] font-bold tracking-widest text-secondary/60"
              style={{ right: 6, bottom: 4 }}
            >
              CHIP
            </span>
          </div>

          {/* Pins */}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`pin-t-${i}`}
              className="absolute bg-primary/40"
              style={{
                top: -6,
                left: `${10 + i * 10}%`,
                width: 3,
                height: 6,
                borderRadius: "0 0 1px 1px",
                animation: `chip-pulse 2s ${i * 0.2}s ease-in-out infinite`,
              }}
            />
          ))}
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={`pin-b-${i}`}
              className="absolute bg-primary/40"
              style={{
                bottom: -6,
                left: `${10 + i * 10}%`,
                width: 3,
                height: 6,
                borderRadius: "1px 1px 0 0",
                animation: `chip-pulse 2s ${i * 0.2 + 0.5}s ease-in-out infinite`,
              }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`pin-l-${i}`}
              className="absolute bg-primary/30"
              style={{
                left: -5,
                top: `${14 + i * 18}%`,
                width: 5,
                height: 3,
                borderRadius: "0 1px 1px 0",
                animation: `chip-pulse 2s ${i * 0.3}s ease-in-out infinite`,
              }}
            />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={`pin-r-${i}`}
              className="absolute bg-primary/30"
              style={{
                right: -5,
                top: `${14 + i * 18}%`,
                width: 5,
                height: 3,
                borderRadius: "1px 0 0 1px",
                animation: `chip-pulse 2s ${i * 0.3 + 0.3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Orbit rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="65"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.3"
          opacity="0.15"
          style={{
            animation: autoRotate ? "orbit-spin 12s linear infinite" : "none",
          }}
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="0.2"
          opacity="0.1"
          style={{
            animation: autoRotate
              ? "orbit-spin 16s linear infinite reverse"
              : "none",
          }}
        />
      </svg>

      {/* Hint */}
      {autoRotate && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-3 py-1.5 rounded-full bg-surface/80 border border-primary/20">
          <Eye className="w-3 h-3 text-primary" />
          <span className="text-[10px] text-text-dim">Interactive view</span>
          <ZoomIn className="w-3 h-3 text-text-dim" />
        </div>
      )}

      <style jsx>{`
        @keyframes chip-float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        @keyframes chip-spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes chip-pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes orbit-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export function HeroChipScene() {
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(var(--primary) 1px, transparent 1px),
            linear-gradient(90deg, var(--primary) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating chip */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          animation: "hero-chip-float 8s ease-in-out infinite",
        }}
      >
        <div className="relative">
          <div className="w-36 h-24 rounded-2xl bg-gradient-to-br from-surface-2 to-surface border-2 border-primary/30 relative overflow-hidden shadow-2xl shadow-primary/20">
            <div
              className="absolute inset-3 rounded-lg border border-primary/20"
              style={{
                background: `
                  linear-gradient(rgba(118,255,3,0.08) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(118,255,3,0.08) 1px, transparent 1px)
                `,
                backgroundSize: "8px 8px",
              }}
            />
            <div
              className="absolute animate-ping opacity-30"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 16,
                height: 16,
                borderRadius: "50%",
                backgroundColor: "var(--primary)",
                animationDuration: "2.5s",
              }}
            />
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 28,
                height: 28,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(118,255,3,0.15) 0%, transparent 70%)",
              }}
            />
            <span
              className="absolute text-[7px] font-bold tracking-[0.15em] text-primary/50"
              style={{ left: 8, top: 5 }}
            >
              SERV
            </span>
            <span
              className="absolute text-[7px] font-bold tracking-[0.15em] text-secondary/50"
              style={{ right: 8, bottom: 5 }}
            >
              CHIP
            </span>
          </div>

          {/* Pins */}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`hp-${i}`}
              className="absolute bg-primary/40"
              style={{
                top: -7,
                left: `${7 + i * 9}%`,
                width: 3,
                height: 7,
                borderRadius: "0 0 1px 1px",
                animation: `hero-pulse 2.5s ${i * 0.15}s ease-in-out infinite`,
              }}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={`hb-${i}`}
              className="absolute bg-primary/40"
              style={{
                bottom: -7,
                left: `${7 + i * 9}%`,
                width: 3,
                height: 7,
                borderRadius: "1px 1px 0 0",
                animation: `hero-pulse 2.5s ${i * 0.15 + 0.6}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Orbital rings */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.3"
          opacity="0.12"
          style={{ animation: "hero-orbit 15s linear infinite" }}
        />
        <circle
          cx="100"
          cy="100"
          r="75"
          fill="none"
          stroke="var(--secondary)"
          strokeWidth="0.2"
          opacity="0.08"
          style={{ animation: "hero-orbit 20s linear infinite reverse" }}
        />
      </svg>

      <style jsx>{`
        @keyframes hero-chip-float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0);
          }
          33% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
          66% {
            transform: translate(-50%, -50%) translateY(5px);
          }
        }
        @keyframes hero-pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        @keyframes hero-orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
