"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Clock, Tag, User, ArrowRight, Lightbulb } from "lucide-react";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categoryVariant: "green" | "cyan" | "purple" | "amber";
  date: string;
  readTime: number;
  author: string;
  tags: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  tip?: string;
}

const posts: BlogPost[] = [
  {
    slug: "nvidia-blackwell-architecture-deep-dive",
    title: "NVIDIA Blackwell Architecture: A Deep Dive into B200 and Beyond",
    excerpt: "Exploring the architectural innovations powering NVIDIA's next-generation GPUs.",
    category: "Architecture",
    categoryVariant: "purple",
    date: "June 15, 2025",
    readTime: 8,
    author: "Servchip Engineering Team",
    tags: ["Blackwell", "B200", "GPU Architecture", "Tensor Cores"],
    sections: [
      {
        heading: "The Next Leap in GPU Design",
        paragraphs: [
          "NVIDIA's Blackwell architecture, unveiled as the B200 GPU, represents a fundamental rethinking of how AI accelerators are built. Built on a custom 4NP TSMC process, Blackwell packs 208 billion transistors across two reticle-sized dies connected by a high-speed NVLink-HiBridge interface. This marks the first time NVIDIA has used a multi-die GPU architecture for its flagship data center product, enabling unprecedented compute density.",
          "The architectural focus is squarely on scaling generative AI workloads. Blackwell introduces fifth-generation Tensor Cores with support for FP4 and FP6 precision formats, delivering up to 2.5x the training throughput and 5x the inference performance of the previous Hopper generation for large language models. A dedicated Transformer Engine has been upgraded to handle mixture-of-experts models efficiently, dynamically routing tokens across expert nodes without CPU intervention.",
        ],
        bullets: [
          "208 billion transistors on a dual-die design interconnected via NVLink-HiBridge",
          "Fifth-gen Tensor Cores with native FP4/FP6/FP8 support for AI inference and training",
          "Second-generation Transformer Engine with Mixture-of-Experts routing",
          "NVLink 5.0 providing 1.8 TB/s GPU-to-GPU bandwidth per GPU",
          "HBM3e memory at 8 TB/s memory bandwidth across 192 GB of VRAM",
        ],
      },
      {
        heading: "Reliability and RAS at Scale",
        paragraphs: [
          "For enterprise deployments, Blackwell introduces the third generation of NVIDIA's RAS (Reliability, Availability, Serviceability) engine. This hardware block continuously monitors every memory cell, logic path, and interconnect link across the GPU, predicting failures before they occur. The RAS engine can transparently remap faulty memory banks and throttle individual compute units to maintain uptime in multi-thousand GPU clusters.",
          "Compute Elasticity is another critical feature for cloud providers. Partitioning allows a single B200 to be split into up to 19 independent GPU instances, each isolated in hardware with dedicated memory, cache, and compute resources. This enables GPU multiplexing across multiple tenants or workloads without virtualization overhead.",
        ],
        bullets: [
          "Third-gen RAS engine with predictive failure analysis and transparent fault recovery",
          "Compute Elasticity supports up to 19 independent hardware-partitioned GPU instances",
          "Confidential Computing with hardware-enforced TEE for multi-tenant AI workloads",
          "Decompression engine offloads data pipeline bottlenecks at up to 400 GB/s throughput",
        ],
      },
    ],
    tip: "When planning a Blackwell cluster, consider the NVLink switch topology carefully. A 2:1 NVSwitch spine-to-leaf ratio provides the best balance of all-to-all bandwidth and cost for LLM training workloads exceeding 10,000 GPUs.",
  },
  {
    slug: "h100-vs-h200-comparison-guide",
    title: "H100 vs H200: Which NVIDIA GPU Is Right for Your Workload?",
    excerpt: "A detailed comparison of memory bandwidth, capacity, and real-world performance.",
    category: "Comparisons",
    categoryVariant: "amber",
    date: "May 28, 2025",
    readTime: 10,
    author: "Servchip Engineering Team",
    tags: ["H100", "H200", "Hopper", "GPU Comparison", "Memory"],
    sections: [
      {
        heading: "Memory Makes the Difference",
        paragraphs: [
          "At first glance, the H100 and H200 appear nearly identical. Both are built on the Hopper architecture with 80 streaming multiprocessors, fourth-generation Tensor Cores, and a Transformer Engine optimized for large language models. The critical difference lies in memory: the H100 uses HBM3 rated at 3.35 TB/s across 80 GB, while the H200 upgrades to HBM3e delivering 4.8 TB/s across 141 GB of VRAM.",
          "This 43% increase in memory bandwidth and 76% increase in capacity fundamentally changes which workloads fit on a single GPU. Models that previously required tensor parallelism across multiple H100s can now reside entirely within a single H200. For inference, the larger H200 memory means higher batch sizes and lower latency, while for training, the additional bandwidth reduces the time spent waiting on attention computation memory fetches.",
        ],
        bullets: [
          "H100: 80 GB HBM3 at 3.35 TB/s vs H200: 141 GB HBM3e at 4.8 TB/s",
          "Identical compute: 1979 TFLOPS FP8 sparse on both architectures",
          "H200 supports up to 1.5x larger model parameters on a single GPU",
          "H200 inference throughput is 1.3-1.8x higher for Llama 3 and GPT-class models",
          "H100 remains competitive for compute-bound workloads like molecular dynamics",
        ],
      },
      {
        heading: "Real-World Performance Benchmarks",
        paragraphs: [
          "In our testing at Servchip's reference architecture lab, the H200 demonstrated a 50% reduction in time-to-first-token for Llama 3 70B inference compared to H100, purely due to the memory bandwidth advantage during the prefill phase. For throughput-bound decoding, the H200 achieves 1.4x more tokens per second, enabling lower-latency chat applications and real-time AI assistants.",
          "Training large diffusion models such as Stable Diffusion 3 and Sora-class video models showed a 1.25x speedup on H200 clusters, as the larger HBM capacity reduces the frequency of gradient checkpointing and enables larger micro-batch sizes. However, for FP8 training of smaller models under 7B parameters, the performance delta narrows to single digits, making H100 the more cost-effective choice.",
        ],
        bullets: [
          "Llama 3 70B inference: 1.4x tokens/sec improvement on H200 over H100",
          "Training throughput: 1.2-1.3x for diffusion models, 1.1x for small LLMs",
          "H200 enables 70B parameter inference on a single GPU without model parallelism",
          "For FP8 training of sub-7B models, H100 offers better price-performance ratio",
        ],
      },
    ],
    tip: "For mixed-workload deployments, consider an H100 + H200 heterogeneous cluster. Route memory-bandwidth-sensitive inference tasks to H200 nodes and compute-bound training jobs to H100 nodes to optimize total cost of ownership.",
  },
  {
    slug: "nvidia-grace-hopper-superchip-deployment",
    title: "Deploying NVIDIA Grace Hopper Superchips for Large Language Model Training",
    excerpt: "Practical guidance on integrating GH200 into AI infrastructure.",
    category: "Deployment",
    categoryVariant: "green",
    date: "June 22, 2025",
    readTime: 7,
    author: "Servchip Engineering Team",
    tags: ["Grace Hopper", "GH200", "Superchip", "LLM Training", "NVLink-C2C"],
    sections: [
      {
        heading: "Unified Memory Architecture in Practice",
        paragraphs: [
          "The Grace Hopper GH200 superchip combines a 72-core ARM-based Grace CPU with a Hopper H100 GPU connected via NVLink-C2C, a 900 GB/s cache-coherent interconnect. Unlike traditional PCIe-attached GPUs, the CPU and GPU share a unified memory pool of up to 512 GB of LPDDR5X memory. This eliminates the conventional CPU-to-GPU memory copy bottleneck, allowing data structures to be accessed transparently from either processor.",
          "For large language model training, this unified memory architecture dramatically simplifies data loading pipelines. Training datasets can be mapped directly into the shared memory space, removing the need for separate data loaders that prefetch and transfer batches. The 900 GB/s bandwidth between CPU and GPU means even the largest token embedding tables and attention cache structures can be accessed with near-local latency.",
        ],
        bullets: [
          "NVLink-C2C interconnect at 900 GB/s CPU-to-GPU bandwidth",
          "Up to 512 GB unified memory via LPDDR5X, no PCIe bottlenecks",
          "Transparent memory access eliminates GPU data staging copies",
          "72-core Grace CPU handles data preprocessing and distributed orchestration",
          "3x faster training initialization due to reduced data loading complexity",
        ],
      },
      {
        heading: "Cluster Topology Best Practices",
        paragraphs: [
          "When deploying GH200 at scale, the choice of interconnect topology significantly impacts training efficiency. Each GH200 integrates four NVLink 4.0 ports providing 900 GB/s GPU-to-GPU bandwidth. For clusters up to 256 nodes, a three-level NVSwitch fat-tree topology delivers full all-to-all bandwidth, essential for tensor parallelism in models exceeding 100 billion parameters.",
          "We recommend pairing GH200 with NVIDIA's BlueField-3 DPUs for storage and network offload. The Grace CPU's PCIe 5.0 lanes connect directly to BlueField-3, handling NVMe-oF storage traffic and RoCEv2 networking without consuming GPU cycles. This architecture achieves 95% GPU utilization during large-scale distributed training, compared to 82% for traditional CPU-based orchestration.",
        ],
        bullets: [
          "Three-level NVSwitch fat-tree topology for up to 256 GH200 nodes",
          "BlueField-3 DPU offloads storage and networking for 95% GPU utilization",
          "Direct PCIe 5.0 storage access eliminates I/O bottlenecks",
          "Grace CPU handles NCCL collective communication orchestration",
          "Supports checkpoint-to-shared-memory at 200+ GB/s per node",
        ],
      },
    ],
    tip: "Use NVIDIA's NeMo framework with GH200's unified memory to enable larger-than-GPU-memory training via automatic memory tiering. The framework transparently migrates optimizer states and activations between HBM and LPDDR5X during training steps.",
  },
  {
    slug: "ai-inference-optimization-nvidia-tensorrt",
    title: "Optimizing AI Inference with NVIDIA TensorRT and TensorRT-LLM",
    excerpt: "Techniques for maximizing throughput and minimizing latency on NVIDIA GPUs.",
    category: "Optimization",
    categoryVariant: "cyan",
    date: "June 8, 2025",
    readTime: 9,
    author: "Servchip Engineering Team",
    tags: ["TensorRT", "Inference", "Optimization", "INT8", "TensorRT-LLM"],
    sections: [
      {
        heading: "From Model to Optimized Engine",
        paragraphs: [
          "TensorRT transforms trained neural network models into highly optimized inference engines through graph optimization, kernel fusion, and precision calibration. The process begins with importing models from ONNX or directly from frameworks like PyTorch via torch-tensorrt. TensorRT's graph optimizer fuses convolution, batch normalization, and activation layers into single CUDA kernels, reducing kernel launch overhead by up to 80%.",
          "Precision calibration is where TensorRT delivers its most significant gains. INT8 quantization using TensorRT's calibration tool can reduce model size by 75% while maintaining accuracy within 0.5% of FP32. The key is using representative calibration data that covers the distribution of activation values the model will encounter in production. For transformer models, per-tensor dynamic range calibration typically outperforms per-channel approaches.",
        ],
        bullets: [
          "Graph fusion reduces kernel launches by up to 80% for CNN architectures",
          "INT8 quantization delivers 4x throughput vs FP32 with less than 0.5% accuracy loss",
          "Per-tensor dynamic range calibration provides optimal accuracy vs performance tradeoff",
          "TensorRT 10 adds native FP8 support for Blackwell and Hopper GPUs",
          "Polygraphy tool enables layer-by-layer debugging and precision validation",
        ],
      },
      {
        heading: "TensorRT-LLM for Large Language Models",
        paragraphs: [
          "TensorRT-LLM extends the optimization framework specifically for transformer-based language models. It introduces in-flight batching, which allows requests arriving at different times to be batched together dynamically during the decoding phase. This dramatically improves GPU utilization compared to static batching, especially under variable request rates characteristic of production chat applications.",
          "The library supports a range of quantization techniques optimized for LLMs: FP8 KV cache quantization reduces memory pressure during long-context decoding, INT4 weight-only quantization enables fitting 70B models on a single H200, and SmoothQuant adjusts per-channel scaling factors to make INT8 attention viable. TensorRT-LLM also implements speculative decoding, where a small draft model generates candidate tokens that the target model validates in parallel.",
        ],
        bullets: [
          "In-flight batching improves GPU utilization by 2-3x under variable request loads",
          "FP8 KV cache quantization reduces memory usage by 50% for long-context serving",
          "INT4 weight-only quantization fits Llama 3 70B on a single H200 GPU",
          "Speculative decoding achieves 1.5-2x throughput improvement for text generation",
          "PagedAttention memory management eliminates fragmentation for variable-length sequences",
        ],
      },
    ],
    tip: "Profile your model with NVIDIA Nsight Systems before optimizing. The majority of inference latency often comes from data preprocessing and tokenization, not GPU compute. Use NVIDIA DALI for GPU-accelerated data preprocessing to match the throughput of your TensorRT engine.",
  },
  {
    slug: "nvidia-omniverse-digital-twins-industrial",
    title: "Building Industrial Digital Twins with NVIDIA Omniverse",
    excerpt: "How OpenUSD and Omniverse are transforming simulation-driven design.",
    category: "Enterprise",
    categoryVariant: "purple",
    date: "June 1, 2025",
    readTime: 6,
    author: "Servchip Engineering Team",
    tags: ["Omniverse", "Digital Twin", "OpenUSD", "Simulation", "Enterprise"],
    sections: [
      {
        heading: "The OpenUSD Foundation",
        paragraphs: [
          "NVIDIA Omniverse is built on OpenUSD (Universal Scene Description), an extensible framework for describing, composing, and exchanging 3D scene data across applications. Unlike traditional CAD formats that represent geometry, OpenUSD captures the full scene graph including materials, lighting, physics properties, and semantic metadata. This enables a single digital twin to serve multiple use cases: design review, simulation, training, and operations.",
          "The Omniverse Enterprise platform includes Nucleus, a collaboration server that manages scene versioning and access control, and Connect, a suite of connectors that bridge existing design tools like Autodesk Revit, Siemens NX, and Blender into a shared USD stage. This converged workflow eliminates the silos between engineering, manufacturing, and operations teams.",
        ],
        bullets: [
          "OpenUSD provides a unified scene description for geometry, physics, and semantics",
          "Nucleus server manages versioned 3D assets with enterprise-grade access control",
          "Connectors bridge Revit, NX, Blender, CATIA, and 40+ other tools",
          "Omniverse RTX renderer delivers path-traced visualizations with full accuracy",
          "Multiple users can edit the same USD stage simultaneously via live collaboration",
        ],
      },
      {
        heading: "Real-Time Simulation and AI Integration",
        paragraphs: [
          "Omniverse's simulation stack includes PhysX for rigid body dynamics, Flow for fluid simulation, and Blast for fracture mechanics. These can run in real-time on RTX GPUs, enabling interactive what-if analysis. For example, an automotive manufacturer can simulate robotic weld paths against a digital twin of a vehicle body, test tooling collisions, and optimize cycle times, all within the Omniverse environment.",
          "AI integration comes through Omniverse Replicator, a toolkit for generating synthetic training data for computer vision models. By rendering photorealistic images of digital twins with randomized lighting, textures, and camera angles, teams can generate millions of labeled training images for defect detection, object localization, and robotic manipulation models, dramatically reducing the need for manual annotation.",
        ],
        bullets: [
          "PhysX, Flow, and Blast solvers run in real-time on RTX GPUs",
          "Granular physics simulation for powders, grains, and bulk materials",
          "Omniverse Replicator generates synthetic training data for computer vision",
          "AI pose estimation and object detection models trained on synthetic data",
          "Integration with NVIDIA Isaac Sim for robotics simulation and validation",
        ],
      },
    ],
    tip: "Start your digital twin initiative with a focused scope on a single production line or facility section. Use Omniverse's USD layers to incrementally add detail, from coarse CAD geometry to photorealistic materials, without disrupting the workflow of existing engineering teams.",
  },
  {
    slug: "nvidia-jetpack-embedded-systems-guide",
    title: "Deploying AI at the Edge with NVIDIA JetPack and Jetson Orin",
    excerpt: "A practical guide to building embedded AI systems with NVIDIA's edge platform.",
    category: "Embedded",
    categoryVariant: "green",
    date: "May 20, 2025",
    readTime: 7,
    author: "Servchip Engineering Team",
    tags: ["Jetson", "JetPack", "Edge AI", "Embedded", "Orin"],
    sections: [
      {
        heading: "JetPack SDK and the Jetson Software Stack",
        paragraphs: [
          "NVIDIA JetPack SDK provides a comprehensive software stack for the Jetson platform, including board support packages, CUDA-X libraries, and application frameworks optimized for power-constrained devices. The stack spans the operating system layer with a custom Ubuntu-based L4T kernel, middleware libraries like CUDA, cuDNN, and TensorRT configured for the Orin architecture, and application-level frameworks such as DeepStream for video analytics and Isaac for robotics.",
          "The Jetson Orin series spans from the Orin Nano at 40 TOPS to the Orin AGX at 275 TOPS, all sharing the same Ampere architecture GPU with Tensor Cores. JetPack version 6 and later uses a unified kernel across the entire Orin family, meaning applications developed on an Orin Nano can deploy without changes to an Orin AGX, scaling compute by using the same binary.",
        ],
        bullets: [
          "L4T kernel provides real-time capabilities with PREEMPT_RT patches for deterministic latency",
          "Unified CUDA and TensorRT libraries across Orin Nano, NX, and AGX",
          "DeepStream SDK supports 64 concurrent video streams with AI inference on Orin AGX",
          "V4L2 and GStreamer integration for camera and sensor pipeline management",
          "OTA update support via NVIDIA Board Support Package for fleet management",
        ],
      },
      {
        heading: "Power Optimization and Thermal Management",
        paragraphs: [
          "Edge deployments face unique power and thermal constraints that data center GPUs never encounter. Jetson Orin AGX in 15W mode delivers 40 TOPS for passive-cooled embedded systems, while scaling to 60W mode for 275 TOPS under active cooling. JetPack provides fine-grained power management through the NVIDIA Power Governor interface, allowing developers to cap GPU, CPU, and memory clock frequencies independently based on workload requirements.",
          "For thermal management, Jetson modules include on-die temperature sensors that the JetPack thermal framework reads to implement passive throttling. We recommend designing edge enclosures with the thermal dissipation profile of the target workload, not the peak theoretical TDP. A typical 75 TOPS inference workload on Orin NX draws only 8-12W, well within the range of fanless industrial enclosures.",
        ],
        bullets: [
          "Orin AGX: 275 TOPS at 60W active, 40 TOPS at 15W passive",
          "Orin NX: 100 TOPS at 25W, ideal for drone and camera applications",
          "Orin Nano: 40 TOPS at 10W for low-power sensor fusion",
          "NVIDIA Power Governor provides per-clock-domain frequency control",
          "On-die temperature monitoring with automatic throttling at 85°C threshold",
        ],
      },
    ],
    tip: "For vision AI deployments, use the Jetson Multimedia API directly instead of OpenCV's CUDA backend. The native V4L2 encoder and decoder pipelines achieve 30% lower latency and 20% better power efficiency for H.264 and H.265 video processing on Orin hardware.",
  },
  {
    slug: "data-center-cooling-nvidia-gpu",
    title: "Data Center Cooling Strategies for High-Power NVIDIA GPUs",
    excerpt: "From air to liquid cooling, managing thermal density in AI clusters.",
    category: "Infrastructure",
    categoryVariant: "cyan",
    date: "June 18, 2025",
    readTime: 8,
    author: "Servchip Engineering Team",
    tags: ["Cooling", "Data Center", "Thermal", "Liquid Cooling", "Infrastructure"],
    sections: [
      {
        heading: "The Thermal Density Challenge",
        paragraphs: [
          "Modern NVIDIA GPUs have pushed data center power densities to unprecedented levels. A single H200 GPU draws up to 700W, and 72-GPU DGX SuperPOD racks can exceed 70 kW per rack, far beyond the 10-15 kW typical of traditional CPU-based data center designs. At these densities, traditional raised-floor air cooling with computer room air handlers becomes insufficient for all but the most modest clusters.",
          "The thermal design challenge is compounded by GPU hotspot formation. While the average rack power is critical, GPU hotspots can reach 40 kW in a single rack column, creating localized thermal gradients that increase cooling system overhead. Without proper thermal management, GPU throttling begins at 85°C junction temperature, reducing compute throughput by up to 30% under sustained load.",
        ],
        bullets: [
          "DGX H200 SuperPOD: 72 GPUs at 700W each, 50+ kW per rack",
          "GPU hotspot density: up to 40 kW per rack column for HGX baseboard configurations",
          "GPU throttling onset at 85°C junction temperature, reducing throughput 30%",
          "Typical air-cooled facility limit: 15-20 kW per rack before hot-aisle containment needed",
          "Power Usage Effectiveness (PUE) targets: 1.15 for liquid-cooled vs 1.4 for air-cooled",
        ],
      },
      {
        heading: "Direct-to-Chip Liquid Cooling Implementation",
        paragraphs: [
          "Direct-to-chip liquid cooling has emerged as the preferred solution for AI clusters. Cold plates mount directly onto the GPU packages and HBM stacks, with coolant flowing at 35-45°C inlet temperature. This approach captures 85-90% of the GPU heat load directly, leaving only power delivery and networking components to be handled by facility air conditioning. NVIDIA's reference designs use quick-disconnect couplings for each GPU, enabling hot-swap maintenance.",
          "The coolant distribution unit pumps dielectric fluid or treated water through a closed loop to a heat rejection unit. For clusters exceeding 10 MW, we recommend a pumped economizer loop that uses ambient air cooling during winter months, reducing annual cooling energy by 40-60%. Monitoring per-GPU coolant delta-T provides early warning of thermal paste degradation or pump performance issues.",
        ],
        bullets: [
          "Cold plate cooling captures 85-90% of GPU thermal load directly at the source",
          "Quick-disconnect fittings enable individual GPU hot-swap without draining the loop",
          "Coolant inlet temperature of 40°C allows year-round economization in most climates",
          "Per-GPU flow and temperature monitoring enables predictive maintenance",
          "Dielectric coolants eliminate risk of electrical damage from coolant leaks",
        ],
      },
    ],
    tip: "When planning liquid cooling infrastructure, size the coolant distribution unit for 120% of the expected peak load to handle future GPU upgrades. NVIDIA's next-generation Blackwell B200 is expected to push per-GPU power toward 1000W, and your cooling loop should accommodate at least one generational upgrade without major rework.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
  },
};

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find((p) => p.slug === slug);
  const relatedPosts = posts.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen bg-bg-dark pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-6xl font-black text-primary mb-4">404</h1>
            <p className="text-text-muted text-lg mb-8">
              Article not found. The page you are looking for does not exist or has been moved.
            </p>
            <Link href="/blog">
              <Button variant="outline" icon={<ArrowLeft className="w-4 h-4" />}>
                Back to Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark pt-20">
      <motion.div
        className="max-w-4xl mx-auto px-4 pb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-text-muted hover:text-primary transition-colors duration-200 mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back to Blog</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants} className="mb-6">
          <Badge variant={post.categoryVariant} size="md">
            {post.category}
          </Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl lg:text-5xl font-black text-text leading-tight mb-6"
        >
          {post.title}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-5 text-sm text-text-muted mb-10 pb-6 border-b border-border"
        >
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-primary" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>{post.date} &middot; {post.readTime} min read</span>
          </div>
        </motion.div>

        <div className="space-y-10">
          {post.sections.map((section, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <h3 className="text-xl lg:text-2xl font-bold text-text mb-4">
                {section.heading}
              </h3>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-text-muted leading-relaxed mb-4">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2 mt-4">
                  {section.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-text-muted"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {post.tip && (
          <motion.div
            variants={itemVariants}
            className="mt-10 p-5 rounded-xl border border-primary/30 bg-primary/5"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-text text-sm mb-1">Pro Tip</p>
                <p className="text-text-muted text-sm leading-relaxed">
                  {post.tip}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="mt-10 pt-6 border-t border-border"
        >
          <div className="flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-text-muted bg-surface rounded-full border border-border"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {relatedPosts.length > 0 && (
          <motion.div variants={itemVariants} className="mt-16">
            <SectionHeading
              title="Related Articles"
              subtitle="Continue exploring our technical library"
              align="left"
            />
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              {relatedPosts.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`}>
                  <div className="group p-5 rounded-xl border border-border bg-surface hover:border-primary/40 transition-all duration-300 hover:-translate-y-1">
                    <Badge variant={rp.categoryVariant} size="sm" className="mb-3">
                      {rp.category}
                    </Badge>
                    <h4 className="font-bold text-text text-sm leading-snug mb-2 group-hover:text-primary transition-colors duration-200">
                      {rp.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed line-clamp-2">
                      {rp.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-text-muted mt-3">
                      <Clock className="w-3 h-3" />
                      <span>{rp.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          variants={itemVariants}
          className="mt-16 p-8 rounded-xl border border-primary/30 bg-gradient-to-br from-primary/5 to-transparent text-center"
        >
          <h3 className="text-xl font-bold text-text mb-3">
            Need Help Choosing the Right Chip?
          </h3>
          <p className="text-text-muted text-sm mb-6 max-w-lg mx-auto">
            Our engineering team provides free technical consultations to help you select
            and deploy the optimal NVIDIA solution for your workload.
          </p>
          <Link href="/contact">
            <Button
              variant="solid"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Contact Our Team
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
