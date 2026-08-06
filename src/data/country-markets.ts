import type { CountryMarket } from "@/types";

export const COUNTRY_MARKETS: Record<string, CountryMarket> = {
  us: {
    code: "us",
    locale: "en-US",
    currency: "USD",
    currencySymbol: "$",
    warehouse: "Texas, USA",
    shippingNote:
      "Nationwide delivery across the United States including California, Texas, New York and Virginia data-center hubs.",
    leadTime: "3-7 business days",
  },
  uk: {
    code: "uk",
    locale: "en-GB",
    currency: "GBP",
    currencySymbol: "£",
    warehouse: "London, UK",
    shippingNote:
      "Delivery across the United Kingdom including London, Manchester and Cambridge.",
    leadTime: "5-10 business days",
  },
  de: {
    code: "de",
    locale: "de-DE",
    currency: "EUR",
    currencySymbol: "€",
    warehouse: "Frankfurt, Germany",
    shippingNote:
      "Delivery across Germany and the wider EU including Frankfurt, Berlin and Munich.",
    leadTime: "5-10 business days",
  },
  in: {
    code: "in",
    locale: "en-IN",
    currency: "INR",
    currencySymbol: "₹",
    warehouse: "New Delhi, India",
    shippingNote:
      "Delivery across India including New Delhi, Mumbai, Bengaluru, Hyderabad and Chennai.",
    leadTime: "3-7 business days",
  },
  ae: {
    code: "ae",
    locale: "en-AE",
    currency: "AED",
    currencySymbol: "د.إ",
    warehouse: "Sharjah, UAE",
    shippingNote:
      "Delivery across the UAE including Dubai, Abu Dhabi and Sharjah with full customs clearance.",
    leadTime: "2-5 business days",
  },
};

export function getCountryMarket(code: string): CountryMarket | undefined {
  return COUNTRY_MARKETS[code];
}
