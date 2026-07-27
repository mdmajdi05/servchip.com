export const SITE = {
  name: "Servchip",
  companyName: "Servchip Inc.",
  tagline: "Powering the Future of AI Computing",
  email: "sales@servchip.com",
  phone: "+91 7982498712",
  phoneLink: "+917982498712",
  url: "https://servchip.com",
  defaultTitle:
    "Enterprise Chip Distributor | NVIDIA, AMD & Intel AI Chips | Servchip",
  defaultDescription:
    "ISO 9001 certified enterprise chip distributor supplying NVIDIA H100/H200/B200, AMD Instinct MI300X, Intel Xeon & Gaudi 3. Buy AI accelerators with fast shipping from India & UAE to 150+ countries.",
  defaultKeywords: [
    "enterprise chip distributor",
    "buy AI chips",
    "NVIDIA H100 distributor India",
    "NVIDIA GPU supplier UAE",
    "AMD Instinct distributor",
    "semiconductor procurement",
    "data center GPU distributor",
    "AI accelerator distributor UAE",
    "HBM memory supplier",
    "GPU server supplier India",
  ],
  addresses: {
    india:
      "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044",
    indiaStructured: {
      "@type": "PostalAddress",
      streetAddress:
        "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110044",
      addressCountry: "IN",
    },
    uae: "Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates",
    uaeStructured: {
      "@type": "PostalAddress",
      streetAddress: "Business Centre, Sharjah Publishing City Free Zone",
      addressLocality: "Sharjah",
      addressCountry: "AE",
    },
  },
  social: {
    linkedin: "https://www.linkedin.com/company/servchip",
    twitter: "https://twitter.com/servchip",
    facebook: "https://facebook.com/servchip",
    youtube: "https://youtube.com/@servchip",
    instagram: "https://instagram.com/servchip",
  },
  geo: {
    region: "IN-DL",
    placename: "New Delhi, India",
    position: "28.5245;77.2665",
    latitude: "28.5245",
    longitude: "77.2665",
  },
} as const;

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

export const SCHEMA = {
  seller: { "@type": "Organization", name: "Servchip Inc." },
  currency: "USD",
  returnPolicy: {
    "@type": "MerchantReturnPolicy",
    applicableCountry: "US",
    returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
  },
  shipping: {
    "@type": "OfferShippingDetails",
    shippingDestination: {
      "@type": "DefinedRegion",
      addressCountry: "US",
    },
    shippingRate: {
      "@type": "MonetaryAmount",
      value: "0",
      currency: "USD",
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime",
      handlingTime: {
        "@type": "QuantitativeValue",
        minValue: "1",
        maxValue: "3",
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue",
        minValue: "3",
        maxValue: "7",
        unitCode: "DAY",
      },
    },
  },
  availabilityMap: {
    in_stock: "https://schema.org/InStock",
    on_order: "https://schema.org/PreOrder",
    limited: "https://schema.org/LimitedAvailability",
    pre_order: "https://schema.org/PreOrder",
    discontinued: "https://schema.org/Discontinued",
  },
  priceValidUntilDays: 365,
} as const;
