import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck,
  Award,
  Globe,
  Zap,
  Wrench,
  Rocket,
  Search,
  FileText,
  Package,
  Headphones,
  Cpu,
  ClipboardCheck,
} from "lucide-react";

export interface TrustBarItem {
  icon: string;
  text: string;
  badge?: string;
}

export const TRUST_BAR_ITEMS: TrustBarItem[] = [
  { icon: "⚡", text: "Enterprise Chip Distributor", badge: "★" },
  { icon: "✅", text: "ISO 9001:2015 Certified" },
  { icon: "🏢", text: "NVIDIA" },
  { icon: "🏢", text: "Intel" },
  { icon: "🏢", text: "AMD" },
  { icon: "🏢", text: "Broadcom" },
  { icon: "🏢", text: "Marvell" },
  { icon: "🏢", text: "Cisco" },
  { icon: "🏢", text: "Qualcomm" },
  { icon: "🏢", text: "Samsung" },
  { icon: "🏢", text: "Micron" },
  { icon: "🏢", text: "SK hynix" },
  { icon: "🏢", text: "Seagate" },
  { icon: "🏢", text: "Dell" },
  { icon: "🏢", text: "HPE" },
  { icon: "🏢", text: "Supermicro" },
  { icon: "🏢", text: "Lenovo" },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  decimals?: number;
}

export const STATS: Stat[] = [
  {
    value: 10000,
    suffix: "+",
    label: "Enterprise Chips Supplied",
    icon: "Cpu",
  },
  { value: 500, suffix: "+", label: "Enterprise Clients", icon: "Building2" },
  {
    value: 27,
    suffix: "+",
    label: "Manufacturer Partnerships",
    icon: "Handshake",
  },
  { value: 150, suffix: "+", label: "Countries Served", icon: "Globe" },
  {
    value: 99.9,
    suffix: "%",
    label: "Chip Authenticity Rate",
    icon: "ShieldCheck",
    decimals: 1,
  },
  {
    value: 24,
    suffix: "/7",
    label: "Server Support Engineers",
    icon: "Headphones",
  },
];

export interface TechnologyFeature {
  icon: string;
  title: string;
  desc: string;
}

export const TECHNOLOGY_FEATURES: TechnologyFeature[] = [
  {
    icon: "Cpu",
    title: "Multi-Architecture Server Support",
    desc: "NVIDIA Hopper, AMD CDNA 3/4, Intel Granite Rapids — all in one data center platform",
  },
  {
    icon: "Zap",
    title: "AI Acceleration",
    desc: "Tensor Cores, Matrix Extensions, dedicated AI engines across all semiconductor platforms",
  },
  {
    icon: "HardDrive",
    title: "High-Bandwidth Memory",
    desc: "HBM3, HBM3e, GDDR6 server memory for the most memory-intensive enterprise workloads",
  },
  {
    icon: "Network",
    title: "Advanced Interconnects",
    desc: "NVLink, Infinity Fabric, UPI, CXL for seamless multi-GPU data center scaling",
  },
  {
    icon: "Layers",
    title: "Open Ecosystems",
    desc: "CUDA, ROCm, oneAPI — choose your semiconductor development platform freely",
  },
  {
    icon: "ShieldCheck",
    title: "Enterprise Reliability",
    desc: "ECC memory, RAS features, multi-vendor server certification for production deployments",
  },
  {
    icon: "TrendingUp",
    title: "Scalable Architecture",
    desc: "From edge servers to exascale data centers — single GPU to GPU clusters of any size",
  },
];

export interface WhyFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const WHY_FEATURES: WhyFeature[] = [
  {
    icon: ShieldCheck,
    title: "100% Authentic Chips",
    desc: "Every chip sourced directly from manufacturers and authorized distribution partners. Zero counterfeit policy with full chain of custody documentation across all enterprise hardware — NVIDIA, AMD, Intel, Broadcom, and more.",
  },
  {
    icon: Award,
    title: "ISO 9001 Certified Operations",
    desc: "ISO 9001:2015 certified quality management system governs procurement, warehousing, and fulfillment. An enterprise chip distributor you can audit with confidence.",
  },
  {
    icon: Globe,
    title: "Global Delivery from India & UAE",
    desc: "Ship enterprise AI hardware to 150+ countries from facilities in New Delhi and Sharjah. Secure, insured logistics with express options for urgent data center deployments.",
  },
  {
    icon: Zap,
    title: "Enterprise IT Hardware Support",
    desc: "Dedicated account managers and 24/7 engineering access for every enterprise client. Multi-vendor architecture expertise across NVIDIA, AMD, Intel, and leading chip platforms.",
  },
  {
    icon: Wrench,
    title: "Expert Engineering Team",
    desc: "Certified engineers match workload requirements to the right accelerator, memory configuration, and interconnect topology. Architecture reviews and workload benchmarking included.",
  },
  {
    icon: Rocket,
    title: "Fast Turnaround & Bulk Pricing",
    desc: "24-hour quote response guaranteed. Volume discounts for server components wholesale orders. Express shipping available for time-critical AI infrastructure projects.",
  },
];

export interface ComparisonChip {
  name: string;
  slug: string;
  specs: Record<string, string>;
  badge: string;
  badgeVariant: "amber" | "cyan" | "purple";
  winner?: boolean;
}

export const COMPARISON_CHIPS: ComparisonChip[] = [
  {
    name: "NVIDIA H100",
    slug: "nvidia-h100-tensor-core-gpu",
    specs: {
      manufacturer: "NVIDIA",
      memory: "80GB HBM3",
      bandwidth: "3.35 TB/s",
    },
    badge: "Popular",
    badgeVariant: "amber",
  },
  {
    name: "AMD MI300X",
    slug: "amd-instinct-mi300x",
    specs: { manufacturer: "AMD", memory: "192GB HBM3", bandwidth: "5.2 TB/s" },
    badge: "Latest",
    badgeVariant: "cyan",
  },
  {
    name: "Intel Gaudi 3",
    slug: "intel-gaudi-3-ai-accelerator",
    specs: {
      manufacturer: "Intel",
      memory: "144GB HBM2e",
      bandwidth: "3.9 TB/s",
    },
    badge: "New",
    badgeVariant: "purple",
    winner: false,
  },
];

export interface HowItWorksStep {
  icon: LucideIcon;
  number: string;
  title: string;
  desc: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    icon: Search,
    number: "1",
    title: "Browse & Select",
    desc: "Explore our complete multi-vendor enterprise chip catalog — AI accelerators, server CPUs, networking, memory & storage — with detailed specs and expert recommendations.",
  },
  {
    icon: FileText,
    number: "2",
    title: "Request a Quote",
    desc: "Submit your enterprise hardware requirements and get a personalized quote with volume pricing within 24 hours. No minimum order quantity.",
  },
  {
    icon: Package,
    number: "3",
    title: "Receive & Deploy",
    desc: "Fast global delivery with full traceability, ISO-certified packaging, and enterprise-level technical support. Ship to 150+ countries.",
  },
];

export interface ServiceItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  features: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    icon: Search,
    title: "Enterprise Chip Sourcing",
    desc: "Hard-to-find or end-of-life enterprise chips sourced through our global manufacturer partnership network. AI accelerators, server CPUs, and data center GPUs at competitive pricing.",
    features: [
      "End-of-life procurement",
      "Hard-to-find components",
      "Cross-reference matching",
      "Global supplier network",
    ],
  },
  {
    icon: Headphones,
    title: "Technical Support & Integration",
    desc: "24/7 multi-vendor engineering support for AI infrastructure deployment. From chip selection to system integration across NVIDIA, AMD, and Intel platforms.",
    features: [
      "24/7 engineering access",
      "Multi-vendor expertise",
      "Remote diagnostics",
      "Performance tuning",
    ],
  },
  {
    icon: Cpu,
    title: "Data Center Solutions",
    desc: "Pre-configured rack-level integration with full testing and validation. Complete data center solutions provider for AI training clusters and HPC deployments.",
    features: [
      "Rack integration services",
      "Pre-shipment testing",
      "Custom configurations",
      "Quality validation",
    ],
  },
  {
    icon: ClipboardCheck,
    title: "AI Infrastructure Consulting",
    desc: "Architecture review and workload optimization across all major chip platforms. Free technical consultations for enterprise AI hardware procurement decisions.",
    features: [
      "Architecture planning",
      "Workload benchmarking",
      "Migration strategy",
      "ROI analysis",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Warranty & RMA",
    desc: "Comprehensive 3-year manufacturer warranty with advanced replacement and depot repair. ISO-certified warranty process for enterprise hardware.",
    features: [
      "3-year base warranty",
      "Advanced replacement",
      "Extended coverage",
      "Global RMA support",
    ],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "products",
    label: "Products & Authenticity",
    items: [
      {
        question: "Are all chips 100% authentic?",
        answer:
          "Yes. Every chip is sourced directly from manufacturers or authorized distribution partners. We maintain full chain of custody documentation and each shipment includes a certificate of authenticity. As an enterprise chip distributor with a zero counterfeit policy enforced across all 27+ manufacturer partnerships, we guarantee 100% authentic enterprise hardware.",
      },
      {
        question: "Can you help me choose the right chip?",
        answer:
          "Absolutely. Our engineering team provides free technical consultation to help match the right chip to your workload. We offer architecture reviews, workload benchmarking, and side-by-side comparisons across all brands.",
      },
      {
        question: "What brands do you carry?",
        answer:
          "We carry AI accelerators, data center GPUs, server CPUs, and enterprise IT hardware from 27+ manufacturers including NVIDIA, AMD, Intel, Broadcom, Marvell, Cisco, Qualcomm, Samsung, SK hynix, Micron, Seagate, Dell, HPE, Supermicro, Lenovo, and more. Our catalog covers the full spectrum of enterprise computing infrastructure.",
      },
      {
        question: "Do you sell both new and refurbished?",
        answer:
          "We specialize in new, factory-sealed enterprise hardware sourced directly from manufacturers and authorized distributors. All products come with full manufacturer warranty and chain of custody documentation.",
      },
    ],
  },
  {
    id: "ordering",
    label: "Orders & Pricing",
    items: [
      {
        question: "What is the minimum order quantity?",
        answer:
          "There is no minimum order quantity. Whether you need a single chip for testing or thousands for a full data center deployment, we can fulfill your order. Volume discounts apply for bulk orders.",
      },
      {
        question: "What payment terms are available?",
        answer:
          "We accept wire transfers, credit cards, and Net-30/Net-60 terms for qualified enterprise customers. Volume-based pricing is available for bulk and recurring orders. Contact our sales team for custom quotes.",
      },
      {
        question: "How do I request a quote?",
        answer:
          "Use our online RFQ form or contact our sales team directly. We respond to all quote requests within 24 hours. For urgent needs, our live chat and phone support provide instant assistance.",
      },
      {
        question: "Do you offer volume discounts?",
        answer:
          "Yes, we offer tiered pricing for bulk orders. Discounts scale with order volume and frequency. Contact our sales team with your requirements for a customized quote with volume pricing.",
      },
    ],
  },
  {
    id: "shipping",
    label: "Shipping & Delivery",
    items: [
      {
        question: "How fast can you deliver?",
        answer:
          "Standard delivery is 3-5 business days for in-stock items. Express shipping is available for urgent data center deployments. We ship to 150+ countries with global shipping from India and UAE, secure insured logistics, and real-time tracking.",
      },
      {
        question: "Do you support international shipping?",
        answer:
          "Yes, we ship to over 150 countries worldwide. We handle all customs documentation, duties, and taxes where applicable. Each shipment is fully insured with end-to-end tracking.",
      },
      {
        question: "How are orders shipped and packaged?",
        answer:
          "All chips are packaged in anti-static ESD-safe packaging with proper cushioning for transit. Enterprise orders are shipped on pallets with shock sensors. Each package includes full documentation and certificate of authenticity.",
      },
    ],
  },
  {
    id: "warranty",
    label: "Warranty & Support",
    items: [
      {
        question: "Do you provide warranty on all products?",
        answer:
          "All products come with a minimum 3-year manufacturer warranty. We also offer extended warranty plans and advanced replacement services. Our RMA team handles the entire process for hassle-free support.",
      },
      {
        question: "What kind of technical support do you offer?",
        answer:
          "Our engineering team provides 24/7 technical support across all brands for AI infrastructure, HPC, and data center workloads. Services include architecture consultation, performance tuning, remote diagnostics, and deployment assistance across NVIDIA, AMD, and Intel platforms.",
      },
      {
        question: "How does the RMA process work?",
        answer:
          "Our RMA team handles everything from diagnosis to replacement. We provide prepaid return labels, cross-ship advanced replacements when needed, and track every case to resolution. Typical RMA turnaround is 5-7 business days.",
      },
    ],
  },
];

export const FAQ_ITEMS: FAQItem[] = FAQ_CATEGORIES.flatMap((cat) => cat.items);

export interface Testimonial {
  content: string;
  author: { name: string; role: string; avatar: string; image?: string };
  rating: number;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    content:
      "Servchip delivered our H100 cluster ahead of schedule. Their technical team helped us configure everything for optimal AI training throughput. Exceptional support throughout.",
    author: {
      name: "Dr. Alex Chen",
      role: "CTO, QuantumAI Labs",
      avatar: "AC",
      image: "https://i.pravatar.cc/150?u=alex",
    },
    rating: 5,
    company: "QuantumAI Labs",
  },
  {
    content:
      "We needed 200 GPUs for our rendering farm across multiple vendors. Servchip sourced NVIDIA, AMD, and Intel options within 3 weeks at competitive pricing. Every card tested and documented.",
    author: {
      name: "Sarah Mitchell",
      role: "VP Engineering, RenderForge",
      avatar: "SM",
      image: "https://i.pravatar.cc/150?u=sarah",
    },
    rating: 5,
    company: "RenderForge Inc.",
  },
  {
    content:
      "The engineering consultation saved us from a costly architecture mistake. Their team's deep multi-vendor knowledge is unmatched. Long-term partner for sure.",
    author: {
      name: "Marcus Williams",
      role: "Head of Infrastructure, DataSphere",
      avatar: "MW",
      image: "https://i.pravatar.cc/150?u=marcus",
    },
    rating: 5,
    company: "DataSphere Corp.",
  },
  {
    content:
      "Outstanding logistics and support for our overseas deployment. Servchip handled customs, documentation, and on-site configuration across multiple chip vendors. Truly enterprise-grade service.",
    author: {
      name: "Yuki Tanaka",
      role: "Director of IT, TechFrontier KK",
      avatar: "YT",
      image: "https://i.pravatar.cc/150?u=yuki",
    },
    rating: 5,
    company: "TechFrontier KK",
  },
  {
    content:
      "Servchip helped us migrate from legacy inference hardware to NVIDIA L40S GPUs. The perf-per-watt improvement was 3x, and their engineering team handled the entire CUDA migration. Saved us months of trial and error.",
    author: {
      name: "Dr. Priya Sharma",
      role: "Director of AI, MedCore Diagnostics",
      avatar: "PS",
      image: "https://i.pravatar.cc/150?u=priya",
    },
    rating: 5,
    company: "MedCore Diagnostics",
  },
  {
    content:
      "As a cloud provider, we needed reliable access to AMD EPYC processors and Instinct accelerators. Servchip's volume pricing and consistent supply chain have been instrumental in scaling our AI cloud infrastructure across three continents.",
    author: {
      name: "James Okonkwo",
      role: "CEO, CloudAfrica Technologies",
      avatar: "JO",
      image: "https://i.pravatar.cc/150?u=james",
    },
    rating: 5,
    company: "CloudAfrica Technologies",
  },
];

export interface InsightPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
  image?: string;
}

export const INSIGHT_POSTS: InsightPost[] = [
  {
    title: "Enterprise AI Chip Landscape 2026: NVIDIA vs AMD vs Intel",
    excerpt:
      "A comprehensive comparison of NVIDIA H100, AMD Instinct MI300X, and Intel Gaudi 3 for enterprise AI training, inference, and HPC workloads.",
    date: "Jun 15, 2026",
    category: "Architecture",
    slug: "ai-chip-landscape-2026-comparison",
    image:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=250&fit=crop",
  },
  {
    title:
      "NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3: Enterprise Accelerator Guide",
    excerpt:
      "Side-by-side comparison of leading enterprise AI accelerators for data center GPU deployments — memory, bandwidth, TDP, and pricing breakdown.",
    date: "Jun 10, 2026",
    category: "Comparison",
    slug: "h100-vs-mi300x-vs-gaudi3-comparison",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop",
  },
  {
    title:
      "Multi-Vendor GPU Deployments: Enterprise Best Practices for AI Infrastructure",
    excerpt:
      "How to build and manage heterogeneous GPU infrastructure with chips from different manufacturers for AI training clusters and data center workloads.",
    date: "Jun 5, 2026",
    category: "Deployment",
    slug: "multi-vendor-gpu-deployments-best-practices",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
  },
];

export const HERO_PHRASES: string[] = [
  "Enterprise chip distributor — NVIDIA H100, AMD MI300X, Intel Xeon & more",
  "ISO 9001 certified AI infrastructure provider — global shipping from India",
  "Your trusted data center GPU distributor for AI, HPC & enterprise workloads",
];

export interface HeroStat {
  value: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  { value: "10,000+", label: "Enterprise Chips Supplied" },
  { value: "500+", label: "Enterprise Clients Worldwide" },
  { value: "99.9%", label: "Authenticity Guarantee" },
];

export const HERO_METRICS_LOG: string[] = [
  "BATCH: 2026-Q3",
  "STATUS: VERIFIED",
  "INVENTORY: AVAILABLE",
  "QUALITY: ISO 9001",
  "SHIPPING: GLOBAL",
  "CERTIFIED: AUTHENTIC",
  "WARRANTY: 36 MO",
  "SUPPORT: 24/7",
];
