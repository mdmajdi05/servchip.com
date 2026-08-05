import type { Solution } from "@/types";

export const SOLUTIONS: Solution[] = [
  {
    id: "ai-training",
    name: "AI Training",
    slug: "ai-training",
    icon: "Brain",
    description:
      "Multi-GPU training clusters for large-scale AI model training with NVLink interconnects.",
    longDescription:
      "Servchip builds production AI training clusters powered by NVIDIA H100, H200, B200 and GB200, plus AMD Instinct MI300X platforms. With NVLink and InfiniBand interconnects, HBM memory and complete rack integration, we deliver the compute backbone for foundation model and enterprise AI training.",
    hero: {
      label: "AI Training",
      title: "Large-Scale AI Training Clusters",
      subtitle:
        "NVIDIA HGX and AMD Instinct platforms with NVLink, InfiniBand and full rack-scale integration.",
    },
    seo: {
      metaTitle: "AI Training Clusters | NVIDIA H100, H200, GB200 | Servchip",
      metaDescription:
        "Build production AI training clusters with NVIDIA H100, H200, B200, GB200 and AMD Instinct MI300X. Enterprise AI training infrastructure from Servchip.",
      keywords: [
        "AI training cluster",
        "NVIDIA H100 training",
        "GB200 NVL72",
        "GPU training infrastructure",
        "foundation model training",
      ],
    },
    faqs: [
      {
        question: "What GPUs are best for AI model training?",
        answer:
          "NVIDIA H100, H200, B200 and GB200 are the leading training GPUs, with AMD Instinct MI300X and MI350X as strong alternatives.",
      },
      {
        question: "Do you deliver full training clusters?",
        answer:
          "Yes. We deliver complete training clusters including GPUs, NVLink backplanes, InfiniBand networking, storage and rack integration.",
      },
      {
        question: "Can you support foundation model training?",
        answer:
          "Yes. Our clusters are designed for foundation model and large-scale enterprise training workloads with high-bandwidth interconnect.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "intel-gaudi",
        "ai-servers",
        "networking",
        "ai-memory",
      ],
      useCases: ["ai-training", "hpc"],
    },
    stats: [
      { value: "1–1000+", label: "GPU clusters" },
      { value: "NVLink", label: "Full-speed interconnect" },
      { value: "400GbE", label: "InfiniBand networking" },
    ],
  },
  {
    id: "ai-inference",
    name: "AI Inference",
    slug: "ai-inference",
    icon: "Zap",
    description:
      "Optimized inference platforms for real-time AI serving, LLM inference and production deployments.",
    longDescription:
      "Servchip provides production-ready AI inference infrastructure — from single L40S nodes to large-scale serving clusters. We optimize hardware for LLM inference, computer vision, recommendation systems and real-time AI applications with the right balance of performance, power and cost.",
    hero: {
      label: "AI Inference",
      title: "Production-Ready AI Inference Platforms",
      subtitle:
        "Optimized GPU platforms for LLM serving, computer vision and real-time AI at scale.",
    },
    seo: {
      metaTitle: "AI Inference Infrastructure | NVIDIA L40S, H200 | Servchip",
      metaDescription:
        "Production AI inference platforms — NVIDIA L40S, H200, RTX 6000 for LLM serving, computer vision and real-time AI. Enterprise inference hardware.",
      keywords: [
        "AI inference",
        "LLM inference",
        "NVIDIA L40S",
        "inference server",
        "real-time AI serving",
      ],
    },
    faqs: [
      {
        question: "Which GPUs are best for LLM inference?",
        answer:
          "NVIDIA H200, L40S and RTX 6000 GPUs excel at LLM inference, balancing throughput, latency and cost per token.",
      },
      {
        question: "Do you provide inference servers?",
        answer:
          "Yes. We supply ready-to-deploy inference servers and clusters configured for your model and traffic requirements.",
      },
      {
        question: "Can you optimize for cost per inference?",
        answer:
          "Yes. We help select the right GPU and platform mix to minimize cost per inference while meeting latency targets.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["ai-inference", "edge-computing"],
    },
    stats: [
      { value: "L40S", label: "Cost-efficient inference" },
      { value: "Low", label: "Token latency" },
      { value: "Scale", label: "To 1000s of GPUs" },
    ],
  },
  {
    id: "hpc",
    name: "High-Performance Computing",
    slug: "hpc",
    icon: "Server",
    description:
      "HPC clusters for scientific simulation, molecular modeling and financial analytics.",
    longDescription:
      "Servchip builds high-performance computing clusters for scientific research, engineering simulation, molecular dynamics and financial analytics. Combining NVIDIA, AMD and Intel accelerators with high-speed fabric, we deliver HPC infrastructure that scales from workstations to supercomputers.",
    hero: {
      label: "HPC",
      title: "High-Performance Computing Clusters",
      subtitle:
        "Scientific simulation, molecular modeling and financial analytics on enterprise HPC infrastructure.",
    },
    seo: {
      metaTitle: "HPC Clusters & Solutions | NVIDIA, AMD | Servchip",
      metaDescription:
        "HPC clusters for scientific simulation, molecular dynamics and financial analytics. NVIDIA & AMD HPC infrastructure from Servchip.",
      keywords: [
        "HPC cluster",
        "high-performance computing",
        "scientific simulation hardware",
        "molecular dynamics GPU",
        "financial analytics HPC",
      ],
    },
    faqs: [
      {
        question: "What hardware powers HPC clusters?",
        answer:
          "NVIDIA H100/H200, AMD Instinct MI300A and Intel Xeon CPUs with InfiniBand fabric power our HPC clusters.",
      },
      {
        question: "Do you support GPU-accelerated scientific simulation?",
        answer:
          "Yes. We deliver GPU-accelerated nodes for CFD, molecular dynamics, climate modeling and engineering simulation.",
      },
      {
        question: "Can you design HPC clusters for research labs?",
        answer:
          "Yes. We design and deliver HPC clusters tailored to research fields, from genomics to physics and finance.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "hpe"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "ai-memory",
      ],
      useCases: ["hpc", "data-analytics"],
    },
    stats: [
      { value: "PFLOPS", label: "Class performance" },
      { value: "InfiniBand", label: "Low-latency fabric" },
      { value: "Multi-node", label: "Scaling" },
    ],
  },
  {
    id: "ai-infrastructure",
    name: "AI Infrastructure",
    slug: "ai-infrastructure",
    icon: "Cpu",
    description:
      "Complete AI infrastructure — accelerators, servers, networking and storage for enterprise AI.",
    longDescription:
      "Servchip delivers complete AI infrastructure solutions combining accelerators, GPU servers, high-speed networking, HBM memory and storage. From design to deployment, we provide the end-to-end hardware foundation for enterprise AI programs.",
    hero: {
      label: "AI Infrastructure",
      title: "Complete Enterprise AI Infrastructure",
      subtitle:
        "Accelerators, GPU servers, networking, memory and storage — everything your AI program needs.",
    },
    seo: {
      metaTitle:
        "Enterprise AI Infrastructure | GPU Servers & Networking | Servchip",
      metaDescription:
        "Complete AI infrastructure — NVIDIA & AMD accelerators, GPU servers, networking, HBM memory and storage. Enterprise AI hardware from Servchip.",
      keywords: [
        "enterprise AI infrastructure",
        "GPU server",
        "AI data center",
        "AI hardware solutions",
        "accelerator infrastructure",
      ],
    },
    faqs: [
      {
        question: "What does a complete AI infrastructure include?",
        answer:
          "Accelerators, GPU servers, high-speed networking, HBM memory and storage — fully integrated and ready for AI workloads.",
      },
      {
        question: "Do you provide design support?",
        answer:
          "Yes. Our engineers help design your AI infrastructure from architecture to rack layout and power planning.",
      },
      {
        question: "Can you scale with our AI program?",
        answer:
          "Yes. We design infrastructure that scales from pilot deployments to production at 1000+ GPUs.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "broadcom", "hpe"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
        "ai-memory",
        "enterprise-storage",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "End-to-end", label: "Infrastructure" },
      { value: "1000+", label: "GPU scalability" },
      { value: "Full", label: "Integration support" },
    ],
  },
  {
    id: "data-centers",
    name: "Data Center Acceleration",
    slug: "data-centers",
    icon: "Building2",
    description:
      "GPU-accelerated data center deployments for cloud, enterprise and colocation providers.",
    longDescription:
      "Servchip accelerates data centers with GPU-accelerated compute, dense networking and optimized infrastructure. We help cloud providers, enterprises and colocation facilities deploy and scale accelerated computing capacity.",
    hero: {
      label: "Data Centers",
      title: "Accelerated Data Center Deployments",
      subtitle:
        "Deploy and scale GPU capacity for cloud, enterprise and colocation data centers.",
    },
    seo: {
      metaTitle: "Data Center Acceleration Solutions | NVIDIA | Servchip",
      metaDescription:
        "GPU-accelerated data center deployments for cloud, enterprise and colocation providers. NVIDIA acceleration hardware from Servchip.",
      keywords: [
        "data center acceleration",
        "GPU capacity deployment",
        "accelerated data center",
        "NVIDIA data center",
        "colocation GPU",
      ],
    },
    faqs: [
      {
        question: "How do you accelerate data center deployments?",
        answer:
          "We deliver GPU-accelerated nodes and full racks with networking and storage, ready for rapid data center deployment.",
      },
      {
        question: "Do you work with cloud and colocation providers?",
        answer:
          "Yes. We supply accelerator hardware to cloud providers and colocation facilities scaling GPU capacity.",
      },
      {
        question: "Can you meet data center timelines?",
        answer:
          "Yes. We coordinate logistics and delivery to meet data center construction and capacity expansion timelines.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "networking",
        "enterprise-storage",
      ],
      useCases: ["data-analytics", "ai-inference", "ai-training"],
    },
    stats: [
      { value: "Full racks", label: "Deployment" },
      { value: "Fast", label: "Turnaround" },
      { value: "100%", label: "Authentic hardware" },
    ],
  },
  {
    id: "enterprise-procurement",
    name: "Enterprise Procurement",
    slug: "enterprise-procurement",
    icon: "ShoppingCart",
    description:
      "Simplified semiconductor procurement — RFQ, bulk sourcing, import/export and supply chain support.",
    longDescription:
      "Servchip makes enterprise semiconductor procurement simple. From single-chip RFQs to bulk volume sourcing, we handle authentic sourcing, global shipping, customs and compliance. Our ISO 9001 certified process delivers chain-of-custody documentation on every order.",
    hero: {
      label: "Procurement",
      title: "Enterprise Semiconductor Procurement",
      subtitle:
        "RFQ-based sourcing, bulk volumes and global logistics with full chain-of-custody documentation.",
    },
    seo: {
      metaTitle: "Enterprise Chip Procurement | RFQ & Bulk Sourcing | Servchip",
      metaDescription:
        "Enterprise semiconductor procurement — RFQ, bulk sourcing, import/export and supply chain support. ISO 9001 certified distributor from Servchip.",
      keywords: [
        "chip procurement",
        "semiconductor sourcing",
        "bulk chip supply",
        "enterprise RFQ",
        "chip supply chain",
      ],
    },
    faqs: [
      {
        question: "How does the RFQ process work?",
        answer:
          "Submit your RFQ with part numbers and quantities. Our team responds with pricing, availability and lead times within 24 hours.",
      },
      {
        question: "Do you support bulk and volume sourcing?",
        answer:
          "Yes. We source bulk volumes for enterprises with competitive pricing, flexible payment terms and dedicated account management.",
      },
      {
        question: "Can you handle international shipping and customs?",
        answer:
          "Yes. We handle global shipping, customs clearance and provide complete import/export documentation.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "broadcom", "micron", "samsung"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-memory",
        "enterprise-storage",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "24h", label: "Quote turnaround" },
      { value: "ISO 9001", label: "Certified process" },
      { value: "Worldwide", label: "Shipping" },
    ],
  },
];

export function getSolutionBySlug(slug: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.slug === slug);
}

export function getSolution(id: string): Solution | undefined {
  return SOLUTIONS.find((s) => s.id === id);
}
