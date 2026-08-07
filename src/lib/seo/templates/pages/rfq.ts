import type { SeoPageTemplate } from "../types";

export const rfq: SeoPageTemplate = {
  path: "/rfq",
  label: "Request a Quote",
  title:
    "Request a Quote — Enterprise AI Hardware Pricing & Semiconductor Procurement",
  description:
    "Request a personalized quote for enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon & Gaudi 3. Volume discounts, 24-hour response time & global shipping from an ISO 9001 certified distributor.",
  keywords: [
    "enterprise chip pricing",
    "NVIDIA H100 quote",
    "AI accelerator pricing",
    "semiconductor procurement quote",
    "bulk chip pricing",
    "data center hardware quote",
  ],
  openGraphTitle: "Request a Quote | Servchip — Enterprise Chip Distributor",
  openGraphDescription:
    "Get enterprise chip pricing. NVIDIA, AMD, Intel hardware. Volume discounts & 24-hour quotes.",
  twitterTitle: "Request a Quote | Servchip — Enterprise Chip Distributor",
  twitterDescription:
    "Get enterprise chip pricing. NVIDIA, AMD, Intel hardware. Volume discounts & 24-hour quotes.",
  country: {
    title: "Request a Quote{{countrySuffix}} — Enterprise AI Hardware Pricing",
    description:
      "Request a personalized quote for enterprise chips{{countrySuffix}} — NVIDIA H100, AMD MI300X, Intel Xeon & Gaudi 3. {{currency}} volume discounts, 24-hour response time, shipped from {{warehouse}}.",
    keywords: [
      "enterprise chip pricing {{name}}",
      "NVIDIA H100 quote {{name}}",
      "AI accelerator pricing {{name}}",
      "semiconductor procurement quote {{name}}",
    ],
    openGraphTitle: "Request a Quote{{countrySuffix}} | Servchip",
    twitterTitle: "Request a Quote{{countrySuffix}} | Servchip",
    openGraphDescription:
      "Get enterprise chip pricing{{countrySuffix}}. NVIDIA, AMD, Intel. Volume discounts & 24-hour quotes.",
    twitterDescription:
      "Get enterprise chip pricing{{countrySuffix}}. NVIDIA, AMD, Intel.",
  },
};
