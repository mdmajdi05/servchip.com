export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo?: string;
  description: string;
  longDescription: string;
  website: string;
  founded: string;
  headquarters: string;
  categories: BrandCategory[];
  seo?: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface BrandCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  subcategories: BrandSubCategory[];
}

export interface BrandSubCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  chipIds: string[];
}

/** @deprecated Use {@link Brand} instead. */
export type Manufacturer = Brand;
/** @deprecated Use {@link BrandCategory} instead. */
export type ManufacturerCategory = BrandCategory;
/** @deprecated Use {@link BrandSubCategory} instead. */
export type ManufacturerSubCategory = BrandSubCategory;

export interface SiteConfig {
  id: string;
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  logoHeight: number;
  logoWidth: number;
  faviconUrl?: string;
  ogImageUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  heroHeading: string;
  heroSubheading: string;
  heroCta1Label: string;
  heroCta1Href: string;
  heroCta2Label: string;
  heroCta2Href: string;
  heroBadgeText: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  footerTagline: string;
  copyrightText: string;
  newsletterEnabled: boolean;
}
