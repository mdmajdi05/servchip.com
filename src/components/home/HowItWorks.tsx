"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { HOW_IT_WORKS_STEPS } from "@/data/home";

export function HowItWorks() {
  return (
    <section className="py-20 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeading
          label="How It Works"
          title="Get Your Chips in 3 Simple Steps"
          align="center"
        />

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-px bg-gradient-to-r from-primary/0 via-primary/40 to-primary/0" />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="text-center relative"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-surface border-2 border-primary/20 flex items-center justify-center mb-5 relative z-10">
                <span className="text-2xl font-black text-primary">
                  {step.number}
                </span>
              </div>
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-text mb-2">{step.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed max-w-xs mx-auto">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/rfq">
            <Button variant="solid" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
              Start Your Order
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
