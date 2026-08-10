import type { SeoEntry } from "./types";

// Brand page SEO. Key = brand id (src/data/brands.ts).
export const BRAND_SEO: Record<string, SeoEntry> = {
  nvidia: {
    metaTitle:
      "NVIDIA GPU Distributor | Enterprise AI GPUs & Hardware | Servchip",
    metaDescription:
      "NVIDIA GPU distributor and supplier for enterprise AI, HPC and data centers. Explore H100, H200, B200 and GB200 GPUs for AI training, HPC workloads.",
    keywords: [
      "NVIDIA GPU distributor",
      "NVIDIA H100 supplier",
      "NVIDIA H200 price",
      "enterprise AI GPUs",
      "NVIDIA data center GPUs",
    ],
  },
  amd: {
    metaTitle: "AMD GPU & CPU Distributor | Instinct & EPYC | Servchip",
    metaDescription:
      "AMD GPU and CPU distributor for enterprise AI, HPC and data centers. Explore Instinct MI300X, MI325X and MI350X accelerators and EPYC server CPUs.",
    keywords: [
      "AMD Instinct distributor",
      "AMD MI300X supplier",
      "AMD EPYC distributor",
      "enterprise AMD GPUs",
      "AMD GPU distributor",
    ],
  },
  intel: {
    metaTitle:
      "Intel CPU & AI Accelerator Distributor | Xeon & Gaudi | Servchip",
    metaDescription:
      "Intel CPU and AI accelerator distributor for enterprise data centers. Explore Xeon 6, Gaudi 3 and Arc Pro GPUs for AI, HPC and enterprise infrastructure.",
    keywords: [
      "Intel Xeon distributor",
      "Intel Gaudi supplier",
      "Intel Arc GPU distributor",
      "enterprise Intel CPUs",
      "Intel AI accelerators",
    ],
  },
  broadcom: {
    metaTitle:
      "Broadcom Networking Silicon Distributor | Ethernet Switches | Servchip",
    metaDescription:
      "Broadcom networking silicon distributor for AI and data center networks. Explore Tomahawk and Jericho Ethernet switch silicon for AI clusters and networks.",
    keywords: [
      "Broadcom Ethernet switch distributor",
      "Tomahawk 6 supplier",
      "Jericho 3AI",
      "networking silicon",
      "AI cluster networking",
    ],
  },
  marvell: {
    metaTitle:
      "Marvell Ethernet Switch Distributor | Teralynx & Networking | Servchip",
    metaDescription:
      "Marvell Ethernet switch and networking silicon distributor for cloud, AI and data centers. Explore Teralynx switch platforms for enterprise networking.",
    keywords: [
      "Marvell Ethernet switch distributor",
      "Teralynx 10",
      "networking silicon",
      "enterprise networking",
    ],
  },
  cisco: {
    metaTitle: "Cisco Networking Silicon Distributor | Silicon One | Servchip",
    metaDescription:
      "Cisco networking distributor for enterprise, data center and AI networks. Explore Silicon One for routers, switches and high-performance AI fabrics.",
    keywords: [
      "Cisco Silicon One",
      "Cisco networking distributor",
      "AI network fabric",
      "programmable networking silicon",
    ],
  },
  dell: {
    metaTitle:
      "Dell PowerEdge Server Distributor | AI Infrastructure | Servchip",
    metaDescription:
      "Dell PowerEdge server distributor for enterprise AI, HPC and data centers. Explore XE9680 and XE8640 GPU servers for AI training, inference and HPC.",
    keywords: [],
  },
  hpe: {
    metaTitle: "HPE Server Distributor | Cray XD & ProLiant | Servchip",
    metaDescription:
      "HPE server distributor for enterprise AI, HPC and data centers. Explore Cray XD AI and HPC servers and ProLiant systems for enterprise workloads.",
    keywords: [],
  },
  supermicro: {
    metaTitle:
      "Supermicro GPU Server Distributor | AI & HPC Servers | Servchip",
    metaDescription:
      "Supermicro GPU server distributor for AI, deep learning and HPC workloads. Explore AS-8125GS and SYS-821GE GPU servers for training and inference.",
    keywords: [
      "Supermicro GPU server distributor",
      "AS-8125GS",
      "SYS-821GE",
      "GPU server supplier",
    ],
  },
  lenovo: {
    metaTitle: "Lenovo Server Distributor | ThinkSystem AI Servers | Servchip",
    metaDescription:
      "Lenovo ThinkSystem server distributor for enterprise AI and HPC. Explore SR780A and SR685A AI servers for training, inference and data center workloads.",
    keywords: [
      "Lenovo ThinkSystem distributor",
      "SR780A",
      "SR685A",
      "AI server distributor",
    ],
  },
  gigabyte: {
    metaTitle: "Gigabyte GPU Server Distributor | AI & HPC Servers | Servchip",
    metaDescription:
      "Gigabyte GPU server distributor for AI and HPC workloads. Explore G Series GPU servers for AI training, deep learning, inference and data centers.",
    keywords: ["Gigabyte GPU server", "G593", "GPU server distributor"],
  },
  asus: {
    metaTitle: "ASUS Server Distributor | ESC AI Server Platforms | Servchip",
    metaDescription:
      "ASUS AI server distributor for enterprise AI and data centers. Explore ESC GPU server platforms for AI training, inference and high-performance computing.",
    keywords: ["ASUS ESC N8", "ASUS AI server", "GPU server distributor"],
  },
  inspur: {
    metaTitle: "Inspur Server Distributor | NF AI Server Platforms | Servchip",
    metaDescription:
      "Inspur AI server distributor for enterprise AI, HPC and cloud data centers. Explore NF Series GPU servers, including NF5688, for AI training and inference.",
    keywords: ["Inspur NF5688", "Inspur AI server", "GPU server distributor"],
  },
  quanta: {
    metaTitle: "Quanta Server Distributor | AI GPU Infrastructure | Servchip",
    metaDescription:
      "Quanta QCT server distributor for hyperscale and enterprise data centers. Explore AI GPU server platforms for machine learning, inference and HPC.",
    keywords: ["Quanta QCT", "AI GPU server", "hyperscale server"],
  },
  foxconn: {
    metaTitle: "Foxconn Server Distributor | AI GPU Infrastructure | Servchip",
    metaDescription:
      "Foxconn AI GPU server distributor for hyperscale and enterprise data centers. Explore GPU server platforms for AI training, inference and HPC computing.",
    keywords: [
      "Foxconn AI GPU server",
      "hyperscale server",
      "AI infrastructure",
    ],
  },
  wiwynn: {
    metaTitle: "Wiwynn Server Distributor | AI GPU Infrastructure | Servchip",
    metaDescription:
      "Wiwynn AI GPU server distributor for cloud and data center infrastructure. Explore GPU-accelerated server and storage platforms for AI and HPC workloads.",
    keywords: [
      "Wiwynn AI server",
      "GPU server platform",
      "cloud infrastructure",
    ],
  },
  samsung: {
    metaTitle:
      "Samsung Memory & SSD Distributor | HBM, DDR5 & Enterprise SSDs | Servchip",
    metaDescription:
      "Samsung memory and SSD distributor for AI and enterprise data centers. Explore HBM3E memory, DDR5 RDIMM and enterprise SSDs for AI and HPC systems.",
    keywords: [
      "Samsung HBM3E",
      "Samsung DDR5 RDIMM",
      "Samsung enterprise SSD",
      "memory distributor",
    ],
  },
  "sk-hynix": {
    metaTitle: "SK hynix Memory Distributor | HBM3E for AI | Servchip",
    metaDescription:
      "SK hynix memory distributor for AI accelerators and HPC systems. Explore HBM3E high-bandwidth memory for AI training, inference and HPC applications.",
    keywords: ["SK hynix HBM3E", "HBM3E memory", "AI memory distributor"],
  },
  micron: {
    metaTitle:
      "Micron Memory & SSD Distributor | HBM, DDR5 & Storage | Servchip",
    metaDescription:
      "Micron memory and SSD distributor for AI, cloud and enterprise data centers. Explore HBM3E memory, DDR5 RDIMM and enterprise NVMe SSDs for AI and HPC.",
    keywords: [
      "Micron HBM3E",
      "Micron DDR5",
      "Micron enterprise SSD",
      "memory distributor",
    ],
  },
  solidigm: {
    metaTitle: "Solidigm Enterprise SSD Distributor | D7 Series | Servchip",
    metaDescription:
      "Solidigm enterprise SSD distributor for AI, cloud and data center storage. Explore D7 Series NVMe SSDs for high-performance computing and enterprise use.",
    keywords: ["Solidigm D7", "enterprise SSD", "NVMe SSD distributor"],
  },
  kioxia: {
    metaTitle: "Kioxia Enterprise SSD Distributor | CM7 Series | Servchip",
    metaDescription:
      "Kioxia enterprise SSD distributor for AI, cloud and data centers. Explore CM7 Series NVMe SSDs for high-performance computing and enterprise storage.",
    keywords: ["Kioxia CM7", "enterprise SSD", "NVMe SSD distributor"],
  },
  wd: {
    metaTitle:
      "Western Digital Storage Distributor | Ultrastar SSDs | Servchip",
    metaDescription:
      "Western Digital storage distributor for AI, cloud and enterprise data centers. Explore Ultrastar enterprise SSDs for high-performance computing and storage",
    keywords: [],
  },
  seagate: {
    metaTitle: "Seagate Enterprise SSD Distributor | Nytro Series | Servchip",
    metaDescription:
      "Seagate enterprise SSD distributor for AI, cloud and data centers. Explore Nytro NVMe SSDs for high-performance computing and demanding workloads.",
    keywords: ["Seagate Nytro", "enterprise SSD", "NVMe SSD distributor"],
  },
  google: {
    metaTitle:
      "Google TPU Distributor | AI Accelerator Infrastructure | Servchip",
    metaDescription:
      "Google TPU infrastructure distributor for AI and machine learning. Explore TPU accelerator platforms for AI training, inference and high-performance AI.",
    keywords: [
      "Google TPU v6",
      "Google TPU v7",
      "AI accelerator infrastructure",
    ],
  },
  amazon: {
    metaTitle: "AWS AI Chip Distributor | Trainium & Inferentia | Servchip",
    metaDescription:
      "AWS AI chip distributor for machine learning infrastructure. Explore Amazon Trainium and Inferentia accelerators for model training, inference and cloud AI",
    keywords: ["Amazon Trainium", "Inferentia", "AWS AI chips"],
  },
  qualcomm: {
    metaTitle: "Qualcomm Data Center CPU Distributor | Servchip",
    metaDescription:
      "Qualcomm data center CPU distributor for cloud and AI infrastructure. Explore ARM-based server processors for enterprise data centers and efficient AI.",
    keywords: [
      "Qualcomm data center CPU",
      "ARM server CPU",
      "cloud CPU distributor",
    ],
  },
  ampere: {
    metaTitle: "Ampere Server CPU Distributor | AmpereOne ARM CPUs | Servchip",
    metaDescription:
      "Ampere server CPU distributor for cloud and data center infrastructure. Explore AmpereOne ARM server processors for cloud-native computing and AI.",
    keywords: ["AmpereOne", "ARM server CPU", "cloud-native processor"],
  },
  nokia: {
    metaTitle: "Nokia Networking Silicon Distributor | 5G & Optical | Servchip",
    metaDescription:
      "Nokia networking silicon distributor for telecom, 5G and data centers. Explore network processors, optical DSPs and solutions for high-performance AI.",
    keywords: [
      "Nokia network processor",
      "Nokia FP5",
      "optical DSP",
      "5G semiconductor",
    ],
  },
};
