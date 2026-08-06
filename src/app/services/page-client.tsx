"use client";
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
import { useCountryPrefix } from "@/lib/useCountryPrefix";
import { STATS } from "@/data/home";
const SERVICES = [
  {
    icon: Truck,
    title: "Hardware Procurement",
    description:
      "Need to buy enterprise chips? We source NVIDIA, AMD, Intel, and semiconductor components globally - manufacturer-direct, with full compliance docs and secure logistics.",
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
      "Buying server hardware at scale? Get volume pricing on enterprise GPUs, AI accelerators, and data center equipment with dedicated account management and flexible delivery.",
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
      "Looking for legacy NVIDIA chips, discontinued AMD accelerators, or scarce Intel components? We track down enterprise chips others can't find - with warranty on every unit.",
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
      "Our certified engineers help with setup, configuration, and performance tuning across NVIDIA, AMD, and Intel server platforms - from single GPUs to full clusters.",
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
      "Every enterprise chip we sell comes with manufacturer warranty. Need an RMA? We handle cross-shipment replacements and extended coverage across all brands.",
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
      "From racking servers to configuring GPU clusters - our team gets your new NVIDIA, AMD, or Intel hardware production-ready from day one.",
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
      "Planning an AI training or inference deployment? We design the full server architecture - from GPU selection and NVLink topology to storage and networking.",
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
      "Building or expanding a data center? We plan server racks, power distribution, and cooling for GPU-accelerated workloads across NVIDIA, AMD, and Intel.",
    points: [
      "Rack optimization",
      "Power distribution design",
      "Cooling solution planning",
      "Structured cabling",
    ],
  },
  {
    icon: Gauge,
    title: "HPC Optimization",
    description:
      "Maximizing server performance for HPC workloads? We profile applications, tune kernels, and benchmark across CPU and GPU architectures for optimal throughput.",
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
      "From procurement through deployment, we manage the entire lifecycle - logistics, integration, testing, and handover - with continuous support every step of the way.",
    icon: Package,
  },
];
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    transition: { staggerChildren: 0.06 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};
export default function ServicesPage() {
  const prefix = useCountryPrefix();
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Services"
        title="End-to-End Enterprise Chip Solutions"
        subtitle="From finding the right chip to getting it deployed - we handle the full lifecycle so you can focus on building."
        breadcrumbs={[
          { label: "Home", href: `${prefix}/` },
          { label: "Services" },
        ]}
      />
      {/* Service Grid */}
      <section className="relative py-20 md:py-28 bg-bg-dark overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-circuit opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <SectionHeading
            label="What We Offer"
            title="Complete Service Portfolio"
            subtitle="Nine specialized service lines covering the entire chip lifecycle - from sourcing and procurement to deployment, optimization, and ongoing support."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group relative rounded-2xl border border-border bg-surface p-6 md:p-7 card-hover overflow-hidden flex flex-col"
              >
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-transform pointer-events-none" />
                <div className="relative flex-1 flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-transform shrink-0">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-text mb-2.5 group-hover:text-primary transition-transform">
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
                    href={`${prefix}/contact`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary group/link mt-auto pt-3 border-t border-border"
                  >
                    <span>Request Service</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
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
            subtitle="500+ chips delivered, 200+ enterprise clients, and 99.9% authenticity rate - our track record speaks for itself."
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6 max-w-4xl mx-auto">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-surface p-6 md:p-8 text-center card-hover"
              >
                <div className="text-3xl md:text-4xl font-black text-primary font-mono">
                  {stat.value.toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-xs text-text-muted mt-1.5 font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA */}
      <section className="relative py-20 md:py-28 bg-surface overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-secondary/5 to-transparent p-8 md:p-12">
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
                  pricing, and deployment plan - typically within 24 hours.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <Link href={`${prefix}/contact`}>
                  <Button
                    variant="solid"
                    size="lg"
                    className="font-semibold shadow-lg shadow-primary/20"
                  >
                    Talk to an Expert <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href={`${prefix}/rfq`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border text-text-muted hover:text-text"
                  >
                    Get a Quote
                  </Button>
                </Link>
                <Link href={`${prefix}/resources`}>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-border text-text-muted hover:text-text"
                  >
                    Explore Resources
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
