"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { COMPARISON_CHIPS } from "@/data/home";
import { cn } from "@/lib/utils";

const badgeEmojis: Record<string, string> = {
  Popular: "🏆",
  Latest: "🆕",
  Flagship: "🔥",
};

const badgeVariantMap: Record<string, "green" | "cyan" | "purple"> = {
  Popular: "green",
  Latest: "cyan",
  Flagship: "purple",
};

export function ComparisonPreview() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Compare Chips"
          title="Find the Perfect Chip for Your Workload"
          align="center"
        />

        <div className="grid lg:grid-cols-3 gap-6">
          {COMPARISON_CHIPS.map((chip) => (
            <div
              key={chip.name}
              className="bg-surface rounded-xl p-6 border border-border-subtle shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:-translate-y-1"
            >
              <h3 className="font-bold text-lg text-text pb-3 border-b border-border-subtle mb-4">
                {chip.name}
              </h3>

              {Object.entries(chip.specs).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-2 text-sm border-b border-border-subtle last:border-b-0"
                >
                  <span className="text-text-muted capitalize">{key}</span>
                  <span
                    className={cn(
                      "font-mono text-sm font-medium",
                      chip.winner ? "text-primary" : "text-text"
                    )}
                  >
                    {value}
                  </span>
                </div>
              ))}

              <div className="mt-4">
                <Badge variant={badgeVariantMap[chip.badge] ?? "green"} size="sm">
                  {badgeEmojis[chip.badge] ?? ""} {chip.badge}
                </Badge>
              </div>

              <div className="mt-4">
                <Link href="/rfq">
                  <Button variant="solid" size="sm" fullWidth>
                    Get Quote
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href="/comparison"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-text rounded-lg border border-primary hover:bg-primary/10 hover:neon-glow transition-all duration-200"
          >
            Use Full Comparison Tool <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
