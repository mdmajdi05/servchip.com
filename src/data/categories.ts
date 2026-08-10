import type { ChipCategory } from "@/types";

export const CATEGORIES: ChipCategory[] = [
  // ===== Chip Categories =====
  {
    id: "nvidia-dc-gpus",
    name: "NVIDIA Data Center GPUs",
    slug: "nvidia-data-center-gpus",
    description:
      "Enterprise AI training and inference GPUs — H100, H200, B200, B300, GB200, L40S, L4.",
    icon: "Server",
    sortOrder: 1,
    productCount: 0,
    isActive: true,
  },
  {
    id: "amd-instinct",
    name: "AMD Instinct Accelerators",
    slug: "amd-instinct-accelerators",
    description:
      "AMD Instinct AI accelerators — MI300X, MI325X, MI350X for AI training and HPC.",
    icon: "Server",
    sortOrder: 2,
    productCount: 0,
    isActive: true,
  },
  {
    id: "intel-gaudi",
    name: "Intel Gaudi AI Accelerators",
    slug: "intel-gaudi-ai-accelerators",
    description:
      "Intel Gaudi AI accelerators for training and inference — Gaudi 2, Gaudi 3.",
    icon: "Brain",
    sortOrder: 3,
    productCount: 0,
    isActive: true,
  },
  {
    id: "google-tpu",
    name: "Google TPU Accelerators",
    slug: "google-tpu-accelerators",
    description:
      "Google TPU v6 and v7 — custom AI accelerators for Google Cloud.",
    icon: "Cloud",
    sortOrder: 4,
    productCount: 0,
    isActive: true,
  },
  {
    id: "amazon-ai",
    name: "Amazon AI Chips",
    slug: "amazon-ai-chips",
    description:
      "Amazon Trainium 2 and Inferentia 2 — custom AI chips for AWS.",
    icon: "Cloud",
    sortOrder: 5,
    productCount: 0,
    isActive: true,
  },
  {
    id: "server-cpus",
    name: "Server CPUs",
    slug: "server-cpus",
    description:
      "Server processors from AMD EPYC, Intel Xeon, Ampere, Qualcomm, and NVIDIA Grace.",
    icon: "Cpu",
    sortOrder: 6,
    productCount: 0,
    isActive: true,
  },
  {
    id: "ai-servers",
    name: "AI Servers & Platforms",
    slug: "ai-servers-platforms",
    description:
      "Complete AI server platforms from Dell, HPE, Supermicro, Lenovo, Gigabyte, ASUS, Inspur, Quanta, Foxconn, Wiwynn.",
    icon: "Server",
    sortOrder: 7,
    productCount: 0,
    isActive: true,
  },
  {
    id: "networking",
    name: "Networking & Interconnects",
    slug: "networking-interconnects",
    description:
      "Networking switches, NICs, DPUs from NVIDIA, Broadcom, Marvell, Cisco, Intel, AMD Pensando.",
    icon: "Network",
    sortOrder: 8,
    productCount: 0,
    isActive: true,
  },
  {
    id: "ai-memory",
    name: "AI Memory & HBM",
    slug: "ai-memory-hbm",
    description:
      "High-bandwidth memory — HBM3E from SK hynix, Samsung, Micron. DDR5 RDIMM, MRDIMM, CXL modules.",
    icon: "MemoryStick",
    sortOrder: 9,
    productCount: 0,
    isActive: true,
  },
  {
    id: "enterprise-storage",
    name: "Enterprise Storage",
    slug: "enterprise-storage",
    description:
      "Enterprise NVMe SSDs from Samsung, Micron, Solidigm, Kioxia, WD, Seagate for data center storage.",
    icon: "HardDrive",
    sortOrder: 10,
    productCount: 0,
    isActive: true,
  },
];

export function getCategoryBySlug(slug: string): ChipCategory | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
