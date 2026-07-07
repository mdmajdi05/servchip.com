"use client";

import { useEffect, useState } from "react";

interface AnimatedLogoProps {
  size?: number;
  showText?: boolean;
  textClassName?: string;
}

export function AnimatedLogo({
  size = 220, // Real texture ke liye thoda bada size default rakha hai
  showText = false,
  textClassName = "",
}: AnimatedLogoProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  if (!mounted) return null;

  const s = size;

  return (
    <div className="flex items-center gap-2 group select-none">
      {/* 3D Isometric Wrapper */}
      <div
        className="relative transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ width: s, height: s, perspective: "800px" }}
      >
        {/* Outer Tech Glow Ring */}
        <div
          className="absolute inset-[-10%] rounded-full bg-cyan-500/10 blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"
          style={{ animation: "processor-pulse 4s ease-in-out infinite" }}
        />

        {/* The Processor SVG */}
        <svg
          className="w-full h-full drop-shadow-[0_20px_35px_rgba(0,0,0,0.6)]"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Gradients Definition */}
          <defs>
            <linearGradient
              id="substrateGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1E222B" />
              <stop offset="50%" stopColor="#151821" />
              <stop offset="100%" stopColor="#0B0C10" />
            </linearGradient>

            <linearGradient id="metalIHS" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3A3F4D" />
              <stop offset="30%" stopColor="#282C34" />
              <stop offset="70%" stopColor="#1E222B" />
              <stop offset="100%" stopColor="#14161D" />
            </linearGradient>

            <linearGradient id="goldCap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFE293" />
              <stop offset="100%" stopColor="#B38938" />
            </linearGradient>

            <radialGradient id="centerCoreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6EFF00" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* 1. Base Substrate (Main PCB Board) */}
          <rect
            x="15"
            y="15"
            width="170"
            height="170"
            rx="16"
            fill="url(#substrateGrad)"
            stroke="#2C313D"
            strokeWidth="2"
          />

          {/* Outer Circuit Traces / Corner Accents */}
          <path
            d="M 25 40 L 40 25 M 175 40 L 160 25 M 25 160 L 40 175 M 175 160 L 160 175"
            stroke="#3F4756"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* 2. Outer Gold Pins / Capacitors (Top & Bottom rows) */}
          {[...Array(9)].map((_, i) => {
            const xPos = 35 + i * 16;
            return (
              <g key={i}>
                {/* Top Pins */}
                <rect
                  x={xPos}
                  y={8}
                  width="8"
                  height="6"
                  rx="1"
                  fill="url(#goldCap)"
                  opacity="0.8"
                />
                <line
                  x1={xPos + 4}
                  y1="14"
                  x2={xPos + 4}
                  y2="22"
                  stroke="#4F586A"
                  strokeWidth="1"
                />
                {/* Bottom Pins */}
                <rect
                  x={xPos}
                  y={186}
                  width="8"
                  height="6"
                  rx="1"
                  fill="url(#goldCap)"
                  opacity="0.8"
                />
                <line
                  x1={xPos + 4}
                  y1="186"
                  x2={xPos + 4}
                  y2="178"
                  stroke="#4F586A"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* Left & Right Pins */}
          {[...Array(9)].map((_, i) => {
            const yPos = 35 + i * 16;
            return (
              <g key={i}>
                {/* Left Pins */}
                <rect
                  x={8}
                  y={yPos}
                  width="6"
                  height="8"
                  rx="1"
                  fill="url(#goldCap)"
                  opacity="0.8"
                />
                <line
                  x1="14"
                  y1={yPos + 4}
                  x2="22"
                  y2={yPos + 4}
                  stroke="#4F586A"
                  strokeWidth="1"
                />
                {/* Right Pins */}
                <rect
                  x={186}
                  y={yPos}
                  width="6"
                  height="8"
                  rx="1"
                  fill="url(#goldCap)"
                  opacity="0.8"
                />
                <line
                  x1="186"
                  y1={yPos + 4}
                  x2="178"
                  y2={yPos + 4}
                  stroke="#4F586A"
                  strokeWidth="1"
                />
              </g>
            );
          })}

          {/* 3. Integrated Heat Spreader (Metallic Inner Ring) */}
          <rect
            x="42"
            y="42"
            width="116"
            height="116"
            rx="12"
            fill="url(#metalIHS)"
            stroke="#111"
            strokeWidth="3"
          />
          <rect
            x="45"
            y="45"
            width="110"
            height="110"
            rx="10"
            fill="none"
            stroke="#5A6375"
            strokeWidth="1"
            opacity="0.5"
          />

          {/* Metallic Corner Screws/Pins */}
          <circle cx="52" cy="52" r="3" fill="#7A8599" />
          <circle cx="148" cy="52" r="3" fill="#7A8599" />
          <circle cx="52" cy="148" r="3" fill="#7A8599" />
          <circle cx="148" cy="148" r="3" fill="#7A8599" />

          {/* 4. Central Die / Silicon Core (The Glowing Center) */}
          <rect
            x="68"
            y="68"
            width="64"
            height="64"
            rx="6"
            fill="#090A0F"
            stroke="#6EFF00"
            strokeWidth="2.5"
          />
          <rect
            x="68"
            y="68"
            width="64"
            height="64"
            fill="url(#centerCoreGlow)"
          />

          {/* Micro-Circuit Engraving Lines inside the Die */}
          <path
            d="M 76 80 H 124 M 76 92 H 124 M 76 108 H 124 M 76 120 H 124"
            stroke="#00E5FF"
            strokeWidth="0.5"
            opacity="0.2"
          />
          <path
            d="M 84 72 V 128 M 96 72 V 128 M 104 72 V 128 M 116 72 V 128"
            stroke="#6EFF00"
            strokeWidth="0.5"
            opacity="0.2"
          />

          {/* Center Branding Monogram on Core */}
          <text
            x="100"
            y="104"
            textAnchor="middle"
            fontFamily="system-ui, sans-serif"
            fontWeight="900"
            fontSize="24"
            letterSpacing="-1"
          >
            <tspan fill="#6EFF00">S</tspan>
            <tspan fill="#00E5FF">C</tspan>
          </text>

          {/* Laser-Etched Text on Metal IHS */}
          <text
            x="100"
            y="60"
            textAnchor="middle"
            fill="#8A95A5"
            fontFamily="monospace"
            fontWeight="700"
            fontSize="7"
            letterSpacing="1.5"
          >
            SERVCHIP SYSTEMS
          </text>

          <text
            x="100"
            y="142"
            textAnchor="middle"
            fill="#5A6375"
            fontFamily="monospace"
            fontWeight="600"
            fontSize="5"
            letterSpacing="1"
          >
            POWERING AI • MULTI-THREAD
          </text>

          {/* Glowing Node Indicators (Four Neon Corner Lights) */}
          <circle
            cx="74"
            cy="74"
            r="1.5"
            fill="#00E5FF"
            className="animate-pulse"
          />
          <circle cx="126" cy="74" r="1.5" fill="#6EFF00" />
          <circle cx="74" cy="126" r="1.5" fill="#6EFF00" />
          <circle
            cx="126"
            cy="126"
            r="1.5"
            fill="#00E5FF"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Typography Block */}
      {showText && (
        <div className="flex flex-col leading-none">
          <span
            className={`font-black tracking-tight ${textClassName || "text-text group-hover:text-primary transition-colors duration-300"}`}
            style={{ fontSize: s * 0.42 }}
          >
            SERV<span className="text-primary">CHIP</span>
          </span>
          <span className="text-[9px] font-mono text-text-dim tracking-widest">
            NVIDIA COMPUTING
          </span>
        </div>
      )}

      {/* Keyframes injected once */}
      <style jsx>{`
        @keyframes logo-breathe {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }
        @keyframes logo-glow-pulse {
          0%,
          100% {
            text-shadow:
              0 0 15px rgba(118, 255, 3, 0.4),
              0 0 30px rgba(118, 255, 3, 0.2);
          }
          50% {
            text-shadow:
              0 0 25px rgba(118, 255, 3, 0.6),
              0 0 50px rgba(118, 255, 3, 0.3),
              0 0 80px rgba(118, 255, 3, 0.1);
          }
        }
      `}</style>
    </div>
  );
}
