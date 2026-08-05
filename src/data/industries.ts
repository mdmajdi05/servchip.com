import type { Industry } from "@/types";

export const INDUSTRIES: Industry[] = [
  {
    id: "data-centers",
    name: "Data Centers",
    slug: "data-centers",
    icon: "Server",
    description:
      "GPU-accelerated data center infrastructure for cloud, colocation and enterprise computing.",
    longDescription:
      "Servchip equips modern data centers with GPU-accelerated compute, high-speed networking and dense storage. From NVIDIA HGX reference platforms to full rack-scale AI clusters, we deliver the hardware backbone for hyperscale, colocation and enterprise data centers.",
    hero: {
      label: "Data Centers",
      title: "GPU-Accelerated Data Center Infrastructure",
      subtitle:
        "NVIDIA HGX platforms, Spectrum-X networking and full rack integration for modern data centers.",
    },
    seo: {
      metaTitle: "Data Center GPU Solutions | NVIDIA, AMD | Servchip",
      metaDescription:
        "GPU-accelerated data center solutions — NVIDIA H100, H200, B200, GB200, AMD Instinct, networking & storage. Enterprise chip distributor for data centers.",
      keywords: [
        "data center GPUs",
        "GPU-accelerated data center",
        "NVIDIA data center GPU distributor",
        "AI data center infrastructure",
        "data center hardware supplier",
      ],
    },
    faqs: [
      {
        question: "What hardware do you supply for data centers?",
        answer:
          "We supply NVIDIA HGX servers, AMD Instinct platforms, Intel Xeon servers, Spectrum-X and ConnectX networking, HBM memory and NVMe storage for complete data center builds.",
      },
      {
        question: "Do you deliver rack-scale AI clusters?",
        answer:
          "Yes. We deliver full rack-scale AI clusters including GB200 NVL72 and HGX platforms with power, cooling and networking integration.",
      },
      {
        question: "Can you support colocation providers?",
        answer:
          "Yes. We work with colocation and cloud providers to supply GPU capacity and accelerator hardware at scale.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "broadcom", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
        "enterprise-storage",
      ],
      useCases: ["ai-training", "ai-inference", "hpc", "data-analytics"],
    },
    stats: [
      { value: "Full racks", label: "AI cluster delivery" },
      { value: "400GbE+", label: "Networking" },
      { value: "99.99%", label: "Uptime-ready" },
    ],
  },
  {
    id: "ai-infrastructure",
    name: "AI Infrastructure",
    slug: "ai-infrastructure",
    icon: "Brain",
    description:
      "End-to-end AI infrastructure — training clusters, inference platforms and GPU-accelerated software stacks.",
    longDescription:
      "From single-node AI workstations to thousand-GPU training clusters, Servchip delivers complete AI infrastructure. We pair NVIDIA, AMD and Intel accelerators with high-bandwidth networking and memory to build production-ready AI systems for enterprises and research labs.",
    hero: {
      label: "AI Infrastructure",
      title: "Production-Grade AI Infrastructure",
      subtitle:
        "Training clusters, inference platforms and GPU-accelerated stacks built on authentic enterprise hardware.",
    },
    seo: {
      metaTitle: "AI Infrastructure Solutions | NVIDIA, AMD | Servchip",
      metaDescription:
        "End-to-end AI infrastructure — training clusters, inference platforms, GPU-accelerated servers. Enterprise AI hardware distributor for production workloads.",
      keywords: [
        "AI infrastructure",
        "AI training cluster",
        "GPU cluster supplier",
        "AI inference infrastructure",
        "enterprise AI hardware",
      ],
    },
    faqs: [
      {
        question: "What is included in your AI infrastructure solutions?",
        answer:
          "We provide accelerators, GPU servers, high-speed networking, HBM memory and storage — everything needed to build production AI infrastructure.",
      },
      {
        question: "Do you support both training and inference?",
        answer:
          "Yes. We supply H100, H200, B200 and GB200 for training, plus L40S, RTX and optimized inference platforms for production serving.",
      },
      {
        question: "Can you design custom AI clusters?",
        answer:
          "Yes. Our engineers help design custom AI clusters matched to your workload, budget and data center constraints.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "hpe"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "intel-gaudi",
        "server-cpus",
        "ai-servers",
        "ai-memory",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "1–1000+", label: "GPU cluster scale" },
      { value: "NVLink", label: "High-speed interconnect" },
      { value: "Full stack", label: "Hardware + networking" },
    ],
  },
  {
    id: "healthcare",
    name: "Healthcare & Life Sciences",
    slug: "healthcare",
    icon: "HeartPulse",
    description:
      "GPU-accelerated computing for medical imaging, drug discovery, genomics and healthcare AI.",
    longDescription:
      "Servchip powers healthcare and life sciences innovation with GPU-accelerated hardware for medical imaging AI, drug discovery, genomics and clinical research. We supply NVIDIA RTX and data center GPUs to hospitals, pharma companies and research labs.",
    hero: {
      label: "Healthcare",
      title: "GPU Computing for Healthcare & Life Sciences",
      subtitle:
        "Accelerate medical imaging, drug discovery and genomics with authentic enterprise GPUs.",
    },
    seo: {
      metaTitle: "Healthcare AI & GPU Solutions | NVIDIA | Servchip",
      metaDescription:
        "GPU-accelerated solutions for healthcare — medical imaging AI, drug discovery, genomics. NVIDIA RTX & data center GPUs for hospitals and pharma.",
      keywords: [
        "healthcare AI",
        "medical imaging GPU",
        "drug discovery GPU",
        "genomics computing",
        "NVIDIA healthcare solutions",
      ],
    },
    faqs: [
      {
        question: "Which GPUs are best for medical imaging AI?",
        answer:
          "NVIDIA RTX 6000 and RTX 5000 GPUs are ideal for medical imaging AI, while data center GPUs like L40S handle larger clinical workloads.",
      },
      {
        question: "Do you support drug discovery workloads?",
        answer:
          "Yes. We supply NVIDIA data center GPUs and clusters used for molecular dynamics and AI-driven drug discovery.",
      },
      {
        question: "Can you help with HIPAA-compliant infrastructure?",
        answer:
          "We provide the hardware layer for HIPAA-compliant environments; your infrastructure team configures the software and compliance stack.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "server-cpus",
        "ai-servers",
        "enterprise-storage",
      ],
      useCases: ["healthcare", "ai-training", "ai-inference"],
    },
    stats: [
      { value: "RTX 6000", label: "Medical imaging GPU" },
      { value: "DGX-class", label: "Drug discovery compute" },
      { value: "100%", label: "Authentic hardware" },
    ],
  },
  {
    id: "finance",
    name: "Finance & Fintech",
    slug: "finance",
    icon: "BarChart3",
    description:
      "Low-latency GPU and CPU compute for trading, risk analytics, fraud detection and financial AI.",
    longDescription:
      "Servchip delivers low-latency, high-performance compute for the financial services industry. From GPU-accelerated risk analytics to low-latency trading servers, we supply the hardware that keeps financial institutions ahead in markets and fintech.",
    hero: {
      label: "Finance",
      title: "High-Performance Compute for Finance",
      subtitle:
        "Low-latency trading servers, GPU risk analytics and fraud-detection infrastructure.",
    },
    seo: {
      metaTitle: "Finance & Fintech GPU Solutions | NVIDIA | Servchip",
      metaDescription:
        "Low-latency GPU and CPU compute for trading, risk analytics and financial AI. Enterprise hardware for finance and fintech from Servchip.",
      keywords: [
        "finance GPU",
        "low-latency trading server",
        "risk analytics GPU",
        "fintech infrastructure",
        "financial AI hardware",
      ],
    },
    faqs: [
      {
        question: "What hardware do you supply for trading firms?",
        answer:
          "We supply low-latency servers with Intel Xeon and AMD EPYC CPUs, plus NVIDIA GPUs for risk analytics and algorithmic trading.",
      },
      {
        question: "Do you support GPU-accelerated risk analytics?",
        answer:
          "Yes. We supply NVIDIA data center GPUs that accelerate Monte Carlo simulations, VaR calculations and stress testing.",
      },
      {
        question: "Can you deliver time-critical infrastructure?",
        answer:
          "Yes. We prioritize fast delivery and provide expedited shipping for time-critical financial infrastructure projects.",
      },
    ],
    related: {
      brandIds: ["nvidia", "intel", "amd", "dell", "hpe"],
      categoryIds: [
        "nvidia-dc-gpus",
        "server-cpus",
        "ai-servers",
        "networking",
        "ai-memory",
      ],
      useCases: ["data-analytics", "ai-training", "ai-inference"],
    },
    stats: [
      { value: "Low-latency", label: "Trading infra" },
      { value: "Monte Carlo", label: "Risk analytics" },
      { value: "24/7", label: "Support" },
    ],
  },
  {
    id: "government",
    name: "Government & Public Sector",
    slug: "government",
    icon: "Landmark",
    description:
      "Secure, compliant AI and HPC infrastructure for government, defense and public institutions.",
    longDescription:
      "Servchip supplies secure and compliant AI and HPC infrastructure for government and public sector organizations. We support sovereign AI programs, national research initiatives and public institutions with authentic enterprise hardware and complete documentation.",
    hero: {
      label: "Government",
      title: "Secure AI & HPC for the Public Sector",
      subtitle:
        "Sovereign AI programs, national research and public infrastructure on authentic enterprise hardware.",
    },
    seo: {
      metaTitle: "Government AI & HPC Solutions | NVIDIA | Servchip",
      metaDescription:
        "Secure, compliant AI and HPC infrastructure for government and public sector — sovereign AI, national research and public institutions.",
      keywords: [
        "government AI",
        "sovereign AI infrastructure",
        "public sector HPC",
        "national AI program hardware",
        "government GPU procurement",
      ],
    },
    faqs: [
      {
        question: "Do you support sovereign AI programs?",
        answer:
          "Yes. We supply accelerators and full clusters for sovereign AI initiatives with complete documentation and compliance support.",
      },
      {
        question: "Can you meet government procurement requirements?",
        answer:
          "Yes. We provide the documentation, warranties and compliance paperwork required for government procurement.",
      },
      {
        question: "Do you supply defense-grade hardware?",
        answer:
          "We supply enterprise-grade hardware and work with authorized programs; export-controlled items follow applicable regulations.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "hpe", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
        "enterprise-storage",
      ],
      useCases: ["hpc", "ai-training", "ai-inference"],
    },
    stats: [
      { value: "Sovereign AI", label: "Program support" },
      { value: "100%", label: "Compliant docs" },
      { value: "Nationwide", label: "Delivery" },
    ],
  },
  {
    id: "research",
    name: "Research & Academia",
    slug: "research",
    icon: "FlaskConical",
    description:
      "HPC clusters and GPU compute for universities, national labs and scientific research.",
    longDescription:
      "Servchip supports scientific discovery with high-performance computing infrastructure for universities, national laboratories and research institutions. From GPU workstations to multi-node HPC clusters, we help researchers compute faster.",
    hero: {
      label: "Research",
      title: "HPC & GPU Computing for Research",
      subtitle:
        "Power universities, national labs and scientific research with authentic HPC hardware.",
    },
    seo: {
      metaTitle: "Research HPC & GPU Clusters | NVIDIA, AMD | Servchip",
      metaDescription:
        "HPC clusters and GPU compute for universities, national labs and scientific research. NVIDIA & AMD accelerators from Servchip.",
      keywords: [
        "research HPC",
        "university GPU cluster",
        "academic computing",
        "scientific HPC hardware",
        "national lab GPU",
      ],
    },
    faqs: [
      {
        question: "Do you support academic and research discounts?",
        answer:
          "Yes. We work with universities and research institutions to provide cost-effective HPC and GPU solutions.",
      },
      {
        question: "What hardware do you supply for research?",
        answer:
          "We supply NVIDIA H100/H200, AMD Instinct MI300X, Intel Xeon CPUs and full HPC cluster infrastructure for research workloads.",
      },
      {
        question: "Can you help design research clusters?",
        answer:
          "Yes. Our team helps design HPC and GPU clusters matched to your research field — from genomics to climate modeling.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "intel-gaudi",
        "server-cpus",
        "ai-servers",
        "ai-memory",
      ],
      useCases: ["hpc", "ai-training", "data-analytics"],
    },
    stats: [
      { value: "Multi-node", label: "HPC clusters" },
      { value: "DGX-class", label: "Research compute" },
      { value: "100%", label: "Authentic sourcing" },
    ],
  },
  {
    id: "telecom",
    name: "Telecom & Edge",
    slug: "telecom",
    icon: "Radio",
    description:
      "Edge AI inference, 5G infrastructure and telecom data center hardware.",
    longDescription:
      "Servchip supplies edge computing and telecom infrastructure for 5G, network edge AI and distributed data centers. We deliver GPU-accelerated edge platforms and telecom-grade networking to operators and enterprises.",
    hero: {
      label: "Telecom",
      title: "Edge AI & Telecom Infrastructure",
      subtitle:
        "GPU-accelerated edge computing and telecom-grade hardware for 5G and distributed networks.",
    },
    seo: {
      metaTitle: "Telecom & Edge AI Solutions | NVIDIA | Servchip",
      metaDescription:
        "Edge AI inference, 5G infrastructure and telecom data center hardware. GPU-accelerated edge platforms from Servchip.",
      keywords: [
        "edge AI",
        "telecom infrastructure",
        "5G edge computing",
        "NVIDIA edge AI",
        "distributed data center hardware",
      ],
    },
    faqs: [
      {
        question: "What hardware do you supply for edge AI?",
        answer:
          "We supply NVIDIA RTX and data center GPUs optimized for edge inference, plus networking and storage for distributed deployments.",
      },
      {
        question: "Do you support 5G infrastructure?",
        answer:
          "Yes. We supply telecom-grade servers and networking hardware that support 5G core and edge workloads.",
      },
      {
        question: "Can you deliver to remote or edge sites?",
        answer:
          "Yes. We coordinate global delivery to remote edge sites with proper packaging and logistics.",
      },
    ],
    related: {
      brandIds: ["nvidia", "intel", "amd", "cisco", "broadcom"],
      categoryIds: [
        "nvidia-dc-gpus",
        "server-cpus",
        "ai-servers",
        "networking",
        "ai-memory",
      ],
      useCases: ["edge-computing", "ai-inference"],
    },
    stats: [
      { value: "Edge", label: "Inference optimized" },
      { value: "400GbE", label: "Networking" },
      { value: "5G-ready", label: "Infrastructure" },
    ],
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industry 4.0",
    slug: "manufacturing",
    icon: "Factory",
    description:
      "GPU compute for digital twins, industrial AI, computer vision and smart manufacturing.",
    longDescription:
      "Servchip powers Industry 4.0 with GPU-accelerated compute for digital twins, industrial AI, computer vision and predictive maintenance. We supply the hardware that enables smart factories and industrial innovation.",
    hero: {
      label: "Manufacturing",
      title: "GPU Compute for Industry 4.0",
      subtitle:
        "Digital twins, industrial AI and computer vision on authentic enterprise hardware.",
    },
    seo: {
      metaTitle: "Industrial AI & Digital Twin Solutions | NVIDIA | Servchip",
      metaDescription:
        "GPU compute for digital twins, industrial AI, computer vision and smart manufacturing. NVIDIA enterprise GPUs from Servchip.",
      keywords: [
        "industrial AI",
        "digital twin GPU",
        "smart manufacturing",
        "computer vision hardware",
        "Industry 4.0 infrastructure",
      ],
    },
    faqs: [
      {
        question: "What hardware supports digital twins?",
        answer:
          "NVIDIA RTX and L40S GPUs with large memory are ideal for real-time digital twins and industrial simulation.",
      },
      {
        question: "Do you support computer vision at scale?",
        answer:
          "Yes. We supply GPU clusters for industrial computer vision, quality inspection and defect detection at scale.",
      },
      {
        question: "Can you support edge industrial deployments?",
        answer:
          "Yes. We provide rugged and optimized edge GPU platforms for factory-floor AI deployments.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["ai-inference", "ai-training", "edge-computing"],
    },
    stats: [
      { value: "Digital twin", label: "Real-time simulation" },
      { value: "Edge", label: "Factory-floor AI" },
      { value: "100%", label: "Authentic hardware" },
    ],
  },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}

export function getIndustry(id: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.id === id);
}
