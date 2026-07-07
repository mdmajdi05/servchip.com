"use client";

import { motion } from "framer-motion";
import { Phone, Mail, ShieldCheck } from "lucide-react";

export function TopBar() {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="hidden lg:flex h-8 items-center justify-between px-4 sm:px-8 bg-gradient-to-r from-surface via-surface to-surface border-b border-border/50 text-[11px] text-text-dim relative z-10"
    >
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 hover:text-text transition-colors duration-200 cursor-pointer">
          <Phone className="w-3 h-3 text-primary/60" /> +91-XXXXXXXXXX
        </span>
        <span className="w-px h-3 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="flex items-center gap-1.5 hover:text-text transition-colors duration-200 cursor-pointer">
          <Mail className="w-3 h-3 text-primary/60" /> sales@servchip.com
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="relative flex w-[6px] h-[6px]">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
            <span className="relative rounded-full bg-primary w-[6px] h-[6px]" />
          </span>
          <span className="font-semibold text-primary/90">Official NVIDIA Partner</span>
        </span>
        <span className="w-px h-3 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="flex items-center gap-1 hover:text-text transition-colors duration-200 cursor-pointer">
          <span className="text-[10px]">🌍</span> Global Shipping
        </span>
        <span className="w-px h-3 bg-gradient-to-b from-transparent via-border to-transparent" />
        <span className="flex items-center gap-1 hover:text-text transition-colors duration-200 cursor-pointer">
          <ShieldCheck className="w-3 h-3 text-primary/60" /> ISO 9001 Certified
        </span>
      </div>
    </motion.div>
  );
}
