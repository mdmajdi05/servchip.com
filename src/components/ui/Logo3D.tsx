"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Logo3D() {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <Link
      ref={ref}
      href="/"
      className="group relative flex items-center gap-3"
    >
      {/* 3D Logo Box */}
      <div className="relative perspective-[800px]">
        <motion.div
          className="relative w-10 h-10 preserve-3d cursor-pointer"
          whileHover={{ rotateY: 180, rotateX: 10 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front face */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/40 flex items-center justify-center"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-primary text-sm font-black tracking-tighter">S</span>
            <div className="absolute inset-0 rounded-xl ring-1 ring-primary/20" />
          </div>

          {/* Back face */}
          <div
            className="absolute inset-0 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 border border-secondary/40 flex items-center justify-center"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-secondary text-sm font-black tracking-tighter">C</span>
          </div>

          {/* Glow aura */}
          <div className="absolute -inset-2 rounded-2xl bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Pins decoration */}
        <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 flex gap-[2px]">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] h-[6px] rounded-[1px] bg-primary/40"
              style={{ opacity: 0.3 + i * 0.15 }}
            />
          ))}
        </div>
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-text font-black text-sm tracking-tight">
          SERV<span className="text-primary">CHIP</span>
        </span>
        <span className="text-[9px] text-text-dim tracking-[0.2em] uppercase font-medium">
          Premium Distributor
        </span>
      </div>
    </Link>
  );
}
