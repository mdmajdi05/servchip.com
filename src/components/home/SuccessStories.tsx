"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/home";

export function SuccessStories() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="Client Stories"
          title="Trusted by Industry Leaders Worldwide"
          subtitle="Hear from our clients about their experience working with Servchip"
          align="center"
        />

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.author.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
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
                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold">
                  {t.author.avatar}
                </div>
                <div>
                  <div className="text-text text-sm font-semibold">{t.author.name}</div>
                  <div className="text-text-dim text-xs">{t.author.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
