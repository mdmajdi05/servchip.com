import type { Country } from "@/types";

export const COUNTRIES: Country[] = [
  {
    id: "india",
    name: "India",
    slug: "india",
    code: "in",
    flag: "🇮🇳",
    region: "South Asia",
    description:
      "Enterprise AI chips, GPUs and data center hardware for India's fastest-growing AI infrastructure market.",
    longDescription:
      "Servchip supplies enterprise AI accelerators, data center GPUs, server CPUs and networking hardware to enterprises across India. From New Delhi to Bengaluru, we help Indian data centers, research institutions and enterprises deploy world-class AI infrastructure with authentic, fully warrantied hardware.",
    hero: {
      label: "India",
      title: "Enterprise AI Hardware for India",
      subtitle:
        "NVIDIA, AMD, Intel & server platforms delivered across India with authentic sourcing, full warranty and dedicated local support.",
    },
    faqs: [
      {
        question: "Do you deliver AI chips across India?",
        answer:
          "Yes. Servchip ships enterprise AI hardware to all major Indian cities including New Delhi, Mumbai, Bengaluru, Hyderabad, Chennai and Pune, with DDP delivery and full warranty support.",
      },
      {
        question: "Are your chips authentic and under warranty?",
        answer:
          "Every chip is sourced from manufacturers or authorized distribution partners, with full chain of custody documentation, serial number traceability and manufacturer warranty.",
      },
      {
        question: "Can you help with GST invoicing for Indian enterprises?",
        answer:
          "Yes. We provide proper GST-compliant tax invoices for all purchases by Indian enterprises, startups and research institutions.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "150+", label: "Indian enterprises served" },
      { value: "50+", label: "Cities with delivery" },
      { value: "24h", label: "Quote turnaround" },
    ],
  },
  {
    id: "uae",
    name: "United Arab Emirates",
    slug: "uae",
    code: "ae",
    flag: "🇦🇪",
    region: "Middle East",
    description:
      "Enterprise chip distribution and AI infrastructure supply across the UAE — Dubai, Abu Dhabi & Sharjah.",
    longDescription:
      "Servchip is a leading AI chip distributor in the UAE, supplying NVIDIA, AMD and Intel accelerators to data centers, sovereign AI programs and enterprises in Dubai, Abu Dhabi and Sharjah. With our Sharjah free zone operations, we deliver fast across the GCC with full customs clearance.",
    hero: {
      label: "UAE",
      title: "AI Accelerators Delivered Across the UAE",
      subtitle:
        "Enterprise GPU and AI chip supply for Dubai, Abu Dhabi & the wider GCC — fast delivery, authentic sourcing.",
    },
    faqs: [
      {
        question: "Do you ship AI chips to Dubai and Abu Dhabi?",
        answer:
          "Yes. We deliver NVIDIA, AMD and Intel enterprise hardware to Dubai, Abu Dhabi, Sharjah and across the UAE, usually within 3-7 days from our Sharjah free zone location.",
      },
      {
        question: "Can you handle customs clearance in the UAE?",
        answer:
          "Yes. We handle full customs clearance and provide DDP delivery for UAE and GCC customers, so your hardware arrives ready to deploy.",
      },
      {
        question: "Do you support sovereign AI data center projects?",
        answer:
          "Yes. Servchip supplies accelerators and full racks for UAE sovereign AI and data center programs with complete documentation and local support.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "hpe", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "networking",
        "enterprise-storage",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "3-7 days", label: "GCC delivery time" },
      { value: "100%", label: "Customs clearance handled" },
      { value: "24/7", label: "Local support" },
    ],
  },
  {
    id: "usa",
    name: "United States",
    slug: "usa",
    code: "us",
    flag: "🇺🇸",
    region: "North America",
    description:
      "Enterprise AI chip procurement for US data centers, cloud providers and research labs.",
    longDescription:
      "Servchip provides US enterprises, cloud service providers and research organizations with authentic NVIDIA, AMD and Intel accelerators, server CPUs, networking and memory. As an ISO 9001 certified distributor, we deliver full chain-of-custody documentation and compliance with US export regulations.",
    hero: {
      label: "USA",
      title: "Enterprise AI Hardware for the United States",
      subtitle:
        "Authentic NVIDIA, AMD & Intel accelerators for US data centers, CSPs and research institutions.",
    },
    faqs: [
      {
        question: "Do you supply AI chips to US data centers?",
        answer:
          "Yes. We supply NVIDIA, AMD and Intel accelerators to US data centers, cloud providers and enterprises with full compliance and documentation.",
      },
      {
        question: "Do you handle export compliance?",
        answer:
          "Yes. All shipments are processed with strict adherence to US export regulations and we provide complete documentation for compliance teams.",
      },
      {
        question: "What warranty do products carry?",
        answer:
          "All products carry full manufacturer warranty with serial number traceability and chain of custody certificates.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "ai-memory",
      ],
      useCases: ["ai-training", "ai-inference", "hpc", "data-analytics"],
    },
    stats: [
      { value: "50+", label: "US states served" },
      { value: "99.9%", label: "On-time delivery" },
      { value: "ISO 9001", label: "Certified distributor" },
    ],
  },
  {
    id: "saudi-arabia",
    name: "Saudi Arabia",
    slug: "saudi-arabia",
    code: "sa",
    flag: "🇸🇦",
    region: "Middle East",
    description:
      "AI chip supply for Saudi Arabia's Vision 2030 data center and sovereign AI initiatives.",
    longDescription:
      "Servchip supports Saudi Arabia's Vision 2030 digital transformation with enterprise AI hardware supply. We deliver NVIDIA, AMD and Intel accelerators for NEOM, smart-city, healthcare and government AI programs across Riyadh, Jeddah and Dammam.",
    hero: {
      label: "Saudi Arabia",
      title: "AI Hardware for Saudi Arabia's Vision 2030",
      subtitle:
        "Enterprise accelerators for sovereign AI, smart cities and government programs across the Kingdom.",
    },
    faqs: [
      {
        question: "Do you support Saudi Vision 2030 projects?",
        answer:
          "Yes. We supply AI accelerators and full data center infrastructure for Vision 2030 initiatives including NEOM, smart cities and sovereign AI programs.",
      },
      {
        question: "Can you deliver to Riyadh and Jeddah?",
        answer:
          "Yes. We deliver enterprise AI hardware across Saudi Arabia including Riyadh, Jeddah and Dammam with full customs clearance.",
      },
      {
        question: "Do you offer government procurement support?",
        answer:
          "Yes. We support government procurement with full documentation, compliance and delivery to government data centers.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "hpe", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "networking",
        "enterprise-storage",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "Vision 2030", label: "Aligned programs" },
      { value: "100%", label: "Customs handled" },
      { value: "5 cities", label: "Delivery coverage" },
    ],
  },
  {
    id: "qatar",
    name: "Qatar",
    slug: "qatar",
    code: "qa",
    flag: "🇶🇦",
    region: "Middle East",
    description:
      "Enterprise AI and HPC hardware supply for Qatar's research and data center ecosystem.",
    longDescription:
      "Servchip supplies AI accelerators and HPC hardware to Qatar's research institutions, universities and enterprises. From the Qatar Computing Research Institute to commercial data centers, we deliver authentic enterprise hardware with full support.",
    hero: {
      label: "Qatar",
      title: "AI & HPC Hardware for Qatar",
      subtitle:
        "Enterprise accelerators and research computing hardware delivered across Qatar.",
    },
    faqs: [
      {
        question: "Do you supply HPC hardware to Qatari research institutions?",
        answer:
          "Yes. We supply NVIDIA and AMD accelerators to Qatar's universities and research institutions, including HPC clusters and AI research infrastructure.",
      },
      {
        question: "Can you deliver to Doha?",
        answer:
          "Yes. We deliver enterprise AI hardware to Doha and across Qatar with full customs clearance and local coordination.",
      },
      {
        question: "Do you support academic and research pricing?",
        answer:
          "Yes. We work with universities and research institutions across Qatar to deliver cost-effective AI infrastructure solutions.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["hpc", "ai-training", "ai-inference"],
    },
    stats: [
      { value: "HPC", label: "Research-grade hardware" },
      { value: "100%", label: "Authentic sourcing" },
      { value: "Fast", label: "Doha delivery" },
    ],
  },
  {
    id: "oman",
    name: "Oman",
    slug: "oman",
    code: "om",
    flag: "🇴🇲",
    region: "Middle East",
    description:
      "Enterprise AI infrastructure supply for Oman's growing technology and data center sector.",
    longDescription:
      "Servchip supplies enterprise AI chips and data center hardware to Oman's emerging technology sector. We support Omani enterprises, telecom operators and government agencies in Muscat and beyond with authentic, warrantied AI infrastructure.",
    hero: {
      label: "Oman",
      title: "Enterprise AI Infrastructure for Oman",
      subtitle:
        "Authentic NVIDIA, AMD & Intel hardware for Oman's data centers and enterprises.",
    },
    faqs: [
      {
        question: "Do you deliver AI hardware to Muscat?",
        answer:
          "Yes. We deliver NVIDIA, AMD and Intel enterprise hardware to Muscat and across Oman with full customs clearance.",
      },
      {
        question: "Do you support telecom and government projects?",
        answer:
          "Yes. We supply AI infrastructure for Omani telecom operators, government agencies and enterprises with full documentation.",
      },
      {
        question: "Are products authentic and warrantied?",
        answer:
          "Yes. All hardware is authentic, factory-sealed and covered by manufacturer warranty with complete chain of custody documentation.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "dell", "hpe"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "networking",
        "enterprise-storage",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "100%", label: "Authentic hardware" },
      { value: "Nationwide", label: "Delivery coverage" },
      { value: "24/7", label: "Support" },
    ],
  },
  {
    id: "singapore",
    name: "Singapore",
    slug: "singapore",
    code: "sg",
    flag: "🇸🇬",
    region: "Southeast Asia",
    description:
      "Enterprise NVIDIA, AMD & Intel AI chip distribution for Singapore's data center and semiconductor hub.",
    longDescription:
      "Servchip supplies NVIDIA, AMD and Intel AI accelerators to Singapore's data centers, cloud providers, fintech and semiconductor ecosystem. As an enterprise chip distributor, we deliver authentic, warrantied hardware to Singapore with fast regional turnaround and full documentation.",
    hero: {
      label: "Singapore",
      title: "Enterprise AI Hardware for Singapore",
      subtitle:
        "NVIDIA, AMD & Intel accelerators delivered to Singapore data centers and enterprises with authentic sourcing and fast delivery.",
    },
    faqs: [
      {
        question: "Do you supply NVIDIA AI chips to Singapore?",
        answer:
          "Yes. Servchip is an enterprise chip distributor supplying NVIDIA H100, H200, B200 and AMD Instinct accelerators to Singapore data centers, cloud providers and enterprises.",
      },
      {
        question: "How fast is delivery to Singapore?",
        answer:
          "We deliver enterprise AI hardware to Singapore typically within 3-5 days, leveraging our regional logistics network with full customs clearance.",
      },
      {
        question: "Are products authentic and under warranty?",
        answer:
          "Yes. Every chip is authentic, factory-sealed and covered by manufacturer warranty with complete chain of custody documentation.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "3-5 days", label: "Delivery to Singapore" },
      { value: "100%", label: "Authentic hardware" },
      { value: "ISO 9001", label: "Certified distributor" },
    ],
  },
  {
    id: "malaysia",
    name: "Malaysia",
    slug: "malaysia",
    code: "my",
    flag: "🇲🇾",
    region: "Southeast Asia",
    description:
      "NVIDIA, AMD & Intel enterprise AI chip supply for Malaysia's data center and semiconductor manufacturing sector.",
    longDescription:
      "Servchip distributes enterprise NVIDIA, AMD and Intel accelerators to Malaysia's data centers, enterprises and semiconductor ecosystem in Kuala Lumpur, Penang and beyond. We deliver authentic, warrantied AI hardware with full support across Malaysia.",
    hero: {
      label: "Malaysia",
      title: "Enterprise AI Chips Delivered Across Malaysia",
      subtitle:
        "Authentic NVIDIA, AMD & Intel accelerators for Malaysian data centers, enterprises and research institutions.",
    },
    faqs: [
      {
        question: "Do you supply NVIDIA AI chips to Malaysia?",
        answer:
          "Yes. Servchip is an enterprise chip distributor supplying NVIDIA H100, H200, B200 and Intel Gaudi accelerators to Malaysian data centers and enterprises.",
      },
      {
        question: "Do you deliver to Kuala Lumpur and Penang?",
        answer:
          "Yes. We deliver enterprise AI hardware to Kuala Lumpur, Penang and across Malaysia with full customs clearance and local coordination.",
      },
      {
        question: "Can you support semiconductor and data center projects?",
        answer:
          "Yes. We support Malaysian data center builds, semiconductor projects and research institutions with authentic, warrantied hardware and technical guidance.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "dell", "hpe"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "server-cpus",
        "networking",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "KL & Penang", label: "Delivery coverage" },
      { value: "100%", label: "Authentic hardware" },
      { value: "24/7", label: "Support" },
    ],
  },
  {
    id: "china",
    name: "China",
    slug: "china",
    code: "cn",
    flag: "🇨🇳",
    region: "East Asia",
    description:
      "Enterprise AI accelerator sourcing for Chinese data centers and sovereign AI initiatives.",
    longDescription:
      "Servchip supports enterprise AI infrastructure buyers in China with NVIDIA, AMD and Intel accelerators and data center hardware. We serve Chinese data centers and enterprises with authentic sourcing, compliance documentation and dedicated support.",
    hero: {
      label: "China",
      title: "Enterprise AI Accelerators for China",
      subtitle:
        "Authentic NVIDIA, AMD & Intel hardware for Chinese data centers and enterprises with compliance support.",
    },
    faqs: [
      {
        question: "Do you supply AI chips to enterprises in China?",
        answer:
          "Yes. Servchip distributes enterprise NVIDIA, AMD and Intel accelerators to Chinese data centers and enterprises with compliance documentation.",
      },
      {
        question: "Do you handle export compliance for China?",
        answer:
          "Yes. All shipments are processed with strict adherence to applicable export regulations and we provide complete documentation for compliance teams.",
      },
      {
        question: "Are products authentic and under warranty?",
        answer:
          "Yes. Every chip is authentic, factory-sealed and covered by manufacturer warranty with serial number traceability.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "Compliance", label: "Handled & documented" },
      { value: "100%", label: "Authentic hardware" },
      { value: "Enterprise", label: "Data center focus" },
    ],
  },
  {
    id: "philippines",
    name: "Philippines",
    slug: "philippines",
    code: "ph",
    flag: "🇵🇭",
    region: "Southeast Asia",
    description:
      "NVIDIA, AMD & Intel AI chip distribution for the Philippines' growing data center and enterprise market.",
    longDescription:
      "Servchip supplies NVIDIA, AMD and Intel AI accelerators to data centers and enterprises across the Philippines. From Manila to Cebu, we deliver authentic, warrantied enterprise hardware with fast regional shipping and dedicated support.",
    hero: {
      label: "Philippines",
      title: "Enterprise AI Hardware for the Philippines",
      subtitle:
        "Authentic NVIDIA, AMD & Intel accelerators delivered to Philippine data centers and enterprises.",
    },
    faqs: [
      {
        question: "Do you supply AI chips to the Philippines?",
        answer:
          "Yes. Servchip is an enterprise chip distributor supplying NVIDIA, AMD and Intel accelerators to Philippine data centers and enterprises.",
      },
      {
        question: "Do you deliver to Manila and Cebu?",
        answer:
          "Yes. We deliver enterprise AI hardware to Manila, Cebu and across the Philippines with full customs clearance.",
      },
      {
        question: "Are products authentic and under warranty?",
        answer:
          "Yes. Every chip is authentic, factory-sealed and covered by manufacturer warranty with complete documentation.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "networking",
        "server-cpus",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "Manila & Cebu", label: "Delivery coverage" },
      { value: "100%", label: "Authentic hardware" },
      { value: "Fast", label: "Regional shipping" },
    ],
  },
  {
    id: "united-kingdom",
    name: "United Kingdom",
    slug: "united-kingdom",
    code: "uk",
    flag: "🇬🇧",
    region: "Europe",
    description:
      "Enterprise AI accelerators, GPUs and data center hardware for UK data centers, universities and research institutions.",
    longDescription:
      "Servchip supplies enterprise AI accelerators, data center GPUs and HPC hardware to the United Kingdom. From London's enterprise data centers to Cambridge and Oxford research institutions, we deliver authentic, fully warrantied NVIDIA, AMD and Intel hardware with full EU/UK compliance and documentation.",
    hero: {
      label: "United Kingdom",
      title: "Enterprise AI Hardware for the United Kingdom",
      subtitle:
        "NVIDIA, AMD & Intel accelerators delivered across the UK with authentic sourcing, full warranty and local support.",
    },
    faqs: [
      {
        question: "Do you deliver AI chips across the UK?",
        answer:
          "Yes. Servchip ships enterprise AI hardware across the United Kingdom including London, Manchester, Cambridge and Edinburgh with DDP delivery and full warranty support.",
      },
      {
        question: "Are your chips authentic and under warranty?",
        answer:
          "Every chip is sourced from manufacturers or authorized distribution partners, with full chain of custody documentation, serial number traceability and manufacturer warranty.",
      },
      {
        question: "Do you support research institutions and universities?",
        answer:
          "Yes. We support universities and research institutions across the UK with procurement, compliance and delivery for HPC and AI research infrastructure.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "server-cpus",
        "ai-servers",
        "networking",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "8+", label: "Cities served" },
      { value: "100%", label: "UK/EU compliance" },
      { value: "ISO 9001", label: "Certified distributor" },
    ],
  },
  {
    id: "germany",
    name: "Germany",
    slug: "germany",
    code: "de",
    flag: "🇩🇪",
    region: "Europe",
    description:
      "Enterprise AI and HPC hardware supply for German data centers, automotive and industrial AI programs.",
    longDescription:
      "Servchip supplies AI accelerators and HPC infrastructure to Germany's enterprise data centers, automotive R&D and industrial AI programs. From Frankfurt's data-center hub to Munich's engineering ecosystem, we deliver authentic NVIDIA, AMD and Intel hardware with full EU compliance.",
    hero: {
      label: "Germany",
      title: "AI Hardware for Germany's Data Centers & Industry",
      subtitle:
        "Enterprise accelerators for German data centers, automotive R&D and industrial AI across Frankfurt, Berlin and Munich.",
    },
    faqs: [
      {
        question: "Do you deliver AI chips across Germany?",
        answer:
          "Yes. Servchip delivers enterprise AI hardware across Germany including Frankfurt, Berlin, Munich and Hamburg with full EU compliance and documentation.",
      },
      {
        question: "Do you support automotive and industrial AI programs?",
        answer:
          "Yes. We support German automotive R&D and industrial AI programs with procurement, compliance and delivery for training and inference infrastructure.",
      },
      {
        question: "Are products authentic and under warranty?",
        answer:
          "Every chip is authentic, factory-sealed and covered by manufacturer warranty with complete chain-of-custody documentation.",
      },
    ],
    related: {
      brandIds: ["nvidia", "amd", "intel", "supermicro", "dell"],
      categoryIds: [
        "nvidia-dc-gpus",
        "amd-instinct",
        "ai-servers",
        "networking",
        "server-cpus",
      ],
      useCases: ["ai-training", "ai-inference", "hpc"],
    },
    stats: [
      { value: "Frankfurt", label: "EU data-center hub" },
      { value: "100%", label: "EU compliance" },
      { value: "12+", label: "Cities served" },
    ],
  },
];

export function getCountryBySlug(slug: string): Country | undefined {
  return COUNTRIES.find((c) => c.slug === slug);
}

export function getCountryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export function getCountryPath(country: Country): string {
  return `/${country.code}`;
}

export function getCountry(id: string): Country | undefined {
  return COUNTRIES.find((c) => c.id === id);
}
