export { STATIC_PAGE_TEMPLATES, ENTITY_TEMPLATES } from "./templates";
export type {
  StaticRoute,
  EntityRoute,
  SeoFields,
  SeoPageTemplate,
  SeoEntityTemplate,
} from "./templates";
export {
  createMetadata,
  createEntityMetadata,
  createBreadcrumb,
  createEntityBreadcrumb,
  countryParams,
} from "./generators";
export type { CountryVars } from "./config";
export { countryContext, countryVars } from "./config";
export { SEO_CONTENT_OVERRIDES } from "./content/overrides";
export { interpolate, stripServchip } from "./helpers";
