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
