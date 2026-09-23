import type { SeoPageTemplate } from "../types";

export const returnPolicy: SeoPageTemplate = {
  path: "/return-policy",
  label: "Return Policy",
  title: "Return Policy | Servchip",
  description:
    "Servchip return policy covers returns for defective enterprise GPUs and server hardware, RMA and warranty claims, restocking fees and refund timelines.",
  openGraphTitle: "Return Policy | Servchip",
  openGraphDescription:
    "How returns, RMA and refunds work when you buy enterprise chips and server hardware from Servchip.",
  twitterTitle: "Return Policy | Servchip",
  twitterDescription:
    "How returns, RMA and refunds work when you buy enterprise chips and server hardware from Servchip.",
  country: {
    title: "Return Policy{{countrySuffix}} | Servchip",
    description:
      "Servchip return policy covers returns for defective enterprise GPUs and server hardware, RMA and warranty claims, restocking fees and refund timelines{{countrySuffix}}.",
    openGraphTitle: "Return Policy {{name}} | Servchip",
    twitterTitle: "Return Policy {{name}} | Servchip",
    openGraphDescription:
      "How returns, RMA and refunds work when you buy enterprise chips and server hardware from Servchip{{countrySuffix}}.",
    twitterDescription:
      "How returns, RMA and refunds work when you buy enterprise chips and server hardware from Servchip{{countrySuffix}}.",
  },
};
