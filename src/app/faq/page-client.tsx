"use client";
import { AppLink as Link } from "@/components/ui/AppLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
interface FAQItem {
  q: string;
  a: string;
}
export default function FAQPage({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div className="min-h-screen bg-bg-dark">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading
          level="h1"
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Enterprise chip purchasing, semiconductor procurement, shipping, warranty & support"
          align="center"
        />
        <div className="space-y-4 mt-10">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="bg-surface border border-border rounded-xl p-5 group"
            >
              <summary className="text-text text-sm font-semibold cursor-pointer list-none flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-primary text-xs ml-2 shrink-0 group-open:rotate-45 transition-transform">
                  +
                </span>
              </summary>
              <p className="text-text-muted text-sm mt-3 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-text-dim text-sm mb-4">
            Still have questions about enterprise chip procurement?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-bg-dark text-sm font-bold rounded-lg hover:bg-primary-dark transition-transform"
            >
              Contact Our Chip Experts
            </Link>
            <Link
              href="/rfq"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary/40 text-primary text-sm font-bold rounded-lg hover:bg-primary/10 transition-transform"
            >
              Submit an RFQ for Volume Pricing
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-muted text-sm font-bold rounded-lg hover:text-text hover:border-primary/30 transition-transform"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
