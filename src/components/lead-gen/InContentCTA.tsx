"use client";

import { AppLink as Link } from "@/components/ui/AppLink";
import { ArrowRight } from "lucide-react";

interface InContentCTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
}

export function InContentCTA({
  title,
  description,
  buttonText,
  buttonHref,
}: InContentCTAProps) {
  return (
    <div className="relative my-10 rounded-2xl p-[1px] gradient-border">
      <div className="bg-surface rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-text mb-2">{title}</h3>
        <p className="text-sm text-text-muted mb-5 leading-relaxed max-w-xl">
          {description}
        </p>
        <Link
          href={buttonHref}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-bg-dark font-semibold text-sm rounded-lg hover:bg-primary-dark neon-glow transition-transform duration-200 hover:scale-[1.02]"
        >
          {buttonText}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
