"use client";

import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ShieldCheck,
  Award,
  Globe,
  Users,
  Target,
  ArrowRight,
} from "lucide-react";

const STATS = [
  { value: "10,000+", label: "Enterprise Chips Supplied" },
  { value: "500+", label: "Enterprise Clients Worldwide" },
  { value: "27+", label: "Manufacturer Partnerships" },
  { value: "99.9%", label: "Authenticity Rate" },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Authenticity Guaranteed",
    desc: "Every chip sourced directly from manufacturers and authorized partners. Full chain of custody documentation across all brands.",
  },
  {
    icon: Award,
    title: "Technical Excellence",
    desc: "Our team of certified engineers brings decades of combined experience across NVIDIA, AMD, Intel and more in AI infrastructure and HPC.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    desc: "Shipping to 150+ countries with secure logistics, customs clearance support, and express delivery options.",
  },
  {
    icon: Users,
    title: "Client-First Approach",
    desc: "Dedicated account managers, 24-hour quote response, and white-glove service for every order.",
  },
];

const TEAM = [
  {
    name: "James Chen",
    role: "CEO & Co-Founder",
    avatar: "JC",
    desc: "15+ years in semiconductor distribution. Former partner program director at leading chip manufacturers.",
  },
  {
    name: "Sarah Okafor",
    role: "CTO & Co-Founder",
    avatar: "SO",
    desc: "Ex-Google AI infrastructure. PhD in Computer Architecture from MIT.",
  },
  {
    name: "Marcus Rivera",
    role: "VP of Operations",
    avatar: "MR",
    desc: "Supply chain expert with experience managing $500M+ logistics networks.",
  },
  {
    name: "Aiko Tanaka",
    role: "Head of Engineering",
    avatar: "AT",
    desc: "Multi-vendor certified engineer. Led deployments for 50+ enterprise data centers across all major chip platforms.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      {/* About intro section */}
      <section className="pt-12 md:pt-16 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-1.5 text-xs font-semibold text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Enterprise Chip Distributor — Est. 2018
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-text mb-4 tracking-tight">
              The Team Behind{" "}
              <span className="gradient-text">
                Your Enterprise Chip Distributor
              </span>
            </h1>
            <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
              We help companies buy AI chips, server hardware, and data center
              equipment from the brands they trust — NVIDIA, AMD, Intel and
              more. ISO 9001 certified. 500+ clients. 150+ countries.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-text-dim uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                label="Our Mission"
                title="Making Semiconductor Procurement Simple"
              />
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                We started Servchip in 2018 because buying enterprise chips was
                painful — too many middlemen, counterfeit risk, and way too much
                paperwork. We thought there had to be a better way for companies
                to source AI accelerators and data center hardware.
              </p>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Today, over 500 companies across 150+ countries trust us for
                semiconductor procurement. From a single NVIDIA H100 to an
                entire AMD MI300X cluster build-out — we handle everything with
                full traceability and manufacturer-direct sourcing.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-text font-semibold">Our goal: </span>
                <span className="text-text-muted">
                  Zero compromise on quality or service.
                </span>
              </div>
            </div>
            <div className="bg-surface border border-border rounded-2xl p-8">
              <h3 className="text-lg font-bold text-text mb-4">
                Our Commitment
              </h3>
              <ul className="space-y-3">
                {[
                  "100% authentic products with full chain of custody",
                  "ISO 9001:2015 certified quality management",
                  "24-hour quote response guaranteed",
                  "Dedicated account managers for every client",
                  "Multi-vendor certified engineering support team",
                  "Secure global logistics with real-time tracking",
                ].map((item, i) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Our Values"
            title="What Drives Us Every Day"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v, i) => (
              <div key={v.title}>
                <Card variant="elevated" className="h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">
                    {v.title}
                  </h3>
                  <p className="text-text-muted text-sm">{v.desc}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading
            label="Leadership"
            title="Meet the Team Behind Servchip"
            align="center"
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((member, i) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-black">
                    {member.avatar}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-text">{member.name}</h3>
                <p className="text-xs text-primary mb-2">{member.role}</p>
                <p className="text-xs text-text-dim max-w-[200px] mx-auto">
                  {member.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-text mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-text-muted text-sm mb-8 max-w-xl mx-auto">
            Whether you need a single NVIDIA H100, a batch of AMD MI300Xs, or a
            full data center deployment — let&apos;s talk. Get a quote within 24
            hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/rfq">
              <Button
                variant="solid"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Request a Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
