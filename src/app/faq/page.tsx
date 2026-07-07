"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQS = [
  { q: "Are your NVIDIA chips authentic?", a: "Yes. We source directly from NVIDIA and authorized partners. Every chip includes full traceability documentation." },
  { q: "What is your minimum order quantity?", a: "There is no minimum order quantity. We serve startups to Fortune 500 enterprises." },
  { q: "How fast can you deliver?", a: "Standard orders ship within 5-7 business days. Express shipping available for urgent requirements." },
  { q: "Do you offer technical support?", a: "Yes. Our team of NVIDIA-certified engineers provides pre-sales consultation and post-sales support." },
  { q: "What payment methods do you accept?", a: "We accept wire transfers, Letters of Credit, and net terms for qualified enterprises." },
  { q: "Can I return a chip?", a: "Returns accepted within 30 days for unopened items. Defective items covered by manufacturer warranty." },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <div className="max-w-3xl mx-auto px-4">
        <SectionHeading
          label="FAQ"
          title="Frequently Asked Questions"
          subtitle="Common questions about our products, services, and processes"
          align="center"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4 mt-10"
        >
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl p-5">
              <h3 className="text-text text-sm font-semibold mb-2">{faq.q}</h3>
              <p className="text-text-muted text-sm">{faq.a}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
