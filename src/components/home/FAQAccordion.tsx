"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  ArrowRight,
  Phone,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ_CATEGORIES } from "@/data/home";
export function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;
  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <section className="py-20 bg-bg-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-dot-grid opacity-10" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Quick answers on enterprise chips, pricing, warranty, delivery, and technical support."
          align="center"
        />
        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-transform duration-200 ${
                  isActive
                    ? "bg-primary text-bg-dark shadow-lg shadow-primary/25"
                    : "bg-surface border border-border text-text-muted hover:border-primary/30 hover:text-text"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
        {/* FAQ Items */}
        <div key={activeCategory} className="space-y-3">
          {currentCategory.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.question}
                className={`rounded-xl border overflow-hidden transition-transform duration-200 ${
                  isOpen
                    ? "border-primary/40 bg-surface shadow-lg shadow-primary/5"
                    : "border-border bg-surface hover:border-primary/20 hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-transform"
                >
                  <span className="text-sm font-semibold text-text flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform ${
                        isOpen ? "bg-primary/20" : "bg-primary/10"
                      }`}
                    >
                      <HelpCircle
                        className={`w-3.5 h-3.5 transition-transform ${
                          isOpen ? "text-primary" : "text-primary/80"
                        }`}
                      />
                    </span>
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-transform ${
                      isOpen ? "bg-primary/20" : "bg-border/50"
                    }`}
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform ${
                        isOpen ? "text-primary" : "text-text-dim"
                      }`}
                    />
                  </div>
                </button>
                {isOpen && (
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5 pt-0">
                      <div className="pl-10 pr-4">
                        <div className="w-full h-px bg-gradient-to-r from-primary/30 via-primary/10 to-transparent mb-3" />
                        <p className="text-sm text-text-muted leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* Can't Find Your Answer CTA */}
        <div className="mt-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/[0.02] to-transparent rounded-2xl" />
          <div className="relative rounded-2xl border border-primary/20 bg-surface/50 backdrop-blur-sm p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-text mb-2">
              Can&apos;t Find Your Answer?
            </h3>
            <p className="text-sm text-text-muted mb-6 max-w-md mx-auto">
              Our team responds within 30 minutes during business hours.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/rfq"
                className="inline-flex items-center gap-2 bg-primary text-bg-dark px-5 py-2.5 rounded-xl font-semibold text-sm hover:scale-105 transition-transform shadow-lg shadow-primary/25"
              >
                Send Enquiry <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border bg-surface text-text px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-primary/30 hover:text-primary transition-transform"
              >
                <Phone className="w-4 h-4" />
                Talk to Sales
              </Link>
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 border border-border bg-surface text-text px-5 py-2.5 rounded-xl font-semibold text-sm hover:border-primary/30 hover:text-primary transition-transform"
              >
                <HelpCircle className="w-4 h-4" />
                View Full FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
