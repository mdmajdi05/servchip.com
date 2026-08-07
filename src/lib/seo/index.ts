export {
  OG_IMAGE,
  OG_WIDTH,
  OG_HEIGHT,
  HREFLANG_ALTERNATES,
} from "./constants";
export {
  ORG_ID,
  jsonLd,
  organizationSchema,
  localBusinessSchema,
  websiteSchema,
  breadcrumbSchema,
  productSchema,
  articleSchema,
  faqSchema,
  serviceSchema,
  contactPageSchema,
  itemListSchema,
} from "./schemas";
export { createSeoMetadata } from "./metadata";
export type { SeoImage, SeoMetadataInput } from "./metadata";
export {
  STATIC_PAGE_TEMPLATES,
  ENTITY_TEMPLATES,
  createMetadata,
  createEntityMetadata,
  createBreadcrumb,
  createEntityBreadcrumb,
  countryParams,
  stripServchip,
} from "./core";
export type {
  StaticRoute,
  EntityRoute,
  SeoFields,
  SeoPageTemplate,
  SeoEntityTemplate,
  CountryVars,
} from "./core";
