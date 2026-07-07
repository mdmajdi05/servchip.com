import type { LucideIcon } from "lucide-react";
import {
  ShieldCheck, Award, Globe, Zap, Wrench, Rocket,
  Search, FileText, Package,
  Star,
} from "lucide-react";

export interface TrustBarItem {
  icon: string;
  text: string;
  badge?: string;
}

export const TRUST_BAR_ITEMS: TrustBarItem[] = [
  { icon: "⚡", text: "NVIDIA Official Partner", badge: "★" },
  { icon: "✅", text: "ISO 9001:2015 Certified" },
  { icon: "🏢", text: "Acme Corp" },
  { icon: "🏢", text: "TechSphere" },
  { icon: "🏢", text: "DataFlow" },
  { icon: "🏢", text: "CloudNova" },
  { icon: "🏢", text: "Apex Labs" },
  { icon: "🏢", text: "QuantumCore" },
  { icon: "🌍", text: "Trusted by 200+ Enterprises Worldwide" },
];

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
  decimals?: number;
}

export const STATS: Stat[] = [
  { value: 500, suffix: "+", label: "Chips Delivered", icon: "Cpu" },
  { value: 200, suffix: "+", label: "Enterprise Clients", icon: "Building2" },
  { value: 50, suffix: "+", label: "Industry Partners", icon: "Handshake" },
  { value: 99.9, suffix: "%", label: "Authenticity Rate", icon: "ShieldCheck", decimals: 1 },
];

export const TECHNOLOGY_FEATURES: string[] = [
  "Hopper Architecture — Next-gen AI performance with Transformer Engine",
  "Blackwell Platform — Unprecedented scale for trillion-parameter AI models",
  "NVLink & NVSwitch — Seamless GPU interconnect up to 900GB/s",
  "Tensor Cores Gen 5 — Accelerated AI/ML with FP8 precision",
  "CUDA Ecosystem — World's most comprehensive parallel computing platform",
  "MIG Technology — Multi-Instance GPU for secure resource partitioning",
  "Grace CPU Superchip — 144 Arm cores, 1TB/s memory bandwidth",
];

export interface WhyFeature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export const WHY_FEATURES: WhyFeature[] = [
  { icon: ShieldCheck, title: "100% Authentic", desc: "Every chip sourced directly from NVIDIA and authorized partners. Zero counterfeit policy with full chain of custody." },
  { icon: Award, title: "Certified Quality", desc: "ISO 9001:2015 certified. Rigorous testing, full traceability, and complete documentation with every shipment." },
  { icon: Globe, title: "Global Delivery", desc: "Ship to 150+ countries with secure, insured logistics. Express shipping options available for urgent needs." },
  { icon: Zap, title: "Enterprise Support", desc: "Dedicated account managers for every client. Technical team with deep NVIDIA architecture expertise." },
  { icon: Wrench, title: "Expert Engineering Team", desc: "Certified NVIDIA engineers with hands-on experience in AI, HPC, and data center deployments." },
  { icon: Rocket, title: "Fast Turnaround", desc: "24-hour quote response guaranteed. Express shipping available for time-critical projects." },
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
    specs: { architecture: "Hopper", memory: "80GB HBM3", bandwidth: "3.35 TB/s" },
    badge: "Popular",
    badgeVariant: "amber",
  },
  {
    name: "NVIDIA H200",
    slug: "nvidia-h200-tensor-core-gpu",
    specs: { architecture: "Hopper", memory: "141GB HBM3e", bandwidth: "4.8 TB/s" },
    badge: "Latest",
    badgeVariant: "cyan",
  },
  {
    name: "NVIDIA B200",
    slug: "nvidia-b200-tensor-core-gpu",
    specs: { architecture: "Blackwell", memory: "384GB HBM3e", bandwidth: "10 TB/s" },
    badge: "Flagship",
    badgeVariant: "purple",
    winner: true,
  },
];

export interface HowItWorksStep {
  icon: LucideIcon;
  number: string;
  title: string;
  desc: string;
}

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  { icon: Search, number: "1", title: "Browse & Select", desc: "Explore our complete chip catalog with detailed specifications and expert recommendations." },
  { icon: FileText, number: "2", title: "Request a Quote", desc: "Submit your requirements and get a personalized quote within 24 hours." },
  { icon: Package, number: "3", title: "Receive & Deploy", desc: "Fast delivery worldwide with full traceability and enterprise-level support." },
];

export interface Testimonial {
  content: string;
  author: { name: string; role: string; avatar: string };
  rating: number;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    content: "Servchip delivered our H100 cluster ahead of schedule. Their technical team helped us configure NVLink for optimal AI training throughput. Exceptional support throughout.",
    author: { name: "Dr. Alex Chen", role: "CTO, QuantumAI Labs", avatar: "AC" },
    rating: 5,
    company: "QuantumAI Labs",
  },
  {
    content: "We needed 200 RTX 6000 Ada GPUs for our rendering farm. Servchip sourced them within 3 weeks at competitive pricing. Every card tested and documented.",
    author: { name: "Sarah Mitchell", role: "VP Engineering, RenderForge", avatar: "SM" },
    rating: 5,
    company: "RenderForge Inc.",
  },
  {
    content: "The engineering consultation saved us from a costly architecture mistake. Their team's deep NVIDIA knowledge is unmatched. Long-term partner for sure.",
    author: { name: "Marcus Williams", role: "Head of Infrastructure, DataSphere", avatar: "MW" },
    rating: 5,
    company: "DataSphere Corp.",
  },
  {
    content: "Outstanding logistics and support for our overseas deployment. Servchip handled customs, documentation, and on-site configuration. Truly enterprise-grade service.",
    author: { name: "Yuki Tanaka", role: "Director of IT, TechFrontier KK", avatar: "YT" },
    rating: 5,
    company: "TechFrontier KK",
  },
];

export interface InsightPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  slug: string;
}

export const INSIGHT_POSTS: InsightPost[] = [
  {
    title: "Blackwell Architecture Deep Dive: What B200 Brings to AI",
    excerpt: "A comprehensive analysis of NVIDIA's next-gen architecture and its implications for enterprise AI workloads.",
    date: "Jun 15, 2026",
    category: "Architecture",
    slug: "blackwell-architecture-deep-dive",
  },
  {
    title: "H100 vs H200 vs B200: Choosing the Right AI Accelerator",
    excerpt: "A side-by-side comparison of NVIDIA's current GPU lineup for AI training, inference, and HPC workloads.",
    date: "Jun 10, 2026",
    category: "Comparison",
    slug: "h100-vs-h200-vs-b200-comparison",
  },
  {
    title: "The Role of MIG in Multi-Tenant GPU Deployments",
    excerpt: "How Multi-Instance GPU technology enables secure resource partitioning for cloud and enterprise environments.",
    date: "Jun 5, 2026",
    category: "Deployment",
    slug: "mig-multi-tenant-gpu-deployments",
  },
];

export const HERO_PHRASES: string[] = [
  "Enterprise NVIDIA GPUs for AI, ML & HPC workloads",
  "Your trusted source for authentic NVIDIA computing solutions",
  "From data centers to research labs — we drive innovation",
];

export interface HeroStat {
  value: string;
  label: string;
}

export const HERO_STATS: HeroStat[] = [
  { value: "500+", label: "Chips Delivered" },
  { value: "200+", label: "Enterprise Clients" },
  { value: "99.9%", label: "Authenticity Rate" },
];

export const HERO_METRICS_LOG: string[] = [
  "CORE_LOAD: 94.2%", "NVLINK: 400GB/s", "CUDA_READY", "MEM_ALLOC: OK",
  "THERMAL: 62°C", "VOLTAGE: 1.12V", "TENSOR_FLOPS: MAX", "BUS_ACTIVE",
];
