"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Brain, Zap, Server, Monitor, Radio } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { getProductsByUseCase } from "@/data/products";
import { getManufacturerColor } from "@/data/manufacturer-colors";
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
  const mfrColor = getManufacturerColor(product.manufacturer);

  return (
    <motion.div
      key={product.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link
        href={`/products/${product.slug}`}
        className="block bg-surface border border-border rounded-xl p-5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group h-full"
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
        <h3 className="text-sm font-bold text-text mb-1.5 group-hover:text-primary transition-colors line-clamp-2">
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
    </motion.div>
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
          title="Enterprise AI Chips Matched to Your Workload"
          subtitle="Browse NVIDIA, AMD & Intel products optimized for AI training, inference, HPC, data center & edge computing"
          align="center"
        />

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {WORKLOADS.map((w) => {
            const Icon = w.icon;
            const isActive = activeTab === w.id;
            return (
              <motion.button
                key={w.id}
                onClick={() => setActiveTab(w.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-bg-dark shadow-lg"
                    : "text-text-muted border border-border bg-surface hover:border-primary/30 hover:text-text"
                }`}
                style={isActive ? { backgroundColor: w.color } : {}}
              >
                <Icon className="w-4 h-4" />
                {w.label}
              </motion.button>
            );
          })}
        </div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
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
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-8">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"
          >
            Browse All Products <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
