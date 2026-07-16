import type { BlogPost, BlogCategory, BlogTag } from "@/types";

export const BLOG_CATEGORIES: BlogCategory[] = [
  {
    id: "architecture",
    name: "Architecture",
    slug: "architecture",
    description: "Deep dives into chip architectures",
    postCount: 3,
  },
  {
    id: "comparison",
    name: "Comparison",
    slug: "comparison",
    description: "Side-by-side chip comparisons",
    postCount: 1,
  },
  {
    id: "deployment",
    name: "Deployment",
    slug: "deployment",
    description: "Deployment guides and best practices",
    postCount: 2,
  },
  {
    id: "guides",
    name: "Guides",
    slug: "guides",
    description: "Technical guides and tutorials",
    postCount: 2,
  },
  {
    id: "case-studies",
    name: "Case Studies",
    slug: "case-studies",
    description: "Real-world deployment stories",
    postCount: 1,
  },
];

export const BLOG_TAGS: BlogTag[] = [
  { id: "ai-training", name: "AI Training", slug: "ai-training" },
  { id: "inference", name: "Inference", slug: "inference" },
  { id: "hpc", name: "HPC", slug: "hpc" },
  { id: "data-center", name: "Data Center", slug: "data-center" },
  { id: "edge", name: "Edge Computing", slug: "edge" },
  { id: "nvidia", name: "NVIDIA", slug: "nvidia" },
  { id: "amd", name: "AMD", slug: "amd" },
  { id: "intel", name: "Intel", slug: "intel" },
  { id: "networking", name: "Networking", slug: "networking" },
  { id: "storage", name: "Storage", slug: "storage" },
  { id: "memory", name: "Memory", slug: "memory" },
];

function cat(slug: string): BlogCategory {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)!;
}

function tag(slug: string): BlogTag {
  return BLOG_TAGS.find((t) => t.slug === slug)!;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "AI Chip Landscape 2026: NVIDIA, AMD, Intel Compared",
    slug: "ai-chip-landscape-2026-comparison",
    excerpt:
      "A comprehensive analysis of the current AI chip market. We compare NVIDIA H100/H200/B200, AMD Instinct MI300X, and Intel Gaudi 3 across performance, memory, and ecosystem.",
    content: "",
    featuredImage:
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=450&fit=crop",
    category: cat("architecture"),
    tags: [
      tag("ai-training"),
      tag("data-center"),
      tag("nvidia"),
      tag("amd"),
      tag("intel"),
    ],
    author: { name: "Servchip Tech Team", avatar: "ST" },
    readingTime: 12,
    publishedAt: "2026-06-15",
    isPublished: true,
    seo: {
      metaTitle: "AI Chip Landscape 2026 | NVIDIA vs AMD vs Intel | Servchip",
      metaDescription:
        "Comprehensive comparison of NVIDIA H100/B200, AMD MI300X, and Intel Gaudi 3 for AI workloads. Find the right AI accelerator for your needs.",
    },
    sections: [
      {
        heading: "The Three Pillars of AI Acceleration",
        paragraphs: [
          "The AI chip landscape in 2026 is defined by three major architectures: NVIDIA's Hopper and Blackwell families, AMD's CDNA 3 and 4-based Instinct accelerators, and Intel's Gaudi series. Each takes a fundamentally different approach to solving the same problem — accelerating large-scale AI training and inference. Understanding these architectural philosophies is critical for making informed procurement decisions.",
          "NVIDIA continues to dominate with its CUDA ecosystem and the broadest deployment base. The H100 remains the most widely deployed AI accelerator globally, while the B200 Blackwell represents the cutting edge with FP4 tensor core support and 384GB HBM3e memory. AMD's MI300X counters with 192GB HBM3 memory and a chiplet-based design that enables cost-effective scaling. Intel's Gaudi 3 differentiates through its integrated Ethernet fabric and open software stack.",
        ],
        bullets: [
          "NVIDIA H200: 141GB HBM3e, 4.8 TB/s bandwidth, 700W TDP — the most deployed AI accelerator",
          "NVIDIA B200: 384GB HBM3e, 10 TB/s bandwidth, 1000W TDP — flagship for trillion-parameter models",
          "AMD MI300X: 192GB HBM3, 5.2 TB/s bandwidth, 750W TDP — strongest memory-per-dollar ratio",
          "Intel Gaudi 3: 144GB HBM2e, 3.9 TB/s bandwidth, 600W TDP — integrated Ethernet on-chip",
          "All three support FP8/BF16 precision for training and INT8/FP8 for inference",
        ],
      },
      {
        heading: "Ecosystem and Total Cost of Ownership",
        paragraphs: [
          "While raw specifications tell part of the story, the total cost of ownership depends heavily on the software ecosystem. NVIDIA's CUDA platform remains the most mature, with support across every major framework and the broadest library of optimized kernels. AMD's ROCm has made significant strides in 2025-2026, with full support for PyTorch 2.x and TensorFlow, though some niche libraries still lag. Intel's Gaudi software stack is open-source and PyTorch-native, offering the fastest path from model to production for teams already using open frameworks.",
          "When evaluating TCO, consider not just the accelerator cost but the networking fabric required. NVIDIA's NVLink and InfiniBand add significant cost but deliver the highest all-reduce bandwidth. AMD's Infinity Fabric provides competitive performance at lower cost. Gaudi 3's integrated Ethernet eliminates the need for separate networking silicon, simplifying cluster architecture and reducing total system cost by up to 30% for equivalent scale.",
        ],
      },
      {
        heading: "Market Trends and Recommendations",
        paragraphs: [
          "For enterprises building new AI infrastructure in 2026, we recommend a multi-vendor strategy. Deploy NVIDIA Blackwell for flagship training clusters where maximum performance is required, AMD Instinct for cost-sensitive training and inference workloads, and Intel Gaudi for inference-serving clusters where the integrated networking provides architectural simplicity. This approach provides vendor diversity, competitive pricing leverage, and workload optimization across the AI stack.",
          "Contact our engineering team for a free architecture consultation. We can help you benchmark your specific workloads across all three platforms and provide a detailed TCO analysis for your deployment scale.",
        ],
      },
    ],
    relatedProductIds: [
      "nvidia-h100",
      "nvidia-h200",
      "nvidia-b200",
      "amd-mi300x",
      "intel-gaudi-3",
    ],
    relatedPostIds: ["2", "4", "5"],
  },
  {
    id: "2",
    title: "H100 vs MI300X vs Gaudi 3: Choosing the Right AI Accelerator",
    slug: "h100-vs-mi300x-vs-gaudi3-comparison",
    excerpt:
      "Detailed comparison of the three leading AI accelerators — NVIDIA H100, AMD MI300X, and Intel Gaudi 3 — for training, inference, and HPC workloads.",
    content: "",
    featuredImage:
      "https://images.unsplash.com/photo-1555618561-5b0e7a3f7b9a?w=800&h=450&fit=crop",
    category: cat("comparison"),
    tags: [
      tag("ai-training"),
      tag("inference"),
      tag("nvidia"),
      tag("amd"),
      tag("intel"),
    ],
    author: { name: "Servchip Tech Team", avatar: "ST" },
    readingTime: 15,
    publishedAt: "2026-06-10",
    isPublished: true,
    seo: {
      metaTitle: "H100 vs MI300X vs Gaudi 3 Comparison | Servchip",
      metaDescription:
        "Compare NVIDIA H100, AMD MI300X, and Intel Gaudi 3 AI accelerators head-to-head for performance, memory, and cost considerations.",
    },
    sections: [
      {
        heading: "Performance Face-Off: Training Throughput",
        paragraphs: [
          "In controlled benchmarks running Llama 3 70B training with FP8 precision, the NVIDIA H100 achieves 1,979 FP8 TFLOPS peak, the AMD MI300X delivers competitive throughput with its 192GB memory advantage enabling larger batch sizes, and the Intel Gaudi 3 provides approximately 1,200 FP8 TFLOPS with the benefit of integrated networking eliminating one layer of communication overhead. Real-world throughput depends heavily on model parallelism strategy and cluster topology.",
          "The H100's NVLink 4.0 interconnect at 900 GB/s per GPU provides the fastest gradient synchronization in multi-GPU configurations. The MI300X's Infinity Fabric at 896 GB/s is nearly equivalent. Gaudi 3's integrated Ethernet operates at 400 GbE per port but benefits from direct GPU-to-network connectivity that reduces latency in distributed training scenarios by eliminating the NIC hop.",
        ],
      },
      {
        heading: "Inference Performance and Memory Capacity",
        paragraphs: [
          "For inference workloads, memory capacity often matters more than raw compute. The MI300X's 192GB HBM3 enables serving Llama 3 70B entirely within a single accelerator without model parallelism, achieving the lowest time-to-first-token. The H200's 141GB HBM3e also fits most large models, while the H100's 80GB requires tensor parallelism for models exceeding approximately 60B parameters. Gaudi 3's 144GB HBM2e is competitive for inference, and its native FP8 support provides efficient throughput.",
          "For throughput-optimized inference with continuous batching, both NVIDIA's TensorRT-LLM and AMD's ROCm-based vLLM provide mature serving stacks. Intel's Gaudi software stack integrates directly with PyTorch's native serving capabilities, offering the most straightforward deployment path for organizations already standardized on open-source tooling.",
        ],
      },
    ],
    relatedProductIds: [
      "nvidia-h100",
      "nvidia-h200",
      "amd-mi300x",
      "intel-gaudi-3",
      "intel-gaudi-2",
    ],
    relatedPostIds: ["1", "4", "5"],
  },
  {
    id: "3",
    title: "Multi-Vendor GPU Deployments: Best Practices for Enterprise",
    slug: "multi-vendor-gpu-deployments-best-practices",
    excerpt:
      "How to build and manage heterogeneous GPU infrastructure with chips from NVIDIA, AMD, and Intel in the same data center.",
    content: "",
    featuredImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=450&fit=crop",
    category: cat("deployment"),
    tags: [
      tag("data-center"),
      tag("hpc"),
      tag("nvidia"),
      tag("amd"),
      tag("intel"),
    ],
    author: { name: "Servchip Tech Team", avatar: "ST" },
    readingTime: 10,
    publishedAt: "2026-06-05",
    isPublished: true,
    seo: {
      metaTitle: "Multi-Vendor GPU Deployments Guide | Servchip",
      metaDescription:
        "Best practices for deploying and managing heterogeneous GPU infrastructure with NVIDIA, AMD, and Intel accelerators.",
    },
    sections: [
      {
        heading: "Architecture Planning for Heterogeneous Clusters",
        paragraphs: [
          "Running a multi-vendor GPU cluster requires careful architecture planning. The key challenge is that each vendor's GPU interconnect is incompatible — NVLink does not connect to Infinity Fabric or Gaudi's Ethernet fabric. The solution is a tiered network architecture where GPUs from the same vendor are grouped into homogeneous islands connected by their native high-speed interconnect, and islands communicate over a shared high-speed Ethernet spine using standards-based collective communication libraries.",
          "NVIDIA's NCCL, AMD's RCCL, and Intel's oneCCL all support cross-vendor communication over standard Ethernet with RoCEv2 or InfiniBand. This enables a unified job scheduler like Slurm or Kubernetes to span heterogeneous resources. The performance penalty for cross-vendor communication over Ethernet is approximately 15-25% compared to same-vendor native interconnect, which should be factored into workload placement decisions.",
        ],
        bullets: [
          "Group same-vendor GPUs into homogeneous NVLink/Infinity Fabric/Gaudi-islands",
          "Connect islands via 400GbE or 800GbE spine using RoCEv2 for lossless Ethernet",
          "Use NCCL/RCCL/oneCCL with cross-vendor Ethernet support for unified communication",
          "Slurm and Kubernetes both support heterogeneous GPU scheduling with node labels",
          "Expected 15-25% performance penalty for cross-vendor GPU communication",
        ],
      },
      {
        heading: "Workload Placement and Resource Management",
        paragraphs: [
          "Intelligent workload placement is the key to maximizing heterogeneous cluster efficiency. Training workloads that benefit most from high-bandwidth interconnects should be placed within a single-vendor island. Inference workloads, which have lower communication requirements, can be distributed across any available GPU. Batch inference and data preprocessing workloads can efficiently utilize older or lower-specification GPUs across vendors.",
          "Tools like NVIDIA's DCGM, AMD's ROCm SMI, and Intel's Level Zero provide vendor-specific monitoring. For unified observability, we recommend Prometheus with exporters for each vendor combined with a custom dashboard in Grafana. This enables cluster operators to track utilization, temperature, power consumption, and job efficiency across all accelerators from a single pane of glass.",
        ],
      },
      {
        heading: "Procurement and Vendor Management Strategy",
        paragraphs: [
          "A multi-vendor strategy provides significant procurement advantages. By maintaining relationships with all three accelerator vendors, enterprises gain competitive pricing leverage, reduce supply chain risk, and ensure access to the latest technology from each ecosystem. We recommend allocating 60-70% of GPU budget to the primary vendor (typically NVIDIA for most enterprises) and 30-40% to secondary vendors (AMD and/or Intel) to maintain leverage while ensuring compatibility with mission-critical CUDA-dependent workloads.",
          "Servchip's multi-vendor procurement platform simplifies this process. We provide side-by-side pricing for equivalent configurations across all three vendors, volume discount consolidation, and single-vendor billing regardless of which accelerators you deploy. Contact our team for a customized multi-vendor quote.",
        ],
      },
    ],
    relatedProductIds: [
      "nvidia-h100",
      "amd-mi300x",
      "intel-gaudi-3",
      "dell-xe9680",
      "hpe-cray-xd670",
    ],
    relatedPostIds: ["6", "2", "1"],
  },
  {
    id: "4",
    title: "AMD Instinct MI300X Deep Dive: Architecture and Performance",
    slug: "amd-instinct-mi300x-deep-dive",
    excerpt:
      "An in-depth look at AMD's flagship AI accelerator, the MI300X with CDNA 3 architecture, 192GB HBM3 memory, and ROCm software ecosystem.",
    content: "",
    featuredImage:
      "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=450&fit=crop",
    category: cat("architecture"),
    tags: [tag("ai-training"), tag("hpc"), tag("amd")],
    author: { name: "Servchip Tech Team", avatar: "ST" },
    readingTime: 10,
    publishedAt: "2026-05-28",
    isPublished: true,
    seo: {
      metaTitle: "AMD Instinct MI300X Deep Dive | Servchip",
      metaDescription:
        "Detailed analysis of AMD Instinct MI300X architecture, CDNA 3 compute units, 192GB HBM3 memory, and performance benchmarks.",
    },
    sections: [
      {
        heading: "CDNA 3 Architecture: Chiplet Design at Scale",
        paragraphs: [
          "The AMD Instinct MI300X is built on a revolutionary chiplet architecture that combines eight CDNA 3 compute chiplets, four I/O chiplets, and eight HBM3 stacks on a single package using AMD's 2.5D and 3D packaging technologies. This design houses a total of 304 compute units organized across the eight chiplets, connected by AMD's Infinity Fabric providing 896 GB/s of aggregate bandwidth between components.",
          "The chiplet approach provides significant manufacturing and cost advantages. Each compute chiplet is manufactured on TSMC's 5nm process, while the I/O chiplets use a mature 6nm process, optimizing yield and cost. AMD can scale performance by adding more chiplets in future generations without requiring a full architecture redesign — a key advantage over monolithic die approaches.",
        ],
        bullets: [
          "8 CDNA 3 compute chiplets + 4 I/O chiplets on a single package",
          "304 compute units with 19,456 stream processors",
          "Infinity Fabric interconnect at 896 GB/s between chiplets",
          "192GB HBM3 memory with 5.2 TB/s bandwidth across 8 stacks",
          "5nm compute chiplets + 6nm I/O chiplets for optimal yield and cost",
        ],
      },
      {
        heading: "ROCm Software Ecosystem Maturity",
        paragraphs: [
          "AMD's ROCm (Radeon Open Compute) platform has reached production maturity in 2026 with full support for PyTorch 2.x, TensorFlow, and JAX. The ROCm software stack includes the HIP programming model for CUDA compatibility, optimized libraries like rocBLAS, rocFFT, and MIOpen, and profiling tools including ROCprofiler and Omnitrace. HIP provides source-level compatibility with most CUDA code, typically requiring only recompilation for NVIDIA-targeted applications.",
          "For AI training, ROCm supports distributed training via RCCL (ROCm Collective Communications Library) with Infinity Fabric and Ethernet backends. Inference deployment is supported through ROCm-backed vLLM, TensorRT-compatible paths via ONNX Runtime, and AMD's own MIGraphX inference engine. The ecosystem gaps that existed in earlier ROCm versions have been largely resolved, with particular improvements in LLM inference optimization and distributed training stability.",
        ],
      },
      {
        heading: "Performance Benchmarks and Real-World Results",
        paragraphs: [
          "In Servchip's benchmark testing, the MI300X delivers approximately 85-95% of H100 FP8 training throughput for large language models, with the gap narrowing as model size increases due to the MI300X's larger memory capacity enabling more efficient parallelism strategies. For inference, the MI300X's 192GB memory enables single-GPU serving of models that require tensor parallelism across multiple H100s, resulting in 1.3-1.8x better throughput for models in the 100-150B parameter range.",
          "For HPC workloads requiring FP64 precision, the MI300X significantly outperforms competing accelerators, delivering 95.7 TFLOPS of double-precision performance — nearly 3x the H100's FP64 throughput. This makes the MI300X the preferred choice for scientific computing, computational fluid dynamics, and weather simulation workloads that require high-precision computation.",
        ],
      },
    ],
    relatedProductIds: ["amd-mi300x", "amd-mi325x", "amd-mi350x", "amd-mi300a"],
    relatedPostIds: ["2", "5", "1"],
  },
  {
    id: "5",
    title: "Intel Gaudi 3 AI Accelerator: What You Need to Know",
    slug: "intel-gaudi-3-ai-accelerator-guide",
    excerpt:
      "Everything about Intel's Gaudi 3 AI accelerator — architecture, performance, software stack, and how it compares to NVIDIA and AMD offerings.",
    content: "",
    featuredImage:
      "https://images.unsplash.com/photo-1555618254-84e2cf498b01?w=800&h=450&fit=crop",
    category: cat("architecture"),
    tags: [tag("ai-training"), tag("inference"), tag("intel")],
    author: { name: "Servchip Tech Team", avatar: "ST" },
    readingTime: 8,
    publishedAt: "2026-05-20",
    isPublished: true,
    seo: {
      metaTitle: "Intel Gaudi 3 AI Accelerator Guide | Servchip",
      metaDescription:
        "Complete guide to Intel Gaudi 3 AI accelerator — architecture, 144GB HBM2e memory, integrated Ethernet, and software ecosystem.",
    },
    sections: [
      {
        heading: "Integrated Architecture: AI Accelerator and Network in One",
        paragraphs: [
          "Intel's Gaudi 3 takes a fundamentally different approach from competitors by integrating high-speed Ethernet networking directly into the accelerator die. Each Gaudi 3 includes 24 integrated 400GbE ports, eliminating the need for separate network interface cards and switches for inter-node communication. This integration reduces cluster cost, power consumption, and latency while simplifying the network topology for large-scale deployments.",
          "The Gaudi 3 compute architecture features 64 dedicated Tensor Processor Cores (TPCs) optimized for matrix operations, supported by 48 GB of on-die SRAM for frequently accessed data. The 144GB HBM2e memory provides 3.9 TB/s of bandwidth, sufficient for most large language model training and inference workloads. The PCIe Gen5 host interface ensures no bottleneck when communicating with CPU hosts for data loading and preprocessing.",
        ],
        bullets: [
          "24 integrated 400GbE Ethernet ports — no separate NICs or switches needed",
          "64 Tensor Processor Cores for matrix operations at FP8/BF16/FP32",
          "144GB HBM2e memory with 3.9 TB/s bandwidth",
          "48 MB on-die SRAM for high-bandwidth data access patterns",
          "PCIe Gen5 x16 host interface for CPU communication",
        ],
      },
      {
        heading: "Open Software Stack and Framework Support",
        paragraphs: [
          "Intel's Gaudi software strategy is built on openness. The Habana SynapseAI stack integrates natively with PyTorch and TensorFlow, providing a familiar development experience without proprietary APIs. Intel has contributed Gaudi-optimized kernels directly to the upstream PyTorch repository, meaning standard PyTorch code compiles and runs on Gaudi without code changes in most cases. This is a significant advantage for teams that want to avoid vendor lock-in.",
          "For inference, Intel provides Gaudi-optimized implementations of popular model architectures through Hugging Face Optimum and its own DL Streamer inference framework. The integrated Ethernet ports support standard RoCEv2 for RDMA communication, enabling compatibility with existing Ethernet-based storage and networking infrastructure. Intel's oneAPI programming model provides a unified development environment spanning CPUs, GPUs, and accelerators.",
        ],
      },
      {
        heading: "Cost-Effective AI Infrastructure",
        paragraphs: [
          "The Gaudi 3's integrated networking delivers significant cost savings for AI cluster builds. A 1,000-accelerator Gaudi 3 cluster requires approximately 30% fewer networking components than an equivalent NVIDIA cluster, translating to $1.5-2M in savings at scale. The open software stack also reduces engineering time for integration and optimization, with most PyTorch workloads running without modification.",
          "For enterprises building their first AI cluster or expanding existing capacity, Gaudi 3 offers the most straightforward path to production. The combination of integrated networking, open software, and competitive per-accelerator pricing makes it particularly attractive for inference-heavy deployments and organizations with strong open-source preferences.",
        ],
      },
    ],
    relatedProductIds: [
      "intel-gaudi-3",
      "intel-gaudi-2",
      "intel-xeon-6980p",
      "intel-xeon-8490h",
    ],
    relatedPostIds: ["2", "4", "1"],
  },
  {
    id: "6",
    title: "The Future of Heterogeneous Computing: Multi-Vendor Strategies",
    slug: "future-heterogeneous-computing-strategies",
    excerpt:
      "How enterprises are leveraging chips from multiple vendors to build flexible, cost-effective AI and HPC infrastructure.",
    content: "",
    featuredImage:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
    category: cat("deployment"),
    tags: [
      tag("data-center"),
      tag("hpc"),
      tag("nvidia"),
      tag("amd"),
      tag("intel"),
    ],
    author: { name: "Servchip Tech Team", avatar: "ST" },
    readingTime: 9,
    publishedAt: "2026-05-15",
    isPublished: true,
    seo: {
      metaTitle: "Future of Heterogeneous Computing | Servchip",
      metaDescription:
        "Learn how enterprises are using multi-vendor chip strategies with NVIDIA, AMD, and Intel to build flexible AI infrastructure.",
    },
    sections: [
      {
        heading: "Why Heterogeneous Computing Is the Future",
        paragraphs: [
          "The era of single-vendor homogeneity in data center computing is ending. Enterprises increasingly recognize that different workloads benefit from different architectures, and no single vendor offers the optimal solution for every use case. A heterogeneous approach — deploying NVIDIA for flagship AI training, AMD for cost-optimized inference and HPC, Intel for open-ecosystem workloads, and ARM-based processors like Ampere for cloud-native applications — provides the best balance of performance, cost, and flexibility.",
          "The shift toward heterogeneous computing is accelerated by the maturing of cross-platform AI frameworks like PyTorch, JAX, and TensorFlow, which support multiple hardware backends through unified APIs. The same model code can run on NVIDIA, AMD, or Intel accelerators with minimal modifications, enabling enterprises to optimize infrastructure at the cluster level rather than at the application level.",
        ],
        bullets: [
          "No single vendor dominates across all AI workloads — each has architectural strengths",
          "PyTorch 2.x, JAX, and TensorFlow support unified APIs across all major accelerators",
          "Kubernetes with node feature discovery enables intelligent heterogeneous scheduling",
          "Multi-vendor procurement reduces supply chain risk and provides pricing leverage",
          "Cross-vendor collective communication libraries (NCCL/RCCL/oneCCL) enable unified clusters",
        ],
      },
      {
        heading: "Building a Heterogeneous Infrastructure Roadmap",
        paragraphs: [
          "We recommend a phased approach to heterogeneous infrastructure. Phase 1: Standardize on a primary training platform (typically NVIDIA) while deploying secondary platforms (AMD or Intel) for inference and development. Phase 2: Add workload-specific accelerators — AMD for HPC, Intel for inference serving, Ampere for cloud-native. Phase 3: Implement intelligent orchestration that routes workloads to the optimal accelerator based on performance requirements, cost constraints, and availability.",
          "Servchip's engineering team provides end-to-end heterogeneous infrastructure consulting, from architecture design through procurement and deployment. Our multi-vendor expertise ensures that your cluster is optimized for both performance and cost, regardless of the accelerator mix. Contact us for a free architecture review and TCO analysis tailored to your specific workload profile.",
        ],
      },
    ],
    relatedProductIds: [
      "nvidia-h100",
      "amd-mi300x",
      "intel-gaudi-3",
      "nvidia-grace-cpu",
      "ampereone",
    ],
    relatedPostIds: ["3", "1", "2"],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(categorySlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.category.slug === categorySlug);
}

export function getBlogPostsByTag(tagSlug: string): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.tags.some((t) => t.slug === tagSlug));
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return BLOG_POSTS.filter((p) => p.isPublished).slice(0, 3);
}

export function getRelatedBlogPosts(postId: string, count = 3): BlogPost[] {
  const post = BLOG_POSTS.find((p) => p.id === postId);
  if (!post) return [];
  const related = post.relatedPostIds
    ? post.relatedPostIds
        .map((id) => BLOG_POSTS.find((p) => p.id === id))
        .filter(Boolean)
    : BLOG_POSTS.filter((p) => p.id !== postId).slice(0, count);
  return related as BlogPost[];
}
