import type { SeoPageTemplate } from "../types";

export const countries: SeoPageTemplate = {
  path: "/countries",
  label: "Countries",
  title: "AI Chips by Country | Global Delivery",
  description:
    "Enterprise AI hardware and data center chips delivered globally across supported markets.",
  keywords: [
    "AI chip distributor by country",
    "NVIDIA GPU global delivery",
    "enterprise chip distributor",
    "AI chip distributor",
    "semiconductor distributor",
  ],
  openGraphTitle: "Enterprise AI Chips by Country | Servchip",
  twitterTitle: "Enterprise AI Chips by Country | Servchip",
  country: {
    title: "AI Chips by Country{{countrySuffix}} | Global Delivery",
    description:
      "Enterprise AI hardware and data center chips delivered across supported markets{{countrySuffix}}, with {{currency}} regional pricing.",
    keywords: [
      "AI chip distributor by country",
      "enterprise chip distributor{{countrySuffix}}",
      "NVIDIA GPU global delivery{{countrySuffix}}",
      "semiconductor distributor",
    ],
    openGraphTitle:
      "Enterprise AI Chips by Country{{countrySuffix}} | Servchip",
    twitterTitle: "Enterprise AI Chips by Country{{countrySuffix}} | Servchip",
  },
};
