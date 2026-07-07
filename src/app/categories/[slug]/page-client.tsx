"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Category"
          title={slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          subtitle="Browse all chips in this category"
          align="center"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-text-dim text-sm mt-10"
        >
          Category detail page with filtered product grid is under development.
        </motion.p>
      </div>
    </div>
  );
}
