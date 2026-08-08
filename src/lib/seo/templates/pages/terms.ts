import type { SeoPageTemplate } from "../types";

export const terms: SeoPageTemplate = {
  path: "/terms",
  label: "Terms of Service",
  title: "Terms of Service | Servchip",
  description:
    "Servchip terms of service govern the use of our website, product purchases, warranty claims and enterprise account management.",
  openGraphTitle: "Terms of Service | Servchip",
  openGraphDescription:
    "Terms & conditions for using Servchip's website and services.",
  twitterTitle: "Terms of Service | Servchip",
  twitterDescription:
    "Terms & conditions for using Servchip's website and services.",
  country: {
    title: "Terms of Service{{countrySuffix}} | Servchip",
    description:
      "Servchip terms of service govern the use of our website, product purchases, warranty claims and enterprise account management{{countrySuffix}}.",
    openGraphTitle: "Terms of Service {{name}} | Servchip",
    twitterTitle: "Terms of Service {{name}} | Servchip",
    openGraphDescription:
      "Terms & conditions for using Servchip's website and services{{countrySuffix}}.",
    twitterDescription:
      "Terms & conditions for using Servchip's website and services{{countrySuffix}}.",
  },
};
