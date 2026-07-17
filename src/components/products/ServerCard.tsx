"use client";

import Link from "next/link";
import { Server } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Tilt3D } from "@/components/ui/Tilt3D";
import type { ServerProduct } from "@/types";

const statusStyles: Record<
  ServerProduct["status"],
  { label: string; variant: "green" | "cyan" | "amber" | "purple" | "default" }
> = {
  in_stock: { label: "In Stock", variant: "green" },
  on_order: { label: "On Order", variant: "cyan" },
  limited: { label: "Limited", variant: "amber" },
  pre_order: { label: "Pre-Order", variant: "purple" },
  discontinued: { label: "Discontinued", variant: "default" },
};

interface Props {
  server: ServerProduct;
}

export function ServerCard({ server }: Props) {
  const status = statusStyles[server.status];

  return (
    <div>
      <Tilt3D>
        <div className="bg-surface border border-primary/40 rounded-xl p-5 hover:border-primary hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
          <div className="w-full h-48 bg-gradient-to-br from-surface-2 to-bg-dark rounded-lg border border-border mb-4 flex items-center justify-center overflow-hidden">
            {server.images && server.images.length > 0 ? (
              <img
                src={server.images[0]}
                alt={server.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <Server className="w-16 h-16 text-primary/30" />
            )}
          </div>

          <div className="mb-1">
            <Badge variant={status.variant} size="sm">
              {status.label}
            </Badge>
          </div>
          <h3 className="text-sm font-bold text-text leading-tight mb-2 line-clamp-1">
            {server.name}
          </h3>
          <p className="text-xs text-text-dim mb-3 line-clamp-2">
            {server.description}
          </p>

          <div className="space-y-1 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">Form Factor</span>
              <span className="text-text-muted font-mono text-[11px]">
                {server.formFactor}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">GPU</span>
              <span className="text-text-muted font-mono text-[11px]">
                {server.gpuSupport}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-text-dim">CPU</span>
              <span className="text-text-muted font-mono text-[11px]">
                {server.cpuOptions}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <Link href={`/products/${server.slug}`} className="flex-1">
              <Button variant="outline" size="sm" fullWidth>
                Details
              </Button>
            </Link>
            <Link href={`/rfq?chip=${server.slug}`} className="flex-1">
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
