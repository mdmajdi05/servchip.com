"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl lg:text-4xl font-black text-text leading-tight mb-8">
          Browse by Chip Category
        </h1>
        <SectionHeading
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
