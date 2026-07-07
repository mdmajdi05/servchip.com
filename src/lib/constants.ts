export const SITE = {
  name: "Servchip",
  tagline: "Powering the Future of AI Computing",
  email: "sales@servchip.com",
  phone: "+91 7982498712",
  url: "https://servchip.com",
  addresses: {
    india:
      "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044",
    uae: "Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates",
  },
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export const NAV_ITEMS = {
  categories: [
    { label: "Data Center GPUs", slug: "data-center-gpus", icon: "server" },
    { label: "AI Accelerators", slug: "ai-accelerators", icon: "brain" },
    { label: "Professional RTX", slug: "professional-rtx", icon: "monitor" },
    { label: "Edge AI & Embedded", slug: "edge-ai-embedded", icon: "chip" },
    { label: "Networking", slug: "networking", icon: "network" },
    { label: "Automotive", slug: "automotive", icon: "car" },
    { label: "HPC & Grace", slug: "hpc-grace", icon: "zap" },
    { label: "Gaming & GeForce", slug: "gaming-geforce", icon: "gamepad" },
    {
      label: "Cloud & Virtualization",
      slug: "cloud-virtualization",
      icon: "cloud",
    },
    {
      label: "Healthcare & Life Sci",
      slug: "healthcare-life-sci",
      icon: "medical",
    },
  ] as const,
} as const;
