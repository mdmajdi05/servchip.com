"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Key,
  FileJson,
  Terminal,
  Book,
  Webhook,
  Database,
  Gauge,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const API_ENDPOINTS = [
  { method: "GET", path: "/api/v1/chips", desc: "List all chips with filters (category, architecture, status)" },
  { method: "GET", path: "/api/v1/chips/:slug", desc: "Get full chip details including specs by slug" },
  { method: "GET", path: "/api/v1/chips/featured", desc: "Get featured NVIDIA chips" },
  { method: "GET", path: "/api/v1/categories", desc: "List all chip categories with product counts" },
  { method: "GET", path: "/api/v1/blog", desc: "List blog posts with category/tag filters" },
  { method: "POST", path: "/api/v1/rfq", desc: "Submit a request for quote (auth required)" },
  { method: "POST", path: "/api/v1/contact", desc: "Submit a contact form message" },
  { method: "POST", path: "/api/v1/newsletter", desc: "Subscribe to the Servchip newsletter" },
];

const DEV_FEATURES = [
  {
    icon: Code2,
    title: "REST API",
    description:
      "Full programmatic access to our chip catalog, specs, and inventory. JSON responses with comprehensive filtering, pagination, and field projection.",
  },
  {
    icon: Key,
    title: "API Keys",
    description:
      "Generate and manage API keys for your applications. Rate-limited endpoints (1,000 req/min on standard tier) with usage analytics and webhooks.",
  },
  {
    icon: FileJson,
    title: "SDKs & Libraries",
    description:
      "Official SDKs for Python, JavaScript/TypeScript, and Go. Auto-generated from OpenAPI 3.1 specs with full type safety.",
  },
  {
    icon: Terminal,
    title: "Interactive Playground",
    description:
      "Test API calls directly in your browser with our interactive playground. No setup required — just bring your API key.",
  },
  {
    icon: Webhook,
    title: "Webhooks",
    description:
      "Subscribe to inventory changes, price updates, and order status events. Reliable delivery with retry and signature verification.",
  },
  {
    icon: Database,
    title: "Bulk Data Export",
    description:
      "Download the full chip catalog as JSON, CSV, or YAML for offline analysis. Daily snapshots available on enterprise tier.",
  },
];

const CODE_SAMPLES = {
  javascript: `// Fetch featured NVIDIA chips
import { Servchip } from "@servchip/sdk";

const client = new Servchip({ apiKey: process.env.SERVCHIP_API_KEY });

const chips = await client.chips.list({ featured: true });
console.log(chips[0].name); // "NVIDIA H100 Tensor Core GPU"

// Get a specific chip by slug
const h200 = await client.chips.get("nvidia-h200-tensor-core-gpu");
console.log(h200.specs.memory); // "141GB HBM3e"

// Submit an RFQ
const rfq = await client.rfq.create({
  items: [{ chipSlug: "nvidia-h100-tensor-core-gpu", quantity: 8 }],
  company: "Acme AI Labs",
  notes: "Need delivery within 2 weeks"
});`,
  python: `from servchip import Servchip

client = Servchip(api_key=os.environ["SERVCHIP_API_KEY"])

# Fetch featured NVIDIA chips
chips = client.chips.list(featured=True)
print(chips[0].name)  # "NVIDIA H100 Tensor Core GPU"

# Get a specific chip by slug
h200 = client.chips.get("nvidia-h200-tensor-core-gpu")
print(h200.specs.memory)  # "141GB HBM3e"

# Submit an RFQ
rfq = client.rfq.create(
    items=[{"chip_slug": "nvidia-h100-tensor-core-gpu", "quantity": 8}],
    company="Acme AI Labs",
    notes="Need delivery within 2 weeks",
)`,
  go: `package main

import (
    "context"
    "fmt"
    "os"
    "github.com/servchip/servchip-go"
)

func main() {
    client := servchip.New(os.Getenv("SERVCHIP_API_KEY"))

    // Fetch featured NVIDIA chips
    chips, err := client.Chips.List(context.Background(), &servchip.ChipListParams{
        Featured: servchip.Bool(true),
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(chips[0].Name) // "NVIDIA H100 Tensor Core GPU"

    // Get a specific chip by slug
    h200, _ := client.Chips.Get(context.Background(), "nvidia-h200-tensor-core-gpu")
    fmt.Println(h200.Specs.Memory) // "141GB HBM3e"
}`,
  curl: `# Fetch featured NVIDIA chips
curl -X GET "https://api.servchip.com/v1/chips?featured=true" \\
  -H "Authorization: Bearer $SERVCHIP_API_KEY" \\
  -H "Content-Type: application/json"

# Get a specific chip by slug
curl -X GET "https://api.servchip.com/v1/chips/nvidia-h200-tensor-core-gpu" \\
  -H "Authorization: Bearer $SERVCHIP_API_KEY"

# Submit an RFQ
curl -X POST "https://api.servchip.com/v1/rfq" \\
  -H "Authorization: Bearer $SERVCHIP_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [{"chipSlug": "nvidia-h100-tensor-core-gpu", "quantity": 8}],
    "company": "Acme AI Labs",
    "notes": "Need delivery within 2 weeks"
  }'`,
};

const CODE_SAMPLE = `// Fetch featured NVIDIA chips
const response = await fetch(
  "https://api.servchip.com/v1/chips?featured=true",
  {
    headers: {
      "Authorization": "Bearer sk_your_api_key",
      "Content-Type": "application/json",
    },
  }
);

const { data } = await response.json();
// data: ChipProduct[]
console.log(data[0].name); // "NVIDIA H100 Tensor Core GPU"`;

const INLINED_ENDPOINTS = [
  { method: "GET", path: "/api/v1/chips", desc: "List all chips with filters" },
  { method: "GET", path: "/api/v1/chips/:slug", desc: "Get chip details by slug" },
  { method: "GET", path: "/api/v1/categories", desc: "List all categories" },
  { method: "POST", path: "/api/v1/rfq", desc: "Submit request for quote" },
  { method: "GET", path: "/api/v1/blog", desc: "List blog posts" },
];

const INLINED_FEATURES = [
  {
    icon: Code2,
    title: "REST API",
    description: "Full programmatic access to our chip catalog, specs, and inventory. JSON responses with comprehensive filtering.",
  },
  {
    icon: Key,
    title: "API Keys",
    description: "Generate and manage API keys for your applications. Rate-limited endpoints with usage analytics.",
  },
  {
    icon: FileJson,
    title: "SDKs & Libraries",
    description: "Official SDKs for Python, JavaScript/TypeScript, and Go. Auto-generated from OpenAPI specs.",
  },
  {
    icon: Terminal,
    title: "Interactive Playground",
    description: "Test API calls directly in your browser with our interactive playground. No setup required.",
  },
];

export default function DeveloperHubPage() {
  return (
    <div className="min-h-screen bg-bg-dark">
      <PageHero
        label="Developer Hub"
        title="Build with the Servchip API"
        subtitle="Programmatic access to our complete chip catalog, specs, and inventory. Integrate NVIDIA product data into your procurement, planning, or analytics systems with our REST API and official SDKs."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Developer Hub" },
        ]}
      />

      {/* Inlined DeveloperHub section */}
      <section
        id="developer"
        className="relative py-20 md:py-28 bg-surface overflow-hidden scroll-mt-20"
      >
        <div className="absolute inset-0 bg-dot-grid opacity-15" />
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-[100px] top-20 right-0" />
        <div className="container mx-auto px-4 relative z-10">
          <SectionHeading
            label="Developer Hub"
            title="Build with the Servchip API"
            subtitle="Programmatic access to our complete chip catalog. Integrate NVIDIA product data into your procurement, planning, or analytics systems."
          />

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left: Code sample */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-border bg-bg-dark overflow-hidden"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF1744]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#FFD600]/60" />
                  <div className="w-3 h-3 rounded-full bg-[#00FF88]/60" />
                </div>
                <span className="ml-2 text-xs font-mono text-text-dim">api-example.ts</span>
              </div>
              {/* Code */}
              <pre className="p-4 md:p-5 text-xs md:text-[13px] font-mono leading-relaxed overflow-x-auto scrollbar-neon">
                <code>
                  {CODE_SAMPLE.split("\n").map((line, i) => (
                    <div key={i} className="flex">
                      <span className="text-text-dim select-none mr-4 text-right w-6 shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-text-muted">
                        {line.includes("//") ? (
                          <>
                            {line.split("//")[0]}
                            <span className="text-text-dim italic">{"//"}{line.split("//")[1]}</span>
                          </>
                        ) : (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: line
                                .replace(/(".*?")/g, '<span style="color:#76FF03">$1</span>')
                                .replace(/\b(const|await|fetch|console|log)\b/g, '<span style="color:#00E5FF">$1</span>')
                                .replace(/\b(response|data)\b/g, '<span style="color:#AA00FF">$1</span>'),
                            }}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                </code>
              </pre>
            </motion.div>

            {/* Right: Features */}
            <div className="space-y-4">
              {INLINED_FEATURES.map((feat, i) => (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex gap-4 p-4 rounded-xl border border-border bg-surface card-hover"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                    <feat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text mb-1">{feat.title}</h4>
                    <p className="text-xs text-text-muted leading-relaxed">{feat.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* API endpoints preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 rounded-2xl border border-border bg-surface overflow-hidden max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface">
              <Book className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-text">API Endpoints</span>
            </div>
            <div className="divide-y divide-border">
              {INLINED_ENDPOINTS.map((ep) => (
                <div key={ep.path} className="flex items-center gap-3 px-4 py-2.5 hover:bg-primary/5 transition-colors">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-mono font-bold w-12 text-center",
                      ep.method === "GET"
                        ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {ep.method}
                  </span>
                  <code className="text-xs font-mono text-text flex-1">{ep.path}</code>
                  <span className="text-xs text-text-muted hidden sm:block">{ep.desc}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <Link href="/contact">
              <Button variant="outline" size="md" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Request API Access
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Full endpoint reference */}
      <section className="py-20 md:py-28 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              API Reference
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Full Endpoint Reference
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              All REST endpoints. Base URL: <code className="px-1.5 py-0.5 rounded bg-surface-2 border border-border text-primary font-mono text-sm">https://api.servchip.com/v1</code>
            </p>
          </div>

          <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-surface overflow-hidden">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-surface-2">
              <Book className="w-4 h-4 text-primary" />
              <span className="text-sm font-mono text-text">Endpoints</span>
              <span className="ml-auto text-xs text-text-dim font-mono">
                {API_ENDPOINTS.length} routes
              </span>
            </div>
            <div className="divide-y divide-border">
              {API_ENDPOINTS.map((ep) => (
                <div
                  key={ep.path}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 px-5 py-3 hover:bg-primary/5 transition-colors"
                >
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold w-16 text-center shrink-0 ${
                      ep.method === "GET"
                        ? "bg-[#00E5FF]/10 text-[#00E5FF]"
                        : "bg-primary/10 text-primary"
                    }`}
                  >
                    {ep.method}
                  </span>
                  <code className="text-xs md:text-sm font-mono text-text flex-1">
                    {ep.path}
                  </code>
                  <span className="text-xs text-text-muted">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dev features grid */}
      <section className="py-20 md:py-28 bg-surface border-t border-border">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Platform Features
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Everything You Need to Integrate
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              A complete developer platform with SDKs, webhooks, and bulk data access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {DEV_FEATURES.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-surface p-6 md:p-7 card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-bold text-text mb-2">{f.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code samples in multiple languages */}
      <section className="py-20 md:py-28 bg-bg-dark">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono font-medium tracking-widest uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Code Samples
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-text max-w-3xl mx-auto">
              Multi-Language Examples
            </h2>
            <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto mt-3">
              Quick-start examples in JavaScript, Python, Go, and cURL.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {Object.entries(CODE_SAMPLES).map(([lang, code]) => (
              <div
                key={lang}
                className="rounded-2xl border border-border bg-surface overflow-hidden"
              >
                <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-surface-2">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#FF1744]/60" />
                      <div className="w-3 h-3 rounded-full bg-[#FFD600]/60" />
                      <div className="w-3 h-3 rounded-full bg-[#00FF88]/60" />
                    </div>
                    <span className="ml-2 text-xs font-mono text-text-dim uppercase tracking-wider">
                      {lang === "javascript" ? "example.js" : lang === "python" ? "example.py" : lang === "go" ? "main.go" : "request.sh"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                      {lang}
                    </span>
                  </div>
                </div>
                <pre className="p-5 text-xs md:text-[13px] font-mono leading-relaxed overflow-x-auto scrollbar-neon">
                  <code className="text-text-muted">{code}</code>
                </pre>
              </div>
            ))}
          </div>

          {/* Rate limit info */}
          <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-border bg-surface p-5">
              <Gauge className="w-5 h-5 text-primary mb-3" />
              <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-1">
                Standard Tier
              </div>
              <div className="text-2xl font-black text-text font-mono">1,000/min</div>
              <p className="text-xs text-text-muted mt-2">
                Free for all API key holders. Suitable for most applications.
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-surface p-5">
              <Gauge className="w-5 h-5 text-primary mb-3" />
              <div className="text-xs font-mono text-primary uppercase tracking-wider mb-1">
                Enterprise Tier
              </div>
              <div className="text-2xl font-black text-text font-mono">10,000/min</div>
              <p className="text-xs text-text-muted mt-2">
                Higher rate limits, dedicated support, and SLA guarantees.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-5">
              <Key className="w-5 h-5 text-primary mb-3" />
              <div className="text-xs font-mono text-text-dim uppercase tracking-wider mb-1">
                Auth
              </div>
              <div className="text-2xl font-black text-text font-mono">Bearer</div>
              <p className="text-xs text-text-muted mt-2">
                All requests require an API key in the Authorization header.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link href="/contact">
              <Button variant="solid" size="lg" icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
                Request API Access
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
