export interface GamingChip {
  id: string;
  name: string;
  manufacturer: string;
  architecture: string;
  image: string;
  memory: string;
  clockSpeed: string;
  cudaCores: string;
  tdp: string;
  bestFor: string;
  price: string;
  description: string;
}

export const GAMING_CHIPS: GamingChip[] = [
  {
    id: "rtx-5090",
    name: "NVIDIA GeForce RTX 5090",
    manufacturer: "NVIDIA",
    architecture: "Blackwell",
    image: "/images/ai-chip-1.webp",
    memory: "32GB GDDR7",
    clockSpeed: "2.9 GHz",
    cudaCores: "24576",
    tdp: "575W",
    bestFor: "4K Gaming & AI",
    price: "~$1,999",
    description:
      "Flagship Blackwell gaming GPU with DLSS 4 and real-time ray tracing.",
  },
  {
    id: "rtx-5080",
    name: "NVIDIA GeForce RTX 5080",
    manufacturer: "NVIDIA",
    architecture: "Blackwell",
    image: "/images/ai-chip-2.webp",
    memory: "24GB GDDR7",
    clockSpeed: "2.7 GHz",
    cudaCores: "18432",
    tdp: "420W",
    bestFor: "High-End Gaming",
    price: "~$1,199",
    description:
      "Premium Blackwell GPU with exceptional 4K gaming performance.",
  },
  {
    id: "rtx-5070-ti",
    name: "NVIDIA GeForce RTX 5070 Ti",
    manufacturer: "NVIDIA",
    architecture: "Blackwell",
    image: "/images/ai-chip-3.webp",
    memory: "16GB GDDR7",
    clockSpeed: "2.5 GHz",
    cudaCores: "12800",
    tdp: "350W",
    bestFor: "1440p Gaming",
    price: "~$799",
    description: "Mid-range Blackwell GPU built for high-fps 1440p gaming.",
  },
  {
    id: "rx-9070-xt",
    name: "AMD Radeon RX 9070 XT",
    manufacturer: "AMD",
    architecture: "RDNA 4",
    image: "/images/ai-chip-4.webp",
    memory: "20GB GDDR7",
    clockSpeed: "3.0 GHz",
    cudaCores: "—",
    tdp: "330W",
    bestFor: "Competitive Gaming",
    price: "~$699",
    description: "Flagship RDNA 4 GPU with FSR 4 and advanced ray tracing.",
  },
  {
    id: "rx-9070",
    name: "AMD Radeon RX 9070",
    manufacturer: "AMD",
    architecture: "RDNA 4",
    image: "/images/ai-chip-5.webp",
    memory: "16GB GDDR7",
    clockSpeed: "2.7 GHz",
    cudaCores: "—",
    tdp: "260W",
    bestFor: "Mainstream Gaming",
    price: "~$549",
    description:
      "Mid-range RDNA 4 GPU delivering excellent value for 1440p gaming.",
  },
  {
    id: "arc-b580",
    name: "Intel Arc B580",
    manufacturer: "Intel",
    architecture: "Battlemage",
    image: "/images/ai-chip-1.webp",
    memory: "12GB GDDR6",
    clockSpeed: "2.6 GHz",
    cudaCores: "3840",
    tdp: "190W",
    bestFor: "Budget Gaming",
    price: "~$249",
    description: "Next-gen Intel Arc GPU with XeSS 2 and hardware ray tracing.",
  },
  {
    id: "arc-b570",
    name: "Intel Arc B570",
    manufacturer: "Intel",
    architecture: "Battlemage",
    image: "/images/ai-chip-2.webp",
    memory: "10GB GDDR6",
    clockSpeed: "2.4 GHz",
    cudaCores: "3072",
    tdp: "150W",
    bestFor: "Entry-Level Gaming",
    price: "~$179",
    description:
      "Affordable Battlemage GPU for 1080p gaming and content creation.",
  },
];
