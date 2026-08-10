import type { SeoEntityTemplate } from "./types";

export type EntityRoute =
  | "blog"
  | "product"
  | "brand"
  | "brandCategory"
  | "category"
  | "industry"
  | "solution"
  | "country";

export const ENTITY_TEMPLATES: Record<EntityRoute, SeoEntityTemplate> = {
  blog: {
    globalPath: "/blog/{{slug}}",
    global: {
      title: "{{blogTitle}}",
      description: "{{blogDescription}}",
      keywords: ["{{tags}}"],
    },
    country: {
      title: "{{blogTitle}}",
      description: "{{blogDescription}}",
      keywords: ["{{tags}}"],
      openGraphTitle: "{{postTitle}} — {{name}} | Servchip",
      twitterTitle: "{{postTitle}} — {{name}} | Servchip",
    },
  },

  product: {
    globalPath: "/products/{{slug}}",
    global: {
      title: "{{productName}}",
      description: "{{productDescription}}",
      keywords: [
        "buy {{product}}",
        "{{manufacturer}} {{series}}",
        "{{categoryName}} supplier",
        "enterprise chip distributor",
        "semiconductor procurement",
        "data center hardware",
      ],
      openGraphTitle: "{{product}} — Servchip",
      openGraphDescription: "{{productDescription}}",
      twitterTitle: "{{product}} — Servchip",
      twitterDescription: "{{productDescription}}",
    },
    country: {
      title: "{{product}}{{countrySuffix}}",
      description:
        "{{product}} ({{series}}) available{{countrySuffix}}. Priced in {{currency}}, shipped from {{warehouse}}. Authentic, warrantied — request a quote today.",
      keywords: [
        "buy {{product}} {{name}}",
        "{{manufacturer}} {{series}} {{name}}",
        "{{categoryName}} supplier {{name}}",
        "data center hardware {{name}}",
      ],
      openGraphTitle: "{{product}} — Buy{{countrySuffix}} | Servchip",
      twitterTitle: "{{product}} — Buy{{countrySuffix}} | Servchip",
      openGraphDescription:
        "{{product}} available{{countrySuffix}} with delivery across the region. Request a quote.",
      twitterDescription: "{{product}} available{{countrySuffix}}.",
    },
  },

  brand: {
    globalPath: "/brands/{{slug}}",
    global: {
      title: "{{brandMetaTitle}}",
      description: "{{brandMetaDescription}}",
      keywords: ["{{brandKeywords}}"],
      openGraphTitle:
        "{{brand}} Products | Servchip — Enterprise Chip Distributor",
      twitterTitle:
        "{{brand}} Products | Servchip — Enterprise Chip Distributor",
      openGraphDescription: "{{brandMetaDescription}}",
      twitterDescription: "{{brandMetaDescription}}",
    },
    country: {
      title: "{{brand}} Products{{countrySuffix}}",
      description:
        "Buy authentic {{brand}} enterprise hardware{{countrySuffix}}. Priced in {{currency}}, shipped from {{warehouse}}. ISO 9001 certified distributor.",
      keywords: [
        "buy {{brand}} chips {{name}}",
        "{{brand}} distributor {{name}}",
        "{{brand}} products {{name}}",
        "enterprise {{brand}} hardware {{name}}",
      ],
      openGraphTitle: "{{brand}} Products{{countrySuffix}} | Servchip",
      twitterTitle: "{{brand}} Products{{countrySuffix}} | Servchip",
    },
  },

  brandCategory: {
    globalPath: "/brands/{{brandSlug}}/{{categorySlug}}",
    global: {
      title: "{{brand}} {{category}}",
      description:
        "Buy {{brand}} {{category}}. {{categoryDescription}} Enterprise chip distributor with semiconductor procurement expertise.",
      keywords: [
        "buy {{brand}} {{category}}",
        "{{brand}} {{category}} supplier",
        "enterprise chip distributor",
        "semiconductor procurement",
        "AI accelerator supplier",
      ],
      openGraphTitle: "{{brand}} {{category}} | Servchip",
      twitterTitle: "{{brand}} {{category}} | Servchip",
      openGraphDescription:
        "Buy {{brand}} {{category}} from an ISO 9001 certified distributor.",
      twitterDescription:
        "Buy {{brand}} {{category}} from an ISO 9001 certified distributor.",
    },
    country: {
      title: "{{brand}} {{category}}{{countrySuffix}}",
      description:
        "Buy authentic {{brand}} {{category}}{{countrySuffix}}. Priced in {{currency}}, shipped from {{warehouse}}. ISO 9001 certified distributor.",
      keywords: [
        "{{brand}} {{category}} {{name}}",
        "buy {{brand}} products {{name}}",
        "{{brand}} distributor {{name}}",
      ],
      openGraphTitle: "{{brand}} {{category}}{{countrySuffix}} | Servchip",
      twitterTitle: "{{brand}} {{category}}{{countrySuffix}} | Servchip",
    },
  },

  category: {
    globalPath: "/categories/{{slug}}",
    global: {
      title: "{{categoryMetaTitle}}",
      description: "{{categoryMetaDescription}}",
      keywords: ["{{categoryKeywords}}"],
      openGraphTitle: "{{category}} | Servchip — Enterprise Chip Distributor",
      openGraphDescription: "{{categoryMetaDescription}}",
      twitterTitle: "{{category}} | Servchip — Enterprise Chip Distributor",
      twitterDescription: "{{categoryMetaDescription}}",
    },
    country: {
      title: "Buy {{category}}{{countrySuffix}}",
      description:
        "Buy {{category}} products{{countrySuffix}}. Priced in {{currency}}, shipped from {{warehouse}}. Authentic, warrantied enterprise hardware.",
      keywords: [
        "buy {{category}} {{name}}",
        "{{category}} supplier {{name}}",
        "data center hardware {{name}}",
        "enterprise {{category}} {{name}}",
      ],
      openGraphTitle: "{{category}}{{countrySuffix}} | Servchip",
      twitterTitle: "{{category}}{{countrySuffix}} | Servchip",
    },
  },

  industry: {
    globalPath: "/industries/{{slug}}",
    global: {
      title: "{{industryMetaTitle}}",
      description: "{{industryMetaDescription}}",
      keywords: ["{{industryKeywords}}"],
      openGraphTitle: "{{industry}} Solutions | Servchip",
      twitterTitle: "{{industry}} Solutions | Servchip",
      openGraphDescription: "{{industryMetaDescription}}",
      twitterDescription: "{{industryMetaDescription}}",
    },
    country: {
      title: "{{industry}} Solutions{{countrySuffix}}",
      description:
        "{{industryMetaDescription}} Available{{countrySuffix}} with {{currency}} pricing, shipped from {{warehouse}}.",
      keywords: ["{{industryKeywords}}", "{{industry}} solutions {{name}}"],
      openGraphTitle: "{{industry}} Solutions{{countrySuffix}} | Servchip",
      twitterTitle: "{{industry}} Solutions{{countrySuffix}} | Servchip",
      openGraphDescription:
        "{{industryMetaDescription}} Available{{countrySuffix}}.",
      twitterDescription: "{{industryMetaDescription}}",
    },
  },

  solution: {
    globalPath: "/solutions/{{slug}}",
    global: {
      title: "{{solutionMetaTitle}}",
      description: "{{solutionMetaDescription}}",
      keywords: ["{{solutionKeywords}}"],
      openGraphTitle: "{{solution}} | Servchip",
      twitterTitle: "{{solution}} | Servchip",
      openGraphDescription: "{{solutionMetaDescription}}",
      twitterDescription: "{{solutionMetaDescription}}",
    },
    country: {
      title: "{{solution}}{{countrySuffix}}",
      description:
        "{{solutionMetaDescription}} Available{{countrySuffix}} with {{currency}} pricing, shipped from {{warehouse}}.",
      keywords: ["{{solutionKeywords}}", "{{solution}} {{name}}"],
      openGraphTitle: "{{solution}}{{countrySuffix}} | Servchip",
      twitterTitle: "{{solution}}{{countrySuffix}} | Servchip",
      openGraphDescription:
        "{{solutionMetaDescription}} Available{{countrySuffix}}.",
      twitterDescription: "{{solutionMetaDescription}}",
    },
  },

  country: {
    globalPath: "/countries/{{slug}}",
    global: {
      title: "{{countryMetaTitle}}",
      description: "{{countryMetaDescription}}",
      keywords: ["{{countryMetaKeywords}}"],
      openGraphTitle: "{{name}} | Servchip — Enterprise Chip Distributor",
      twitterTitle: "{{name}} | Servchip — Enterprise Chip Distributor",
      openGraphDescription: "{{countryMetaDescription}}",
      twitterDescription: "{{countryMetaDescription}}",
    },
    country: {
      title: "{{countryMetaTitle}}",
      description: "{{countryMetaDescription}}",
      keywords: ["{{countryMetaKeywords}}"],
      openGraphTitle: "{{name}} | Servchip — Enterprise Chip Distributor",
      twitterTitle: "{{name}} | Servchip — Enterprise Chip Distributor",
      openGraphDescription: "{{countryMetaDescription}}",
      twitterDescription: "{{countryMetaDescription}}",
    },
  },
};
