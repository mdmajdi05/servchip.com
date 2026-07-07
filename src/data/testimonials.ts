export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  project: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Vikram Nair",
    role: "Head of AI Infrastructure",
    company: "Tata Research Labs",
    quote:
      "Servchip delivered 32 NVIDIA H100 GPUs within 3 weeks, fully tested and documented. Their team's deep expertise in NVIDIA architecture helped us optimize our LLM training pipeline, cutting training time by 40%.",
    rating: 5,
    project: "32x H100 GPU cluster for LLM training",
  },
  {
    id: "t2",
    name: "Anjali Krishnan",
    role: "Director, HPC Center",
    company: "IISC Bangalore",
    quote:
      "We needed a reliable partner for our Grace Hopper supercomputer. Servchip's engineers understood the GH200 architecture inside-out and provided a deployment plan that saved us months of integration work.",
    rating: 5,
    project: "GH200 Grace Hopper Superchip cluster",
  },
  {
    id: "t3",
    name: "Rajesh Iyer",
    role: "VP Engineering",
    company: "Reliance Jio AI",
    quote:
      "For our nationwide inference infrastructure, we needed 200+ L40S GPUs with rapid deployment. Servchip executed flawlessly with staged deliveries and on-site support.",
    rating: 5,
    project: "200+ L40S inference cluster deployment",
  },
  {
    id: "t4",
    name: "Dr. Meena Rao",
    role: "Principal Investigator, Genomics",
    company: "CDAC",
    quote:
      "Servchip provided Jetson AGX Orin modules for our edge genomics pipeline. Their edge AI team helped us optimize TensorRT models, achieving 5x faster inference.",
    rating: 5,
    project: "Jetson AGX Orin edge deployment for genomics",
  },
];
