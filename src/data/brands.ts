import type { Brand } from "@/types";

export const BRANDS: Brand[] = [
  {
    id: "nvidia",
    name: "NVIDIA",
    slug: "nvidia",
    description:
      "Enterprise AI GPUs, data center accelerators, and professional visualization solutions.",
    longDescription:
      "NVIDIA is the world leader in AI computing, GPU technology, and accelerated computing. From data center AI training to edge inference, NVIDIA's architectures power the most demanding workloads across every industry.",
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
    seo: {
      metaTitle: "NVIDIA GPU & Chip Distributor | Servchip",
      metaDescription:
        "Authorized distributor of NVIDIA GPUs — H100, H200, B200, RTX 6000 Ada, AI accelerators, networking solutions. Global delivery, enterprise support.",
    },
  },
  {
    id: "amd",
    name: "AMD",
    slug: "amd",
    description:
      "High-performance CPUs, GPUs, and adaptive computing solutions for AI and enterprise.",
    longDescription:
      "AMD delivers high-performance computing, graphics, and adaptive solutions for AI, HPC, data centers, and professional visualization. The AMD Instinct lineup and EPYC processors power the world's most demanding workloads.",
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
    seo: {
      metaTitle: "AMD CPU & GPU Distributor | Servchip",
      metaDescription:
        "Authorized distributor of AMD Instinct accelerators, Radeon Pro GPUs, EPYC processors, and adaptive computing solutions. Global delivery, enterprise support.",
    },
  },
  {
    id: "intel",
    name: "Intel",
    slug: "intel",
    description:
      "Industry-leading CPUs, GPUs, and accelerators for AI, data center, and edge computing.",
    longDescription:
      "Intel powers the world's data centers, AI workloads, and edge computing with Xeon processors, Gaudi AI accelerators, Arc GPUs, and a broad portfolio of programmable solutions. Trusted by enterprises globally.",
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
    seo: {
      metaTitle: "Intel CPU & AI Accelerator Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Intel Xeon processors, Gaudi AI accelerators, Arc GPUs, and FPGA solutions. Global delivery, enterprise support.",
    },
  },
  {
    id: "broadcom",
    name: "Broadcom",
    slug: "broadcom",
    description:
      "Networking silicon and Ethernet switch solutions for data centers.",
    longDescription:
      "Broadcom is a global leader in networking semiconductors, providing high-performance Ethernet switch silicon, including the Tomahawk and Jericho families, that powers the world's largest data centers and AI clusters.",
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
    seo: {
      metaTitle: "Broadcom Networking Silicon Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Broadcom Ethernet switch silicon — Tomahawk 6, Jericho 3AI. Global delivery, enterprise support.",
    },
  },
  {
    id: "marvell",
    name: "Marvell",
    slug: "marvell",
    description:
      "Data infrastructure and Ethernet switching semiconductor solutions.",
    longDescription:
      "Marvell delivers data infrastructure technology, including the Teralynx Ethernet switch family, custom ASICs, and storage controllers that power the cloud, AI, and enterprise data centers.",
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
    seo: {
      metaTitle: "Marvell Networking Silicon Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Marvell Ethernet switch silicon — Teralynx 10. Global delivery, enterprise support.",
    },
  },
  {
    id: "cisco",
    name: "Cisco",
    slug: "cisco",
    description:
      "Networking silicon for routers, switches, and AI infrastructure.",
    longDescription:
      "Cisco is the worldwide leader in networking technology. The Cisco Silicon One family provides unified, programmable silicon architecture for routers, switches, and AI network fabrics.",
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
    seo: {
      metaTitle: "Cisco Networking Silicon Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Cisco Silicon One networking silicon. Global delivery, enterprise support.",
    },
  },
  {
    id: "dell",
    name: "Dell Technologies",
    slug: "dell-technologies",
    description: "AI servers and enterprise infrastructure for data centers.",
    longDescription:
      "Dell Technologies delivers comprehensive AI infrastructure solutions with PowerEdge servers optimized for AI training, inference, and HPC workloads, backed by global enterprise support.",
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
    seo: {
      metaTitle: "Dell AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Dell PowerEdge XE AI servers — XE9680, XE8640. Global delivery, enterprise support.",
    },
  },
  {
    id: "hpe",
    name: "Hewlett Packard Enterprise",
    slug: "hewlett-packard-enterprise",
    description: "AI servers, HPC systems, and enterprise computing solutions.",
    longDescription:
      "Hewlett Packard Enterprise (HPE) delivers AI-optimized servers including the Cray XD family for HPC and AI, and ProLiant servers for general enterprise workloads.",
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
    seo: {
      metaTitle: "HPE AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of HPE Cray XD and ProLiant servers. Global delivery, enterprise support.",
    },
  },
  {
    id: "supermicro",
    name: "Supermicro",
    slug: "supermicro",
    description: "GPU servers and high-performance computing solutions.",
    longDescription:
      "Supermicro provides a broad portfolio of GPU-accelerated servers optimized for AI, deep learning, and HPC workloads, with leadership in liquid-cooled data center solutions.",
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
    seo: {
      metaTitle: "Supermicro GPU Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Supermicro GPU servers — AS-8125GS, SYS-821GE. Global delivery, enterprise support.",
    },
  },
  {
    id: "lenovo",
    name: "Lenovo",
    slug: "lenovo",
    description: "AI servers and enterprise computing infrastructure.",
    longDescription:
      "Lenovo delivers AI-optimized server solutions including the ThinkSystem SR series, designed for AI training, inference, and high-performance computing workloads across enterprise data centers.",
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
    seo: {
      metaTitle: "Lenovo AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Lenovo ThinkSystem SR AI servers — SR780A, SR685A. Global delivery, enterprise support.",
    },
  },
  {
    id: "gigabyte",
    name: "Gigabyte",
    slug: "gigabyte",
    description: "GPU servers and enterprise computing platforms.",
    longDescription:
      "Gigabyte Technology provides high-performance GPU servers and workstations optimized for AI, deep learning, and HPC applications with robust thermal and power designs.",
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
    seo: {
      metaTitle: "Gigabyte GPU Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Gigabyte GPU servers — G593. Global delivery, enterprise support.",
    },
  },
  {
    id: "asus",
    name: "ASUS",
    slug: "asus",
    description: "AI servers and enterprise computing solutions.",
    longDescription:
      "ASUS provides AI-optimized server platforms and GPU workstations, delivering enterprise-grade performance for AI training, inference, and data analytics workloads.",
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
    seo: {
      metaTitle: "ASUS AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of ASUS ESC AI servers — ESC N8. Global delivery, enterprise support.",
    },
  },
  {
    id: "inspur",
    name: "Inspur",
    slug: "inspur",
    description: "AI servers and cloud computing infrastructure.",
    longDescription:
      "Inspur is a leading provider of AI server platforms, delivering high-performance computing solutions for AI training, inference, and cloud data centers worldwide.",
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
    seo: {
      metaTitle: "Inspur AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Inspur NF AI servers — NF5688. Global delivery, enterprise support.",
    },
  },
  {
    id: "quanta",
    name: "Quanta",
    slug: "quanta",
    description: "AI GPU servers and cloud infrastructure solutions.",
    longDescription:
      "Quanta Cloud Technology (QCT) delivers AI-optimized GPU server platforms for hyperscale data centers, AI training, and inference workloads with innovative thermal and power efficiency designs.",
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
    seo: {
      metaTitle: "Quanta AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Quanta AI GPU servers. Global delivery, enterprise support.",
    },
  },
  {
    id: "foxconn",
    name: "Foxconn",
    slug: "foxconn",
    description: "AI GPU servers and data center infrastructure.",
    longDescription:
      "Foxconn (Hon Hai Precision Industry) manufactures AI GPU servers and data center infrastructure solutions for hyperscale and enterprise customers worldwide.",
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
    seo: {
      metaTitle: "Foxconn AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Foxconn AI GPU servers. Global delivery, enterprise support.",
    },
  },
  {
    id: "wiwynn",
    name: "Wiwynn",
    slug: "wiwynn",
    description: "AI GPU servers and cloud infrastructure solutions.",
    longDescription:
      "Wiwynn delivers AI-optimized server platforms and storage solutions for cloud data centers, with a focus on GPU-accelerated computing and energy-efficient designs.",
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
    seo: {
      metaTitle: "Wiwynn AI Server Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Wiwynn AI GPU servers. Global delivery, enterprise support.",
    },
  },
  {
    id: "samsung",
    name: "Samsung",
    slug: "samsung",
    description:
      "Memory and storage solutions for AI and enterprise data centers.",
    longDescription:
      "Samsung is the world leader in memory and storage technology, providing HBM3E, DDR5 RDIMM, and enterprise SSDs for AI, HPC, and cloud data centers.",
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
    seo: {
      metaTitle: "Samsung Memory & Storage Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Samsung HBM3E, DDR5 RDIMM, and enterprise SSDs. Global delivery, enterprise support.",
    },
  },
  {
    id: "sk-hynix",
    name: "SK hynix",
    slug: "sk-hynix",
    description: "High-bandwidth memory solutions for AI accelerators.",
    longDescription:
      "SK hynix is a leading semiconductor memory supplier, providing HBM3E memory solutions for AI accelerators and high-performance computing systems.",
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
    seo: {
      metaTitle: "SK hynix Memory Distributor | Servchip",
      metaDescription:
        "Authorized distributor of SK hynix HBM3E memory. Global delivery, enterprise support.",
    },
  },
  {
    id: "micron",
    name: "Micron",
    slug: "micron",
    description:
      "Memory and storage solutions for AI and enterprise data centers.",
    longDescription:
      "Micron delivers innovative memory and storage solutions including HBM3E, DDR5 RDIMM, and NVMe SSDs for AI, cloud, and enterprise data centers worldwide.",
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
    seo: {
      metaTitle: "Micron Memory & Storage Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Micron HBM3E, DDR5, and NVMe SSDs. Global delivery, enterprise support.",
    },
  },
  {
    id: "solidigm",
    name: "Solidigm",
    slug: "solidigm",
    description: "Enterprise SSD storage solutions for data centers.",
    longDescription:
      "Solidigm delivers enterprise-grade NAND flash storage solutions optimized for AI, cloud, and data center workloads, building on a legacy of SSD innovation.",
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
    seo: {
      metaTitle: "Solidigm Enterprise SSD Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Solidigm D7 enterprise SSDs. Global delivery, enterprise support.",
    },
  },
  {
    id: "kioxia",
    name: "Kioxia",
    slug: "kioxia",
    description: "Enterprise SSD storage solutions for data centers.",
    longDescription:
      "Kioxia is a global leader in NAND flash memory and enterprise SSDs, delivering high-performance storage solutions for AI, cloud, and data center applications.",
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
    seo: {
      metaTitle: "Kioxia Enterprise SSD Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Kioxia CM7 enterprise SSDs. Global delivery, enterprise support.",
    },
  },
  {
    id: "wd",
    name: "Western Digital",
    slug: "western-digital",
    description: "Enterprise storage solutions for data centers.",
    longDescription:
      "Western Digital provides enterprise-grade HDDs and SSDs for AI, cloud, and data center storage, including the Ultrastar family of data center drives.",
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
    seo: {
      metaTitle: "Western Digital Enterprise Storage Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Western Digital Ultrastar SSDs. Global delivery, enterprise support.",
    },
  },
  {
    id: "seagate",
    name: "Seagate",
    slug: "seagate",
    description: "Enterprise storage solutions for data centers.",
    longDescription:
      "Seagate delivers enterprise-grade HDDs and NVMe SSDs for AI, cloud, and data center storage, including the Nytro family of data center SSDs.",
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
    seo: {
      metaTitle: "Seagate Enterprise Storage Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Seagate Nytro SSDs. Global delivery, enterprise support.",
    },
  },
  {
    id: "google",
    name: "Google",
    slug: "google",
    description: "TPU accelerators for AI training and inference.",
    longDescription:
      "Google designs custom Tensor Processing Units (TPUs) to accelerate AI training and inference workloads, powering Google's own services and cloud customers via Google Cloud.",
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
    seo: {
      metaTitle: "Google TPU Accelerator Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Google TPU accelerators — TPU v6, TPU v7. Global delivery, enterprise support.",
    },
  },
  {
    id: "amazon",
    name: "Amazon",
    slug: "amazon",
    description: "Custom AI chips for cloud and machine learning workloads.",
    longDescription:
      "Amazon Web Services (AWS) designs custom silicon including Trainium for AI training and Inferentia for AI inference, delivering cost-effective performance for cloud AI workloads.",
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
    seo: {
      metaTitle: "Amazon AI Chip Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Amazon Trainium and Inferentia AI chips. Global delivery, enterprise support.",
    },
  },
  {
    id: "qualcomm",
    name: "Qualcomm",
    slug: "qualcomm",
    description: "Data center CPUs and AI inference processors.",
    longDescription:
      "Qualcomm is expanding into data center computing with custom-designed CPUs for cloud and AI workloads, leveraging its industry-leading ARM processor expertise.",
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
    seo: {
      metaTitle: "Qualcomm Data Center CPU Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Qualcomm data center CPUs. Global delivery, enterprise support.",
    },
  },
  {
    id: "ampere",
    name: "Ampere",
    slug: "ampere",
    description: "ARM-based server CPUs for cloud and edge computing.",
    longDescription:
      "Ampere Computing designs high-performance, power-efficient ARM-based server processors for cloud data centers, edge computing, and sustainable AI workloads.",
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
    seo: {
      metaTitle: "Ampere Server CPU Distributor | Servchip",
      metaDescription:
        "Authorized distributor of Ampere ARM-based server processors. Global delivery, enterprise support.",
    },
  },
  {
    id: "nokia",
    name: "Nokia",
    slug: "nokia",
    description:
      "Networking, communications, and semiconductor solutions for service providers and enterprises.",
    longDescription:
      "Nokia is a global leader in networking and communications technology. Its semiconductor portfolio includes network processors, FPGAs, and custom ASICs that power the world's most advanced 5G, optical, and IP networks.",
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
    seo: {
      metaTitle: "Nokia Semiconductor & Network Processor | Servchip",
      metaDescription:
        "Authorized distributor of Nokia network processors, optical DSPs, 5G semiconductors, and IoT chips. Global delivery, enterprise support.",
    },
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
