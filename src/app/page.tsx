import type { Metadata } from "next";
import { HomeSections } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Servchip — Enterprise Chip Distributor for AI, HPC & Data Centers",
  description:
    "ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators. India's trusted data center GPU distributor for AI infrastructure with global shipping & enterprise support.",
  keywords: [
    "enterprise chip distributor",
    "NVIDIA H100 distributor India",
    "AMD Instinct distributor",
    "data center GPU distributor",
    "AI infrastructure provider",
    "enterprise IT hardware supplier",
    "HPC hardware solutions",
  ],
  alternates: { canonical: "https://servchip.com" },
  openGraph: {
    title: "Servchip — Enterprise Chip Distributor for AI, HPC & Data Centers",
    description:
      "ISO 9001 certified enterprise chip distributor. NVIDIA H100, AMD MI300X, Intel Xeon. India's trusted data center GPU distributor with global shipping.",
    url: "https://servchip.com",
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Are all chips 100% authentic?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Every chip is sourced directly from manufacturers or authorized distributors. We maintain full chain of custody documentation and each shipment includes a certificate of authenticity. Zero counterfeit policy is enforced across all 27+ manufacturer partnerships.",
                },
              },
              {
                "@type": "Question",
                name: "What brands does Servchip carry?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "We carry products from 27+ manufacturers including NVIDIA, AMD, Intel, Broadcom, Marvell, Cisco, Qualcomm, Samsung, SK hynix, Micron, Seagate, Dell, HPE, Supermicro, and Lenovo. Our catalog covers AI accelerators, server CPUs, AI servers, networking, memory & storage.",
                },
              },
              {
                "@type": "Question",
                name: "How fast can Servchip deliver enterprise chips?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Standard delivery is 3-5 business days for in-stock items. Express shipping is available for urgent needs. We ship to 150+ countries with secure, insured logistics and real-time tracking.",
                },
              },
              {
                "@type": "Question",
                name: "Do you provide warranty on all products?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "All products come with a minimum 3-year manufacturer warranty. We also offer extended warranty plans and advanced replacement services. Our RMA team handles the entire process for hassle-free support.",
                },
              },
              {
                "@type": "Question",
                name: "Can Servchip help me choose the right chip?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Absolutely. Our engineering team provides free technical consultation to help match the right chip to your workload. We offer architecture reviews, workload benchmarking, and side-by-side comparisons across NVIDIA, AMD, and Intel.",
                },
              },
              {
                "@type": "Question",
                name: "Is Servchip an authorized NVIDIA distributor in India?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes. Servchip is an authorized distribution partner for NVIDIA, AMD, Intel, and 27+ manufacturers. We supply authentic data center GPUs including NVIDIA H100, H200, AMD Instinct MI300X, and Intel Gaudi 3 to enterprises across India and globally.",
                },
              },
            ],
          }),
        }}
      />
      <HomeSections />
    </>
  );
}
