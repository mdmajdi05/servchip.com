export interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "f1",
    category: "General",
    question: "Are all your NVIDIA chips authentic and original?",
    answer:
      "Yes, 100%. Every chip we supply is sourced directly from NVIDIA or authorized NVIDIA distributors. We provide full chain-of-custody documentation, original packaging, and serial number verification with every shipment.",
  },
  {
    id: "f2",
    category: "General",
    question: "What is your typical delivery time?",
    answer:
      "For chips in stock, we ship within 24-48 hours of payment confirmation. Standard delivery takes 3-7 business days depending on location.",
  },
  {
    id: "f3",
    category: "General",
    question: "Do you ship internationally?",
    answer:
      "Yes, we ship to 150+ countries worldwide using insured, secure logistics partners. International shipments include full tracking and customs documentation assistance.",
  },
  {
    id: "f4",
    category: "Pricing & Quotes",
    question: "Why don't you show prices on the website?",
    answer:
      "NVIDIA enterprise GPU pricing varies based on quantity, configuration, support level, and current market conditions. We provide personalized quotes within 24 hours.",
  },
  {
    id: "f5",
    category: "Pricing & Quotes",
    question: "How do I request a quote?",
    answer:
      "You can request a quote by clicking 'Get Quote' on any product page, filling out our RFQ form, or emailing us directly at sales@servchip.com.",
  },
  {
    id: "f6",
    category: "Pricing & Quotes",
    question: "Do you offer volume discounts?",
    answer:
      "Yes, we offer tiered pricing for bulk orders. Volume discounts start at quantities of 5+ units, with additional price breaks at 10, 25, 50, and 100+ units.",
  },
  {
    id: "f7",
    category: "Support & Warranty",
    question: "What warranty do you provide?",
    answer:
      "All NVIDIA chips include the standard NVIDIA manufacturer warranty. Additionally, Servchip provides a 90-day satisfaction guarantee on all purchases.",
  },
  {
    id: "f8",
    category: "Support & Warranty",
    question: "Do you provide technical support for deployment?",
    answer:
      "Yes, our certified NVIDIA engineers provide complimentary pre-sales consultation and post-purchase deployment support. Enterprise customers receive a dedicated account manager.",
  },
  {
    id: "f9",
    category: "Products",
    question: "What NVIDIA architectures do you carry?",
    answer:
      "We stock chips across all current NVIDIA architectures: Blackwell (B200), Hopper (H100, H200), Grace (GH200), Ada Lovelace (RTX 6000, L40S, L4), and Ampere (A100, Jetson Orin).",
  },
  {
    id: "f10",
    category: "Products",
    question: "Can you source chips not listed on your website?",
    answer:
      "Yes. While we list our most popular products, we can source any current NVIDIA product through our partner network.",
  },
  {
    id: "f11",
    category: "Company",
    question: "Is Servchip an authorized NVIDIA partner?",
    answer:
      "Yes, Servchip is an NVIDIA Premier Partner with authorized distribution rights. We've been a trusted NVIDIA partner since 2018.",
  },
  {
    id: "f12",
    category: "Company",
    question: "What certifications does Servchip hold?",
    answer:
      "We are ISO 9001:2015 certified for quality management, MSME registered with the Government of India, and an NVIDIA Premier Partner.",
  },
];
