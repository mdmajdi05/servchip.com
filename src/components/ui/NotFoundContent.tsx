"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function NotFoundContent() {
  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="text-6xl font-black text-primary mb-4 font-mono">
          404
        </div>
        <h1 className="text-2xl font-bold text-text mb-2">Page Not Found</h1>
        <p className="text-text-muted text-sm mb-6 max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="solid" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
