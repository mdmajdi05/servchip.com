"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
  index?: number;
}

export function ChipCard({ chip, index = 0 }: ChipCardProps) {
  const status = statusStyles[chip.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Tilt3D>
        <div className="bg-surface border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
          {/* Chip visual */}
          <div className="w-full h-36 bg-gradient-to-br from-surface-2 to-bg-dark rounded-lg border border-border mb-4 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-12 mx-auto bg-gradient-to-br from-bg-dark to-surface-2 rounded border border-primary/20 flex items-center justify-center">
                <span className="text-[7px] text-primary font-mono tracking-widest">
                  {chip.series}
                </span>
              </div>
              <div className="flex gap-1 justify-center mt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-1 h-2.5 bg-primary/30 rounded-sm" />
                ))}
              </div>
            </div>
          </div>

          <div className="mb-1">
            <Badge variant={status.variant} size="sm">{status.label}</Badge>
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
              <span className="text-text-muted font-mono text-[11px]">{chip.specifications.memory}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">TDP</span>
              <span className="text-text-muted font-mono text-[11px]">{chip.specifications.tdp}</span>
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
    </motion.div>
  );
}
