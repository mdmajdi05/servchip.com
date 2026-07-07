"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, animate } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  Code2,
  BookOpen,
  Download,
  Key,
  Activity,
  Cpu,
  Zap,
  BookText,
  Settings,
  ArrowRight,
} from "lucide-react";

function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  prefix = "",
}: {
  from?: number;
  to: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (isInView) {
      const controls = animate(from, to, {
        duration: 2,
        ease: "easeOut" as const,
        onUpdate: (val) => setCount(Math.round(val)),
      });
      return () => controls.stop();
    }
  }, [isInView, from, to]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

const stats = [
  { label: "Active API Keys", value: 1247, icon: Key, suffix: "" },
  { label: "SDK Downloads", value: 8432, icon: Download, suffix: "" },
  { label: "Documentation Views", value: 24100, icon: BookOpen, suffix: "+" },
  { label: "Active Integrations", value: 156, icon: Cpu, suffix: "" },
];

const quickActions = [
  {
    title: "Browse API Docs",
    description: "Explore our complete REST & GraphQL API reference with interactive examples.",
    icon: BookOpen,
    color: "text-primary",
  },
  {
    title: "Download SDK",
    description: "Get the latest Servchip SDK for Python, Go, Node.js, and Rust.",
    icon: Download,
    color: "text-secondary",
  },
  {
    title: "View Changelog",
    description: "Stay up to date with API changes, new features, and deprecation notices.",
    icon: Activity,
    color: "text-accent",
  },
  {
    title: "Request Sandbox Access",
    description: "Get a free sandbox environment to test integrations without production data.",
    icon: Key,
    color: "text-warning",
  },
];

const recentActivity = [
  { date: "2026-07-03", event: "API Key generated for Prod Environment", type: "API Key", status: "Completed" },
  { date: "2026-07-03", event: "Bulk chip pricing query (H100 x 50 units)", type: "API Call", status: "Success" },
  { date: "2026-07-02", event: "SDK v4.2.1 downloaded — Python client", type: "Download", status: "Completed" },
  { date: "2026-07-02", event: "Documentation: CUDA 12.8 guide viewed", type: "Page View", status: "—" },
  { date: "2026-07-01", event: "Sandbox environment provisioned for acme-corp", type: "Provision", status: "Active" },
  { date: "2026-07-01", event: "Integration health check — all endpoints passing", type: "Health", status: "Healthy" },
];

const resources = [
  {
    title: "CUDA Guides",
    description: "Optimization guides, kernel tuning, and memory management for NVIDIA GPUs.",
    icon: Zap,
    articles: "12 articles",
  },
  {
    title: "Architecture Docs",
    description: "Deep dives into Hopper, Blackwell, and next-gen GPU architectures.",
    icon: Cpu,
    articles: "8 articles",
  },
  {
    title: "Deployment Playbooks",
    description: "Step-by-step guides for on-prem, cloud, and hybrid deployments.",
    icon: Settings,
    articles: "6 articles",
  },
  {
    title: "Best Practices",
    description: "Security, rate limiting, error handling, and production readiness.",
    icon: BookText,
    articles: "10 articles",
  },
];

export default function DeveloperDashboardPage() {
  return (
    <div className="min-h-screen bg-bg-dark pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <SectionHeading
            title="Developer Dashboard"
            subtitle="Monitor integrations, access SDKs, explore API docs, and manage your developer tools — all in one place."
            align="left"
          />
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10"
        >
          {stats.map((stat) => (
            <Card key={stat.label} variant="elevated" padding="md">
              <div className="flex items-start justify-between mb-3">
                <stat.icon className="w-5 h-5 text-primary" />
                <Badge variant="green" size="sm">Live</Badge>
              </div>
              <div className="text-3xl font-black text-text mb-1">
                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-text-muted">{stat.label}</div>
            </Card>
          ))}
        </motion.div>

        {/* Quick Actions & API Overview */}
        <div className="grid lg:grid-cols-2 gap-6 mb-10">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Quick Actions
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Card key={action.title} variant="default" hover padding="sm">
                  <div className="flex flex-col h-full">
                    <action.icon className={`w-8 h-8 ${action.color} mb-3`} />
                    <h4 className="text-sm font-bold text-text mb-1">{action.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed flex-1 mb-3">
                      {action.description}
                    </p>
                    <Button variant="ghost" size="sm" icon={<ArrowRight className="w-3 h-3" />} iconPosition="right" className="self-start mt-auto text-xs">
                      Get started
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* API Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              API Overview
            </h3>
            <Card variant="elevated" padding="md" className="h-full">
              <p className="text-sm text-text-muted mb-4">
                Query chip inventory, pricing, and availability with a single API call.
              </p>
              <div className="bg-bg-dark rounded-lg p-4 border border-border mb-4 overflow-x-auto">
                <pre className="text-xs text-text-muted font-mono leading-relaxed">
                  <code>
                    {`curl -X GET "https://api.servchip.com/v2/chips/query" \\\n  -H "Authorization: Bearer ${"${API_KEY}"}" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "models": ["H100", "H200", "B200"],\n    "quantity": 10,\n    "region": "us-east",\n    "include_pricing": true\n  }'`}
                  </code>
                </pre>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="green" size="md">GET /v2/chips/query</Badge>
                <Badge variant="default" size="md">Authentication: Bearer Token</Badge>
                <Badge variant="default" size="md">Rate Limit: 1000/min</Badge>
              </div>
              <div className="flex gap-3">
                <Button variant="solid" size="sm" icon={<Code2 className="w-4 h-4" />}>
                  Try in Playground
                </Button>
                <Button variant="outline" size="sm" icon={<BookOpen className="w-4 h-4" />}>
                  Read Docs
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-10"
        >
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            Recent Activity
          </h3>
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-text-muted font-semibold text-xs uppercase tracking-wider px-6 py-3">Date</th>
                    <th className="text-left text-text-muted font-semibold text-xs uppercase tracking-wider px-6 py-3">Event</th>
                    <th className="text-left text-text-muted font-semibold text-xs uppercase tracking-wider px-6 py-3">Type</th>
                    <th className="text-left text-text-muted font-semibold text-xs uppercase tracking-wider px-6 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-b-0 hover:bg-primary-subtle/5 transition-colors">
                      <td className="px-6 py-3 text-text-muted text-xs whitespace-nowrap">{row.date}</td>
                      <td className="px-6 py-3 text-text text-sm">{row.event}</td>
                      <td className="px-6 py-3">
                        <Badge variant="default" size="sm">{row.type}</Badge>
                      </td>
                      <td className="px-6 py-3">
                        <Badge
                          variant={
                            row.status === "Completed" || row.status === "Success" || row.status === "Healthy"
                              ? "green"
                              : row.status === "Active"
                              ? "cyan"
                              : "default"
                          }
                          size="sm"
                        >
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-text mb-4 flex items-center gap-2">
            <BookText className="w-5 h-5 text-primary" />
            Resources
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {resources.map((resource) => (
              <Card key={resource.title} variant="glow" hover padding="sm">
                <div className="flex flex-col h-full">
                  <resource.icon className="w-8 h-8 text-primary mb-3" />
                  <h4 className="text-sm font-bold text-text mb-1">{resource.title}</h4>
                  <p className="text-xs text-text-muted leading-relaxed flex-1 mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[10px] text-text-dim uppercase tracking-wider">{resource.articles}</span>
                    <ArrowRight className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
