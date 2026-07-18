"use client";

import { CHIPS, FEATURED_CHIP_IDS } from "@/data/chips";
import { ChipCard } from "@/components/chips/ChipCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SkeletonCard } from "@/components/ui/Skeleton";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export function FeaturedChips() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const featured = CHIPS.filter((c) => FEATURED_CHIP_IDS.includes(c.id));

  return (
    <section className="py-20 bg-bg-body">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Featured Products"
          title="Buy Enterprise AI Chips & Accelerators"
          subtitle="Authentic NVIDIA, AMD & Intel chips for AI training, inference, HPC & data center workloads — from an ISO 9001 certified distributor"
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
            : featured.map((chip) => <ChipCard key={chip.id} chip={chip} />)}
        </div>

        <div className="text-center mt-10">
          <Link href="/products">
            <Button
              variant="outline"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
