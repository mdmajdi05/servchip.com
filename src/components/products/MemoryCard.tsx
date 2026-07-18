"use client";

import Link from "next/link";
import { MemoryStick } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tilt3D } from "@/components/ui/Tilt3D";
import type { MemoryProduct } from "@/types";

const statusStyles: Record<
  MemoryProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};

interface Props {
  mem: MemoryProduct;
  index?: number;
}

export function MemoryCard({ mem, index: _index }: Props) {
  const status = statusStyles[mem.status];

  return (
    <div>
      <Tilt3D>
        <div className="bg-surface border border-primary/40 rounded-xl p-5 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
          <div className="w-full h-48 bg-gradient-to-br from-surface-2 to-bg-dark rounded-lg border border-border mb-4 flex items-center justify-center overflow-hidden">
            {mem.images && mem.images.length > 0 ? (
              <img
                src={mem.images[0]}
                alt={mem.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <MemoryStick className="w-16 h-16 text-primary/30" />
            )}
          </div>

          <div className="mb-1">
            <Badge variant={status.variant} size="sm">
              {status.label}
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-text leading-tight mb-2 line-clamp-1">
            {mem.name}
          </h3>
          <p className="text-xs text-text-dim mb-3 line-clamp-2">
            {mem.description}
          </p>

          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Type</span>
              <span className="text-text-muted font-mono text-[11px]">
                {mem.specs.type}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Capacity</span>
              <span className="text-text-muted font-mono text-[11px]">
                {mem.specs.capacity}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Speed</span>
              <span className="text-text-muted font-mono text-[11px]">
                {mem.specs.speed}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/products/${mem.slug}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                Details
              </Button>
            </Link>
            <Link href={`/rfq?chip=${mem.slug}`} className="flex-1">
              <Button variant="solid" size="sm" fullWidth>
                Get Quote
              </Button>
            </Link>
          </div>
        </div>
      </Tilt3D>
    </div>
  );
}
