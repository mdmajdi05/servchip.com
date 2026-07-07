export interface ChipProduct {
  id: string;
  name: string;
  slug: string;
  series: string;
  architecture: string;
  categoryId: string;
  categoryName: string;
  images: string[];
  description: string;
  longDescription: string;
  keyFeatures: string[];
  useCases: string[];
  bestFor: string;
  specifications: {
    memory: string;
    memoryBandwidth: string;
    tensorCores: string;
    cudaCores: string;
    fp8TFLOPS: string;
    fp16TFLOPS: string;
    tf32TFLOPS: string;
    fp64TFLOPS: string;
    interconnect: string;
    tdp: string;
    formFactor: string;
    cooling: string;
    launchDate: string;
    manufacturingProcess: string;
  };
  datasheetUrl?: string;
  status: "in_stock" | "on_order" | "limited" | "pre_order" | "discontinued";
  sortOrder: number;
  isFeatured: boolean;
  isPopular: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    canonicalUrl?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type UseCase =
  | "ai-training"
  | "ai-inference"
  | "hpc"
  | "data-analytics"
  | "edge-computing"
  | "healthcare"
  | "autonomous-vehicles"
  | "virtualization"
  | "gaming"
  | "robotics";

export interface UseCaseOption {
  id: UseCase;
  label: string;
  description: string;
  icon: string;
  suggestedChips: string[];
}

export interface ConfigParams {
  budget: "budget" | "mid-range" | "high-end" | "enterprise";
  memoryMin: number;
  performancePriority: "memory" | "compute" | "bandwidth" | "balanced";
  powerConstraint?: number;
  formFactor?: "pcie" | "sxm" | "mcm";
  quantity: number;
  useCase: UseCase;
}
