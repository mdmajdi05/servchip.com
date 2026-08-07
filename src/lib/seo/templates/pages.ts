import { SITE } from "@/lib/constants";
import type { SeoPageTemplate } from "./types";

export type StaticRoute =
  | "home"
  | "about"
  | "blog"
  | "brands"
  | "categories"
  | "services"
  | "solutions"
  | "industries"
  | "comparison"
  | "terms"
  | "privacy"
  | "products"
  | "contact"
  | "rfq"
  | "resources"
  | "faq"
  | "technology"
  | "countries"
  | "developer-hub"
  | "configurator"
  | "dashboard";

export const STATIC_PAGE_TEMPLATES: Record<StaticRoute, SeoPageTemplate> = {
  home: {
    path: "/",
    label: "Home",
    title: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor | NVIDIA H100, AMD Instinct, Intel Gaudi`,
    description:
      "Servchip is your enterprise chip distributor & data center GPU supplier — NVIDIA H100, H200, B200, AMD Instinct MI300X, Intel Xeon & Gaudi 3. Authorized NVIDIA distributor & AI accelerator supplier in Dubai, UAE, India & USA.",
    keywords: [
      "AI chip company",
      "enterprise GPU distributor",
      "nvidia ai chips",
      "amd ai chip",
      "amd authorized distributors",
      "data center gpu",
      "nvidia data center gpu",
      "intel data center gpu",
      "nvidia data center",
      "nvidia h200 supplier",
      "nvidia b200 gpu",
      "nvidia h100",
      "h100 gpu",
      "enterprise chip distributor",
      "AI chip distributor",
      "Data center GPU supplier",
      "NVIDIA H100 distributor",
      "AMD Instinct distributor",
      "Intel Gaudi distributor",
      "enterprise semiconductor distributor",
      "Server processor supplier",
      "HPC chip distributor",
      "AI accelerator supplier",
      "nvidia supplier in dubai",
      "nvidia supplier in uae",
      "nvidia suppliers in india",
      "gpu suppliers in india",
      "nvidia distributor in india",
      "nvidia distributor in uae",
      "nvidia distributor in dubai",
      "nvidia distributor in singapore",
      "nvidia distributor in malaysia",
      "nvidia distributor in china",
      "nvidia distributor in philippines",
      "nvidia authorized dealer",
      "amd authorized distributors in usa",
      "amd distributor in uae",
      "intel distributor in dubai",
      "intel supplier in uae",
      "intel supplier malaysia",
    ],
    openGraphTitle: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor`,
    openGraphDescription:
      "Authorized NVIDIA, AMD & Intel distributor. NVIDIA H100, AMD Instinct MI300X, Intel Gaudi — data center GPUs & AI accelerators with global shipping from Dubai, India & USA.",
    twitterTitle: `${SITE.name} — AI Chip Distributor & Enterprise GPU Distributor`,
    twitterDescription:
      "Authorized NVIDIA, AMD & Intel distributor. NVIDIA H100, AMD Instinct MI300X, Intel Gaudi — data center GPUs & AI accelerators with global shipping.",
    country: ({ metaTitle, metaDescription, metaKeywords }) => ({
      title: metaTitle,
      description: metaDescription,
      keywords: metaKeywords,
      openGraphTitle: `{{name}} | Servchip — Enterprise Chip Distributor`,
      twitterTitle: `{{name}} | Servchip — Enterprise Chip Distributor`,
      openGraphDescription: metaDescription,
      twitterDescription: metaDescription,
    }),
  },

  about: {
    path: "/about",
    label: "About",
    title:
      "About Servchip — ISO 9001 Certified Enterprise Chip Distributor | Semiconductor Procurement",
    description:
      "Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner. Authorized distribution for NVIDIA, AMD, Intel with 27+ manufacturer partnerships, serving 500+ enterprises across 150+ countries from India & UAE.",
    keywords: [
      "about Servchip",
      "enterprise chip distributor",
      "semiconductor procurement company",
      "NVIDIA authorized distributor India",
      "AI hardware supplier",
      "data center hardware procurement",
      "chip sourcing company",
      "bulk semiconductor purchasing",
    ],
    openGraphTitle:
      "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
    openGraphDescription:
      "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
    twitterTitle:
      "About Servchip — Enterprise Chip Distributor & Semiconductor Procurement Partner",
    twitterDescription:
      "ISO 9001 certified enterprise chip distributor. 27+ manufacturer partnerships. Serving 500+ enterprises across 150+ countries from India & UAE.",
    country: {
      title:
        "About Servchip — ISO 9001 Enterprise Chip Distributor{{countrySuffix}}",
      description:
        "Learn about Servchip, an ISO 9001 certified enterprise chip distributor and semiconductor procurement partner serving {{name}}. Authorized NVIDIA, AMD & Intel distribution with local {{currency}} pricing and shipping from {{warehouse}}.",
      keywords: [
        "about Servchip {{name}}",
        "enterprise chip distributor {{name}}",
        "semiconductor procurement {{name}}",
        "NVIDIA authorized distributor {{name}}",
      ],
      openGraphTitle: "About Servchip {{name}} | Enterprise Chip Distributor",
      twitterTitle: "About Servchip {{name}} | Enterprise Chip Distributor",
      openGraphDescription:
        "ISO 9001 certified enterprise chip distributor serving {{name}}.",
      twitterDescription:
        "ISO 9001 certified enterprise chip distributor serving {{name}}.",
    },
  },

  blog: {
    path: "/blog",
    label: "Blog",
    title:
      "Blog — Enterprise AI Hardware Guides, Chip Architecture Insights & Semiconductor Procurement",
    description:
      "Expert guides on NVIDIA Blackwell, AMD CDNA 3, Intel Granite Rapids & more. Enterprise AI chip comparisons, deployment best practices, semiconductor procurement tips & data center infrastructure insights.",
    keywords: [
      "AI hardware guides",
      "enterprise chip blog",
      "NVIDIA Blackwell architecture",
      "AMD CDNA 3 guide",
      "semiconductor procurement",
      "data center infrastructure",
      "AI chip comparison",
      "enterprise GPU guide",
    ],
    openGraphTitle: "Blog | Servchip — Enterprise Chip Distributor",
    openGraphDescription:
      "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
    twitterTitle: "Blog | Servchip — Enterprise Chip Distributor",
    twitterDescription:
      "Expert guides on AI chip architectures, comparisons & enterprise deployment best practices.",
    country: {
      title: "AI Hardware Blog — {{name}} Edition | Servchip",
      description:
        "Enterprise AI hardware guides, chip architecture insights and semiconductor procurement tips for buyers in {{name}}.",
      keywords: [
        "AI hardware guides {{name}}",
        "enterprise chip blog {{name}}",
        "semiconductor procurement {{name}}",
        "data center infrastructure {{name}}",
      ],
      openGraphTitle: "AI Hardware Blog — {{name}} | Servchip",
      twitterTitle: "AI Hardware Blog — {{name}} | Servchip",
    },
  },

  brands: {
    path: "/brands",
    label: "Brands",
    title:
      "All Brands — NVIDIA, AMD, Intel, Dell, HPE & 27+ Enterprise Chip Manufacturers | Servchip",
    description:
      "Browse every brand we stock: NVIDIA, AMD, Intel, Google, Amazon, Dell Technologies, HPE, Supermicro, Broadcom, Micron and 27+ more. Authentic enterprise chips from an ISO 9001 certified distributor with global shipping.",
    keywords: [
      "NVIDIA distributor",
      "AMD enterprise distributor",
      "Intel Xeon supplier",
      "enterprise chip brands",
      "AI hardware manufacturer",
      "semiconductor brand directory",
    ],
    openGraphTitle: "All Brands | Servchip — Enterprise Chip Distributor",
    openGraphDescription:
      "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE and 27+ manufacturers.",
    twitterTitle: "All Brands | Servchip — Enterprise Chip Distributor",
    twitterDescription:
      "Browse every brand we stock — NVIDIA, AMD, Intel, Dell, HPE and 27+ manufacturers.",
    country: {
      title: "Brand Directory in {{name}} | NVIDIA, AMD, Intel & More",
      description:
        "Browse authentic enterprise hardware brands available in {{name}} — NVIDIA, AMD, Intel, HPE, Dell & more. Priced in {{currency}}, shipped from {{warehouse}}.",
      keywords: [
        "NVIDIA distributor {{name}}",
        "AMD distributor {{name}}",
        "Intel distributor {{name}}",
        "brands in {{name}}",
        "enterprise hardware brands {{name}}",
      ],
      openGraphTitle: "Brand Directory in {{name}} | Servchip",
      twitterTitle: "Brand Directory in {{name}} | Servchip",
    },
  },

  categories: {
    path: "/categories",
    label: "Categories",
    title:
      "Product Categories — Data Center GPUs, AI Accelerators, Server CPUs & Enterprise Hardware | Servchip",
    description:
      "Browse enterprise chip categories — NVIDIA data center GPUs, AMD Instinct accelerators, Intel Xeon CPUs, AI servers, networking, memory & storage from an ISO 9001 certified distributor for semiconductor procurement.",
    keywords: [
      "enterprise chip categories",
      "data center GPUs",
      "AI accelerators",
      "server CPUs",
      "enterprise hardware",
      "NVIDIA GPU categories",
      "AMD Instinct",
      "Intel Xeon",
    ],
    openGraphTitle:
      "Product Categories | Servchip — Enterprise Chip Distributor",
    openGraphDescription:
      "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
    twitterTitle: "Product Categories | Servchip — Enterprise Chip Distributor",
    twitterDescription:
      "Browse enterprise chip categories — data center GPUs, AI accelerators, server CPUs & more.",
    country: {
      title:
        "Product Categories in {{name}} | Data Center GPUs & AI Accelerators",
      description:
        "Browse enterprise chip categories in {{name}} — NVIDIA data center GPUs, AMD Instinct, Intel Xeon, AI servers, networking, memory & storage. Priced in {{currency}}.",
      keywords: [
        "enterprise chip categories {{name}}",
        "data center GPUs {{name}}",
        "AI accelerators {{name}}",
        "server CPUs {{name}}",
        "NVIDIA GPU categories {{name}}",
      ],
      openGraphTitle: "Product Categories in {{name}} | Servchip",
      twitterTitle: "Product Categories in {{name}} | Servchip",
    },
  },

  services: {
    path: "/services",
    label: "Services",
    title:
      "Enterprise Chip Services — Semiconductor Procurement, Integration & AI Infrastructure Consulting",
    description:
      "End-to-end enterprise chip services — custom semiconductor procurement, hardware sourcing, system integration, AI infrastructure consulting, and enterprise support. ISO 9001 certified chip distributor with global delivery.",
    keywords: [
      "enterprise chip services",
      "semiconductor procurement services",
      "AI infrastructure consulting",
      "hardware sourcing solutions",
      "enterprise chip integration",
      "data center deployment services",
      "NVIDIA server configuration",
      "bulk chip procurement",
    ],
    openGraphTitle:
      "Enterprise Chip Services | Servchip — Semiconductor Procurement & Integration",
    openGraphDescription:
      "Custom semiconductor procurement, system integration, AI infrastructure consulting, and enterprise hardware support from an ISO 9001 certified chip distributor.",
    twitterTitle:
      "Enterprise Chip Services | Servchip — Semiconductor Procurement & Integration",
    twitterDescription:
      "Custom semiconductor procurement, system integration, AI infrastructure consulting, and enterprise hardware support from an ISO 9001 certified chip distributor.",
    country: {
      title:
        "Enterprise Chip Services in {{name}} — Semiconductor Procurement & Integration",
      description:
        "End-to-end enterprise chip services in {{name}} — custom semiconductor procurement, hardware sourcing, system integration and AI infrastructure consulting. ISO 9001 certified distributor with {{currency}} pricing and delivery from {{warehouse}}.",
      keywords: [
        "enterprise chip services {{name}}",
        "semiconductor procurement services {{name}}",
        "AI infrastructure consulting {{name}}",
        "hardware sourcing {{name}}",
      ],
      openGraphTitle: "Enterprise Chip Services {{name}} | Servchip",
      twitterTitle: "Enterprise Chip Services {{name}} | Servchip",
      openGraphDescription:
        "Custom semiconductor procurement and AI infrastructure consulting in {{name}}.",
      twitterDescription:
        "Custom semiconductor procurement and AI infrastructure consulting in {{name}}.",
    },
  },

  solutions: {
    path: "/solutions",
    label: "Solutions",
    title:
      "Enterprise AI & HPC Solutions — Data Center, Edge & Cloud Infrastructure | Servchip",
    description:
      "Multi-vendor enterprise solutions for AI training, HPC, data center acceleration, edge computing & professional visualization. NVIDIA, AMD, Intel hardware for enterprise deployments with global semiconductor procurement.",
    keywords: [
      "enterprise AI solutions",
      "HPC solutions",
      "data center infrastructure",
      "AI training solutions",
      "GPU cluster deployment",
      "edge computing hardware",
      "enterprise chip distributor",
      "semiconductor procurement",
    ],
    openGraphTitle:
      "Enterprise AI & HPC Solutions | Servchip — Data Center GPU Distributor",
    openGraphDescription:
      "Multi-vendor enterprise solutions for AI training, HPC, and data center workloads featuring NVIDIA, AMD, and Intel hardware.",
    twitterTitle:
      "Enterprise AI & HPC Solutions | Servchip — Data Center GPU Distributor",
    twitterDescription:
      "Multi-vendor enterprise solutions for AI training, HPC, and data center workloads featuring NVIDIA, AMD, and Intel hardware.",
    country: {
      title: "Enterprise AI & HPC Solutions in {{name}} | Servchip",
      description:
        "Multi-vendor enterprise solutions for AI training, HPC, data center acceleration, edge computing & professional visualization in {{name}}. NVIDIA, AMD, Intel hardware with {{currency}} pricing and {{warehouse}} shipping.",
      keywords: [
        "enterprise AI solutions {{name}}",
        "HPC solutions {{name}}",
        "data center infrastructure {{name}}",
        "AI training solutions {{name}}",
      ],
      openGraphTitle: "Enterprise AI & HPC Solutions {{name}} | Servchip",
      twitterTitle: "Enterprise AI & HPC Solutions {{name}} | Servchip",
      openGraphDescription:
        "Multi-vendor enterprise solutions for AI training, HPC and data center workloads in {{name}}.",
      twitterDescription:
        "Multi-vendor enterprise solutions for AI training, HPC and data center workloads in {{name}}.",
    },
  },

  industries: {
    path: "/industries",
    label: "Industries",
    title: "Industries We Serve | Enterprise AI Solutions by Sector | Servchip",
    description:
      "Enterprise AI and data center hardware solutions for data centers, healthcare, finance, government, research, telecom and manufacturing. NVIDIA, AMD & Intel hardware by industry.",
    keywords: [
      "enterprise AI by industry",
      "AI infrastructure solutions",
      "data center GPU industry solutions",
      "healthcare AI hardware",
      "financial AI hardware",
      "enterprise chip distributor",
    ],
    openGraphTitle: "Industries We Serve | Servchip",
    twitterTitle: "Industries We Serve | Servchip",
    country: {
      title:
        "Industries We Serve in {{name}} | Enterprise AI Solutions by Sector",
      description:
        "Enterprise AI and data center hardware solutions in {{name}} for data centers, healthcare, finance, government, research, telecom and manufacturing. NVIDIA, AMD & Intel hardware with {{currency}} pricing.",
      keywords: [
        "enterprise AI by industry {{name}}",
        "AI infrastructure solutions {{name}}",
        "data center GPU industry solutions {{name}}",
        "healthcare AI hardware {{name}}",
      ],
      openGraphTitle: "Industries We Serve in {{name}} | Servchip",
      twitterTitle: "Industries We Serve in {{name}} | Servchip",
    },
  },

  comparison: {
    path: "/comparison",
    label: "Comparison",
    title:
      "AI Chip Comparison — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3 | Enterprise Chip Specs",
    description:
      "Compare enterprise AI accelerators side by side — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3. Memory, bandwidth, TFLOPS, TDP & architecture specs for data center GPU procurement decisions.",
    keywords: [
      "NVIDIA H100 vs AMD MI300X",
      "AI chip comparison",
      "enterprise GPU specs",
      "data center accelerator comparison",
      "NVIDIA H100 specifications",
      "AMD MI300X benchmark",
      "semiconductor procurement guide",
    ],
    openGraphTitle:
      "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
    openGraphDescription:
      "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
    twitterTitle:
      "AI Chip Comparison | NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3",
    twitterDescription:
      "Side-by-side enterprise chip comparison — specs, performance & pricing for data center GPU procurement.",
    country: {
      title: "AI Chip Comparison in {{name}} — H100 vs MI300X vs Gaudi 3",
      description:
        "Compare enterprise AI accelerators for buyers in {{name}} — NVIDIA H100 vs AMD MI300X vs Intel Gaudi 3. Memory, bandwidth, TFLOPS, TDP & architecture specs for {{currency}} data center procurement decisions.",
      keywords: [
        "NVIDIA H100 vs AMD MI300X {{name}}",
        "AI chip comparison {{name}}",
        "enterprise GPU specs {{name}}",
        "data center accelerator comparison {{name}}",
      ],
      openGraphTitle: "AI Chip Comparison {{name}} | H100 vs MI300X vs Gaudi 3",
      twitterTitle: "AI Chip Comparison {{name}} | H100 vs MI300X vs Gaudi 3",
      openGraphDescription:
        "Side-by-side enterprise chip comparison for buyers in {{name}}.",
      twitterDescription:
        "Side-by-side enterprise chip comparison for buyers in {{name}}.",
    },
  },

  terms: {
    path: "/terms",
    label: "Terms of Service",
    title: "Terms of Service — Servchip Terms & Conditions",
    description:
      "Servchip terms of service govern the use of our website, product purchases, warranty claims, and enterprise account management.",
    openGraphTitle: "Terms of Service | Servchip",
    openGraphDescription:
      "Terms & conditions for using Servchip's website and services.",
    twitterTitle: "Terms of Service | Servchip",
    twitterDescription:
      "Terms & conditions for using Servchip's website and services.",
    country: {
      title: "Terms of Service — Servchip Terms & Conditions{{countrySuffix}}",
      description:
        "Servchip terms of service govern the use of our website, product purchases, warranty claims, and enterprise account management{{countrySuffix}}.",
      openGraphTitle: "Terms of Service {{name}} | Servchip",
      twitterTitle: "Terms of Service {{name}} | Servchip",
      openGraphDescription:
        "Terms & conditions for using Servchip's website and services{{countrySuffix}}.",
      twitterDescription:
        "Terms & conditions for using Servchip's website and services{{countrySuffix}}.",
    },
  },

  privacy: {
    path: "/privacy",
    label: "Privacy Policy",
    title: "Privacy Policy — Servchip Data Protection & Privacy Practices",
    description:
      "Servchip privacy policy explains how we collect, use, and protect your personal data when you browse our store or contact our sales team.",
    openGraphTitle: "Privacy Policy | Servchip",
    openGraphDescription:
      "How Servchip collects, uses, and protects your personal data.",
    twitterTitle: "Privacy Policy | Servchip",
    twitterDescription:
      "How Servchip collects, uses, and protects your personal data.",
    country: {
      title: "Privacy Policy — Servchip Data Protection{{countrySuffix}}",
      description:
        "Servchip privacy policy explains how we collect, use, and protect your personal data{{countrySuffix}} when you browse our store or contact our sales team.",
      openGraphTitle: "Privacy Policy {{name}} | Servchip",
      twitterTitle: "Privacy Policy {{name}} | Servchip",
      openGraphDescription:
        "How Servchip collects, uses, and protects your personal data{{countrySuffix}}.",
      twitterDescription:
        "How Servchip collects, uses, and protects your personal data{{countrySuffix}}.",
    },
  },

  products: {
    path: "/products",
    label: "Products",
    title:
      "Buy Enterprise Chips — NVIDIA H100, AMD MI300X, Intel Xeon & AI Accelerators | Servchip",
    description:
      "Buy authentic enterprise chips from an ISO 9001 certified distributor. NVIDIA H100, H200, B200, AMD MI300X, Intel Xeon & Gaudi 3. AI accelerators, server CPUs, data center GPUs. Semiconductor procurement with global shipping.",
    keywords: [
      "buy AI chips",
      "enterprise chip distributor",
      "NVIDIA H100 buy",
      "AMD MI300X supplier",
      "AI accelerator distributor",
      "semiconductor procurement",
      "data center GPU supplier",
      "enterprise hardware store",
    ],
    openGraphTitle:
      "Buy Enterprise Chips | Servchip — NVIDIA, AMD, Intel AI Accelerators",
    openGraphDescription:
      "Buy authentic enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon. ISO 9001 certified distributor with global shipping.",
    twitterTitle:
      "Buy Enterprise Chips | Servchip — NVIDIA, AMD, Intel AI Accelerators",
    twitterDescription:
      "Buy authentic enterprise chips — NVIDIA H100, AMD MI300X, Intel Xeon. ISO 9001 certified distributor with global shipping.",
    country: {
      title: "Buy Enterprise AI Chips in {{name}} | NVIDIA, AMD, Intel",
      description:
        "Buy authentic NVIDIA H100, AMD MI300X, Intel Xeon & AI accelerators in {{name}}. Priced in {{currency}}, shipped from {{warehouse}}. ISO 9001 certified distributor.",
      keywords: [
        "buy AI chips {{name}}",
        "NVIDIA GPU distributor {{name}}",
        "data center GPU supplier {{name}}",
        "GPU server supplier {{name}}",
        "semiconductor distributor {{name}}",
      ],
      openGraphTitle: "Buy Enterprise AI Chips in {{name}} | Servchip",
      twitterTitle: "Buy Enterprise AI Chips in {{name}} | Servchip",
    },
  },

  contact: {
    path: "/contact",
    label: "Contact",
    title:
      "Contact Us — Buy Enterprise Chips, AI Accelerators & Semiconductor Procurement",
    description:
      "Contact Servchip for enterprise chip pricing, AI accelerator availability, and semiconductor procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon & more. Enterprise hardware distributor with 24-hour response time & global shipping.",
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
      title:
        "Contact Us{{countrySuffix}} — Enterprise Chip Pricing & AI Accelerator Quotes",
      description:
        "Contact Servchip{{countrySuffix}} for enterprise chip pricing, AI accelerator availability and semiconductor procurement quotes. NVIDIA H100, AMD MI300X, Intel Xeon & more. {{currency}} pricing, 24-hour response time.",
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
  },

  rfq: {
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
      title:
        "Request a Quote{{countrySuffix}} — Enterprise AI Hardware Pricing",
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
  },

  resources: {
    path: "/resources",
    label: "Resources",
    title:
      "Resources — Enterprise AI Hardware Guides, Blog & Semiconductor Procurement Insights",
    description:
      "Technical guides, blog articles, case studies & whitepapers on AI computing, GPU architectures, HPC deployments, semiconductor procurement tips & enterprise chip solutions from Servchip's certified engineers.",
    keywords: [
      "AI hardware guides",
      "enterprise chip resources",
      "semiconductor procurement",
      "GPU architecture guides",
      "data center deployment",
      "HPC best practices",
    ],
    openGraphTitle:
      "Resources & Guides | Servchip — Enterprise Chip Distributor",
    openGraphDescription:
      "Technical guides, case studies & whitepapers on AI computing, GPU architectures & enterprise chip solutions.",
    twitterTitle: "Resources & Guides | Servchip — Enterprise Chip Distributor",
    twitterDescription:
      "Technical guides, case studies & whitepapers on AI computing, GPU architectures & enterprise chip solutions.",
    country: {
      title:
        "Resources — Enterprise AI Hardware Guides{{countrySuffix}} | Servchip",
      description:
        "Technical guides, blog articles, case studies & whitepapers on AI computing, GPU architectures, HPC deployments and semiconductor procurement for buyers{{countrySuffix}}.",
      keywords: [
        "AI hardware guides {{name}}",
        "enterprise chip resources {{name}}",
        "semiconductor procurement {{name}}",
        "GPU architecture guides {{name}}",
      ],
      openGraphTitle: "Resources & Guides{{countrySuffix}} | Servchip",
      twitterTitle: "Resources & Guides{{countrySuffix}} | Servchip",
      openGraphDescription:
        "Technical guides, case studies & whitepapers on AI computing for buyers{{countrySuffix}}.",
      twitterDescription:
        "Technical guides, case studies & whitepapers on AI computing for buyers{{countrySuffix}}.",
    },
  },

  faq: {
    path: "/faq",
    label: "FAQ",
    title:
      "FAQ — Enterprise Chip Distributor | Buy AI Chips, Semiconductor Procurement",
    description:
      "Answers about buying AI chips, enterprise chip purchasing, semiconductor procurement, authenticity verification, bulk ordering, shipping, warranty & support from Servchip — ISO 9001 certified distributor for NVIDIA, AMD, Intel.",
    keywords: [
      "buy AI chips",
      "enterprise chip purchasing",
      "semiconductor procurement",
      "NVIDIA H100 buying guide",
      "bulk semiconductor purchasing",
      "enterprise GPU procurement",
      "data center hardware FAQ",
      "chip distributor questions",
    ],
    openGraphTitle: "FAQ | Servchip — Enterprise Chip Distributor",
    openGraphDescription:
      "Common questions about buying AI chips, semiconductor procurement, enterprise chip purchasing, shipping, warranty & support.",
    twitterTitle: "FAQ | Servchip — Enterprise Chip Distributor",
    twitterDescription:
      "Common questions about buying AI chips, semiconductor procurement, enterprise chip purchasing, shipping, warranty & support.",
    country: {
      title: "FAQ — Enterprise Chip Distribution{{countrySuffix}} | Servchip",
      description:
        "Answers about buying AI chips, enterprise chip purchasing and semiconductor procurement{{countrySuffix}}. Authenticity, bulk ordering, {{currency}} pricing, shipping, warranty & support.",
      keywords: [
        "buy AI chips {{name}}",
        "enterprise chip purchasing {{name}}",
        "semiconductor procurement {{name}}",
        "NVIDIA H100 buying guide {{name}}",
      ],
      openGraphTitle: "FAQ {{name}} | Servchip — Enterprise Chip Distributor",
      twitterTitle: "FAQ {{name}} | Servchip — Enterprise Chip Distributor",
      openGraphDescription:
        "Common questions about buying AI chips and enterprise hardware{{countrySuffix}}.",
      twitterDescription:
        "Common questions about buying AI chips and enterprise hardware{{countrySuffix}}.",
    },
  },

  technology: {
    path: "/technology",
    label: "Technology",
    title:
      "AI Chip Technology — NVIDIA Blackwell, Hopper, AMD CDNA 3 & Intel Architectures | Servchip",
    description:
      "Explore GPU architecture generations — NVIDIA Blackwell FP4, Hopper Transformer Engine, AMD CDNA 3, Intel Granite Rapids. Deep dives into NVLink 5.0, MIG, HBM3e memory & enterprise AI chip technology from Servchip.",
    keywords: [
      "NVIDIA Blackwell architecture",
      "Hopper Transformer Engine",
      "AI chip technology",
      "GPU architecture comparison",
      "NVLink 5.0",
      "HBM3e memory",
      "AMD CDNA 3",
      "Intel Granite Rapids",
      "enterprise AI hardware",
      "GPU compute technology",
      "data center GPU architecture",
      "AI accelerator technology",
    ],
    openGraphTitle:
      "AI Chip Technology — NVIDIA & AMD & Intel GPU Architectures | Servchip",
    openGraphDescription:
      "Deep dive into Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids. Compare GPU architectures, memory bandwidth, tensor core generations & more from Servchip.",
    twitterTitle:
      "AI Chip Technology — NVIDIA & AMD & Intel GPU Architectures | Servchip",
    twitterDescription:
      "Deep dive into Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids — GPU architectures powering next-gen AI.",
    country: {
      title: "AI Chip Technology{{countrySuffix}} — Blackwell, Hopper & CDNA 3",
      description:
        "Explore GPU architecture generations — NVIDIA Blackwell, Hopper, AMD CDNA 3, Intel Granite Rapids{{countrySuffix}}. NVLink 5.0, MIG, HBM3e memory & enterprise AI chip technology from Servchip with {{currency}} pricing.",
      keywords: [
        "NVIDIA Blackwell architecture {{name}}",
        "AI chip technology {{name}}",
        "GPU architecture comparison {{name}}",
        "enterprise AI hardware {{name}}",
      ],
      openGraphTitle: "AI Chip Technology{{countrySuffix}} | Servchip",
      twitterTitle: "AI Chip Technology{{countrySuffix}} | Servchip",
      openGraphDescription:
        "Deep dive into Blackwell, Hopper, AMD CDNA 3 and Intel architectures{{countrySuffix}}.",
      twitterDescription:
        "Deep dive into Blackwell, Hopper, AMD CDNA 3 and Intel architectures{{countrySuffix}}.",
    },
  },

  countries: {
    path: "/countries",
    label: "Countries",
    title: "Enterprise AI Chips by Country | Global Delivery | Servchip",
    description:
      "Enterprise AI hardware and data center chips delivered across India, UAE, USA, Saudi Arabia, Qatar and Oman. NVIDIA, AMD & Intel with full customs handling.",
    keywords: [
      "AI chip distributor by country",
      "NVIDIA GPU global delivery",
      "enterprise chip distributor India",
      "AI chip distributor UAE",
      "semiconductor distributor Middle East",
      "enterprise chip distributor",
    ],
    openGraphTitle: "Enterprise AI Chips by Country | Servchip",
    twitterTitle: "Enterprise AI Chips by Country | Servchip",
    country: {
      title: "Enterprise AI Chips by Country | Global Delivery | Servchip",
      description:
        "Enterprise AI hardware and data center chips delivered across India, UAE, USA, UK, Germany and more. NVIDIA, AMD & Intel with full customs handling and {{currency}} regional pricing.",
      keywords: [
        "AI chip distributor by country",
        "enterprise chip distributor {{name}}",
        "NVIDIA GPU global delivery {{name}}",
        "semiconductor distributor",
      ],
      openGraphTitle: "Enterprise AI Chips by Country | Servchip",
      twitterTitle: "Enterprise AI Chips by Country | Servchip",
    },
  },

  "developer-hub": {
    path: "/developer-hub",
    label: "Developer Hub",
    title:
      "Developer Hub — SDK, API Docs & Integration Guides for AI Chips | Servchip",
    description:
      "Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI. SDK documentation, API reference, and code samples for enterprise AI chip development and semiconductor deployment.",
    keywords: [
      "NVIDIA CUDA SDK",
      "AMD ROCm guide",
      "Intel oneAPI docs",
      "AI chip development",
      "enterprise chip integration",
      "GPU SDK documentation",
    ],
    openGraphTitle: "Developer Hub | Servchip — Enterprise AI Hardware",
    openGraphDescription:
      "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
    twitterTitle: "Developer Hub | Servchip — Enterprise AI Hardware",
    twitterDescription:
      "SDK docs, API reference & integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI across enterprise chip platforms.",
    country: {
      title:
        "Developer Hub{{countrySuffix}} — SDK & Integration Guides | Servchip",
      description:
        "Integration guides for NVIDIA CUDA, AMD ROCm, Intel oneAPI{{countrySuffix}}. SDK documentation, API reference and code samples for enterprise AI chip development.",
      keywords: [
        "NVIDIA CUDA SDK {{name}}",
        "AMD ROCm guide {{name}}",
        "Intel oneAPI docs {{name}}",
        "AI chip development {{name}}",
      ],
      openGraphTitle: "Developer Hub {{name}} | Servchip",
      twitterTitle: "Developer Hub {{name}} | Servchip",
      openGraphDescription:
        "SDK docs, API reference & integration guides for enterprise chip platforms{{countrySuffix}}.",
      twitterDescription:
        "SDK docs, API reference & integration guides for enterprise chip platforms{{countrySuffix}}.",
    },
  },

  configurator: {
    path: "/configurator",
    label: "Configurator",
    title:
      "Chip Configurator — Find the Right AI Accelerator for Your Workload | Servchip",
    description:
      "Configure your ideal chip setup from NVIDIA, AMD, Intel and more. Answer a few questions and get matched with the right AI accelerator for training, inference, HPC, or professional graphics. Enterprise chip distributor.",
    keywords: [
      "chip configurator",
      "AI accelerator finder",
      "GPU selector tool",
      "enterprise chip matching",
      "workload-based chip recommendation",
    ],
    robots: { index: false, follow: true },
    openGraphTitle:
      "Chip Configurator | Servchip — Find the Right AI Accelerator",
    openGraphDescription:
      "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
    twitterTitle:
      "Chip Configurator | Servchip — Find the Right AI Accelerator",
    twitterDescription:
      "Configure your ideal AI chip setup. NVIDIA, AMD, Intel. Matched to your workload.",
    country: {
      title:
        "Chip Configurator{{countrySuffix}} — Find the Right AI Accelerator",
      description:
        "Configure your ideal chip setup{{countrySuffix}} from NVIDIA, AMD, Intel and more. Get matched with the right AI accelerator for training, inference, HPC or professional graphics.",
      keywords: [
        "chip configurator {{name}}",
        "AI accelerator finder {{name}}",
        "GPU selector tool {{name}}",
        "workload-based chip recommendation {{name}}",
      ],
      openGraphTitle: "Chip Configurator {{name}} | Servchip",
      twitterTitle: "Chip Configurator {{name}} | Servchip",
      openGraphDescription:
        "Configure your ideal AI chip setup{{countrySuffix}}.",
      twitterDescription:
        "Configure your ideal AI chip setup{{countrySuffix}}.",
    },
  },

  dashboard: {
    path: "/dashboard",
    label: "Dashboard",
    title: "Account Dashboard — Servchip Enterprise Portal",
    description:
      "Manage your Servchip account, track orders, view quotes, and access your enterprise dashboard for chip procurement across all manufacturers.",
    keywords: [
      "Servchip account dashboard",
      "enterprise chip orders",
      "semiconductor procurement portal",
      "chip distributor account",
      "AI hardware procurement",
    ],
    noindex: true,
    openGraphTitle: "Account Dashboard | Servchip",
    openGraphDescription:
      "Manage your Servchip enterprise account, track orders, view quotes, and access procurement tools.",
    twitterTitle: "Account Dashboard | Servchip",
    twitterDescription: "Manage your Servchip enterprise account and orders.",
  },
};
