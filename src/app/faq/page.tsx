import type { Metadata } from "next";
import {
  createMetadata,
  createBreadcrumb,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";
import { getAuthorizedDistributorFaq } from "@/data/faq";
import PageClient from "./page-client";

const AUTHORIZED_FAQ = getAuthorizedDistributorFaq();

const FAQS = [
  {
    q: "Are all chips from Servchip 100% authentic?",
    a: "Yes. Every chip is sourced directly from manufacturers or authorized distribution partners. We maintain full chain of custody documentation, and each shipment includes a certificate of authenticity. Our zero counterfeit policy is enforced across all 27+ manufacturer partnerships.",
  },
  {
    q: "How do I buy AI chips in bulk for enterprise deployment?",
    a: "Submit a request through our RFQ form or email sales@servchip.com with your requirements. We offer competitive bulk pricing for enterprise semiconductor procurement with flexible MOQ, dedicated account management, and volume discounts for server components wholesale orders.",
  },
  {
    q: "What is your minimum order quantity for enterprise chips?",
    a: "There is no minimum order quantity. We serve everyone from AI startups to Fortune 500 enterprises. Whether you need a single NVIDIA H100 for testing or 500 units for a data center deployment, we accommodate both.",
  },
  {
    q: "How fast can Servchip deliver enterprise chips and AI accelerators?",
    a: "Standard delivery is 3-5 business days for in-stock items like NVIDIA H100, H200, AMD MI300X, and Intel Xeon. Express shipping is available for urgent requirements. We ship to 150+ countries with secure, insured logistics and real-time tracking.",
  },
  {
    q: "Do you offer warranty on enterprise GPUs and server hardware?",
    a: "All products come with a minimum 3-year manufacturer warranty. We also offer extended warranty plans and advanced replacement services for enterprise hardware. Our RMA team handles the entire process for hassle-free support across NVIDIA, AMD, and Intel products.",
  },
  {
    q: "Can Servchip help me choose the right AI chip for my workload?",
    a: "Absolutely. Our multi-vendor certified engineering team provides free technical consultation to help match the right chip to your workload — whether it's AI training, inference, HPC, or data center operations. We offer architecture reviews, workload benchmarking, and side-by-side comparisons across NVIDIA, AMD, and Intel.",
  },
  { q: AUTHORIZED_FAQ.question, a: AUTHORIZED_FAQ.answer },
  {
    q: "Do you supply HBM memory for AI workloads?",
    a: "Yes. We are an authorized distributor for HBM3E memory from SK hynix, Samsung, and Micron. HBM memory is available for AI accelerator deployments, high-performance computing, and data center memory upgrades. Contact us for HBM3E pricing and availability.",
  },
  {
    q: "What payment methods do you accept for enterprise semiconductor procurement?",
    a: "We accept wire transfers, Letters of Credit, and net terms for qualified enterprises. Our finance team works with procurement departments to provide flexible payment schedules for large-volume semiconductor purchases.",
  },
  {
    q: "Can I return a chip or enterprise hardware?",
    a: "Returns are accepted within 30 days for unopened items. Defective items are covered by manufacturer warranty with our advanced replacement program. Our dedicated support team handles the entire RMA process.",
  },
  {
    q: "What enterprise chip brands does Servchip carry?",
    a: "We carry products from 27+ manufacturers including NVIDIA, AMD, Intel, Broadcom, Marvell, Cisco, Qualcomm, Samsung, SK hynix, Micron, Seagate, Dell, HPE, Supermicro, and Lenovo. Our catalog covers AI accelerators, server CPUs, AI servers, networking, memory & storage for enterprise data centers.",
  },
  {
    q: "Do you ship enterprise hardware internationally?",
    a: "Yes. We ship to 150+ countries from our distribution centers in India and UAE. All shipments include secure, insured logistics with real-time tracking. We handle customs documentation and export compliance for international semiconductor shipments.",
  },
];

export const metadata: Metadata = createMetadata("faq");

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={breadcrumbSchema(createBreadcrumb("faq"))}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={faqSchema(
          FAQS.map((f) => ({ question: f.q, answer: f.a })),
        )}
      />
      <PageClient faqs={FAQS} />
    </>
  );
}
