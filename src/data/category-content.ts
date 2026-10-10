// Category landing-page SEO article content.
// Each category has:
//   - `global` - shown on the global page and non-UAE country pages. Uses {country}
//     token which is resolved to the country label by `getCategoryArticle`.
//   - `uae`    - shown on /ae pages. Dubai / UAE-specific, directly targets
//     "reseller Dubai" style keywords in visible content.

export interface CategoryArticleList {
  title: string;
  desc: string;
}

export interface CategoryArticleSection {
  heading: string;
  /** Visual layout for this chapter. Defaults to "default". */
  layout?: "default" | "split" | "cards" | "grid" | "steps";
  /** Paragraphs rendered before any lists. Supports [link](/path) and **bold**. */
  intro?: string[];
  /** Bullet items. Supports [link](/path) and **bold**. */
  bullets?: string[];
  /** Numbered steps. Supports [link](/path) and **bold**. */
  numbered?: string[];
  /** Paragraphs rendered after any lists. Supports [link](/path) and **bold**. */
  outro?: string[];
  /** Side card (split layout): heading above the checklist. */
  sideTitle?: string;
  /** Side card (split layout): checklist items. */
  sideItems?: string[];
  /** Side card (split layout): closing line below the checklist. */
  sideFooter?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface CategoryArticle {
  /** H1 override for the category header. Falls back to the category name. */
  h1?: string;
  /** H2 + note rendered directly above the product grid. Supports [link](/path). */
  catalogTitle?: string;
  catalogNote?: string;
  introTitle: string;
  intro: string[];
  featuresTitle: string;
  features: { title: string; desc: string }[];
  advantagesTitle: string;
  advantagesIntro?: string;
  advantages: { title: string; desc: string }[];
  /** Free-form editorial H2 sections rendered between the intro and FAQ blocks. */
  sections?: CategoryArticleSection[];
  faqTitle: string;
  faqSubtitle?: string;
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaText: string;
}

export interface CategoryArticleEntry {
  global: CategoryArticle;
  uae: CategoryArticle;
}

const COUNTRY_LABELS: Record<string, string> = {
  us: "USA",
  uk: "UK",
  de: "Germany",
};

function renderTokens(
  article: CategoryArticle,
  label: string,
): CategoryArticle {
  const map = (s: string) => s.replace(/\{country\}/g, label);
  return {
    ...article,
    introTitle: map(article.introTitle),
    intro: article.intro.map(map),
    featuresTitle: map(article.featuresTitle),
    features: article.features.map((f) => ({
      title: map(f.title),
      desc: map(f.desc),
    })),
    advantagesTitle: map(article.advantagesTitle),
    advantagesIntro: article.advantagesIntro
      ? map(article.advantagesIntro)
      : undefined,
    advantages: article.advantages.map((a) => ({
      title: map(a.title),
      desc: map(a.desc),
    })),
    faqTitle: map(article.faqTitle),
    faqSubtitle: article.faqSubtitle ? map(article.faqSubtitle) : undefined,
    faqs: article.faqs.map((f) => ({ q: map(f.q), a: map(f.a) })),
    ctaTitle: map(article.ctaTitle),
    ctaText: map(article.ctaText),
  };
}

/** Resolve the article for a category slug + optional country code (e.g. "ae"). */
export function getCategoryArticle(
  slug: string,
  countryCode?: string,
): CategoryArticle | null {
  const entry = CATEGORY_ARTICLES[slug];
  if (!entry) return null;
  if (countryCode === "ae") return entry.uae;
  const label = (countryCode && COUNTRY_LABELS[countryCode]) || "your region";
  return renderTokens(entry.global, label);
}

export const CATEGORY_ARTICLES: Record<string, CategoryArticleEntry> = {
  // ================= AI Servers & Platforms =================
  "ai-servers-platforms": {
    global: {
      introTitle:
        "Enterprise Solutions from a Leading AI Server Reseller in {country}",
      intro: [
        "Building a scalable data center requires reliable, certified hardware. As a dedicated AI server reseller in {country}, we supply top-tier compute systems from global OEMs including Dell PowerEdge, HPE ProLiant & Cray, Supermicro, Lenovo ThinkSystem, GIGABYTE, and ASUS.",
      ],
      featuresTitle: "What's Inside Our AI Server Platforms",
      features: [
        {
          title: "Accelerated GPU Compute",
          desc: "Equipped with NVIDIA, AMD, and Intel AI enterprise accelerators for training, inference and HPC workloads.",
        },
        {
          title: "High-Bandwidth Networking",
          desc: "InfiniBand and high-speed Ethernet for low-latency node communications in multi-GPU clusters.",
        },
        {
          title: "Ultra-Fast Memory & Storage",
          desc: "Enterprise NVMe drives and high-capacity RAM modules for heavy data throughput.",
        },
      ],
      advantagesTitle:
        "Key Advantages of Choosing an AI Server Reseller in {country}",
      advantagesIntro:
        "Direct sourcing and dedicated technical support ensure your infrastructure runs with zero downtime.",
      advantages: [
        {
          title: "100% Genuine Certified Hardware",
          desc: "Direct access to authentic enterprise platforms backed by full manufacturer warranties.",
        },
        {
          title: "Customized Server Configurations",
          desc: "Custom builds tuned specifically for your AI models and workload demands.",
        },
        {
          title: "Fast Regional Delivery & Support",
          desc: "Quick deployment across the region with streamlined logistics and import handling.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Enterprise AI Infrastructure",
      faqs: [
        {
          q: "What services are provided by an AI server distributor in {country}?",
          a: "As a leading AI server distributor in {country}, we provide end-to-end B2B infrastructure solutions. Our services include bulk hardware procurement, AI cluster architecture planning, custom topology design, on-site hardware installation, technical support, and full warranty management.",
        },
        {
          q: "How can I order custom configurations from an AI server reseller in {country}?",
          a: "Working with an AI server reseller in {country} allows you to customize your server architecture. You can choose your required GPU density, form factor, enterprise CPU, memory capacity, and storage options directly through our catalog page or by reaching out to our technical team for a personalized quotation.",
        },
        {
          q: "Why should I buy hardware through an established AI server reseller in {country}?",
          a: "Sourcing your high-performance compute nodes from a recognized AI server reseller in {country} ensures 100% genuine hardware directly from top OEMs like Dell, HPE, Supermicro, Lenovo, ASUS, and Gigabyte, backed by warranty protection and responsive support.",
        },
        {
          q: "What brands and GPU platforms are available via an AI server reseller in {country}?",
          a: "We offer full catalog coverage for enterprise platforms including Dell PowerEdge, HPE Cray & ProLiant, Supermicro GPU systems, Lenovo ThinkSystem, Gigabyte G-series, and ASUS acceleration platforms. These systems support enterprise AI accelerators from NVIDIA, AMD, and Intel.",
        },
        {
          q: "How quickly can an AI server reseller in {country} deliver custom server nodes?",
          a: "Custom build lead times depend on hardware specs, but local stock and dedicated supply channels significantly reduce system delivery timelines across the region.",
        },
      ],
      ctaTitle: "Request Your Quote from an AI Server Reseller in {country}",
      ctaText:
        "Ready to scale your high-performance computing infrastructure? Connect with an AI server reseller in {country} today. Get expert hardware guidance, custom configurations, and quick localized pricing.",
    },
    uae: {
      h1: "AI Servers & Platforms: AI Server Reseller and Distributor in UAE",
      catalogTitle: "AI Servers We Supply in UAE",
      catalogNote:
        "Every platform below can be quoted with your preferred GPU count, memory and storage layout. Not sure which fits? Try the [configurator](/configurator).",
      introTitle: "AI Server Reseller and Distributor in UAE",
      intro: [
        "Servchip is an AI server reseller and distributor in the UAE, supplying GPU-accelerated systems from ten manufacturers to companies in Dubai, Abu Dhabi and across the Emirates. Browse the range above, ask for a price on any model, and we handle sourcing, delivery and set-up.",
      ],
      featuresTitle: "",
      features: [],
      advantagesTitle: "",
      advantages: [],
      sections: [
        {
          heading: "Why Work With a Dubai AI Reseller",
          layout: "split",
          intro: [
            "Importing accelerated hardware yourself means customs clearance, VAT paperwork, freight insurance and weeks of uncertainty. A Dubai-based AI reseller absorbs that load. Servchip checks stock with the manufacturer, confirms the exact build, and gives you one point of contact from first enquiry until the rack is powered on.",
            "We also size the hardware to your site, not just your wish list. Before quoting, we look at the number of GPUs your workload needs, rack power draw, cooling capacity and network fabric, so the system you receive actually fits the room it is going into.",
          ],
          sideTitle: "Absorbed by your Dubai reseller",
          sideItems: [
            "Customs clearance",
            "VAT paperwork",
            "Freight insurance",
            "Stock & exact-build confirmation",
          ],
          sideFooter:
            "One point of contact — from first enquiry until the rack is powered on.",
        },
        {
          heading: "AI Server Distributor in UAE: Ten Brands, One Source",
          layout: "cards",
          intro: [
            "As an AI server distributor in UAE, Servchip gives buyers access to Dell Technologies, Hewlett Packard Enterprise, Supermicro, Lenovo, Gigabyte, ASUS, Inspur, Quanta, Foxconn and Wiwynn platforms through a single quotation. That means you can compare an 8-GPU HGX system from one vendor against another without chasing separate sales teams.",
            "Typical configurations include:",
          ],
          bullets: [
            "**Large-model training:** 8-GPU HGX baseboards with H100, H200 or B200 accelerators and high-speed InfiniBand or Ethernet fabrics.",
            "**Inference and fine-tuning:** denser 2U and 4U builds with 4 to 8 accelerators and lower power envelopes.",
            "**General enterprise AI:** dual-socket Intel Xeon or AMD EPYC servers with one to four GPUs for analytics and retrieval workloads.",
          ],
          outro: [
            "Availability changes quickly, so we confirm stock and lead time on every quote. Want to compare accelerators first? Use our [GPU comparison tool](/comparison).",
          ],
        },
        {
          heading: "AI Server Reseller in Dubai: Warranty & Support",
          layout: "grid",
          intro: [
            "Servchip supplies AI servers in Dubai from Dell, HPE, Supermicro, Lenovo, Gigabyte, ASUS, Inspur, Quanta, Foxconn and Wiwynn. Systems arrive with genuine manufacturer warranty, and registration is completed in your company's name. Our operations run under ISO 9001:2015 certified quality management.",
            "What that gives you:",
          ],
          bullets: [
            "**Original factory builds** with serial numbers you can verify on the manufacturer's support portal.",
            "**Pre-delivery checks:** firmware updates, BIOS settings, operating system and GPU driver installation, plus a burn-in test.",
            "**Warranty coordination:** we raise and follow up claims with the vendor on your behalf.",
            "**Supply documentation:** invoices, chain-of-custody records and manufacturer warranty details available on request.",
          ],
        },
        {
          heading: "How to Order an AI Server in Dubai",
          layout: "steps",
          intro: [
            "Ordering from an AI server reseller in Dubai takes four steps:",
          ],
          numbered: [
            "**Tell us the workload.** Training, inference or HPC, model size, and how many GPUs you want.",
            "**Review a shortlist.** We suggest two or three platforms with their trade-offs in price, power and lead time.",
            "**Receive your quote.** Within 24 to 48 hours, with itemised pricing, validity period and delivery terms.",
            "**Delivery and set-up.** Shipment to your facility in the UAE, followed by installation support and handover.",
          ],
          ctaLabel: "Request a quote",
          ctaHref: "/rfq",
        },
      ],
      faqTitle: "AI Server Reseller FAQs",
      faqs: [
        {
          q: "Who is the best AI server reseller in the UAE?",
          a: "The right reseller is one that can document where its hardware comes from, confirm stock, and support you after delivery. Servchip is an ISO 9001:2015 certified distributor supplying ten server brands, offers multi-vendor comparisons in one quote, and provides installation and warranty help to customers across the Emirates.",
        },
        {
          q: "Do you deliver AI servers across Dubai, Abu Dhabi and Sharjah?",
          a: "Yes. We deliver to data centres and offices throughout the UAE, including Dubai, Abu Dhabi, Sharjah and the free zones. Delivery timing and any import or free-zone documentation are confirmed in your quotation, so there are no surprises when the shipment lands.",
        },
        {
          q: "Which NVIDIA GPUs can I get: H100, H200 or B200?",
          a: "Our platforms support NVIDIA H100, H200 and B200 accelerators, depending on the server model. Which one suits you depends on memory needs and budget. For a closer look at the newer architecture, see our [Grace Blackwell platform](/products/nvidia-gb200-grace-blackwell-superchip), then send your workload details and we will recommend a configuration and confirm what is currently available.",
        },
        {
          q: "Do you provide warranty and installation support?",
          a: "Yes. Every server carries the manufacturer's warranty, and we help with firmware, operating system and driver installation before handover. If a fault occurs, our team coordinates the claim with the vendor so you do not have to deal with overseas support queues alone.",
        },
        {
          q: "How do I get a quote for an AI server in Dubai?",
          a: "Use the Request price button on any product, or open the [quote form](/rfq) and describe your project. Tell us the GPU count, workload type and delivery location. We reply with an itemised quotation, normally within 24 to 48 hours.",
        },
        {
          q: "Are you a distributor, or only a reseller?",
          a: "Both. Servchip works as a distributor and reseller across the brands listed above. [Contact us](/contact) for the sourcing details of a specific manufacturer and we will share the supporting documents.",
        },
      ],
      ctaTitle: "Request a Quote for an AI Server in Dubai",
      ctaText:
        "Tell us the GPU count, workload type and delivery location. We reply with an itemised quotation, normally within 24 to 48 hours.",
    },
  },

  // ================= NVIDIA Data Center GPUs =================
  "nvidia-data-center-gpus": {
    global: {
      introTitle:
        "NVIDIA Data Center GPU Distributor in {country} for AI & HPC",
      intro: [
        "Enterprise AI and HPC clusters depend on NVIDIA data center GPUs - H100, H200, B200, B300 and GB200. As a certified NVIDIA supplier in {country}, we provide authentic, warranty-backed GPUs for AI training, inference and high-performance computing.",
      ],
      featuresTitle: "NVIDIA GPU Lines We Distribute",
      features: [
        {
          title: "Flagship AI Training GPUs",
          desc: "H100, H200, B200 and B300 accelerators engineered for large-scale model training and fine-tuning.",
        },
        {
          title: "GB200 & Rack-Scale Systems",
          desc: "NVL72 rack-scale platforms for frontier AI workloads with NVLink fabric.",
        },
        {
          title: "Inference & L40S Series",
          desc: "L40S and L4 GPUs for cost-efficient inference and professional graphics workloads.",
        },
      ],
      advantagesTitle: "Why Buy NVIDIA GPUs from a Distributor in {country}",
      advantages: [
        {
          title: "100% Authentic NVIDIA Hardware",
          desc: "Genuine data center GPUs with full manufacturer warranty and chain-of-custody documentation.",
        },
        {
          title: "Volume Pricing & Allocation",
          desc: "Bulk GPU pricing and allocation support for fast AI cluster scale-up.",
        },
        {
          title: "Local Technical Guidance",
          desc: "Workload-matched GPU selection from certified engineers.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - NVIDIA Data Center GPUs",
      faqs: [
        {
          q: "How can I buy NVIDIA data center GPUs in {country}?",
          a: "Send us your workload requirements through our catalog or RFQ form and our team will share authentic H100, H200, B200 and GB200 pricing with volume options and lead times.",
        },
        {
          q: "Are the NVIDIA GPUs genuine and warrantied?",
          a: "Yes - every GPU is authentic, factory-sealed, covered by manufacturer warranty and shipped with full chain-of-custody documentation.",
        },
        {
          q: "Which NVIDIA GPU is right for my AI workload?",
          a: "For frontier training we recommend B200 or H200-class GPUs, while L40S and L4 suit inference. Tell us your model size and we will match the right platform.",
        },
        {
          q: "Do you support bulk GPU procurement for data centers?",
          a: "Absolutely - we handle volume sourcing and allocation for data centers and cloud providers across the region.",
        },
      ],
      ctaTitle: "Request NVIDIA GPU Pricing in {country}",
      ctaText:
        "Ready to power your AI infrastructure? Get H100, H200, B200 and GB200 pricing from a trusted NVIDIA supplier in {country} today.",
    },
    uae: {
      introTitle:
        "NVIDIA Data Center GPU Distributor in Dubai & UAE for AI & HPC",
      intro: [
        "Enterprise AI and HPC clusters depend on NVIDIA data center GPUs - H100, H200, B200, B300 and GB200. As a certified NVIDIA supplier in Dubai, we provide authentic, warranty-backed GPUs for AI training, inference and high-performance computing across the UAE.",
      ],
      featuresTitle: "NVIDIA GPU Lines We Distribute in Dubai",
      features: [
        {
          title: "Flagship AI Training GPUs",
          desc: "H100, H200, B200 and B300 accelerators engineered for large-scale model training and fine-tuning.",
        },
        {
          title: "GB200 & Rack-Scale Systems",
          desc: "NVL72 rack-scale platforms for frontier AI workloads with NVLink fabric.",
        },
        {
          title: "Inference & L40S Series",
          desc: "L40S and L4 GPUs for cost-efficient inference and professional graphics workloads.",
        },
      ],
      advantagesTitle: "Why Buy NVIDIA GPUs from a Distributor in Dubai & UAE",
      advantages: [
        {
          title: "100% Authentic NVIDIA Hardware",
          desc: "Genuine data center GPUs with full manufacturer warranty and chain-of-custody documentation.",
        },
        {
          title: "Volume Pricing & Allocation",
          desc: "Bulk GPU pricing and allocation support for fast AI cluster scale-up in the UAE.",
        },
        {
          title: "Fast UAE Delivery",
          desc: "Local stock and quick dispatch to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle:
        "Frequently Asked Questions - NVIDIA Data Center GPUs in UAE",
      faqs: [
        {
          q: "How can I buy NVIDIA data center GPUs in Dubai?",
          a: "Send us your workload requirements through our catalog or RFQ form and our team will share authentic H100, H200, B200 and GB200 pricing with volume options and UAE delivery timelines.",
        },
        {
          q: "Are the NVIDIA GPUs genuine and warrantied?",
          a: "Yes - every GPU is authentic, factory-sealed, covered by manufacturer warranty and shipped with full chain-of-custody documentation.",
        },
        {
          q: "Which NVIDIA GPU is right for my AI workload?",
          a: "For frontier training we recommend B200 or H200-class GPUs, while L40S and L4 suit inference. Tell us your model size and we will match the right platform.",
        },
        {
          q: "Do you support bulk GPU procurement for data centers in the UAE?",
          a: "Absolutely - we handle volume sourcing and allocation for data centers and cloud providers across Dubai, Abu Dhabi and the wider GCC.",
        },
      ],
      ctaTitle: "Request NVIDIA GPU Pricing in Dubai & UAE",
      ctaText:
        "Ready to power your AI infrastructure in the UAE? Get H100, H200, B200 and GB200 pricing from a trusted NVIDIA distributor Dubai today.",
    },
  },

  // ================= AMD Instinct =================
  "amd-instinct-accelerators": {
    global: {
      introTitle: "AMD Instinct AI Accelerators Reseller in {country}",
      intro: [
        "AMD Instinct accelerators - MI300X, MI325X and MI350X - deliver leading memory bandwidth for AI training and HPC. As an AMD distributor in {country}, we supply authentic Instinct GPUs for enterprise AI infrastructure.",
      ],
      featuresTitle: "Instinct Platforms We Supply",
      features: [
        {
          title: "MI300X & MI325X",
          desc: "High-bandwidth accelerators for large-model training and inference.",
        },
        {
          title: "MI350X UDNA",
          desc: "Next-generation Instinct platforms built on the unified UDNA architecture.",
        },
        {
          title: "ROCm Software Stack",
          desc: "Open-source ROCm toolchain for portable, vendor-flexible AI stacks.",
        },
      ],
      advantagesTitle: "Why Choose an AMD Instinct Supplier in {country}",
      advantages: [
        {
          title: "Authentic Instinct GPUs",
          desc: "Genuine silicon with full warranty and documented provenance.",
        },
        {
          title: "Cost-Effective AI Compute",
          desc: "High memory-to-compute value for training and inference budgets.",
        },
        {
          title: "Server Integration",
          desc: "Pre-built HPE, Supermicro and Dell platforms populated with Instinct accelerators.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - AMD Instinct",
      faqs: [
        {
          q: "Where can I buy AMD Instinct MI300X in {country}?",
          a: "Contact us through the catalog or RFQ page - we supply authentic MI300X, MI325X and MI350X with volume pricing.",
        },
        {
          q: "Is AMD Instinct good for AI training?",
          a: "Yes - Instinct accelerators pair massive HBM capacity with competitive pricing, making them a strong choice for training and inference at scale.",
        },
        {
          q: "Can you build Instinct-based servers?",
          a: "Yes, we deliver pre-configured Instinct servers with ROCm-ready platforms from HPE, Supermicro and others.",
        },
      ],
      ctaTitle: "Request AMD Instinct Pricing in {country}",
      ctaText:
        "Scale your AI training with authentic AMD Instinct accelerators. Get MI300X, MI325X and MI350X pricing from a trusted supplier in {country} today.",
    },
    uae: {
      introTitle: "AMD Instinct AI Accelerators Reseller in Dubai & UAE",
      intro: [
        "AMD Instinct accelerators - MI300X, MI325X and MI350X - deliver leading memory bandwidth for AI training and HPC. As an AMD distributor in Dubai, we supply authentic Instinct GPUs for enterprise AI infrastructure across the UAE.",
      ],
      featuresTitle: "Instinct Platforms We Supply in Dubai",
      features: [
        {
          title: "MI300X & MI325X",
          desc: "High-bandwidth accelerators for large-model training and inference.",
        },
        {
          title: "MI350X UDNA",
          desc: "Next-generation Instinct platforms built on the unified UDNA architecture.",
        },
        {
          title: "ROCm Software Stack",
          desc: "Open-source ROCm toolchain for portable, vendor-flexible AI stacks.",
        },
      ],
      advantagesTitle: "Why Choose an AMD Instinct Supplier in Dubai",
      advantages: [
        {
          title: "Authentic Instinct GPUs",
          desc: "Genuine silicon with full warranty and documented provenance.",
        },
        {
          title: "Cost-Effective AI Compute",
          desc: "High memory-to-compute value for training and inference budgets.",
        },
        {
          title: "UAE-wide Delivery",
          desc: "Quick GPU delivery to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - AMD Instinct in UAE",
      faqs: [
        {
          q: "Where can I buy AMD Instinct MI300X in Dubai?",
          a: "Contact us through the catalog or RFQ page - we supply authentic MI300X, MI325X and MI350X with volume pricing and UAE delivery.",
        },
        {
          q: "Is AMD Instinct good for AI training?",
          a: "Yes - Instinct accelerators pair massive HBM capacity with competitive pricing, making them a strong choice for training and inference at scale.",
        },
        {
          q: "Can you build Instinct-based servers for the UAE?",
          a: "Yes, we deliver pre-configured Instinct servers with ROCm-ready platforms from HPE, Supermicro and others, ready for deployment across the UAE.",
        },
      ],
      ctaTitle: "Request AMD Instinct Pricing in Dubai & UAE",
      ctaText:
        "Scale your AI training with authentic AMD Instinct accelerators. Get MI300X, MI325X and MI350X pricing from a trusted AMD reseller Dubai today.",
    },
  },

  // ================= Intel Gaudi =================
  "intel-gaudi-ai-accelerators": {
    global: {
      introTitle: "Intel Gaudi AI Accelerators Reseller in {country}",
      intro: [
        "Intel Gaudi 2 and Gaudi 3 accelerators deliver cost-efficient AI training and inference for enterprises. As an Intel AI hardware supplier in {country}, we provide authentic Gaudi platforms with full support.",
      ],
      featuresTitle: "Intel AI Platforms We Supply",
      features: [
        {
          title: "Gaudi 3 Accelerators",
          desc: "High-throughput training and inference with open software ecosystem.",
        },
        {
          title: "Gaudi 2 Systems",
          desc: "Proven cost-efficient accelerators for mainstream AI workloads.",
        },
        {
          title: "Xeon 6 + Gaudi Bundles",
          desc: "Balanced CPU + accelerator configurations powered by Intel Xeon 6.",
        },
      ],
      advantagesTitle: "Why an Intel Gaudi Supplier in {country}",
      advantages: [
        {
          title: "Genuine Intel Silicon",
          desc: "Authentic Gaudi accelerators with manufacturer warranty.",
        },
        {
          title: "Lower Total Cost",
          desc: "Competitive pricing per generated token for AI workloads.",
        },
        {
          title: "Open Software",
          desc: "Flexible deployment with open-source AI stack compatibility.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Intel Gaudi",
      faqs: [
        {
          q: "Where can I buy Intel Gaudi 3 in {country}?",
          a: "Contact our team via the catalog or RFQ page for authentic Gaudi 3 pricing and availability in {country}.",
        },
        {
          q: "Is Gaudi cost-effective for inference?",
          a: "Yes - Gaudi offers strong price-to-performance for both training and inference, especially in open software ecosystems.",
        },
        {
          q: "Do you supply complete Gaudi servers?",
          a: "Yes, we deliver complete Gaudi-based server platforms tuned for training and inference workloads.",
        },
      ],
      ctaTitle: "Request Intel Gaudi Pricing in {country}",
      ctaText:
        "Cut your AI infrastructure costs with Intel Gaudi accelerators. Get Gaudi 3 pricing from a trusted Intel AI hardware supplier in {country} today.",
    },
    uae: {
      introTitle: "Intel Gaudi AI Accelerators Reseller in Dubai & UAE",
      intro: [
        "Intel Gaudi 2 and Gaudi 3 accelerators deliver cost-efficient AI training and inference for enterprises. As an Intel AI hardware supplier in Dubai, we provide authentic Gaudi platforms with full support across the UAE.",
      ],
      featuresTitle: "Intel AI Platforms We Supply in Dubai",
      features: [
        {
          title: "Gaudi 3 Accelerators",
          desc: "High-throughput training and inference with open software ecosystem.",
        },
        {
          title: "Gaudi 2 Systems",
          desc: "Proven cost-efficient accelerators for mainstream AI workloads.",
        },
        {
          title: "Xeon 6 + Gaudi Bundles",
          desc: "Balanced CPU + accelerator configurations powered by Intel Xeon 6.",
        },
      ],
      advantagesTitle: "Why an Intel Gaudi Supplier in Dubai",
      advantages: [
        {
          title: "Genuine Intel Silicon",
          desc: "Authentic Gaudi accelerators with manufacturer warranty.",
        },
        {
          title: "Lower Total Cost",
          desc: "Competitive pricing per generated token for AI workloads.",
        },
        {
          title: "UAE Delivery & Support",
          desc: "Fast delivery to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Intel Gaudi in UAE",
      faqs: [
        {
          q: "Where can I buy Intel Gaudi 3 in Dubai?",
          a: "Contact our team via the catalog or RFQ page for authentic Gaudi 3 pricing and UAE delivery.",
        },
        {
          q: "Is Gaudi cost-effective for inference?",
          a: "Yes - Gaudi offers strong price-to-performance for both training and inference, especially in open software ecosystems.",
        },
        {
          q: "Do you supply complete Gaudi servers in the UAE?",
          a: "Yes, we deliver complete Gaudi-based server platforms tuned for training and inference workloads across the UAE.",
        },
      ],
      ctaTitle: "Request Intel Gaudi Pricing in Dubai & UAE",
      ctaText:
        "Cut your AI infrastructure costs with Intel Gaudi accelerators. Get Gaudi 3 pricing from a trusted Intel AI hardware supplier in Dubai today.",
    },
  },

  // ================= Server CPUs =================
  "server-cpus": {
    global: {
      introTitle: "Enterprise Server CPU Distributor in {country}",
      intro: [
        "From AMD EPYC 9005-series and Intel Xeon 6 to AmpereOne, NVIDIA Grace and Qualcomm, we are a certified server CPU distributor in {country} supplying authentic processors for data centers and cloud providers.",
      ],
      featuresTitle: "Server CPU Lines We Distribute",
      features: [
        {
          title: "AMD EPYC 9005 / 9004",
          desc: "High-core-count Zen 5 and Zen 4 server processors.",
        },
        {
          title: "Intel Xeon 6 / 4th Gen",
          desc: "Performance and efficiency cores for general and AI workloads.",
        },
        {
          title: "Arm & Grace CPUs",
          desc: "AmpereOne and NVIDIA Grace for power-efficient scale-out.",
        },
      ],
      advantagesTitle: "Why Buy Server CPUs from a Distributor in {country}",
      advantages: [
        {
          title: "Genuine, Tray & Box Stock",
          desc: "Authentic retail and tray processors with full warranty.",
        },
        {
          title: "Volume Allocation",
          desc: "Bulk CPU sourcing for OEM and hyperscale projects.",
        },
        {
          title: "Platform Matching",
          desc: "Expert help pairing CPUs with the right motherboards and memory.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Server CPUs",
      faqs: [
        {
          q: "Which server CPUs can I buy in {country}?",
          a: "We supply AMD EPYC, Intel Xeon, AmpereOne, NVIDIA Grace and Qualcomm server processors with genuine sourcing.",
        },
        {
          q: "Do you offer volume pricing for server CPUs?",
          a: "Yes - we provide tiered volume pricing for data centers, OEMs and enterprise deployments.",
        },
        {
          q: "Can you help me choose between EPYC and Xeon?",
          a: "Our engineers match the right platform to your workload, budget and total cost of ownership.",
        },
      ],
      ctaTitle: "Request Server CPU Pricing in {country}",
      ctaText:
        "Build smarter infrastructure with authentic server processors. Get AMD EPYC and Intel Xeon pricing from a trusted CPU distributor in {country} today.",
    },
    uae: {
      introTitle: "Enterprise Server CPU Distributor in Dubai & UAE",
      intro: [
        "From AMD EPYC 9005-series and Intel Xeon 6 to AmpereOne, NVIDIA Grace and Qualcomm, we are a certified server CPU distributor in Dubai supplying authentic processors for data centers and cloud providers across the UAE.",
      ],
      featuresTitle: "Server CPU Lines We Distribute in Dubai",
      features: [
        {
          title: "AMD EPYC 9005 / 9004",
          desc: "High-core-count Zen 5 and Zen 4 server processors.",
        },
        {
          title: "Intel Xeon 6 / 4th Gen",
          desc: "Performance and efficiency cores for general and AI workloads.",
        },
        {
          title: "Arm & Grace CPUs",
          desc: "AmpereOne and NVIDIA Grace for power-efficient scale-out.",
        },
      ],
      advantagesTitle: "Why Buy Server CPUs from a Distributor in Dubai",
      advantages: [
        {
          title: "Genuine, Tray & Box Stock",
          desc: "Authentic retail and tray processors with full warranty.",
        },
        {
          title: "Volume Allocation",
          desc: "Bulk CPU sourcing for OEM and hyperscale projects in the UAE.",
        },
        {
          title: "Fast UAE Delivery",
          desc: "Quick dispatch to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Server CPUs in UAE",
      faqs: [
        {
          q: "Which server CPUs can I buy in Dubai?",
          a: "We supply AMD EPYC, Intel Xeon, AmpereOne, NVIDIA Grace and Qualcomm server processors with genuine sourcing and UAE delivery.",
        },
        {
          q: "Do you offer volume pricing for server CPUs?",
          a: "Yes - we provide tiered volume pricing for data centers, OEMs and enterprise deployments across the UAE.",
        },
        {
          q: "Can you help me choose between EPYC and Xeon?",
          a: "Our engineers match the right platform to your workload, budget and total cost of ownership.",
        },
      ],
      ctaTitle: "Request Server CPU Pricing in Dubai & UAE",
      ctaText:
        "Build smarter infrastructure with authentic server processors. Get AMD EPYC and Intel Xeon pricing from a trusted CPU distributor in Dubai today.",
    },
  },

  // ================= Networking & Interconnects =================
  "networking-interconnects": {
    global: {
      introTitle: "AI Data Center Networking Distributor in {country}",
      intro: [
        "Scale-out AI clusters depend on fast, lossless fabrics. As a networking distributor in {country}, we supply NVIDIA Spectrum-X and Quantum InfiniBand, Broadcom Tomahawk, Marvell Teralynx and Cisco Silicon One for Ethernet and InfiniBand networks.",
      ],
      featuresTitle: "Networking Lines We Distribute",
      features: [
        {
          title: "NVIDIA Spectrum-X & Quantum",
          desc: "Ethernet and InfiniBand switches, plus ConnectX NICs and BlueField DPUs.",
        },
        {
          title: "Broadcom Tomahawk / Jericho",
          desc: "High-capacity Ethernet silicon for AI-scale data centers.",
        },
        {
          title: "Cisco & Marvell",
          desc: "Silicon One routing and Teralynx switching for flexible fabrics.",
        },
      ],
      advantagesTitle: "Why a Networking Partner in {country}",
      advantages: [
        {
          title: "Fabric-Grade Support",
          desc: "Engineers who design, size and troubleshoot AI fabrics.",
        },
        {
          title: "Genuine Networking Silicon",
          desc: "Authentic switches, NICs and DPUs with manufacturer warranty.",
        },
        {
          title: "End-to-End Bundles",
          desc: "Networking paired with GPU servers for turnkey clusters.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Data Center Networking",
      faqs: [
        {
          q: "What networking hardware can I buy in {country}?",
          a: "We supply NVIDIA Spectrum-X and Quantum, Broadcom, Cisco and Marvell switching with ConnectX NICs and BlueField DPUs.",
        },
        {
          q: "How do I scale my AI cluster network?",
          a: "Our engineers help you design Ethernet or InfiniBand fabrics sized for your GPU count and traffic profile.",
        },
        {
          q: "Do you support turnkey cluster delivery?",
          a: "Yes - we bundle networking, servers and cabling for complete AI cluster deployments.",
        },
      ],
      ctaTitle: "Request Networking Pricing in {country}",
      ctaText:
        "Design a lossless AI fabric. Get Spectrum-X, Quantum, Tomahawk and Teralynx pricing from a trusted networking distributor in {country} today.",
    },
    uae: {
      introTitle: "AI Data Center Networking Distributor in Dubai & UAE",
      intro: [
        "Scale-out AI clusters depend on fast, lossless fabrics. As a networking distributor in Dubai, we supply NVIDIA Spectrum-X and Quantum InfiniBand, Broadcom Tomahawk, Marvell Teralynx and Cisco Silicon One for Ethernet and InfiniBand networks across the UAE.",
      ],
      featuresTitle: "Networking Lines We Distribute in Dubai",
      features: [
        {
          title: "NVIDIA Spectrum-X & Quantum",
          desc: "Ethernet and InfiniBand switches, plus ConnectX NICs and BlueField DPUs.",
        },
        {
          title: "Broadcom Tomahawk / Jericho",
          desc: "High-capacity Ethernet silicon for AI-scale data centers.",
        },
        {
          title: "Cisco & Marvell",
          desc: "Silicon One routing and Teralynx switching for flexible fabrics.",
        },
      ],
      advantagesTitle: "Why a Networking Partner in Dubai & UAE",
      advantages: [
        {
          title: "Fabric-Grade Support",
          desc: "Engineers who design, size and troubleshoot AI fabrics.",
        },
        {
          title: "Genuine Networking Silicon",
          desc: "Authentic switches, NICs and DPUs with manufacturer warranty.",
        },
        {
          title: "Fast UAE Delivery",
          desc: "Quick dispatch to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Networking in UAE",
      faqs: [
        {
          q: "What networking hardware can I buy in Dubai?",
          a: "We supply NVIDIA Spectrum-X and Quantum, Broadcom, Cisco and Marvell switching with ConnectX NICs and BlueField DPUs.",
        },
        {
          q: "How do I scale my AI cluster network?",
          a: "Our engineers help you design Ethernet or InfiniBand fabrics sized for your GPU count and traffic profile.",
        },
        {
          q: "Do you support turnkey cluster delivery in the UAE?",
          a: "Yes - we bundle networking, servers and cabling for complete AI cluster deployments across the UAE.",
        },
      ],
      ctaTitle: "Request Networking Pricing in Dubai & UAE",
      ctaText:
        "Design a lossless AI fabric in the UAE. Get Spectrum-X, Quantum, Tomahawk and Teralynx pricing from a trusted networking distributor Dubai today.",
    },
  },

  // ================= AI Memory & HBM =================
  "ai-memory-hbm": {
    global: {
      introTitle: "AI Memory & HBM Distributor in {country}",
      intro: [
        "AI accelerators need the fastest memory on the market. As an AI memory distributor in {country}, we supply HBM3E from SK hynix, Samsung and Micron, plus DDR5 RDIMM, MRDIMM and CXL memory modules for the latest server platforms.",
      ],
      featuresTitle: "Memory Lines We Distribute",
      features: [
        {
          title: "HBM3E Stacks",
          desc: "High-bandwidth memory for NVIDIA, AMD and Intel AI accelerators.",
        },
        {
          title: "DDR5 RDIMM & MRDIMM",
          desc: "Server memory for EPYC, Xeon and Arm platforms.",
        },
        {
          title: "CXL Memory Blocks",
          desc: "Expandable memory pools for capacity- and bandwidth-hungry workloads.",
        },
      ],
      advantagesTitle: "Why an AI Memory Supplier in {country}",
      advantages: [
        {
          title: "Genuine Binned Memory",
          desc: "Authentic HBM and DDR5 modules with manufacturer warranty.",
        },
        {
          title: "Platform Compatibility",
          desc: "Each kit verified against your CPU and motherboard platform.",
        },
        {
          title: "Volume Memory Supply",
          desc: "Bulk modules for data center and high-performance builds.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - AI Memory",
      faqs: [
        {
          q: "Where can I buy HBM3E memory in {country}?",
          a: "Contact us via the catalog or RFQ page - we source HBM3E, DDR5 RDIMM and CXL modules for enterprise builds.",
        },
        {
          q: "Which memory works with my AI server?",
          a: "Share your platform details and our engineers will verify compatible, high-bandwidth memory kits.",
        },
        {
          q: "Can you supply memory for large clusters?",
          a: "Yes - we handle volume memory procurement for data center and HPC deployments.",
        },
      ],
      ctaTitle: "Request AI Memory Pricing in {country}",
      ctaText:
        "Feed your accelerators at full speed. Get HBM3E and DDR5 pricing from a trusted AI memory distributor in {country} today.",
    },
    uae: {
      introTitle: "AI Memory & HBM Distributor in Dubai & UAE",
      intro: [
        "AI accelerators need the fastest memory on the market. As an AI memory distributor in Dubai, we supply HBM3E from SK hynix, Samsung and Micron, plus DDR5 RDIMM, MRDIMM and CXL memory modules for the latest server platforms across the UAE.",
      ],
      featuresTitle: "Memory Lines We Distribute in Dubai",
      features: [
        {
          title: "HBM3E Stacks",
          desc: "High-bandwidth memory for NVIDIA, AMD and Intel AI accelerators.",
        },
        {
          title: "DDR5 RDIMM & MRDIMM",
          desc: "Server memory for EPYC, Xeon and Arm platforms.",
        },
        {
          title: "CXL Memory Blocks",
          desc: "Expandable memory pools for capacity- and bandwidth-hungry workloads.",
        },
      ],
      advantagesTitle: "Why an AI Memory Supplier in Dubai",
      advantages: [
        {
          title: "Genuine Binned Memory",
          desc: "Authentic HBM and DDR5 modules with manufacturer warranty.",
        },
        {
          title: "Platform Compatibility",
          desc: "Each kit verified against your CPU and motherboard platform.",
        },
        {
          title: "Fast UAE Delivery",
          desc: "Quick dispatch to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - AI Memory in UAE",
      faqs: [
        {
          q: "Where can I buy HBM3E memory in Dubai?",
          a: "Contact us via the catalog or RFQ page - we source HBM3E, DDR5 RDIMM and CXL modules for enterprise builds with UAE delivery.",
        },
        {
          q: "Which memory works with my AI server?",
          a: "Share your platform details and our engineers will verify compatible, high-bandwidth memory kits.",
        },
        {
          q: "Can you supply memory for large clusters in the UAE?",
          a: "Yes - we handle volume memory procurement for data center and HPC deployments across the UAE.",
        },
      ],
      ctaTitle: "Request AI Memory Pricing in Dubai & UAE",
      ctaText:
        "Feed your accelerators at full speed. Get HBM3E and DDR5 pricing from a trusted AI memory distributor in Dubai today.",
    },
  },

  // ================= Enterprise Storage =================
  "enterprise-storage": {
    global: {
      introTitle: "Enterprise NVMe SSD Distributor in {country}",
      intro: [
        "AI and cloud workloads need high-throughput, low-latency storage. As an enterprise storage distributor in {country}, we supply NVMe SSDs from Samsung, Micron, Solidigm, Kioxia, WD and Seagate for data center and high-performance builds.",
      ],
      featuresTitle: "Storage Lines We Distribute",
      features: [
        {
          title: "Enterprise NVMe SSDs",
          desc: "U.2, E3.S and E1.S drives for AI and cloud data platforms.",
        },
        {
          title: "High-Capacity QLC & TLC",
          desc: "Balanced capacity and endurance for hot and warm data tiers.",
        },
        {
          title: "Data Center Hard Drives",
          desc: "High-capacity HDDs for bulk and archive storage.",
        },
      ],
      advantagesTitle: "Why an Enterprise Storage Partner in {country}",
      advantages: [
        {
          title: "Genuine Data Center Drives",
          desc: "Authentic enterprise SSDs and HDDs with full warranty.",
        },
        {
          title: "Firmware & Compatibility Support",
          desc: "Verified drive compatibility with leading server platforms.",
        },
        {
          title: "Bulk Storage Supply",
          desc: "Volume procurement for storage and AI projects.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Enterprise Storage",
      faqs: [
        {
          q: "Which enterprise SSDs can I buy in {country}?",
          a: "We supply Samsung, Micron, Solidigm, Kioxia, WD and Seagate NVMe SSDs for data center workloads.",
        },
        {
          q: "Do you help with capacity planning?",
          a: "Yes - our engineers help size storage tiers for training data, checkpoints and inference caching.",
        },
        {
          q: "Can you supply storage for large clusters?",
          a: "Yes - we handle volume NVMe and HDD procurement for storage and AI platforms.",
        },
      ],
      ctaTitle: "Request Enterprise Storage Pricing in {country}",
      ctaText:
        "Keep your data plane fast. Get NVMe SSD pricing from a trusted enterprise storage distributor in {country} today.",
    },
    uae: {
      introTitle: "Enterprise NVMe SSD Distributor in Dubai & UAE",
      intro: [
        "AI and cloud workloads need high-throughput, low-latency storage. As an enterprise storage distributor in Dubai, we supply NVMe SSDs from Samsung, Micron, Solidigm, Kioxia, WD and Seagate for data center and high-performance builds across the UAE.",
      ],
      featuresTitle: "Storage Lines We Distribute in Dubai",
      features: [
        {
          title: "Enterprise NVMe SSDs",
          desc: "U.2, E3.S and E1.S drives for AI and cloud data platforms.",
        },
        {
          title: "High-Capacity QLC & TLC",
          desc: "Balanced capacity and endurance for hot and warm data tiers.",
        },
        {
          title: "Data Center Hard Drives",
          desc: "High-capacity HDDs for bulk and archive storage.",
        },
      ],
      advantagesTitle: "Why an Enterprise Storage Partner in Dubai",
      advantages: [
        {
          title: "Genuine Data Center Drives",
          desc: "Authentic enterprise SSDs and HDDs with full warranty.",
        },
        {
          title: "Firmware & Compatibility Support",
          desc: "Verified drive compatibility with leading server platforms.",
        },
        {
          title: "Fast UAE Delivery",
          desc: "Quick dispatch to Dubai, Abu Dhabi and all Emirates.",
        },
      ],
      faqTitle: "FAQ",
      faqSubtitle: "Frequently Asked Questions - Enterprise Storage in UAE",
      faqs: [
        {
          q: "Which enterprise SSDs can I buy in Dubai?",
          a: "We supply Samsung, Micron, Solidigm, Kioxia, WD and Seagate NVMe SSDs for data center workloads with UAE delivery.",
        },
        {
          q: "Do you help with capacity planning?",
          a: "Yes - our engineers help size storage tiers for training data, checkpoints and inference caching.",
        },
        {
          q: "Can you supply storage for large clusters in the UAE?",
          a: "Yes - we handle volume NVMe and HDD procurement for storage and AI platforms across the UAE.",
        },
      ],
      ctaTitle: "Request Enterprise Storage Pricing in Dubai & UAE",
      ctaText:
        "Keep your data plane fast. Get NVMe SSD pricing from a trusted enterprise storage distributor in Dubai today.",
    },
  },
};
