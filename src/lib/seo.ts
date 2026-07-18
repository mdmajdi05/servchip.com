import { SITE } from "./constants";

export const OG_IMAGE = "/og-image.png";
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

export function jsonLd(script: Record<string, unknown>) {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      ...script,
    }),
  };
}

export function organizationSchema() {
  return jsonLd({
    "@type": "Organization",
    name: "Servchip Inc.",
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    description:
      "ISO 9001 certified enterprise chip distributor supplying NVIDIA H100, AMD Instinct MI300X, Intel Xeon & Gaudi 3 accelerators. Authorized distribution partner for AI, HPC & data center hardware.",
    foundingDate: "2018",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["English"],
    },
    address: [
      {
        "@type": "PostalAddress",
        streetAddress:
          "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110044",
        addressCountry: "IN",
      },
      {
        "@type": "PostalAddress",
        streetAddress: "Business Centre, Sharjah Publishing City Free Zone",
        addressLocality: "Sharjah",
        addressCountry: "AE",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/servchip",
      "https://twitter.com/servchip",
      "https://facebook.com/servchip",
      "https://youtube.com/@servchip",
      "https://instagram.com/servchip",
    ],
  });
}

export function localBusinessSchema() {
  return jsonLd({
    "@type": "LocalBusiness",
    name: "Servchip Inc.",
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    description:
      "ISO 9001 certified enterprise chip distributor — NVIDIA, AMD, Intel authorized partner. Enterprise chip sourcing, semiconductor procurement & data center hardware.",
    telephone: SITE.phone,
    email: SITE.email,
    foundingDate: "2018",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110044",
      addressCountry: "IN",
    },
    areaServed: [
      { "@type": "Country", name: "India" },
      { "@type": "Country", name: "United Arab Emirates" },
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Singapore" },
      { "@type": "Country", name: "Germany" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Enterprise Chips & AI Accelerators",
      itemListElement: [
        { "@type": "OfferCatalog", name: "AI Accelerators", numberOfItems: 20 },
        { "@type": "OfferCatalog", name: "Server CPUs", numberOfItems: 15 },
        { "@type": "OfferCatalog", name: "AI Servers", numberOfItems: 25 },
        { "@type": "OfferCatalog", name: "Networking", numberOfItems: 10 },
        {
          "@type": "OfferCatalog",
          name: "Memory & Storage",
          numberOfItems: 20,
        },
      ],
    },
  });
}

export function websiteSchema() {
  return jsonLd({
    "@type": "WebSite",
    name: "Servchip",
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  });
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return jsonLd({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.url}`,
    })),
  });
}

export function productSchema(product: {
  name: string;
  description: string;
  id: string;
  manufacturer: string;
  categoryName: string;
  slug: string;
  images?: string[];
  status: string;
}) {
  const availabilityMap: Record<string, string> = {
    in_stock: "https://schema.org/InStock",
    on_order: "https://schema.org/PreOrder",
    limited: "https://schema.org/LimitedAvailability",
    pre_order: "https://schema.org/PreOrder",
    discontinued: "https://schema.org/Discontinued",
  };

  return jsonLd({
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: product.manufacturer },
    manufacturer: { "@type": "Organization", name: product.manufacturer },
    category: product.categoryName,
    url: `${SITE.url}/products/${product.slug}`,
    ...(product.images && product.images.length > 0
      ? { image: product.images[0] }
      : {}),
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      url: `${SITE.url}/products/${product.slug}`,
      availability:
        availabilityMap[product.status] ?? "https://schema.org/InStock",
      priceCurrency: "USD",
      price: "0",
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      seller: { "@type": "Organization", name: "Servchip Inc." },
    },
  });
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author: { name: string; url?: string };
  image?: string;
  category?: string;
}) {
  return jsonLd({
    "@type": "Article",
    headline: post.title,
    description: post.description,
    url: `${SITE.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      ...(post.author.url ? { url: post.author.url } : {}),
    },
    publisher: {
      "@type": "Organization",
      name: "Servchip Inc.",
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/favicon.svg` },
    },
    ...(post.image ? { image: post.image } : {}),
    ...(post.category ? { articleSection: post.category } : {}),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
  });
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return jsonLd({
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  });
}

export function serviceSchema(
  services: {
    name: string;
    description: string;
    url: string;
  }[],
) {
  return jsonLd({
    "@type": "ItemList",
    name: "Servchip Enterprise Hardware Services",
    description:
      "End-to-end enterprise chip services — semiconductor procurement, custom hardware sourcing, system integration, AI infrastructure consulting, and enterprise support.",
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        url: `${SITE.url}${s.url}`,
        provider: { "@type": "Organization", name: "Servchip Inc." },
      },
    })),
  });
}

export function contactPageSchema() {
  return jsonLd({
    "@type": "ContactPage",
    name: "Contact Servchip — Enterprise Chip Distributor",
    url: `${SITE.url}/contact`,
    mainEntity: {
      "@type": "Organization",
      name: "Servchip Inc.",
      telephone: SITE.phone,
      email: SITE.email,
      address: {
        "@type": "PostalAddress",
        streetAddress:
          "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate",
        addressLocality: "New Delhi",
        addressRegion: "Delhi",
        postalCode: "110044",
        addressCountry: "IN",
      },
    },
  });
}

export function itemListSchema(
  items: {
    name: string;
    url: string;
    description?: string;
    image?: string;
  }[],
) {
  return jsonLd({
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: `${SITE.url}${item.url}`,
      ...(item.description ? { description: item.description } : {}),
      ...(item.image ? { image: item.image } : {}),
    })),
  });
}
