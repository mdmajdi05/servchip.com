"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ShieldCheck, Award, Globe, Users, Target, ArrowRight } from "lucide-react";

const STATS = [
  { value: "200+", label: "Enterprise Clients" },
  { value: "5,000+", label: "Chips Delivered" },
  { value: "150+", label: "Countries Served" },
  { value: "99.9%", label: "Client Satisfaction" },
];

const VALUES = [
  { icon: ShieldCheck, title: "Authenticity Guaranteed", desc: "Every chip sourced directly from NVIDIA and authorized partners. Full chain of custody documentation." },
  { icon: Award, title: "Technical Excellence", desc: "Our team of certified NVIDIA engineers brings decades of combined experience in AI infrastructure and HPC." },
  { icon: Globe, title: "Global Reach", desc: "Shipping to 150+ countries with secure logistics, customs clearance support, and express delivery options." },
  { icon: Users, title: "Client-First Approach", desc: "Dedicated account managers, 24-hour quote response, and white-glove service for every order." },
];

const TEAM = [
  { name: "James Chen", role: "CEO & Co-Founder", avatar: "JC", desc: "15+ years in semiconductor distribution. Former NVIDIA partner program director." },
  { name: "Sarah Okafor", role: "CTO & Co-Founder", avatar: "SO", desc: "Ex-Google AI infrastructure. PhD in Computer Architecture from MIT." },
  { name: "Marcus Rivera", role: "VP of Operations", avatar: "MR", desc: "Supply chain expert with experience managing $500M+ logistics networks." },
  { name: "Aiko Tanaka", role: "Head of Engineering", avatar: "AT", desc: "NVIDIA-certified engineer. Led deployments for 50+ enterprise data centers." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      {/* Hero */}
      <section className="pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-[80px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-5 py-1.5 text-xs font-semibold text-primary mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              NVIDIA Premier Partner — Est. 2018
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-text mb-4 tracking-tight">
              Powering Innovation with{" "}
              <span className="gradient-text">Authentic Hardware</span>
            </h1>
            <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto">
              Servchip is the trusted bridge between NVIDIA&apos;s cutting-edge technology and the
              enterprises, researchers, and innovators who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-text-dim uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <SectionHeading
                label="Our Mission"
                title="Democratizing Access to World-Class Computing"
              />
              <p className="text-text-muted text-sm leading-relaxed mb-4">
                Founded in 2018, Servchip was built on a simple belief: every organization
                should have access to authentic, enterprise-grade NVIDIA computing solutions
                without the complexity and risk of traditional hardware procurement.
              </p>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Today, we serve over 200 enterprise clients across 150+ countries, delivering
                everything from single GPU shipments to full data center deployments with
                white-glove support and complete traceability.
              </p>
              <div className="flex items-center gap-2 text-sm">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-text font-semibold">Our goal: </span>
                <span className="text-text-muted">Zero compromise on quality or service.</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-surface border border-border rounded-2xl p-8"
            >
              <h3 className="text-lg font-bold text-text mb-4">Our Commitment</h3>
              <ul className="space-y-3">
                {[
                  "100% authentic NVIDIA products with full chain of custody",
                  "ISO 9001:2015 certified quality management",
                  "24-hour quote response guaranteed",
                  "Dedicated account managers for every client",
                  "NVIDIA-certified engineering support team",
                  "Secure global logistics with real-time tracking",
                ].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-2 text-sm text-text-muted"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
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
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card variant="elevated" className="h-full text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <v.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-text mb-2">{v.title}</h3>
                  <p className="text-text-muted text-sm">{v.desc}</p>
                </Card>
              </motion.div>
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
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary text-xl font-black">{member.avatar}</span>
                </div>
                <h3 className="text-sm font-bold text-text">{member.name}</h3>
                <p className="text-xs text-primary mb-2">{member.role}</p>
                <p className="text-xs text-text-dim max-w-[200px] mx-auto">{member.desc}</p>
              </motion.div>
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
            Whether you need a single GPU or a full data center deployment, our team is ready
            to help. Get a quote within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/rfq">
              <Button variant="solid" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
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
