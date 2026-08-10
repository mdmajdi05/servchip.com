import type { Brand } from "@/types";

export const BRANDS: Brand[] = [
  {
    id: "nvidia",
    name: "NVIDIA",
    slug: "nvidia",
    description:
      "NVIDIA GPU distributor for enterprise AI, HPC and data center infrastructure — including H100, H200, B200, GB200 and RTX 6000 Ada GPUs.",
    longDescription:
      "NVIDIA is the world's leading provider of AI GPUs, data center accelerators and accelerated computing platforms. From H100 and H200 Hopper GPUs to B200 and GB200 Blackwell accelerators, NVIDIA architecture powers AI training, inference, HPC and professional visualization workloads across every industry. Servchip sources and supplies NVIDIA data center GPUs, professional RTX GPUs, networking hardware and Grace CPU solutions for enterprise deployments worldwide.",
    website: "https://www.nvidia.com",
    founded: "1993",
    headquarters: "Santa Clara, California, USA",
    categories: [
      {
        id: "nvidia-data-center",
        name: "Data Center GPUs",
        slug: "data-center-gpus",
        description:
          "Enterprise AI training and inference GPUs for data centers.",
        icon: "Server",
        subcategories: [
          {
            id: "nvidia-dc-blackwell",
            name: "Blackwell Series",
            slug: "blackwell-series",
            description: "Next-gen AI & HPC accelerators",
            chipIds: ["nvidia-gb200", "nvidia-b300", "nvidia-b200"],
          },
          {
            id: "nvidia-dc-hopper",
            name: "Hopper Series",
            slug: "hopper-series",
            description: "Enterprise AI training GPUs",
            chipIds: ["nvidia-h200", "nvidia-h100"],
          },
          {
            id: "nvidia-dc-ada",
            name: "Ada Lovelace",
            slug: "ada-lovelace-dc",
            description: "Versatile data center GPUs",
            chipIds: ["nvidia-l40s", "nvidia-l4"],
          },
        ],
      },
      {
        id: "nvidia-professional",
        name: "Professional RTX",
        slug: "professional-rtx",
        description: "Professional graphics and compute GPUs for workstations.",
        icon: "Monitor",
        subcategories: [
          {
            id: "nvidia-pro-rtx6000",
            name: "RTX 6000 Series",
            slug: "rtx-6000-series",
            description: "Flagship professional GPUs",
            chipIds: ["nvidia-rtx6000"],
          },
          {
            id: "nvidia-pro-rtx5000",
            name: "RTX 5000 Series",
            slug: "rtx-5000-series",
            description: "Mid-range professional GPUs",
            chipIds: ["nvidia-rtx5000"],
          },
        ],
      },
      {
        id: "nvidia-ai-accelerators",
        name: "AI Accelerators",
        slug: "ai-accelerators",
        description: "Specialized AI inference and edge accelerators.",
        icon: "Brain",
        subcategories: [
          {
            id: "nvidia-ai-jetson",
            name: "Jetson Series",
            slug: "jetson-series",
            description: "Edge AI and robotics modules",
            chipIds: [],
          },
          {
            id: "nvidia-ai-triton",
            name: "Triton Inference",
            slug: "triton-inference",
            description: "AI inference servers",
            chipIds: [],
          },
        ],
      },
      {
        id: "nvidia-networking",
        name: "Networking",
        slug: "networking",
        description: "High-speed networking and interconnect solutions.",
        icon: "Network",
        subcategories: [
          {
            id: "nvidia-net-spectrumx",
            name: "Spectrum-X",
            slug: "spectrum-x",
            description: "Ethernet networking platform",
            chipIds: [],
          },
          {
            id: "nvidia-net-quantum",
            name: "Quantum InfiniBand",
            slug: "quantum-infiniband",
            description: "High-speed InfiniBand networking",
            chipIds: [],
          },
          {
            id: "nvidia-net-connectx8",
            name: "ConnectX-8",
            slug: "connectx-8",
            description: "Smart network interface controllers",
            chipIds: [],
          },
          {
            id: "nvidia-net-dpu",
            name: "BlueField-3 DPU",
            slug: "bluefield-3-dpu",
            description: "Data processing units",
            chipIds: [],
          },
        ],
      },
      {
        id: "nvidia-hpc",
        name: "HPC & Grace",
        slug: "hpc-grace",
        description: "High-performance computing and Grace Superchips.",
        icon: "Zap",
        subcategories: [
          {
            id: "nvidia-hpc-grace",
            name: "Grace Hopper",
            slug: "grace-hopper",
            description: "Superchip for HPC & AI",
            chipIds: ["nvidia-gh200"],
          },
          {
            id: "nvidia-hpc-cpu",
            name: "Grace CPU",
            slug: "grace-cpu",
            description: "ARM-based server CPUs",
            chipIds: ["nvidia-grace-cpu"],
          },
        ],
      },
    ],
  },
  {
    id: "amd",
    name: "AMD",
    slug: "amd",
    description:
      "AMD GPU and CPU distributor for enterprise AI, HPC and data centers — Instinct MI300X, MI325X, MI350X accelerators and EPYC 9005 server CPUs.",
    longDescription:
      "AMD delivers high-performance CPUs, GPUs and adaptive computing solutions for AI, HPC, data centers and professional visualization. The AMD Instinct MI300, MI325 and MI350 accelerator series, alongside EPYC 9005 and 9004 server processors, power some of the world's most demanding AI training and inference workloads. Servchip supplies AMD Instinct accelerators, Radeon Pro GPUs and EPYC CPUs for enterprise and hyperscale data centers.",
    website: "https://www.amd.com",
    founded: "1969",
    headquarters: "Santa Clara, California, USA",
    categories: [
      {
        id: "amd-instinct",
        name: "AMD Instinct Accelerators",
        slug: "amd-instinct-accelerators",
        description:
          "AI training and HPC accelerators with AMD CDNA architecture.",
        icon: "Server",
        subcategories: [
          {
            id: "amd-instinct-mi350",
            name: "Instinct MI350 Series",
            slug: "instinct-mi350-series",
            description: "Next-gen AI accelerators",
            chipIds: ["amd-mi350x"],
          },
          {
            id: "amd-instinct-mi325",
            name: "Instinct MI325 Series",
            slug: "instinct-mi325-series",
            description: "AI inference accelerators",
            chipIds: ["amd-mi325x"],
          },
          {
            id: "amd-instinct-mi300",
            name: "Instinct MI300 Series",
            slug: "instinct-mi300-series",
            description: "Flagship AI accelerators",
            chipIds: ["amd-mi300x", "amd-mi300a"],
          },
          {
            id: "amd-instinct-mi250",
            name: "Instinct MI250 Series",
            slug: "instinct-mi250-series",
            description: "HPC accelerators",
            chipIds: ["amd-mi250"],
          },
        ],
      },
      {
        id: "amd-radeon-pro",
        name: "AMD Radeon Pro",
        slug: "amd-radeon-pro",
        description:
          "Professional graphics GPUs for workstations and enterprise.",
        icon: "Monitor",
        subcategories: [
          {
            id: "amd-pro-w7000",
            name: "Radeon Pro W7000 Series",
            slug: "radeon-pro-w7000-series",
            description: "Flagship workstation GPUs",
            chipIds: ["amd-w7900"],
          },
          {
            id: "amd-pro-w6000",
            name: "Radeon Pro W6000 Series",
            slug: "radeon-pro-w6000-series",
            description: "Professional workstation GPUs",
            chipIds: [],
          },
        ],
      },
      {
        id: "amd-epyc",
        name: "AMD EPYC Processors",
        slug: "amd-epyc-processors",
        description: "High-performance server CPUs for data centers and cloud.",
        icon: "Cpu",
        subcategories: [
          {
            id: "amd-epyc-9005",
            name: "EPYC 9005 Series",
            slug: "epyc-9005-series",
            description: "Turin — 5th gen EPYC",
            chipIds: ["amd-epyc-9755", "amd-epyc-9655"],
          },
          {
            id: "amd-epyc-9004",
            name: "EPYC 9004 Series",
            slug: "epyc-9004-series",
            description: "Genoa — 4th gen EPYC",
            chipIds: ["amd-epyc-9654"],
          },
        ],
      },
      {
        id: "amd-pensando",
        name: "Pensando DPU",
        slug: "pensando-dpu",
        description: "Data processing units for software-defined cloud.",
        icon: "Network",
        subcategories: [
          {
            id: "amd-pensando-dpu",
            name: "Pensando DPU Series",
            slug: "pensando-dpu-series",
            description: "Programmable data processing units",
            chipIds: ["amd-pensando-dpu"],
          },
        ],
      },
    ],
  },
  {
    id: "intel",
    name: "Intel",
    slug: "intel",
    description:
      "Intel CPU and AI accelerator distributor for enterprise data centers — Xeon 6 processors, Gaudi 3 AI accelerators and Arc Pro GPUs.",
    longDescription:
      "Intel powers the world's data centers, AI workloads and edge computing with Xeon server processors, Gaudi AI training and inference accelerators, Arc GPUs and programmable FPGA solutions. The Xeon 6 and Gaudi 3 platforms deliver enterprise-grade performance for AI, HPC and cloud workloads. Servchip distributes Intel Xeon CPUs, Gaudi AI accelerators, Arc Pro GPUs and Ethernet networking hardware for enterprise infrastructure.",
    website: "https://www.intel.com",
    founded: "1968",
    headquarters: "Santa Clara, California, USA",
    categories: [
      {
        id: "intel-xeon",
        name: "Intel Xeon Processors",
        slug: "intel-xeon-processors",
        description:
          "Server and workstation CPUs for data centers and enterprise.",
        icon: "Server",
        subcategories: [
          {
            id: "intel-xeon-6",
            name: "Xeon 6 Series",
            slug: "xeon-6-series",
            description: "Latest gen performance cores",
            chipIds: ["intel-xeon-6900", "intel-xeon-6700", "intel-xeon-6980p"],
          },
          {
            id: "intel-xeon-max",
            name: "Xeon Max Series",
            slug: "xeon-max-series",
            description: "With HBM memory",
            chipIds: ["intel-xeon-max"],
          },
          {
            id: "intel-xeon-4",
            name: "Xeon 4th Gen",
            slug: "xeon-4th-gen",
            description: "Sapphire Rapids",
            chipIds: ["intel-xeon-8490h"],
          },
        ],
      },
      {
        id: "intel-gaudi",
        name: "Intel Gaudi AI",
        slug: "intel-gaudi-ai",
        description: "AI training and inference accelerators.",
        icon: "Brain",
        subcategories: [
          {
            id: "intel-gaudi-3",
            name: "Gaudi 3",
            slug: "gaudi-3",
            description: "Latest gen AI accelerator",
            chipIds: ["intel-gaudi-3"],
          },
          {
            id: "intel-gaudi-2",
            name: "Gaudi 2",
            slug: "gaudi-2",
            description: "AI training and inference",
            chipIds: ["intel-gaudi-2"],
          },
        ],
      },
      {
        id: "intel-arc",
        name: "Intel Arc GPUs",
        slug: "intel-arc-gpus",
        description: "Professional and consumer graphics solutions.",
        icon: "Monitor",
        subcategories: [
          {
            id: "intel-arc-pro",
            name: "Arc Pro Series",
            slug: "arc-pro-series",
            description: "Professional workstation GPUs",
            chipIds: ["intel-arc-a770"],
          },
          {
            id: "intel-arc-a",
            name: "Arc A Series",
            slug: "arc-a-series",
            description: "Consumer and pro GPUs",
            chipIds: [],
          },
        ],
      },
      {
        id: "intel-networking",
        name: "Networking",
        slug: "intel-networking",
        description: "Ethernet networking solutions for data centers.",
        icon: "Network",
        subcategories: [
          {
            id: "intel-net-e810",
            name: "Ethernet E810",
            slug: "ethernet-e810",
            description: "100GbE network adapters",
            chipIds: ["intel-e810"],
          },
        ],
      },
      {
        id: "intel-agilex",
        name: "Intel FPGAs",
        slug: "intel-fpgas",
        description: "Programmable logic for acceleration and edge AI.",
        icon: "Microchip",
        subcategories: [
          {
            id: "intel-agilex-7",
            name: "Agilex 7",
            slug: "agilex-7",
            description: "High-end FPGAs",
            chipIds: [],
          },
          {
            id: "intel-agilex-5",
            name: "Agilex 5",
            slug: "agilex-5",
            description: "Mid-range FPGAs",
            chipIds: [],
          },
        ],
      },
    ],
  },
  {
    id: "broadcom",
    name: "Broadcom",
    slug: "broadcom",
    description:
      "Broadcom networking silicon distributor for AI and data center networks — Tomahawk 6 and Jericho 3AI Ethernet switch silicon.",
    longDescription:
      "Broadcom is a global leader in networking semiconductors, providing high-performance Ethernet switch silicon that powers the world's largest data centers and AI clusters. The Tomahawk 6 platform delivers 51.2 Tbps switching capacity, while Jericho 3AI is purpose-built for AI-optimized Ethernet fabrics. Servchip supplies Broadcom Ethernet switch silicon for hyperscale, enterprise and AI cluster networking deployments.",
    website: "https://www.broadcom.com",
    founded: "1961",
    headquarters: "San Jose, California, USA",
    categories: [
      {
        id: "broadcom-ethernet",
        name: "Ethernet Switches",
        slug: "ethernet-switches",
        description: "High-performance Ethernet switching silicon.",
        icon: "Network",
        subcategories: [
          {
            id: "broadcom-tomahawk-6",
            name: "Tomahawk 6",
            slug: "tomahawk-6",
            description: "51.2 Tbps Ethernet switch",
            chipIds: ["broadcom-tomahawk-6"],
          },
          {
            id: "broadcom-jericho-3ai",
            name: "Jericho 3AI",
            slug: "jericho-3ai",
            description: "AI-optimized Ethernet switch",
            chipIds: ["broadcom-jericho-3ai"],
          },
        ],
      },
    ],
  },
  {
    id: "marvell",
    name: "Marvell",
    slug: "marvell",
    description:
      "Marvell Ethernet switch and networking silicon distributor for cloud and AI data centers — Teralynx 10 switch platform.",
    longDescription:
      "Marvell delivers data infrastructure technology, including the Teralynx Ethernet switch family, custom ASICs and storage controllers that power cloud, AI and enterprise data centers. Teralynx 10 provides 51.2 Tbps of switching bandwidth for high-density networking. Servchip supplies Marvell Ethernet switch silicon for hyperscale and enterprise data center networking infrastructure.",
    website: "https://www.marvell.com",
    founded: "1995",
    headquarters: "Santa Clara, California, USA",
    categories: [
      {
        id: "marvell-ethernet",
        name: "Ethernet Switches",
        slug: "ethernet-switches",
        description: "High-performance Ethernet switching silicon.",
        icon: "Network",
        subcategories: [
          {
            id: "marvell-teralynx-10",
            name: "Teralynx 10",
            slug: "teralynx-10",
            description: "51.2 Tbps Ethernet switch",
            chipIds: ["marvell-teralynx-10"],
          },
        ],
      },
    ],
  },
  {
    id: "cisco",
    name: "Cisco",
    slug: "cisco",
    description:
      "Cisco networking silicon distributor for routers, switches and AI infrastructure — Silicon One programmable networking platform.",
    longDescription:
      "Cisco is the worldwide leader in networking technology. The Cisco Silicon One family provides unified, programmable silicon architecture used across routers, switches and AI network fabrics, giving operators a single silicon platform for enterprise and hyperscale networks. Servchip supplies Cisco Silicon One networking hardware for enterprise, data center and AI network infrastructure.",
    website: "https://www.cisco.com",
    founded: "1984",
    headquarters: "San Jose, California, USA",
    categories: [
      {
        id: "cisco-silicon",
        name: "Networking Silicon",
        slug: "networking-silicon",
        description:
          "Programmable networking silicon for routers and switches.",
        icon: "Network",
        subcategories: [
          {
            id: "cisco-silicon-one",
            name: "Silicon One",
            slug: "silicon-one",
            description: "Unified programmable silicon",
            chipIds: ["cisco-silicon-one"],
          },
        ],
      },
    ],
  },
  {
    id: "dell",
    name: "Dell Technologies",
    slug: "dell-technologies",
    description:
      "Dell PowerEdge AI server distributor for enterprise data centers — XE9680 and XE8640 GPU-accelerated servers.",
    longDescription:
      "Dell Technologies delivers comprehensive AI infrastructure solutions with PowerEdge servers optimized for AI training, inference and HPC workloads. The PowerEdge XE9680 and XE8640 platforms are purpose-built for GPU-dense AI compute at scale. Servchip supplies Dell PowerEdge AI servers backed by global enterprise support for data center and AI infrastructure deployments.",
    website: "https://www.dell.com",
    founded: "1984",
    headquarters: "Round Rock, Texas, USA",
    categories: [
      {
        id: "dell-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "dell-poweredge-xe",
            name: "PowerEdge XE Series",
            slug: "poweredge-xe-series",
            description: "AI-optimized servers",
            chipIds: ["dell-xe9680", "dell-xe8640"],
          },
        ],
      },
    ],
  },
  {
    id: "hpe",
    name: "Hewlett Packard Enterprise",
    slug: "hewlett-packard-enterprise",
    description:
      "HPE AI and HPC server distributor for enterprise data centers — Cray XD670 servers and ProLiant DL enterprise systems.",
    longDescription:
      "Hewlett Packard Enterprise (HPE) delivers AI-optimized servers including the Cray XD family for HPC and AI training, and ProLiant servers for general enterprise workloads. The Cray XD670 platform is engineered for large-scale AI and high-performance computing deployments. Servchip supplies HPE Cray XD and ProLiant servers for enterprise data center and AI infrastructure.",
    website: "https://www.hpe.com",
    founded: "2015",
    headquarters: "Houston, Texas, USA",
    categories: [
      {
        id: "hpe-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "hpe-cray-xd",
            name: "Cray XD Series",
            slug: "cray-xd-series",
            description: "AI and HPC servers",
            chipIds: ["hpe-cray-xd670"],
          },
        ],
      },
      {
        id: "hpe-proliant",
        name: "ProLiant",
        slug: "proliant",
        description: "Enterprise servers for general workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "hpe-dl380",
            name: "ProLiant DL Series",
            slug: "proliant-dl-series",
            description: "Enterprise rack servers",
            chipIds: ["hpe-dl380-gen12"],
          },
        ],
      },
    ],
  },
  {
    id: "supermicro",
    name: "Supermicro",
    slug: "supermicro",
    description:
      "Supermicro GPU server distributor for AI, deep learning and HPC workloads — AS-8125GS and SYS-821GE platforms.",
    longDescription:
      "Supermicro provides a broad portfolio of GPU-accelerated servers optimized for AI, deep learning and HPC workloads, with leadership in liquid-cooled data center solutions. The AS-8125GS and SYS-821GE platforms deliver dense GPU compute for AI training and inference. Servchip supplies Supermicro GPU servers for enterprise and hyperscale AI infrastructure deployments.",
    website: "https://www.supermicro.com",
    founded: "1993",
    headquarters: "San Jose, California, USA",
    categories: [
      {
        id: "supermicro-gpu-servers",
        name: "GPU Servers",
        slug: "gpu-servers",
        description: "Servers with GPU acceleration for AI workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "supermicro-as",
            name: "AS Series",
            slug: "as-series",
            description: "GPU-accelerated servers",
            chipIds: ["supermicro-as-8125gs", "supermicro-sys-821ge"],
          },
        ],
      },
    ],
  },
  {
    id: "lenovo",
    name: "Lenovo",
    slug: "lenovo",
    description:
      "Lenovo ThinkSystem AI server distributor for enterprise data centers — SR780A and SR685A AI-optimized servers.",
    longDescription:
      "Lenovo delivers AI-optimized server solutions including the ThinkSystem SR series, designed for AI training, inference and high-performance computing workloads across enterprise data centers. The SR780A and SR685A platforms support dense GPU configurations for demanding AI workloads. Servchip supplies Lenovo ThinkSystem AI servers for enterprise and data center infrastructure.",
    website: "https://www.lenovo.com",
    founded: "1984",
    headquarters: "Beijing, China / Morrisville, NC, USA",
    categories: [
      {
        id: "lenovo-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "lenovo-sr-series",
            name: "ThinkSystem SR Series",
            slug: "thinksystem-sr-series",
            description: "AI-optimized servers",
            chipIds: ["lenovo-sr780a", "lenovo-sr685a"],
          },
        ],
      },
    ],
  },
  {
    id: "gigabyte",
    name: "Gigabyte",
    slug: "gigabyte",
    description:
      "Gigabyte GPU server distributor for AI and HPC workloads — G593 GPU-accelerated server platform.",
    longDescription:
      "Gigabyte Technology provides high-performance GPU servers and workstations optimized for AI, deep learning and HPC applications with robust thermal and power designs. The G593 platform is engineered for dense GPU compute in AI training and inference workloads. Servchip supplies Gigabyte GPU servers for enterprise and data center AI infrastructure.",
    website: "https://www.gigabyte.com",
    founded: "1986",
    headquarters: "New Taipei City, Taiwan",
    categories: [
      {
        id: "gigabyte-gpu-servers",
        name: "GPU Servers",
        slug: "gpu-servers",
        description: "Servers with GPU acceleration for AI workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "gigabyte-g-servers",
            name: "G Series",
            slug: "g-series",
            description: "GPU-accelerated servers",
            chipIds: ["gigabyte-g593"],
          },
        ],
      },
    ],
  },
  {
    id: "asus",
    name: "ASUS",
    slug: "asus",
    description:
      "ASUS AI server distributor for enterprise data center workloads — ESC N8 GPU server platform.",
    longDescription:
      "ASUS provides AI-optimized server platforms and GPU workstations, delivering enterprise-grade performance for AI training, inference and data analytics workloads. The ESC N8 platform supports high-density GPU configurations for demanding compute environments. Servchip supplies ASUS ESC AI servers for enterprise data center and AI infrastructure deployments.",
    website: "https://www.asus.com",
    founded: "1989",
    headquarters: "Taipei, Taiwan",
    categories: [
      {
        id: "asus-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "asus-esc-series",
            name: "ESC Series",
            slug: "esc-series",
            description: "AI-optimized servers",
            chipIds: ["asus-esc-n8"],
          },
        ],
      },
    ],
  },
  {
    id: "inspur",
    name: "Inspur",
    slug: "inspur",
    description:
      "Inspur AI server distributor for enterprise, HPC and cloud data centers — NF5688 GPU server platform.",
    longDescription:
      "Inspur is a leading provider of AI server platforms, delivering high-performance computing solutions for AI training, inference and cloud data centers worldwide. The NF5688 platform is built for large-scale, GPU-dense AI compute environments. Servchip supplies Inspur NF Series AI servers for enterprise and cloud data center infrastructure.",
    website: "https://www.inspur.com",
    founded: "1949",
    headquarters: "Jinan, Shandong, China",
    categories: [
      {
        id: "inspur-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "inspur-nf-series",
            name: "NF Series",
            slug: "nf-series",
            description: "AI-optimized servers",
            chipIds: ["inspur-nf5688"],
          },
        ],
      },
    ],
  },
  {
    id: "quanta",
    name: "Quanta",
    slug: "quanta",
    description:
      "Quanta (QCT) AI GPU server distributor for hyperscale and enterprise data centers.",
    longDescription:
      "Quanta Cloud Technology (QCT) delivers AI-optimized GPU server platforms for hyperscale data centers, AI training and inference workloads, with innovative thermal and power efficiency designs. Servchip supplies Quanta AI GPU servers for hyperscale, enterprise and cloud data center infrastructure.",
    website: "https://www.quanta.com",
    founded: "1988",
    headquarters: "Taipei, Taiwan",
    categories: [
      {
        id: "quanta-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "quanta-ai-gpu-servers",
            name: "AI GPU Servers",
            slug: "ai-gpu-servers",
            description: "GPU-accelerated AI servers",
            chipIds: ["quanta-ai-gpu"],
          },
        ],
      },
    ],
  },
  {
    id: "foxconn",
    name: "Foxconn",
    slug: "foxconn",
    description:
      "Foxconn AI GPU server distributor for hyperscale and enterprise data center infrastructure.",
    longDescription:
      "Foxconn (Hon Hai Precision Industry) manufactures AI GPU servers and data center infrastructure solutions for hyperscale and enterprise customers worldwide. Servchip supplies Foxconn AI GPU server platforms for large-scale data center and AI infrastructure deployments.",
    website: "https://www.foxconn.com",
    founded: "1974",
    headquarters: "New Taipei City, Taiwan",
    categories: [
      {
        id: "foxconn-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "foxconn-ai-gpu-servers",
            name: "AI GPU Servers",
            slug: "ai-gpu-servers",
            description: "GPU-accelerated AI servers",
            chipIds: ["foxconn-ai-gpu"],
          },
        ],
      },
    ],
  },
  {
    id: "wiwynn",
    name: "Wiwynn",
    slug: "wiwynn",
    description:
      "Wiwynn AI GPU server distributor for cloud data center infrastructure and GPU-accelerated computing.",
    longDescription:
      "Wiwynn delivers AI-optimized server platforms and storage solutions for cloud data centers, with a focus on GPU-accelerated computing and energy-efficient designs. Servchip supplies Wiwynn AI GPU servers and storage platforms for cloud and hyperscale data center infrastructure.",
    website: "https://www.wiwynn.com",
    founded: "2012",
    headquarters: "New Taipei City, Taiwan",
    categories: [
      {
        id: "wiwynn-ai-servers",
        name: "AI Servers",
        slug: "ai-servers",
        description: "Servers optimized for AI and HPC workloads.",
        icon: "Server",
        subcategories: [
          {
            id: "wiwynn-ai-gpu-servers",
            name: "AI GPU Servers",
            slug: "ai-gpu-servers",
            description: "GPU-accelerated AI servers",
            chipIds: ["wiwynn-ai-gpu"],
          },
        ],
      },
    ],
  },
  {
    id: "samsung",
    name: "Samsung",
    slug: "samsung",
    description:
      "Samsung memory and SSD distributor for AI and enterprise data centers — HBM3E, DDR5 RDIMM, PM1743 and PM9D3 enterprise SSDs.",
    longDescription:
      "Samsung is the world leader in memory and storage technology, providing HBM3E high-bandwidth memory, DDR5 RDIMM server memory and enterprise NVMe SSDs for AI, HPC and cloud data centers. The PM1743 and PM9D3 SSD platforms deliver high-throughput enterprise storage performance. Servchip supplies Samsung HBM3E memory, DDR5 RDIMM and enterprise SSDs for AI and data center infrastructure.",
    website: "https://www.samsung.com",
    founded: "1938",
    headquarters: "Suwon, South Korea",
    categories: [
      {
        id: "samsung-memory",
        name: "Memory",
        slug: "memory",
        description: "High-bandwidth memory and DRAM solutions.",
        icon: "MemoryStick",
        subcategories: [
          {
            id: "samsung-hbm3e",
            name: "HBM3E",
            slug: "hbm3e",
            description: "High-bandwidth memory for AI accelerators",
            chipIds: ["samsung-hbm3e"],
          },
          {
            id: "samsung-ddr5",
            name: "DDR5 RDIMM",
            slug: "ddr5-rdimm",
            description: "Enterprise server memory",
            chipIds: ["samsung-ddr5-rdimm"],
          },
        ],
      },
      {
        id: "samsung-storage",
        name: "Storage",
        slug: "storage",
        description: "Enterprise NVMe SSDs for data centers.",
        icon: "HardDrive",
        subcategories: [
          {
            id: "samsung-pm1743",
            name: "PM1743",
            slug: "pm1743",
            description: "Enterprise NVMe SSD",
            chipIds: ["samsung-pm1743"],
          },
          {
            id: "samsung-pm9d3",
            name: "PM9D3",
            slug: "pm9d3",
            description: "Enterprise SSD",
            chipIds: ["samsung-pm9d3"],
          },
        ],
      },
    ],
  },
  {
    id: "sk-hynix",
    name: "SK hynix",
    slug: "sk-hynix",
    description:
      "SK hynix HBM3E memory distributor for AI accelerators and high-performance computing systems.",
    longDescription:
      "SK hynix is a leading semiconductor memory supplier, providing HBM3E high-bandwidth memory solutions purpose-built for AI accelerators and high-performance computing systems. Servchip supplies SK hynix HBM3E memory for AI training, inference and HPC infrastructure deployments.",
    website: "https://www.skhynix.com",
    founded: "1983",
    headquarters: "Icheon, South Korea",
    categories: [
      {
        id: "sk-hynix-memory",
        name: "Memory",
        slug: "memory",
        description: "High-bandwidth memory solutions.",
        icon: "MemoryStick",
        subcategories: [
          {
            id: "sk-hynix-hbm3e",
            name: "HBM3E",
            slug: "hbm3e",
            description: "High-bandwidth memory for AI",
            chipIds: ["sk-hynix-hbm3e"],
          },
        ],
      },
    ],
  },
  {
    id: "micron",
    name: "Micron",
    slug: "micron",
    description:
      "Micron memory and SSD distributor for AI, cloud and enterprise data centers — HBM3E, DDR5 RDIMM and 9550 NVMe SSDs.",
    longDescription:
      "Micron delivers innovative memory and storage solutions including HBM3E high-bandwidth memory, DDR5 RDIMM server memory and 9550 NVMe SSDs for AI, cloud and enterprise data centers worldwide. Servchip supplies Micron HBM3E memory, DDR5 RDIMM and enterprise NVMe SSDs for AI and high-throughput data center infrastructure.",
    website: "https://www.micron.com",
    founded: "1978",
    headquarters: "Boise, Idaho, USA",
    categories: [
      {
        id: "micron-memory",
        name: "Memory",
        slug: "memory",
        description: "High-bandwidth memory and DRAM solutions.",
        icon: "MemoryStick",
        subcategories: [
          {
            id: "micron-hbm3e",
            name: "HBM3E",
            slug: "hbm3e",
            description: "High-bandwidth memory for AI accelerators",
            chipIds: ["micron-hbm3e"],
          },
          {
            id: "micron-ddr5",
            name: "DDR5 RDIMM",
            slug: "ddr5-rdimm",
            description: "Enterprise server memory",
            chipIds: ["micron-ddr5-rdimm"],
          },
        ],
      },
      {
        id: "micron-storage",
        name: "Storage",
        slug: "storage",
        description: "Enterprise NVMe SSDs for data centers.",
        icon: "HardDrive",
        subcategories: [
          {
            id: "micron-9550",
            name: "9550 NVMe SSD",
            slug: "9550-nvme-ssd",
            description: "Enterprise NVMe SSD",
            chipIds: ["micron-9550-nvme"],
          },
        ],
      },
    ],
  },
  {
    id: "solidigm",
    name: "Solidigm",
    slug: "solidigm",
    description:
      "Solidigm enterprise SSD distributor for AI, cloud and data center storage — D7-P5810 NVMe SSD platform.",
    longDescription:
      "Solidigm delivers enterprise-grade NAND flash storage solutions optimized for AI, cloud and data center workloads, building on a legacy of SSD innovation. The D7-P5810 platform is engineered for high-throughput, data-intensive enterprise workloads. Servchip supplies Solidigm D7 Series enterprise SSDs for AI and data center storage infrastructure.",
    website: "https://www.solidigm.com",
    founded: "2021",
    headquarters: "Rancho Cordova, California, USA",
    categories: [
      {
        id: "solidigm-storage",
        name: "Storage",
        slug: "storage",
        description: "Enterprise NVMe SSDs for data centers.",
        icon: "HardDrive",
        subcategories: [
          {
            id: "solidigm-d7",
            name: "D7 Series",
            slug: "d7-series",
            description: "Enterprise NVMe SSDs",
            chipIds: ["solidigm-d7-p5810"],
          },
        ],
      },
    ],
  },
  {
    id: "kioxia",
    name: "Kioxia",
    slug: "kioxia",
    description:
      "Kioxia enterprise SSD distributor for AI, cloud and data center storage — CM7 V3 NVMe SSD platform.",
    longDescription:
      "Kioxia is a global leader in NAND flash memory and enterprise SSDs, delivering high-performance storage solutions for AI, cloud and data center applications. The CM7 V3 platform is built for high-throughput, mission-critical enterprise storage workloads. Servchip supplies Kioxia CM7 Series enterprise SSDs for AI and data center infrastructure.",
    website: "https://www.kioxia.com",
    founded: "2017",
    headquarters: "Tokyo, Japan",
    categories: [
      {
        id: "kioxia-storage",
        name: "Storage",
        slug: "storage",
        description: "Enterprise NVMe SSDs for data centers.",
        icon: "HardDrive",
        subcategories: [
          {
            id: "kioxia-cm7",
            name: "CM7 Series",
            slug: "cm7-series",
            description: "Enterprise NVMe SSD",
            chipIds: ["kioxia-cm7-v3"],
          },
        ],
      },
    ],
  },
  {
    id: "wd",
    name: "Western Digital",
    slug: "western-digital",
    description:
      "Western Digital enterprise storage distributor for AI, cloud and data centers — Ultrastar DC SN655 NVMe SSDs.",
    longDescription:
      "Western Digital provides enterprise-grade HDDs and SSDs for AI, cloud and data center storage, including the Ultrastar family of data center drives. The Ultrastar DC SN655 platform delivers high-performance, scalable NVMe storage for data-intensive workloads. Servchip supplies Western Digital Ultrastar enterprise SSDs for AI and data center storage infrastructure.",
    website: "https://www.westerndigital.com",
    founded: "1970",
    headquarters: "San Jose, California, USA",
    categories: [
      {
        id: "wd-storage",
        name: "Storage",
        slug: "storage",
        description: "Enterprise NVMe SSDs for data centers.",
        icon: "HardDrive",
        subcategories: [
          {
            id: "wd-ultrastar",
            name: "Ultrastar Series",
            slug: "ultrastar-series",
            description: "Enterprise NVMe SSDs",
            chipIds: ["wd-ultrastar-dc-sn655"],
          },
        ],
      },
    ],
  },
  {
    id: "seagate",
    name: "Seagate",
    slug: "seagate",
    description:
      "Seagate enterprise SSD distributor for AI, cloud and data centers — Nytro 3530 NVMe SSD platform.",
    longDescription:
      "Seagate delivers enterprise-grade HDDs and NVMe SSDs for AI, cloud and data center storage, including the Nytro family of data center SSDs. The Nytro 3530 platform is engineered for high-performance, demanding enterprise workloads. Servchip supplies Seagate Nytro enterprise SSDs for AI and data center storage infrastructure.",
    website: "https://www.seagate.com",
    founded: "1979",
    headquarters: "Fremont, California, USA",
    categories: [
      {
        id: "seagate-storage",
        name: "Storage",
        slug: "storage",
        description: "Enterprise NVMe SSDs for data centers.",
        icon: "HardDrive",
        subcategories: [
          {
            id: "seagate-nytro",
            name: "Nytro Series",
            slug: "nytro-series",
            description: "Enterprise NVMe SSDs",
            chipIds: ["seagate-nytro-3530"],
          },
        ],
      },
    ],
  },
  {
    id: "google",
    name: "Google",
    slug: "google",
    description:
      "Google TPU accelerator infrastructure for AI training and inference — TPU v6 and TPU v7 platforms.",
    longDescription:
      "Google designs custom Tensor Processing Units (TPUs) to accelerate AI training and inference workloads, powering Google's own services and cloud customers via Google Cloud. The TPU v6 and TPU v7 platforms deliver purpose-built silicon performance for large-scale machine learning. Servchip provides access to Google TPU infrastructure for AI training and inference deployments.",
    website: "https://cloud.google.com/tpu",
    founded: "1998",
    headquarters: "Mountain View, California, USA",
    categories: [
      {
        id: "google-tpu",
        name: "TPU Accelerators",
        slug: "tpu-accelerators",
        description: "Custom AI accelerators for training and inference.",
        icon: "Brain",
        subcategories: [
          {
            id: "google-tpu-v6",
            name: "TPU v6",
            slug: "tpu-v6",
            description: "Latest gen TPU accelerators",
            chipIds: ["google-tpu-v6"],
          },
          {
            id: "google-tpu-v7",
            name: "TPU v7",
            slug: "tpu-v7",
            description: "Next-gen TPU accelerators",
            chipIds: ["google-tpu-v7"],
          },
        ],
      },
    ],
  },
  {
    id: "amazon",
    name: "Amazon",
    slug: "amazon",
    description:
      "AWS custom AI chip infrastructure for cloud and machine learning workloads — Trainium2 and Inferentia2 accelerators.",
    longDescription:
      "Amazon Web Services (AWS) designs custom silicon including Trainium for AI training and Inferentia for AI inference, delivering cost-effective performance for cloud AI workloads. The Trainium2 and Inferentia2 accelerators are purpose-built for large-scale machine learning pipelines. Servchip provides access to AWS Trainium and Inferentia AI chip infrastructure for cloud AI deployments.",
    website: "https://aws.amazon.com/machine-learning/custom-silicon/",
    founded: "1994",
    headquarters: "Seattle, Washington, USA",
    categories: [
      {
        id: "amazon-ai-chips",
        name: "AI Chips",
        slug: "ai-chips",
        description: "Custom AI accelerators for AWS cloud.",
        icon: "Brain",
        subcategories: [
          {
            id: "amazon-trainium",
            name: "Trainium",
            slug: "trainium",
            description: "AI training accelerators",
            chipIds: ["amazon-trainium-2"],
          },
          {
            id: "amazon-inferentia",
            name: "Inferentia",
            slug: "inferentia",
            description: "AI inference accelerators",
            chipIds: ["amazon-inferentia-2"],
          },
        ],
      },
    ],
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    slug: "qualcomm",
    description:
      "Qualcomm data center CPU distributor for cloud and AI infrastructure — ARM-based server processors.",
    longDescription:
      "Qualcomm is expanding into data center computing with custom-designed ARM-based CPUs for cloud and AI workloads, leveraging its industry-leading processor expertise. Servchip supplies Qualcomm data center CPUs for enterprise cloud computing and AI infrastructure deployments.",
    website: "https://www.qualcomm.com",
    founded: "1985",
    headquarters: "San Diego, California, USA",
    categories: [
      {
        id: "qualcomm-dc",
        name: "Data Center CPU",
        slug: "data-center-cpu",
        description: "Custom ARM-based CPUs for cloud data centers.",
        icon: "Cpu",
        subcategories: [
          {
            id: "qualcomm-dc-cpu",
            name: "Qualcomm DC CPU",
            slug: "qualcomm-dc-cpu",
            description: "Data center server CPUs",
            chipIds: ["qualcomm-dc-cpu"],
          },
        ],
      },
    ],
  },
  {
    id: "ampere",
    name: "Ampere",
    slug: "ampere",
    description:
      "Ampere ARM-based server CPU distributor for cloud and edge computing — AmpereOne processor platform.",
    longDescription:
      "Ampere Computing designs high-performance, power-efficient ARM-based server processors for cloud data centers, edge computing and sustainable AI workloads. The AmpereOne platform delivers cloud-native performance with energy-efficient architecture. Servchip supplies Ampere AmpereOne server CPUs for cloud-native and AI-ready data center infrastructure.",
    website: "https://www.amperecomputing.com",
    founded: "2018",
    headquarters: "Santa Clara, California, USA",
    categories: [
      {
        id: "ampere-server-cpus",
        name: "Server CPUs",
        slug: "server-cpus",
        description: "ARM-based cloud-native server processors.",
        icon: "Cpu",
        subcategories: [
          {
            id: "ampere-one",
            name: "AmpereOne",
            slug: "ampereone",
            description: "Cloud-native server processors",
            chipIds: ["ampereone"],
          },
        ],
      },
    ],
  },
  {
    id: "nokia",
    name: "Nokia",
    slug: "nokia",
    description:
      "Nokia networking, communications and semiconductor solutions distributor for service providers and enterprises — FP5 network processors and 5G silicon.",
    longDescription:
      "Nokia is a global leader in networking and communications technology. Its semiconductor portfolio includes network processors, FPGAs and custom ASICs that power the world's most advanced 5G, optical and IP networks. The FP5 network processor and AirScale 5G platforms enable high-performance telecom infrastructure. Servchip supplies Nokia network processors, optical DSPs and 5G semiconductors for telecom and enterprise networking.",
    website: "https://www.nokia.com",
    founded: "1865",
    headquarters: "Espoo, Finland",
    categories: [
      {
        id: "nokia-network-processors",
        name: "Network Processors",
        slug: "network-processors",
        description: "High-performance packet processing and routing silicon.",
        icon: "Network",
        subcategories: [
          {
            id: "nokia-np-fp5",
            name: "FP5 Series",
            slug: "fp5-series",
            description: "Latest gen network processors",
            chipIds: [],
          },
          {
            id: "nokia-np-fp4",
            name: "FP4 Series",
            slug: "fp4-series",
            description: "Previous gen network processors",
            chipIds: [],
          },
        ],
      },
      {
        id: "nokia-optical",
        name: "Optical Semiconductors",
        slug: "optical-semiconductors",
        description: "Optical transport and DSP solutions.",
        icon: "Zap",
        subcategories: [
          {
            id: "nokia-optical-pse",
            name: "PSE Series",
            slug: "pse-series",
            description: "Photonic service engine DSPs",
            chipIds: [],
          },
          {
            id: "nokia-optical-wavelite",
            name: "WaveLite",
            slug: "wavelite",
            description: "Coherent optical DSP",
            chipIds: [],
          },
        ],
      },
      {
        id: "nokia-5g",
        name: "5G Semiconductor",
        slug: "5g-semiconductor",
        description: "5G baseband and radio processing chips.",
        icon: "Radio",
        subcategories: [
          {
            id: "nokia-5g-reach",
            name: "Reach Series",
            slug: "reach-series",
            description: "5G baseband processors",
            chipIds: [],
          },
          {
            id: "nokia-5g-airscale",
            name: "AirScale",
            slug: "airscale",
            description: "5G radio access chips",
            chipIds: [],
          },
        ],
      },
      {
        id: "nokia-iot",
        name: "IoT & Industrial",
        slug: "iot-industrial",
        description: "Chips for industrial IoT and edge connectivity.",
        icon: "Cpu",
        subcategories: [
          {
            id: "nokia-iot-wings",
            name: "WING Series",
            slug: "wing-series",
            description: "IoT connectivity chips",
            chipIds: [],
          },
          {
            id: "nokia-iot-impaas",
            name: "IMPACT",
            slug: "impact",
            description: "Industrial IoT platforms",
            chipIds: [],
          },
        ],
      },
    ],
  },
];

export const BRAND_IDS: string[] = BRANDS.map((m) => m.id);

export function getBrand(id: string): Brand | undefined {
  return BRANDS.find((m) => m.id === id);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  return BRANDS.find((m) => m.slug === slug);
}

export function getAllBrandChipIds(): string[] {
  return BRANDS.flatMap((m) =>
    m.categories.flatMap((c) => c.subcategories.flatMap((s) => s.chipIds)),
  ).filter(Boolean);
}

/** @deprecated Use {@link BRANDS} instead. */
export const MANUFACTURERS = BRANDS;
/** @deprecated Use {@link BRAND_IDS} instead. */
export const MANUFACTURER_IDS = BRAND_IDS;
/** @deprecated Use {@link getBrand} instead. */
export const getManufacturer = getBrand;
/** @deprecated Use {@link getBrandBySlug} instead. */
export const getManufacturerBySlug = getBrandBySlug;
/** @deprecated Use {@link getAllBrandChipIds} instead. */
export const getAllManufacturerChipIds = getAllBrandChipIds;
