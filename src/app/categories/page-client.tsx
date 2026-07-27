"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          level="h1"
          label="Categories"
          title="Browse by Chip Category"
          subtitle="Find the perfect chip for your workload from our extensive catalog"
          align="center"
        />
        <CategoriesGrid />
      </div>
    </div>
  );
}
