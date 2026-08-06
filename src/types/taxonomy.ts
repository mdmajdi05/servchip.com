export interface TaxonomySeo {
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

export interface TaxonomyFaq {
  question: string;
  answer: string;
}

export interface TaxonomyRelated {
  brandIds?: string[];
  categoryIds?: string[];
  useCases?: string[];
}

export interface TaxonomyStat {
  value: string;
  label: string;
}

export interface TaxonomyHero {
  label: string;
  title: string;
  subtitle: string;
}

export interface Country {
  id: string;
  name: string;
  slug: string;
  code: string;
  flag: string;
  region: string;
  description: string;
  longDescription: string;
  hero: TaxonomyHero;
  seo: TaxonomySeo;
  faqs: TaxonomyFaq[];
  related: TaxonomyRelated;
  stats?: TaxonomyStat[];
  market?: CountryMarket;
}

export interface CountryMarket {
  code: string;
  locale: string;
  currency: string;
  currencySymbol: string;
  warehouse: string;
  shippingNote: string;
  leadTime: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  longDescription: string;
  hero: TaxonomyHero;
  seo: TaxonomySeo;
  faqs: TaxonomyFaq[];
  related: TaxonomyRelated;
  stats?: TaxonomyStat[];
}

export interface Solution {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  longDescription: string;
  hero: TaxonomyHero;
  seo: TaxonomySeo;
  faqs: TaxonomyFaq[];
  related: TaxonomyRelated;
  stats?: TaxonomyStat[];
}
