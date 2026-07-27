import { SITE, SCHEMA } from "./constants";

export const OG_IMAGE = `${SITE.url}/og-image.png`;
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

const ORG_ID = `${SITE.url}#organization`;

export function organizationSchema() {
  return jsonLd({
    "@type": ["Organization", "LocalBusiness"],
    "@id": ORG_ID,
    name: SITE.companyName,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    description: SITE.defaultDescription,
    foundingDate: "2018",
    telephone: SITE.phone,
    email: SITE.email,
    priceRange: "$$$",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: SITE.phone,
      contactType: "sales",
      email: SITE.email,
      availableLanguage: ["English"],
    },
    address: [SITE.addresses.indiaStructured, SITE.addresses.uaeStructured],
    areaServed: [
      {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "IN" },
      },
      {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "AE" },
      },
      {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "US" },
      },
      {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "SG" },
      },
      {
        "@type": "Place",
        address: { "@type": "PostalAddress", addressCountry: "DE" },
      },
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
    sameAs: Object.values(SITE.social),
  });
}

export function localBusinessSchema() {
  return null;
}

export function websiteSchema() {
  return jsonLd({
    "@type": "WebSite",
    "@id": `${SITE.url}#website`,
    name: SITE.name,
    url: SITE.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/products?q={search_term_string}`,
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        valueRequired: true,
        valueName: "search_term_string",
      },
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
  return jsonLd({
    "@type": "Product",
    "@id": `${SITE.url}/products/${product.slug}#product`,
    name: product.name,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: product.manufacturer },
    manufacturer: { "@type": "Organization", name: product.manufacturer },
    category: product.categoryName,
    url: `${SITE.url}/products/${product.slug}`,
    image: product.images?.[0] || `${SITE.url}/og-image.png`,
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      "@id": `${SITE.url}/products/${product.slug}#offer`,
      url: `${SITE.url}/products/${product.slug}`,
      price: "0",
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "CompoundPriceSpecification",
        description: "Contact us for pricing — Request a Quote",
      },
      availability:
        SCHEMA.availabilityMap[
          product.status as keyof typeof SCHEMA.availabilityMap
        ] ?? "https://schema.org/InStock",
      seller: SCHEMA.seller,
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
    "@id": `${SITE.url}/blog/${post.slug}#article`,
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
      "@id": ORG_ID,
      name: SITE.companyName,
      url: SITE.url,
      logo: { "@type": "ImageObject", url: `${SITE.url}/favicon.svg` },
    },
    ...(post.image
      ? {
          image: {
            "@type": "ImageObject",
            url: post.image,
            width: OG_WIDTH,
            height: OG_HEIGHT,
          },
        }
      : {}),
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
        provider: { "@type": "Organization", name: SITE.companyName },
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
      name: SITE.companyName,
      telephone: SITE.phone,
      email: SITE.email,
      address: SITE.addresses.indiaStructured,
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
