"use client";

import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function FinalCTA() {
  return (
    <section className="py-24 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0" />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
            Ready to{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Power Your Next Project
            </span>
            ?
          </h2>
          <p className="text-text-muted text-sm md:text-base mb-8 max-w-2xl mx-auto">
            Get authentic enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon
            & Gaudi 3 — delivered fast with semiconductor procurement support
            across all brands. No minimum order quantity. Request a quote today
            and our certified engineers will respond within 24 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/rfq">
              <Button
                variant="solid"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Request a Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                icon={<MessageSquare className="w-4 h-4" />}
              >
                Talk to an Expert
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-text-dim">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              100% Authentic Products
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Enterprise-Grade Support
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              Ships to 150+ Countries
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
