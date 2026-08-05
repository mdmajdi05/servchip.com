import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";
import { SITE } from "@/lib/constants";
import { createSeoMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
  description:
    "Servchip: ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators to India & UAE.",
  path: "/",
  keywords: [
    "enterprise chip distributor",
    "buy AI chips",
    "semiconductor procurement",
    "NVIDIA H100 distributor India",
    "AMD Instinct distributor",
    "data center GPU distributor",
    "AI infrastructure provider",
    "GPU server supplier",
    "AI accelerator distributor",
    "enterprise chip sourcing",
    "bulk semiconductor purchasing",
    "HBM memory supplier",
    "buy AI chips",
    "NVIDIA H100 distributor India",
    "NVIDIA GPU supplier UAE",
    "AMD Instinct distributor",
    "semiconductor procurement services",
    "AI accelerator distributor UAE",
    "Data center GPU distributor in UAE",
    "HBM memory supplier",
    "GPU server supplier India",
    "AI chip distributor UAE",
    "NVIDIA Supplier in Dubai",
    "NVIDIA Supplier in UAE",
    "NVIDIA Authorized Dealer in UAE",
    "AMD Authorized Distributor in UAE",
    "AMD Authorized Distributor in USA",
    "AMD Supplier in UAE",
    "Intel Authorized Distributor in UAE",
    "Intel Supplier in UAE",
    "Intel Supplier in Dubai",
    "HPC chip distributor UAE",
    "HPC chip distributor Dubai",
    "AI chip distributor USA",
    "DATA center GPU Distributor & Supplier USA",
    "DATA center GPU Distributor & Supplier UAE",
    "Enterprise Semiconductor Distributor UAE",
    "Enterprise Semiconductor Distributor Dubai",
    "Enterprise Semiconductor Distributor USA",
    "AI chip distributor India",
    "AI chip distributor UAE",
    "AI chip distributor USA",
    "AI chip distributor Dubai",
    "Best AI chip distributor UAE",
    "Best AI chip distributor Dubai",
    "Best AI chip distributor India",
    "Best AI chip distributor USA",
    "Best NVIDIA chip distributor USA",
    "Best NVIDIA chip distributor UAE",
    "Best NVIDIA chip distributor Dubai",
    "Best NVIDIA chip distributor India",
    "Best AMD chip distributor USA",
    "Best AMD chip distributor UAE",
    "Best AMD chip distributor Dubai",
    "Best AMD chip distributor India",
    "Best Intel chip distributor USA",
    "Best Intel chip distributor UAE",
    "Best Intel chip distributor Dubai",
    "Best Intel chip distributor India",
  ],
  openGraphTitle: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
  openGraphDescription:
    "Servchip: ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators to India & UAE.",
  twitterTitle: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
  twitterDescription:
    "Servchip: ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators to India & UAE.",
});

const HOME_FAQS = [
  {
    question: "Are all chips 100% authentic?",
    answer:
      "Yes. Every chip is sourced directly from manufacturers or authorized distributors. We maintain full chain of custody documentation and each shipment includes a certificate of authenticity. Zero counterfeit policy is enforced across all 27+ manufacturer partnerships.",
  },
  {
    question: "What brands does Servchip carry?",
    answer:
      "We carry products from 27+ manufacturers including NVIDIA, AMD, Intel, Broadcom, Marvell, Cisco, Qualcomm, Samsung, SK hynix, Micron, Seagate, Dell, HPE, Supermicro, and Lenovo. Our catalog covers AI accelerators, server CPUs, AI servers, networking, memory & storage.",
  },
  {
    question: "How fast can Servchip deliver enterprise chips?",
    answer:
      "Standard delivery is 3-5 business days for in-stock items. Express shipping is available for urgent needs. We ship to 150+ countries with secure, insured logistics and real-time tracking.",
  },
  {
    question: "Do you provide warranty on all products?",
    answer:
      "All products come with a minimum 3-year manufacturer warranty. We also offer extended warranty plans and advanced replacement services. Our RMA team handles the entire process for hassle-free support.",
  },
  {
    question: "Can Servchip help me choose the right chip?",
    answer:
      "Absolutely. Our engineering team provides free technical consultation to help match the right chip to your workload. We offer architecture reviews, workload benchmarking, and side-by-side comparisons across NVIDIA, AMD, and Intel.",
  },
  {
    question: "Is Servchip an authorized NVIDIA distributor in India?",
    answer:
      "Yes. Servchip is an authorized distribution partner for NVIDIA, AMD, Intel, and 27+ manufacturers. We supply authentic data center GPUs including NVIDIA H100, H200, AMD Instinct MI300X, and Intel Gaudi 3 to enterprises across India and globally.",
  },
  {
    question: "How do I buy AI chips in bulk?",
    answer:
      "Submit a request through our RFQ form or contact sales@servchip.com for volume pricing. We offer competitive bulk pricing for enterprise semiconductor procurement with flexible MOQ and dedicated account management.",
  },
  {
    question: "Do you supply HBM memory for AI workloads?",
    answer:
      "Yes. We are an authorized distributor for HBM3E memory from SK hynix, Samsung, and Micron. HBM memory is available for AI accelerator deployments, high-performance computing, and data center memory upgrades.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema([{ name: "Home", url: "/" }])}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(HOME_FAQS)}
      />
      <HomeSections />
    </>
  );
}
