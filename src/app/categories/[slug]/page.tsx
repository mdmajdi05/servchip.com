"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Server } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { ChipGrid } from "@/components/chips/ChipGrid";
import { CHIPS } from "@/data/chips";
import { CATEGORIES } from "@/data/categories";

export default function CategoryDetailPage() {
  const { slug } = useParams<{ slug: string }>();

  const category = CATEGORIES.find((c) => c.slug === slug);
  const categoryChips = CHIPS.filter((chip) => chip.categoryId === category?.id);

  if (!category) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <Server className="w-16 h-16 text-text-dim mb-6" />
            <h1 className="text-2xl font-bold text-text mb-2">Category Not Found</h1>
            <p className="text-text-muted text-sm mb-8 max-w-md">
              The chip category you are looking for does not exist or may have been moved.
            </p>
            <Link
              href="/categories"
              className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary-dark transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Categories
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-text-dim mb-8 pt-4"
        >
          <Link href="/categories" className="hover:text-primary transition-colors">
            Categories
          </Link>
          <span className="text-text-dim">/</span>
          <span className="text-text">{category.name}</span>
        </motion.nav>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <SectionHeading
            label={category.name}
            title={category.name}
            subtitle={category.description}
            align="left"
          />
          <div className="flex items-center gap-3">
            <Badge variant="green" size="md">
              <Server className="w-3 h-3 mr-1" />
              {categoryChips.length} {categoryChips.length === 1 ? "Chip" : "Chips"}
            </Badge>
          </div>
        </motion.div>

        {/* Chip Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pb-20"
        >
          <ChipGrid chips={categoryChips} />
        </motion.div>
      </div>
    </div>
  );
}
