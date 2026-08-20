import type { LucideIcon } from "lucide-react";
import {
  ShoppingCart,
  ShieldCheck,
  Truck,
  HelpCircle,
  CreditCard,
} from "lucide-react";

export interface FAQCategory {
  id: string;
  title: string;
  icon: LucideIcon;
  items: FAQItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export function getAuthorizedDistributorFaq(countryName?: string): FAQItem {
  const brandPart =
    "Yes. Servchip is an authorized distribution partner for NVIDIA, AMD, Intel, and 27+ manufacturers. We supply authentic data center GPUs including NVIDIA H100, H200, B200, AMD Instinct MI300X, and Intel Gaudi 3 to enterprises";
  if (countryName) {
    const market =
      countryName === "India"
        ? "across India, UAE, and globally"
        : `across ${countryName} and globally`;
    return {
      question: `Is Servchip an authorized NVIDIA distributor in ${countryName}?`,
      answer: `${brandPart} ${market}.`,
    };
  }
  return {
    question: "Is Servchip an authorized NVIDIA distributor?",
    answer: `${brandPart} across India, UAE, and globally.`,
  };
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "ordering",
    title: "Ordering & Pricing",
    icon: ShoppingCart,
    items: [
      {
        question: "What types of chips do you sell?",
        answer:
          "We distribute chips from all major manufacturers including NVIDIA (GPUs, AI accelerators, networking), AMD (Instinct, Radeon Pro, EPYC), Intel (Xeon, Gaudi, Arc), Nokia (network processors, optical DSPs), and more. If you need a specific chip, contact our sales team.",
      },
      {
        question: "How do I request a quote?",
        answer:
          "You can request a quote through our RFQ form at /rfq, email us at sales@servchip.com, or call +91 7982498712. We typically respond within 24 hours with a detailed quote including pricing, availability, and delivery timelines.",
      },
      {
        question: "Do you offer volume/wholesale pricing?",
        answer:
          "Yes, we offer competitive volume pricing for bulk orders, enterprise deployments, and wholesale purchases. Contact our B2B sales team for custom pricing based on your requirements and order volume.",
      },
    ],
  },
  {
    id: "authenticity",
    title: "Authenticity & Quality",
    icon: ShieldCheck,
    items: [
      {
        question: "How do you guarantee chip authenticity?",
        answer:
          "We source chips directly from manufacturers and their authorized distributors. Every chip undergoes rigorous testing and inspection. We provide full chain of custody documentation and serial number traceability. Our zero-counterfeit policy is backed by comprehensive quality assurance.",
      },
      {
        question: "Are your chips tested before shipping?",
        answer:
          "Yes, every chip is tested and verified before shipment. We perform functional testing, visual inspection, and compatibility verification. Our ISO 9001:2015 certified processes ensure consistent quality across all orders.",
      },
      {
        question: "Do you provide certificates of authenticity?",
        answer:
          "Yes, every order includes a Certificate of Authenticity (COA) with serial numbers, manufacturing dates, and chain of custody documentation. Additional compliance documentation is available on request.",
      },
    ],
  },
  {
    id: "shipping",
    title: "Shipping & Delivery",
    icon: Truck,
    items: [
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to 150+ countries worldwide. We use secure, insured logistics partners including DHL, FedEx, and UPS. Express shipping options are available for time-critical projects.",
      },
      {
        question: "What are typical delivery times?",
        answer:
          "Delivery times vary by location and product availability. In-stock items typically ship within 2-3 business days. Express delivery options can reduce transit time to 2-5 business days internationally. Contact us for specific timelines.",
      },
      {
        question: "Do you handle customs and documentation?",
        answer:
          "Yes, we manage all customs documentation and clearance for international shipments. Our logistics team ensures proper classification, valuation, and compliance with local regulations. We provide all necessary export/import documentation.",
      },
    ],
  },
  {
    id: "support",
    title: "Technical Support",
    icon: HelpCircle,
    items: [
      {
        question: "Do you provide technical support for chip integration?",
        answer:
          "Yes, our team of certified engineers provides technical support across NVIDIA, AMD, Intel, and other platforms. We offer integration guidance, architecture consultation, and troubleshooting assistance.",
      },
      {
        question: "Can you help me choose the right chip?",
        answer:
          "Absolutely. Our technical team can assess your workload requirements and recommend the optimal chip from our multi-vendor portfolio. We consider factors like performance needs, memory requirements, power constraints, and budget.",
      },
      {
        question: "Do you offer on-site deployment support?",
        answer:
          "Yes, for enterprise clients we offer on-site deployment support including installation, configuration, and integration services. Our team can also provide remote support and monitoring for your chip infrastructure.",
      },
    ],
  },
  {
    id: "payment",
    title: "Payment & Terms",
    icon: CreditCard,
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept wire transfers, credit cards, and net terms for qualified enterprise clients. Contact our sales team to discuss payment options suitable for your organization.",
      },
      {
        question: "Do you offer net payment terms?",
        answer:
          "Yes, we offer net 30, net 60, and net 90 payment terms for qualified enterprise clients and B2B partners subject to credit approval. Contact our accounts team to set up payment terms.",
      },
      {
        question: "Is there a minimum order quantity?",
        answer:
          "Minimum order quantities vary by product and manufacturer. For standard in-stock items, we can accommodate single-unit orders. Volume discounts apply for larger quantities.",
      },
    ],
  },
];
