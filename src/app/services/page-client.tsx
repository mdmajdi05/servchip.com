"use client";

import type { Variants } from "framer-motion";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Package,
  Search,
  Headphones,
  ShieldCheck,
  Wrench,
  Cpu,
  Building2,
  Gauge,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { STATS } from "@/data/home";

const SERVICES = [
  {
    icon: Truck,
    title: "Hardware Procurement",
    description:
      "End-to-end global sourcing for enterprise chips and AI accelerators with manufacturer-direct verification, secure logistics, and full compliance documentation across all major architectures.",
    points: [
      "Global sourcing network",
      "Manufacturer verification",
      "Secure logistics & insurance",
      "Full compliance docs",
    ],
  },
  {
    icon: Package,
    title: "Bulk & Wholesale",
    description:
      "Volume pricing for enterprises deploying at scale, with dedicated account management, tiered discount structures, and flexible delivery scheduling aligned to your project milestones.",
    points: [
      "Competitive volume pricing",
      "Dedicated account management",
      "Tiered discount structures",
      "Flexible delivery scheduling",
    ],
  },
  {
    icon: Search,
    title: "Hard-to-Find Parts",
    description:
      "Specialized sourcing for legacy, EOL, and scarce enterprise chips with certified refurbishment programs, verified inventory access, and comprehensive warranty coverage on every unit.",
    points: [
      "Legacy & EOL chip sourcing",
      "Verified global inventory",
      "Certified refurbishment",
      "Full warranty coverage",
    ],
  },
  {
    icon: Headphones,
    title: "Technical Support",
    description:
      "Expert multi-vendor certified engineers available for setup, configuration, troubleshooting, and performance optimization across your entire computing stack — from driver tuning to cluster orchestration.",
    points: [
      "Multi-vendor certified engineers",
      "Remote & on-site support",
      "Performance optimization",
      "24/7 escalation pipeline",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Warranty & RMA",
    description:
      "Hassle-free warranty management with cross-shipment RMA options, advance replacement programs, extended warranty plans, and dedicated support coordinators for every case.",
    points: [
      "Cross-shipment RMA",
      "Advance replacement",
      "Extended warranty plans",
      "Dedicated case coordination",
    ],
  },
  {
    icon: Wrench,
    title: "Integration Services",
    description:
      "Complete deployment assistance including system integration, cluster configuration, software stack setup, and infrastructure handover — ensuring your new hardware is production-ready from day one.",
    points: [
      "System integration",
      "Cluster configuration",
      "Software stack setup",
      "Infrastructure handover",
    ],
  },
  {
    icon: Cpu,
    title: "AI Infrastructure Design",
    description:
      "End-to-end architecture design for AI training and inference infrastructure, from single-node workstations to exascale GPU clusters with NVLink fabrics and high-performance storage.",
    points: [
      "Full architecture design",
      "GPU cluster planning",
      "Network topology design",
      "Storage & power planning",
    ],
  },
  {
    icon: Building2,
    title: "Data Center Planning",
    description:
      "Comprehensive data center planning for GPU-accelerated workloads including rack layout optimization, power distribution design, cooling solutions, and structured cabling architecture.",
    points: [
      "Rack layout optimization",
      "Power distribution design",
      "Cooling solution planning",
      "Structured cabling",
    ],
  },
  {
    icon: Gauge,
    title: "HPC Optimization",
    description:
      "Maximize workload performance with in-depth application profiling, kernel-level optimization, parallel computing tuning, and benchmark analysis across CPU and GPU architectures.",
    points: [
      "Application profiling",
      "Kernel optimization",
      "Parallel computing tuning",
      "Benchmark & analysis",
    ],
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Consult",
    description:
      "Share your requirements, workload profile, scale targets, and timeline. Our certified engineers analyze your needs and recommend the optimal architecture.",
    icon: Search,
  },
  {
    step: "02",
    title: "Architect",
    description:
      "We design a complete solution with detailed specifications, pricing, delivery timeline, and deployment plan tailored to your infrastructure and budget.",
    icon: Cpu,
  },
  {
    step: "03",
    title: "Deliver",
    description:
      "From procurement through deployment, we manage the entire lifecycle — logistics, integration, testing, and handover — with continuous support every step of the way.",
    icon: Package,
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Services"
        title="End-to-End Enterprise Chip Solutions"
        subtitle="From semiconductor procurement to AI infrastructure design, we deliver comprehensive services backed by multi-vendor engineering expertise across NVIDIA, AMD, Intel and global supply chain capabilities."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      {/* Service Grid */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-circuit opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="What We Offer"
            title="Complete Service Portfolio"
            subtitle="Nine specialized service lines covering the entire chip lifecycle — from sourcing and procurement to deployment, optimization, and ongoing support."
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {SERVICES.map((service) => (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="group relative rounded-2xl border border-border bg-surface p-6 md:p-7 card-hover overflow-hidden flex flex-col"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-all pointer-events-none" />
                <div className="relative flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2.5 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-muted leading-relaxed mb-4 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {service.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2 text-xs text-text-muted"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group/link mt-auto pt-3 border-t border-border"
                  >
                    <span>Request Service</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-15 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="Process"
            title="How It Works"
            subtitle="A streamlined three-phase engagement model designed for clarity, speed, and enterprise-grade delivery."
          />

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {HOW_IT_WORKS.map((step, i) => (
                <div key={step.step} className="relative">
                  <div className="rounded-2xl border border-border bg-bg-dark p-6 md:p-8 text-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-xs font-mono font-bold text-primary">
                        {step.step}
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-5">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-text mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  {i < HOW_IT_WORKS.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-primary/40 to-transparent" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/[0.03] blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-secondary/[0.02] blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            title="Trusted by Enterprises Worldwide"
            subtitle="500+ chips delivered, 200+ enterprise clients, and 99.9% authenticity rate — our track record speaks for itself."
          />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-4xl mx-auto"
          >
            {STATS.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-2xl border border-border bg-surface p-6 md:p-8 text-center card-hover"
              >
                <div className="text-3xl md:text-4xl font-black text-primary font-mono">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-xs text-text-muted mt-1.5 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-8 md:p-12"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-xs font-mono text-primary uppercase tracking-widest font-bold">
                    Ready to Get Started?
                  </span>
                </div>
                <h2 className="text-2xl md:text-4xl font-black text-text mb-2 leading-tight">
                  Let&apos;s Build Your Solution
                </h2>
                <p className="text-sm md:text-base text-text-muted leading-relaxed">
                  Tell us about your requirements and our certified engineers
                  will design a complete solution with detailed specifications,
                  pricing, and deployment plan — typically within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href="/contact">
                  <Button
                    variant="solid"
                    size="lg"
                    className="font-semibold shadow-lg shadow-primary/20"
                  >
                    Talk to an Expert <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/rfq">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border text-text-muted hover:text-text"
                  >
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
