import type { SeoPageTemplate } from "../types";

export const contact: SeoPageTemplate = {
  path: "/contact",
  label: "Contact",
  title: "Contact Us | Buy AI Chips & Enterprise GPUs",
  description:
    "Contact Servchip for enterprise chip pricing, AI accelerator availability and procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon and more.",
  keywords: [
    "contact Servchip",
    "buy enterprise chips",
    "AI accelerator pricing",
    "NVIDIA H100 quote",
    "semiconductor procurement contact",
    "enterprise hardware pricing",
    "data center GPU availability",
    "bulk chip ordering",
  ],
  openGraphTitle:
    "Contact Servchip — Enterprise Chip Distributor | Buy AI Chips & Get Pricing",
  openGraphDescription:
    "Get enterprise chip pricing & semiconductor procurement quotes. 24-hour response time. Buy AI accelerators with global shipping from India & UAE.",
  twitterTitle:
    "Contact Servchip — Enterprise Chip Distributor | Buy AI Chips & Get Pricing",
  twitterDescription:
    "Get enterprise chip pricing & semiconductor procurement quotes. 24-hour response time. Buy AI accelerators with global shipping from India & UAE.",
  country: {
    title: "Contact Us{{countrySuffix}} | AI Chip Pricing",
    description:
      "Contact Servchip{{countrySuffix}} for AI chip pricing, availability and procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon and more.",
    keywords: [
      "contact Servchip {{name}}",
      "buy enterprise chips {{name}}",
      "AI accelerator pricing {{name}}",
      "semiconductor procurement {{name}}",
    ],
    openGraphTitle: "Contact Servchip {{name}} | Buy AI Chips & Get Pricing",
    twitterTitle: "Contact Servchip {{name}} | Buy AI Chips & Get Pricing",
    openGraphDescription:
      "Get enterprise chip pricing & quotes{{countrySuffix}}. 24-hour response time.",
    twitterDescription:
      "Get enterprise chip pricing & quotes{{countrySuffix}}. 24-hour response time.",
  },
};
