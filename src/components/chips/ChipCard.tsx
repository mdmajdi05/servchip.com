"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tilt3D } from "@/components/ui/Tilt3D";
import type { ChipProduct } from "@/types";

const statusStyles: Record<
  ChipProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};

interface ChipCardProps {
  chip: ChipProduct;
}

export const ChipCard = React.memo(function ChipCard({ chip }: ChipCardProps) {
  const status = statusStyles[chip.status];

  return (
    <div>
      <Tilt3D>
        <div className="bg-surface border border-primary/40 rounded-xl p-5 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
          {/* Chip visual - Product image or Processor SVG fallback */}
          <div className="w-full h-48 bg-gradient-to-br from-surface-2 to-bg-dark rounded-lg border border-border mb-4 flex items-center justify-center overflow-hidden">
            {chip.images && chip.images.length > 0 ? (
              <img
                src={chip.images[0]}
                alt={chip.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <svg viewBox="0 0 200 200" className="w-32 h-32 drop-shadow-lg">
                <defs>
                  <linearGradient
                    id="subGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1E222B" />
                    <stop offset="100%" stopColor="#0B0C10" />
                  </linearGradient>
                  <linearGradient
                    id="metalGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#3A3F4D" />
                    <stop offset="100%" stopColor="#14161D" />
                  </linearGradient>
                  <linearGradient
                    id="goldGrad"
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#FFE293" />
                    <stop offset="100%" stopColor="#B38938" />
                  </linearGradient>
                  <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#6EFF00" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect
                  x="15"
                  y="15"
                  width="170"
                  height="170"
                  rx="16"
                  fill="url(#subGrad)"
                  stroke="#2C313D"
                  strokeWidth="2"
                />
                {[...Array(7)].map((_, i) => {
                  const p = 38 + i * 20;
                  return (
                    <g key={i}>
                      <rect
                        x={p}
                        y={7}
                        width="8"
                        height="5"
                        rx="1"
                        fill="url(#goldGrad)"
                        opacity="0.8"
                      />
                      <rect
                        x={p}
                        y={188}
                        width="8"
                        height="5"
                        rx="1"
                        fill="url(#goldGrad)"
                        opacity="0.8"
                      />
                      <rect
                        x={7}
                        y={p}
                        width="5"
                        height="8"
                        rx="1"
                        fill="url(#goldGrad)"
                        opacity="0.8"
                      />
                      <rect
                        x={188}
                        y={p}
                        width="5"
                        height="8"
                        rx="1"
                        fill="url(#goldGrad)"
                        opacity="0.8"
                      />
                    </g>
                  );
                })}
                <rect
                  x="42"
                  y="42"
                  width="116"
                  height="116"
                  rx="12"
                  fill="url(#metalGrad)"
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
                <circle cx="52" cy="52" r="3" fill="#7A8599" />
                <circle cx="148" cy="52" r="3" fill="#7A8599" />
                <circle cx="52" cy="148" r="3" fill="#7A8599" />
                <circle cx="148" cy="148" r="3" fill="#7A8599" />
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
                  fill="url(#coreGlow)"
                />
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
                <text
                  x="100"
                  y="106"
                  textAnchor="middle"
                  fontFamily="system-ui, sans-serif"
                  fontWeight="900"
                  fontSize="22"
                  letterSpacing="-1"
                >
                  <tspan fill="#6EFF00">{chip.series.slice(0, 1)}</tspan>
                  <tspan fill="#00E5FF">{chip.series.slice(1)}</tspan>
                </text>
                <text
                  x="100"
                  y="58"
                  textAnchor="middle"
                  fill="#8A95A5"
                  fontFamily="monospace"
                  fontWeight="700"
                  fontSize="6"
                  letterSpacing="1.5"
                >
                  {chip.series}
                </text>
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
            )}
          </div>

          <div className="mb-1">
            <Badge variant={status.variant} size="sm">
              {status.label}
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-text leading-tight mb-2 line-clamp-1">
            {chip.name}
          </h3>
          <p className="text-xs text-text-dim mb-3 line-clamp-2">
            {chip.description}
          </p>

          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Architecture</span>
              <span className="text-text-muted">{chip.architecture}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Memory</span>
              <span className="text-text-muted font-mono text-[11px]">
                {chip.specifications.memory}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">TDP</span>
              <span className="text-text-muted font-mono text-[11px]">
                {chip.specifications.tdp}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/products/${chip.slug}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                Details
              </Button>
            </Link>
            <Link href={`/rfq?chip=${chip.slug}`} className="flex-1">
              <Button variant="solid" size="sm" fullWidth>
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </Tilt3D>
    </div>
  );
});
