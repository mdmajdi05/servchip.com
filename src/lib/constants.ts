export const SITE = {
  name: "Servchip",
  tagline: "Powering the Future of AI Computing",
  email: "sales@servchip.com",
  phone: "+91 7982498712",
  url: "https://servchip.com",
  addresses: {
    india:
      "A-24/5, 3rd Floor, NH-19, Mohan Cooperative Industrial Estate, New Delhi, Delhi 110044",
    uae: "Business Centre, Sharjah Publishing City Free Zone, Sharjah, United Arab Emirates",
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
