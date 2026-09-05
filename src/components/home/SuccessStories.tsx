"use client";

import { useState } from "react";
import Image from "next/image";

import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/home";

export function SuccessStories() {
  const [failedAvatars, setFailedAvatars] = useState<Set<string>>(new Set());

  return (
    <section className="py-20 bg-bg-body">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Client Stories"
          title="Trusted by Industry Leaders Worldwide"
          subtitle="Hear from enterprises who source their AI chips and data center hardware through Servchip"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author.name}
              className="bg-surface border border-border rounded-xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-text-muted text-sm leading-relaxed mb-5">
                {t.content}
              </p>
              <div className="flex items-center gap-3">
                {t.author.image && !failedAvatars.has(t.author.name) ? (
                  <Image
                    src={t.author.image}
                    alt={t.author.name}
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={() =>
                      setFailedAvatars((prev) =>
                        new Set(prev).add(t.author.name),
                      )
                    }
                    className="w-10 h-10 rounded-full object-cover border border-primary/20"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                    {t.author.avatar}
                  </div>
                )}
                <div>
                  <div className="text-text text-sm font-semibold">
                    {t.author.name}
                  </div>
                  <div className="text-text-dim text-xs">{t.author.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
