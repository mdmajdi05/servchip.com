import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";
import { SITE } from "@/lib/constants";
import { createSeoMetadata, faqSchema, breadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor | NVIDIA H100, AMD Instinct, Intel Gaudi`,
  description:
    "Servchip is your enterprise chip distributor & data center GPU supplier — NVIDIA H100, H200, B200, AMD Instinct MI300X, Intel Xeon & Gaudi 3. Authorized NVIDIA distributor & AI accelerator supplier in Dubai, UAE, India & USA.",
  path: "/",
  keywords: [
    "AI chip company",
    "enterprise GPU distributor",
    "nvidia ai chips",
    "amd ai chip",
    "amd authorized distributors",
    "data center gpu",
    "nvidia data center gpu",
    "intel data center gpu",
    "nvidia data center",
    "nvidia h200 supplier",
    "nvidia b200 gpu",
    "nvidia h100",
    "h100 gpu",
    "enterprise chip distributor",
    "AI chip distributor",
    "Data center GPU supplier",
    "NVIDIA H100 distributor",
    "AMD Instinct distributor",
    "Intel Gaudi distributor",
    "enterprise semiconductor distributor",
    "Server processor supplier",
    "HPC chip distributor",
    "AI accelerator supplier",
    "nvidia supplier in dubai",
    "nvidia supplier in uae",
    "nvidia suppliers in india",
    "gpu suppliers in india",
    "nvidia distributor in india",
    "nvidia distributor in uae",
    "nvidia distributor in dubai",
    "nvidia distributor in singapore",
    "nvidia distributor in malaysia",
    "nvidia distributor in china",
    "nvidia distributor in philippines",
    "nvidia authorized dealer",
    "amd authorized distributors in usa",
    "amd distributor in uae",
    "intel distributor in dubai",
    "intel supplier in uae",
    "intel supplier malaysia",
  ],
  openGraphTitle: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor`,
  openGraphDescription:
    "Authorized NVIDIA, AMD & Intel distributor. NVIDIA H100, AMD Instinct MI300X, Intel Gaudi — data center GPUs & AI accelerators with global shipping from Dubai, India & USA.",
  twitterTitle: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor`,
  twitterDescription:
    "Authorized NVIDIA, AMD & Intel distributor. NVIDIA H100, AMD Instinct MI300X, Intel Gaudi — data center GPUs & AI accelerators with global shipping.",
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
