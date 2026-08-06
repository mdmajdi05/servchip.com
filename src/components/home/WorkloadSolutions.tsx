"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Server, Monitor, Radio } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { getProductsByUseCase } from "@/data/products";
import { getBrandColor } from "@/data/brand-colors";
import { isChipProduct, getProductTypeLabel } from "@/types";
import type { AnyProduct, ChipProduct } from "@/types";
const WORKLOADS = [
  {
    id: "ai-training",
    label: "AI Training",
    icon: Brain,
    desc: "Large-scale model training with GPU clusters and AI accelerators",
    color: "#76B900",
  },
  {
    id: "ai-inference",
    label: "AI Inference",
    icon: Zap,
    desc: "Real-time inference serving at scale with optimized hardware",
    color: "#00E5FF",
  },
  {
    id: "hpc",
    label: "HPC",
    icon: Server,
    desc: "High-performance computing for scientific simulations and research",
    color: "#7B2FBE",
  },
  {
    id: "virtualization",
    label: "Virtualization",
    icon: Monitor,
    desc: "Virtual desktop infrastructure and GPU virtualization",
    color: "#FF9900",
  },
  {
    id: "edge-computing",
    label: "Edge Computing",
    icon: Radio,
    desc: "Edge AI inference for IoT and industrial applications",
    color: "#E31837",
  },
];
function ProductChipSpecs({ product }: { product: ChipProduct }) {
  return (
    <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] font-mono text-text-dim">
      {product.specifications.memory && (
        <span>{product.specifications.memory}</span>
      )}
      {product.specifications.tdp && <span>{product.specifications.tdp}</span>}
    </div>
  );
}
function ProductCard({
  product,
  index,
}: {
  product: AnyProduct;
  index: number;
}) {
  const mfrColor = getBrandColor(product.manufacturer);
  return (
    <div key={product.id}>
      <Link
        href={`/products/${product.slug}`}
        className="block bg-surface border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-transform duration-300 group h-full"
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: mfrColor }}
          />
          <span className="text-[10px] font-mono font-semibold text-text-dim uppercase tracking-wider">
            {product.manufacturer}
          </span>
          <Badge variant="green" size="sm">
            {getProductTypeLabel(product)}
          </Badge>
        </div>
        <h3 className="text-sm font-bold text-text mb-1.5 group-hover:text-primary transition-transform line-clamp-2">
          {product.name}
        </h3>
        <p className="text-xs text-text-dim leading-relaxed line-clamp-2 mb-3">
          {product.description}
        </p>
        {isChipProduct(product) && <ProductChipSpecs product={product} />}
        <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
          <span className="text-[10px] font-mono text-text-dim">
            {product.bestFor}
          </span>
          <span className="text-primary text-xs font-semibold group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            View <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </Link>
    </div>
  );
}
export function WorkloadSolutions() {
  const [activeTab, setActiveTab] = useState(WORKLOADS[0].id);
  const products = useMemo(
    () => getProductsByUseCase(activeTab).slice(0, 6),
    [activeTab],
  );
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="By Workload"
          title="Which Enterprise Chip Fits Your Workload?"
          subtitle="AI training, inference, HPC, edge - pick your use case and we'll match you to the right accelerator"
          align="center"
        />
        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {WORKLOADS.map((w) => {
            const Icon = w.icon;
            const isActive = activeTab === w.id;
            return (
              <button
                key={w.id}
                onClick={() => setActiveTab(w.id)}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-transform duration-200 ${
                  isActive
                    ? "text-bg-dark shadow-lg"
                    : "text-text-muted border border-border bg-surface hover:border-primary/30 hover:text-text"
                }`}
                style={isActive ? { backgroundColor: w.color } : {}}
              >
                <Icon className="w-4 h-4" />
                {w.label}
              </button>
            );
          })}
        </div>
        {/* Products Grid */}
        <div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-dim text-sm">
                No products found for this workload.
              </p>
            </div>
          )}
        </div>
        <div className="text-center mt-8 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Browse All Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/solutions"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Explore Solutions <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
