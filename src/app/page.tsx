import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";
import { SITE } from "@/lib/constants";
import {
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
  description:
    "ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators. Buy AI chips, semiconductor procurement & data center hardware with global shipping from India & UAE.",
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
  ],
  alternates: { canonical: SITE.url },
  openGraph: {
    title: `${SITE.name} — Enterprise Chip Distributor for AI, HPC & Data Centers`,
    description:
      "ISO 9001 certified enterprise chip distributor. Buy NVIDIA H100, AMD MI300X, Intel Xeon. Semiconductor procurement & data center GPU distributor with global shipping.",
    url: SITE.url,
    images: [
      {
        url: OG_IMAGE,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        alt: "Servchip — Enterprise Chip Distributor",
        type: "image/png",
      },
    ],
  },
};

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
