"use client";

import { CHIPS } from "@/data/chips";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChipGrid } from "@/components/chips/ChipGrid";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Products"
          title="All NVIDIA Products"
          subtitle="Browse our complete catalog of authentic NVIDIA chips and accelerators"
          align="center"
        />
        <div className="mt-10">
          <ChipGrid chips={CHIPS} />
        </div>
      </div>
    </div>
  );
}
