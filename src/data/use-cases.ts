export interface UseCase {
  id: string;
  label: string;
  description: string;
  icon: string;
  suggestedChips: string[];
}

export const USE_CASES: UseCase[] = [
  {
    id: "ai-training",
    label: "AI / ML Training",
    description: "Training large language models, computer vision models, and recommendation systems from scratch.",
    icon: "Brain",
    suggestedChips: ["3", "2", "1", "5"],
  },
  {
    id: "ai-inference",
    label: "AI Inference",
    description: "Production inference serving for LLMs, recommendation engines, and real-time AI applications.",
    icon: "Zap",
    suggestedChips: ["9", "10", "2", "1"],
  },
  {
    id: "hpc",
    label: "High-Performance Computing",
    description: "Scientific simulations, computational fluid dynamics, molecular dynamics, and weather modeling.",
    icon: "Gauge",
    suggestedChips: ["5", "1", "2", "6"],
  },
  {
    id: "data-analytics",
    label: "Data Analytics",
    description: "Large-scale data processing, graph analytics, and business intelligence with RAPIDS.",
    icon: "BarChart3",
    suggestedChips: ["6", "1", "9"],
  },
  {
    id: "edge-computing",
    label: "Edge Computing",
    description: "On-device AI inference for IoT, smart cameras, and industrial automation.",
    icon: "Radio",
    suggestedChips: ["7", "10"],
  },
  {
    id: "robotics",
    label: "Robotics",
    description: "Autonomous mobile robots, manipulators, and real-time perception systems.",
    icon: "Bot",
    suggestedChips: ["7"],
  },
  {
    id: "autonomous-vehicles",
    label: "Autonomous Vehicles",
    description: "Self-driving perception, planning, and control with DRIVE platform.",
    icon: "Car",
    suggestedChips: ["12", "7"],
  },
  {
    id: "virtualization",
    label: "Virtualization / vGPU",
    description: "VDI, cloud gaming, and AI-as-a-Service with MIG partitioning.",
    icon: "Layers",
    suggestedChips: ["1", "6", "9"],
  },
  {
    id: "healthcare",
    label: "Healthcare & Life Sciences",
    description: "Medical imaging, genomics, drug discovery, and biomedical AI applications.",
    icon: "HeartPulse",
    suggestedChips: ["1", "2", "9"],
  },
  {
    id: "gaming",
    label: "Gaming & Creation",
    description: "Game streaming, content creation, and professional visualization workloads.",
    icon: "Gamepad2",
    suggestedChips: ["11", "4"],
  },
];
